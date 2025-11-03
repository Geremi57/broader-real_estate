package main

//i just build an api 🤯🤯🤯🤯

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strings"

	"github.com/Geremi57/broader-real_estate/gomail"
	// "fmt"
)

type Property struct {
	ID           int      `json:"id"`
	Category     string   `json:"category"`
	Image        string   `json:"image"`
	Slides       []string `json:"slides"`
	Title        string   `json:"title"`
	Location     string   `json:"location"`
	Type         string   `json:"type"`
	Link         string   `json:"link"`
	Bedrooms     []int    `json:"bedrooms"`
	Bathrooms    int      `json:"bathrooms"`
	Sqrft        int      `json:"feet"`
	SqrftMax     int      `json:"maxfeet"`
	Desciption   string   `json:"description"`
	Price        float32  `json:"price"`
	Onedrm       int      `json:"onebdrm"`
	Twobdrm      int      `json:"twobdrm"`
	Threebdrm    int      `json:"threebdrm"`
	Fourbdrm     int      `json:"fourbdrm"`
	Fivebdrm     int      `json:"fivebdrm"`
	Deposit      string   `json:"deposit"`
	Furnished    string   `json:"furnished"`
	Installments string   `json:"installments"`
	Mortgage     string   `json:"mortgage"`
	Floors       int      `json:"flooors"`
	Amenities    []string `json:"amenities"`
}

func enableCors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == "OPTIONS" {
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	properties := []Property{

		{
			ID:       1,
			Category: "featured",
			Image:    "image/golden-mansion/IMG-20251008-WA0017.jpg",
			Slides: []string{
				"image/golden-mansion/IMG-20251008-WA0002.jpg",
				"image/golden-mansion/IMG-20251008-WA0004.jpg",
				"image/golden-mansion/IMG-20251008-WA0009.jpg",
				"image/golden-mansion/IMG-20251008-WA0010.jpg",
				"image/golden-mansion/IMG-20251008-WA0015.jpg",
				"image/golden-mansion/IMG-20251008-WA0020.jpg",
			},
			Title:        "Golden mansion",
			Location:     "Killeleshwa",
			Type:         "apartments",
			Link:         "gold-mansion",
			Bedrooms:     []int{1, 2, 3},
			Bathrooms:    0,
			Sqrft:        693,
			SqrftMax:     1669,
			Desciption:   `located in the heart of nairobi's bustling district, this boutique residence blends prime locaiton, modern luxury and lasting investment value to create an excluive community for high-net-worth individuals, international executives and discerning investors where you can thrive in the city's hustle and return to true tranquility.`,
			Price:        6.5,
			Onedrm:       6500000,
			Twobdrm:      10757000,
			Threebdrm:    21714000,
			Deposit:      "30%",
			Furnished:    "semi-furnished",
			Installments: "available",
			Mortgage:     "available",
			Floors:       22,
			Amenities:    []string{"Swimming pool", "Rooftop Gazebo & BBQ", "Ample water supply", "High speed elevators", "Back-up generators", "Security & 24/hr CCTV", "Dedicated parking space", "Skyview Gym and aerobics", "Concierge Reception lounge", "Hall for exclusive gatherings"},
		},
		{
			ID:       2,
			Category: "apartments",
			Image:    "image/golden-mansion/IMG-20251008-WA0017.jpg",
			Slides: []string{
				"image/golden-mansion/IMG-20251008-WA0002.jpg",
				"image/golden-mansion/IMG-20251008-WA0004.jpg",
				"image/golden-mansion/IMG-20251008-WA0009.jpg",
				"image/golden-mansion/IMG-20251008-WA0010.jpg",
				"image/golden-mansion/IMG-20251008-WA0015.jpg",
				"image/golden-mansion/IMG-20251008-WA0020.jpg",
			},
			Title:        "Golden mansion",
			Location:     "Killeleshwa",
			Type:         "apartments",
			Link:         "gold-mansion",
			Bedrooms:     []int{1, 2, 3},
			Bathrooms:    0,
			Sqrft:        693,
			SqrftMax:     1669,
			Desciption:   `located in the heart of nairobi's bustling district, this boutique residence blends prime locaiton, modern luxury and lasting investment value to create an excluive community for high-net-worth individuals, international executives and discerning investors where you can thrive in the city's hustle and return to true tranquility.`,
			Price:        6.5,
			Onedrm:       6500000,
			Twobdrm:      10757000,
			Threebdrm:    21714000,
			Deposit:      "30%",
			Furnished:    "semi-furnished",
			Installments: "available",
			Mortgage:     "available",
			Floors:       22,
			Amenities:    []string{"Swimming pool", "Rooftop Gazebo & BBQ", "Ample water supply", "High speed elevators", "Back-up generators", "Security & 24/hr CCTV", "Dedicated parking space", "Skyview Gym and aerobics", "Conncierge Receptio lounge", "Hall for exclusive gatherings"},
		},
		{
			ID:       3,
			Category: "apartments",
			Image:    "image/diamond-ivy/Diamod_ivy.jpg",
			Slides: []string{
				"image/diamond-ivy/Annotation 2025-10-06 203843.png",
				"image/diamond-ivy/Annotation 2025-10-06 204039.png",
				"image/diamond-ivy/Annotation 2025-10-06 204110.png",
				"image/diamond-ivy/Annotation 2025-10-06 204301.png",
				"image/diamond-ivy/Annotation 2025-10-06 204506.png",
				"image/diamond-ivy/Annotation 2025-10-06 205057.png",
			},
			Title:        "Diamond Ivy",
			Location:     "Killeleshwa",
			Type:         "apartments",
			Link:         "diamond-ivy",
			Bedrooms:     []int{1, 2, 3, 4},
			Bathrooms:    0,
			Sqrft:        646,
			SqrftMax:     2799,
			Desciption:   "The apartment is on Mandera Road Kileleshwa the 1km from westlands shopping centre and Sarit mall and a walking distance to the Quickmart supermarket.",
			Price:        8.0,
			Onedrm:       8000000,
			Twobdrm:      9000000,
			Threebdrm:    19500000,
			Fourbdrm:     21500000,
			Deposit:      "20%",
			Furnished:    "semi-furnished",
			Installments: "available",
			Mortgage:     "available",
			Floors:       22,
			Amenities:    []string{"Gym", "swimming pool", "Club house", "Sky garden", "Ample parking", "High speed lifts", "24 Hours security", "Cctv surveillance"},
		},
		{
			ID:       4,
			Category: "apartments",
			Image:    "image/the-beacon/04-Aerial.jpg",
			Slides: []string{
				"image/the-beacon/01-Lounge.jpg",
				"image/the-beacon/04-Kitchen.jpg",
				"image/the-beacon/05-Pool.jpg",
				"image/the-beacon/05Master-Bedroom.jpg",
				"image/the-beacon/06-Gym.jpg"},
			Title:     "The Beacon",
			Location:  "Killeleshwa",
			Type:      "apartments",
			Link:      "beacon-by-synina",
			Bedrooms:  []int{5},
			Bathrooms: 6,
			Sqrft:     2728,
			SqrftMax:  5258,
			Desciption: `Beacon by Synina is an architectural masterpiece redefining contentmporary luxury living in the serene, upscale neighbourhood kileleshwa
Offering spacious 3 & 4-bedroom ultra-modern residences with DSQ, along with lavish 5-bedroom duplex and simplex penthouse suites with family rooms, Beacon by Synina blends sophisticated design, exceptional craftsmanship, and world-class amenities.`,
			Price:        29.9,
			Threebdrm:    29900000,
			Fourbdrm:     40000000,
			Fivebdrm:     55000000,
			Deposit:      "20%",
			Furnished:    "semi-furnished",
			Installments: "available",
			Mortgage:     "available",
			Floors:       22,
			Amenities:    []string{"Swimming pool", "Rooftop Gazebo & BBQ", "Ample water supply", "High speed elevators", "Back-up generators", "Security & 24/hr CCTV", "Dedicated parking space", "Skyview Gym and aerobics", "Conncierge Receptio lounge", "Hall for exclusive gatherings"},
		},
		{
			ID:       5,
			Category: "apartments",
			Image:    "image/verona/IMG-20251013-WA0039.jpg",
			Slides: []string{
				"image/verona/IMG-20251013-WA0030.jpg",
				"image/verona/IMG-20251013-WA0028.jpg",
				"image/verona/IMG-20251013-WA0024.jpg",
				"image/verona/IMG-20251013-WA0027.jpg",
				"image/verona/IMG-20251013-WA0037.jpg",
				"image/verona/IMG-20251013-WA0026.jpg"},
			Title:        "Verona",
			Location:     "Westlands",
			Type:         "apartments",
			Link:         "verona-apartments",
			Bedrooms:     []int{1, 2, 3, 4},
			Bathrooms:    7,
			Sqrft:        442,
			SqrftMax:     2250,
			Desciption:   `Discover the ultimate convenience and lifestyle with our premium residences, perfectly situated in a prime location. Surrounded by abundant amenities, every detail is designed to elevate daily living with ease, comfort, and effortless access to everything you need.`,
			Price:        12.2,
			Onedrm:       12250000,
			Twobdrm:      21400000,
			Threebdrm:    45450000,
			Deposit:      "10%",
			Furnished:    "semi-furnished",
			Installments: "available",
			Floors:       22,
			Mortgage:     "available",
			Amenities:    []string{"Central garden", "Gym", "Cinema", "Shopping mall", "Yoga room", "Sauna", "Backup Generator", "Borehole water", "Coffee bar", "Kids playground", "Swimming pool", "Security & CCTV", "Recreation club", "Lounge/workspace"},
		},
		{
			ID:       6,
			Category: "apartments",
			Image:    "image/blossoms/Screenshot from 2025-10-23 17-42-22.png",
			Slides: []string{
				"image/blossoms/IMG-20251020-WA0005.jpg",
				"image/blossoms/IMG-20251021-WA0003.jpg",
				"image/blossoms/IMG-20251021-WA0001.jpg",
				"image/blossoms/IMG-20251020-WA0004.jpg",
				"image/blossoms/Screenshot from 2025-10-23 20-07-25.png",
				"image/blossoms/Screenshot from 2025-10-23 20-11-40.png"},
			Title:        "Blossoms Ivy",
			Location:     "Westlands",
			Type:         "apartments",
			Link:         "blossoms-apartments",
			Bedrooms:     []int{1, 2, 3, 4},
			Bathrooms:    3,
			Sqrft:        840,
			SqrftMax:     2799,
			Desciption:   `You'll find the kind of quality that usually comes with a steeper price tag, expansive balconies with sweeping views, finishes that feel as good as they look and seamless connectivity from room to room `,
			Price:        8.0,
			Onedrm:       8000000,
			Twobdrm:      10000000,
			Threebdrm:    18000000,
			Fourbdrm:     23000000,
			Deposit:      "20%",
			Furnished:    "ready to move",
			Installments: "available",
			Floors:       22,
			Mortgage:     "available",
			Amenities:    []string{"Arrival concierge", "24/7 security", "High speed lifts", "smart home features", "Gym", "Yoga studio", "swimming pool", "Kids playground", "Social club & Bar", "Parking", "Water Supply", "Backup Power"},
		},
		{
			ID:       7,
			Category: "apartments",
			Image:    "image/pandora/IMG-20251013-WA0002.jpg",
			Slides: []string{
				"image/pandora/IMG-20251013-WA0016.jpg",
				"image/pandora/IMG-20251013-WA0013.jpg",
				"image/pandora/IMG-20251013-WA0017.jpg",
				"image/pandora/IMG-20251013-WA0019.jpg",
				"image/pandora/IMG-20251013-WA0003.jpg",
				"image/pandora/IMG-20251013-WA0008.jpg"},
			Title:        "Pandora",
			Location:     "Westlands",
			Type:         "apartments",
			Link:         "pandora-apartments",
			Bedrooms:     []int{1, 2, 3, 4},
			Bathrooms:    7,
			Sqrft:        999,
			SqrftMax:     2148,
			Desciption:   `Discover the ultimate convenience and lifestyle with our premium residences, perfectly situated in a prime location. Surrounded by abundant amenities, every detail is designed to elevate daily living with ease, comfort, and effortless access to everything you need.`,
			Price:        14.0,
			Twobdrm:      14000000,
			Threebdrm:    27790000,
			Fourbdrm:     31530000,
			Deposit:      "10%",
			Furnished:    "semi-furnished",
			Installments: "available",
			Floors:       22,
			Mortgage:     "available",
			Amenities:    []string{"Central garden", "Gym", "Cinema", "Shopping mall", "Yoga room", "Sauna", "Backup Generator", "Borehole water", "Coffee bar", "Kids playground", "Swimming pool", "Security & CCTV", "Recreation club", "Lounge/workspace"},
		},
		{
			ID:         8,
			Category:   "Land",
			Image:      "image/neutral/high-angle-shot-farms-with-mountains-background-captured-samburu-kenya.jpg",
			Title:      "12 Acres",
			Location:   "Machakos",
			Type:       "land",
			Link:       "machakos",
			Bedrooms:   []int{},
			Bathrooms:  0,
			Sqrft:      12,
			Desciption: "wide and green",
			Price:      35,
			Amenities:  []string{},
		},
		{
			ID:         9,
			Category:   "Land",
			Image:      "image/neutral/african-nature-scenery-with-road-trees.jpg",
			Title:      "13 Acres",
			Location:   "Ruai",
			Type:       "land",
			Link:       "ruai",
			Bedrooms:   []int{},
			Bathrooms:  0,
			Sqrft:      13,
			Desciption: "wide and green",
			Price:      35,
			Amenities:  []string{},
		},
		{
			ID:         10,
			Category:   "Land",
			Image:      "image/neutral/view-african-nature-scenery-with-vegetation.jpg",
			Title:      "13 Acres",
			Location:   "Thigiri",
			Type:       "land",
			Link:       "thigiri",
			Bedrooms:   []int{},
			Bathrooms:  0,
			Sqrft:      13,
			Desciption: "wide and green",
			Price:      1,
			Amenities:  []string{},
		},
		{
			ID:         11,
			Category:   "Land",
			Image:      "image/neutral/beautiful-green-landscape-with-marsh-cloudy-sky.jpg",
			Title:      "13 Acres",
			Location:   "Kerarapon Nairobi",
			Type:       "land",
			Link:       "kerarapon",
			Bedrooms:   []int{},
			Bathrooms:  0,
			Sqrft:      13,
			Desciption: "wide and green",
			Price:      25,
			Amenities:  []string{},
		},
	}

	mux := http.NewServeMux()
	mux.HandleFunc("/api/properties", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(properties)
	})

	mux.HandleFunc("/api/properties/", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")

		link := strings.TrimPrefix(r.URL.Path, "/api/properties/")
		for _, prop := range properties {
			if prop.Link == link {
				json.NewEncoder(w).Encode(prop)
				return
			}
		}
		http.Error(w, "Property not found", http.StatusNotFound)
	})
	mux.HandleFunc("/api/contact", gomail.SendAutoReply)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	fmt.Printf("Server running on http://localhost:%s\n", port)
	log.Fatal(http.ListenAndServe(":"+port, enableCors(mux)))
}
