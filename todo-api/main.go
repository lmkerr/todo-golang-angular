package main

import (
	"encoding/json"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"log"
	"math/rand"
	"net/http"
	"strconv"
)

// ToDo Struct (MODEL)
type ToDo struct {
	ID       string `json:"id"`
	Title    string `json:"title"`
	IsDone   bool   `json:"is_done"`
	Priority int    `json:"priority"`
}

// Init ToDos var as a slice ToDo struct
var todos []ToDo

func main() {
	// Init Router
	r := mux.NewRouter()

	// Mock Data - @todo - implement DB
	todos = append(todos, ToDo{ID: "1", Title: "Code Front-End", IsDone: false, Priority: 1})
	todos = append(todos, ToDo{ID: "2", Title: "Build Database", IsDone: false, Priority: 3})
	todos = append(todos, ToDo{ID: "3", Title: "Deploy Code", IsDone: false, Priority: 5})
	todos = append(todos, ToDo{ID: "4", Title: "Code Back-End", IsDone: false, Priority: 2})
	todos = append(todos, ToDo{ID: "5", Title: "Dockerize Code", IsDone: false, Priority: 4})

	// Route Handlers / Endpoints
	r.HandleFunc("/api/todos", getToDos).Methods(http.MethodGet)
	r.HandleFunc("/api/todos/{id}", getToDo).Methods(http.MethodGet)
	r.HandleFunc("/api/todos", createToDo).Methods(http.MethodPost)
	r.HandleFunc("/api/todos/{id}", updateToDo).Methods(http.MethodPut)
	r.HandleFunc("/api/todos/{id}", deleteToDo).Methods(http.MethodDelete)
	r.Use(mux.CORSMethodMiddleware(r))

	log.Fatal(http.ListenAndServe(":8000",
		handlers.CORS(
			handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization"}),
			handlers.AllowedMethods([]string{"GET", "DELETE", "POST", "PUT", "PATCH", "HEAD", "OPTIONS"}),
			handlers.AllowedOrigins([]string{"*"}))(r)))
}

// Get All ToDos
func getToDos(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(todos)
}

// Get ToDo
func getToDo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r) // Get params
	// Loop through todos and find with id
	for _, item := range todos {
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	json.NewEncoder(w).Encode(&ToDo{})
}

// Create ToDo
func createToDo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	var todo ToDo
	_ = json.NewDecoder(r.Body).Decode(&todo)

	todo.ID = strconv.Itoa(rand.Intn(10000000)) // Mock ID - not safe, could duplicate id's
	todo.Priority = len(todos) + 1
	todo.IsDone = false

	todos = append(todos, todo)
	json.NewEncoder(w).Encode(todo)
}

// Update ToDo
func updateToDo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	for index, item := range todos {
		if item.ID == params["id"] {

			todos = append(todos[:index], todos[index+1:]...)

			var todo = item
			_ = json.NewDecoder(r.Body).Decode(&todo)

			todo.ID = item.ID

			todos = append(todos, todo)
			json.NewEncoder(w).Encode(todo)
			return
		}
	}
}

// Delete ToDo
func deleteToDo(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "DELETE")
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)
	for index, item := range todos {
		if item.ID == params["id"] {
			todos = append(todos[:index], todos[index+1:]...)
			break
		}
	}

	json.NewEncoder(w).Encode(todos)
}
