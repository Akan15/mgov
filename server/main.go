package main

import (
	"log"
	"net/http"
	"os"
	"path/filepath"

	"react-frontend-server/db"
	"react-frontend-server/handlers"
)

func main() {
	// Connect to MongoDB
	if err := db.Connect(); err != nil {
		log.Fatal("Failed to connect to MongoDB:", err)
	}
	defer db.Close()

	// Get the port from environment variable or use default
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	// Get the absolute path to the build directory
	buildDir := filepath.Join("..", "build")
	absBuildDir, err := filepath.Abs(buildDir)
	if err != nil {
		log.Fatal("Error getting absolute path:", err)
	}

	// Create a file server handler
	fs := http.FileServer(http.Dir(absBuildDir))

	// API routes
	http.HandleFunc("/api/feedback", handlers.SubmitFeedback)
	http.HandleFunc("/api/feedback/list", handlers.GetFeedback)

	// Handle all other routes
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Get the requested path
		path := filepath.Join(absBuildDir, r.URL.Path)

		// Check if the file exists
		if _, err := os.Stat(path); os.IsNotExist(err) {
			// If file doesn't exist, serve index.html
			http.ServeFile(w, r, filepath.Join(absBuildDir, "index.html"))
			return
		}

		// Serve the file
		fs.ServeHTTP(w, r)
	})

	log.Printf("Server starting on port %s...", port)
	log.Printf("Serving files from: %s", absBuildDir)
	
	if err := http.ListenAndServe(":"+port, nil); err != nil {
		log.Fatal(err)
	}
} 