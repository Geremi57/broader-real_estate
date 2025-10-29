package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"gopkg.in/gomail.v2"
)

type ContactForm struct {
	Name    string `json:"name"`
	Email   string `json:"email"`
	Message string `json:"message"`
}

func enableCORS(w http.ResponseWriter) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
}
func sendAutoReply(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)

	if r.Method == http.MethodOptions {
		// Handle preflight requests
		w.WriteHeader(http.StatusOK)
		return
	}

	if r.Method != http.MethodPost {
		http.Error(w, "Invalid request method", http.StatusMethodNotAllowed)
		return
	}

	var form ContactForm
	err := json.NewDecoder(r.Body).Decode(&form)
	if err != nil {
		http.Error(w, "Invalid data", http.StatusBadRequest)
		return
	}

	m := gomail.NewMessage()
	m.SetHeader("From", "wangageremi725@gmail.com")
	m.SetHeader("To", form.Email)
	m.SetHeader("Subject", fmt.Sprintf("Thanks for reaching out, %s!", form.Name))
	m.SetBody("text/plain",
		fmt.Sprintf("Hi %s,\n\nWe received your message:\n\n\"%s\"\n\nWe'll get back to you shortly!\n\nBest regards,\nBroader Real Estate Team",
			form.Name, form.Message))
	d := gomail.NewDialer("smtp.gmail.com", 587, "wangageremi725@gmail.com", os.Getenv("APP_PASSWORD"))

	if err := d.DialAndSend(m); err != nil {
		log.Println("Error sending email:", err)
		http.Error(w, "Failed to send email", http.StatusInternalServerError)
		return
	}

	log.Printf("Auto-reply sent to %s successfully!\n", form.Email)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Email sent successfully!"))
}

func main() {
	http.HandleFunc("/api/contact", sendAutoReply)

	fmt.Println("Server running on http://localhost:8080")
	log.Fatal(http.ListenAndServe(":8080", nil))
}
