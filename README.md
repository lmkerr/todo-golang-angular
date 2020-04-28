# todo-golang-angular

To run code locally without docker, just run `npm i` from the `todo-ui` repo and `npm run start` in your terminal/console. 

# Dockerize and run

Quick Command: `npm run docker`

** NOTE:  Haven't yet setup docker to handle environment variables. If you want to build UI docker for production, navigate to the Dockerfile and change `RUN npm run build` to `RUN npm run build:prod`.  

# UI Docker

- Navigate: `cd todo-ui`
- Build: `docker build -t todo-ui .`
- Run: `docker run -p 4200:4200 todo-ui`

# API Docker

- Navigate: `cd todo-api`
- Build: `docker build -t todo-api .`
- Run: `docker run -p 8000:8000 todo-api`

# Notes

Things left to do:
1. Connection to a live DB
2. Deploy

# GCloud Commands

- UI: `glcoud builds submit --tag gcr.io/todo-275421/todo-ui`
- API: `glcoud builds submit --tag gcr.io/todo-275421/todo-api`