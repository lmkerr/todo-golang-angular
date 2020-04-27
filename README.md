# todo-golang-angular

To run code locally without docker, just run `npm i` from the `todo-ui` repo and `npm run start` in your terminal/console. 

# Dockerize and run

Quick Command: `npm run docker`

# UI Docker

Navigate: `cd todo-ui`
Build: `docker build -t todo-ui .`
Run: `docker run -p 4200:4200 todo-ui`

# API Docker

Navigate: `cd todo-api`
Build: `docker build -t todo-api .`
Run: `docker run -p 8000:8000 todo-api`

# Notes

Things left to do:
1. DELETE command enabled in CORS
2. Connection to a live DB
3. Deploy
