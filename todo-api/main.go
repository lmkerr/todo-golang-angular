package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	_ "github.com/lib/pq"
	"log"
	"net/http"
	"strconv"
)

// ToDo Struct (MODEL)
type ToDo struct {
	ID       int    `json:"id"`
	Title    string `json:"title"`
	IsDone   bool   `json:"is_done"`
	Priority int    `json:"priority"`
}

// DB Connection Data - @todo Get this out of code...
const (
	DB_USER     = "app-user"
	DB_PASSWORD = "HireMePlease!"
	DB_NAME     = "todo"
)

// Init ToDos var as a slice ToDo struct
var todos []ToDo

func main() {
	// Init Router
	r := mux.NewRouter()

	// Route Handlers / Endpoints
	r.HandleFunc("/api/todos", getToDos).Methods(http.MethodGet)
	r.HandleFunc("/api/todos/{id}", getToDo).Methods(http.MethodGet)
	r.HandleFunc("/api/todos", createToDo).Methods(http.MethodPost)
	r.HandleFunc("/api/todos/{id}", completeToDo).Methods(http.MethodPatch)
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

	dbinfo := fmt.Sprintf("postgres://app-user:HireMePlease!@35.194.7.68/postgres?sslmode=verify-full",
		DB_USER, DB_PASSWORD, DB_NAME)
	db, err := sql.Open("postgres", dbinfo)
	checkErr(err)
	defer db.Close()

	fmt.Println("# Querying")
	rows, err := db.Query("SELECT * FROM todos WHERE done = false")
	checkErr(err)

	var data []ToDo
	for rows.Next() {
		var todo ToDo
		err = rows.Scan(&todo.ID, &todo.Title, &todo.IsDone, &todo.Priority)
		checkErr(err)
		data = append(data, todo)
	}

	json.NewEncoder(w).Encode(data)
}

// Get ToDo
func getToDo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	dbinfo := fmt.Sprintf("postgres://app-user:HireMePlease!@35.194.7.68/postgres?sslmode=verify-full",
		DB_USER, DB_PASSWORD, DB_NAME)
	db, err := sql.Open("postgres", dbinfo)
	checkErr(err)
	defer db.Close()

	params := mux.Vars(r) // Get params

	var todo ToDo
	i, err := strconv.Atoi(params["id"])
	todo.ID = i
	rows, err := db.Query("SELECT id, title, done, priority FROM todos WHERE ID = $1", todo.ID)
	checkErr(err)

	for rows.Next() {
		err = rows.Scan(&todo.ID, &todo.Title, &todo.IsDone, &todo.Priority)
		checkErr(err)
	}
	json.NewEncoder(w).Encode(todo)
}

// Create ToDo
func createToDo(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Content-Type", "application/json")

	var todo ToDo
	_ = json.NewDecoder(r.Body).Decode(&todo)

	todo.IsDone = false

	dbinfo := fmt.Sprintf("postgres://app-user:HireMePlease!@35.194.7.68/postgres?sslmode=verify-full",
		DB_USER, DB_PASSWORD, DB_NAME)
	db, err := sql.Open("postgres", dbinfo)
	checkErr(err)
	defer db.Close()

	rows, err := db.Query(`insert into todos (title, done, priority)
			values ($1, $2, (
				SELECT
					CASE 
						WHEN EXISTS (SELECT 1 FROM todos) THEN (select max(priority) + 1 from todos) 
						ELSE 1
					end
			))
			returning *`,
		todo.Title, todo.IsDone)
	checkErr(err)

	for rows.Next() {
		err = rows.Scan(&todo.ID, &todo.Title, &todo.IsDone, &todo.Priority)
		checkErr(err)
	}
	json.NewEncoder(w).Encode(todo)
}

// Complete ToDo
func completeToDo(w http.ResponseWriter, r *http.Request) {

	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "PATCH")
	w.Header().Set("Content-Type", "application/json")

	params := mux.Vars(r)

	dbinfo := fmt.Sprintf("postgres://app-user:HireMePlease!@35.194.7.68/postgres?sslmode=verify-full",
		DB_USER, DB_PASSWORD, DB_NAME)
	db, err := sql.Open("postgres", dbinfo)
	checkErr(err)
	defer db.Close()

	rows, err := db.Query("UPDATE todos SET done = true WHERE id = $1", params["id"])
	checkErr(err)

	var todo ToDo
	for rows.Next() {
		err = rows.Scan(&todo.ID, &todo.Title, &todo.IsDone, &todo.Priority)
		checkErr(err)
	}

	json.NewEncoder(w).Encode(todo)
}

func checkErr(err error) {
	if err != nil {
		panic(err)
	}
}
