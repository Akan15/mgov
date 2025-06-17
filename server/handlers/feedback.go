package handlers

import (
	"context"
	"encoding/json"
	"log"
	"net/http"
	"time"

	"react-frontend-server/db"
	"react-frontend-server/models"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

// SubmitFeedback handles the submission of new feedback
func SubmitFeedback(w http.ResponseWriter, r *http.Request) {
	log.Printf("Received feedback submission request: %s", r.Method)

	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	// Parse the request body
	var feedback models.Feedback
	if err := json.NewDecoder(r.Body).Decode(&feedback); err != nil {
		log.Printf("Error decoding request body: %v", err)
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	log.Printf("Received feedback data: %+v", feedback)

	// Set creation timestamp
	feedback.CreatedAt = time.Now()

	// Insert into MongoDB
	collection := db.GetCollection()
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	result, err := collection.InsertOne(ctx, feedback)
	if err != nil {
		log.Printf("Error saving feedback to MongoDB: %v", err)
		http.Error(w, "Error saving feedback", http.StatusInternalServerError)
		return
	}

	log.Printf("Successfully saved feedback with ID: %v", result.InsertedID)

	// Set the ID from the result
	feedback.ID = result.InsertedID.(primitive.ObjectID)

	// Return success response
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(feedback)
}

// GetFeedback retrieves all feedback entries
func GetFeedback(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	collection := db.GetCollection()
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		http.Error(w, "Error retrieving feedback", http.StatusInternalServerError)
		return
	}
	defer cursor.Close(ctx)

	var feedback []models.Feedback
	if err = cursor.All(ctx, &feedback); err != nil {
		http.Error(w, "Error processing feedback", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(feedback)
} 