FROM golang:1.10

WORKDIR /
COPY . .
RUN go get -d github.com/gorilla/mux
RUN go get -d github.com/gorilla/handlers

CMD ["go","run","main.go"]