package models

import (
	"time"

	"go.mongodb.org/mongo-driver/bson/primitive"
)

// Feedback represents a customer feedback entry
type Feedback struct {
	ID        primitive.ObjectID `bson:"_id,omitempty" json:"id,omitempty"`
	Name      string            `bson:"name" json:"name"`
	IIN       string            `bson:"iin" json:"iin"`
	Phone     string            `bson:"phone" json:"phone"`
	Message   string            `bson:"message" json:"message"`
	CreatedAt time.Time         `bson:"created_at" json:"created_at"`
} 