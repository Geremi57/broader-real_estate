package gomail

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/resend/resend-go/v2"
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

func SendAutoReply(w http.ResponseWriter, r *http.Request) {
	enableCORS(w)

	if r.Method == http.MethodOptions {
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

	apiKey := os.Getenv("RESEND_API_KEY")
	client := resend.NewClient(apiKey)

	reply := &resend.SendEmailRequest{
		From:    "Broader Real Estate <wangageremi725@gmail.com>",
		To:      []string{form.Email},
		Subject: fmt.Sprintf("Thanks for reaching out, %s!", form.Name),
		Html: fmt.Sprintf(`
			<p>Hi %s,</p>
			<p>We’ve received your message:</p>
			<blockquote>%s</blockquote>
			<p>We’ll get back to you shortly.</p>
			<p>Best regards,<br><strong>Broader Real Estate Team</strong></p>
		`, form.Name, form.Message),
	}

	adminNotice := &resend.SendEmailRequest{
		From:    "Broader Real Estate <wangageremi725@gmail.com>",
		To:      []string{"geremiwanga57@gmail.com"}, // admin inbox
		Subject: fmt.Sprintf("New Contact Form Submission from %s", form.Name),
		Html: fmt.Sprintf(`
			<h3>New contact form message</h3>
			<p><strong>Name:</strong> %s</p>
			<p><strong>Email:</strong> %s</p>
			<p><strong>Message:</strong></p>
			<p>%s</p>
		`, form.Name, form.Email, form.Message),
	}

	_, err = client.Emails.Send(reply)
	if err != nil {
		log.Println("Error sending email:", err)
		http.Error(w, "Failed to send email", http.StatusInternalServerError)
		return
	}

	if _, err := client.Emails.Send(adminNotice); err != nil {
		log.Println("Error sending admin notice:", err)
		http.Error(w, "Failed to notify admin", http.StatusInternalServerError)
		return
	}

	log.Printf("Auto-reply sent to %s successfully!\n", form.Email)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("Email sent successfully!"))
}
