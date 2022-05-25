package main

import (
	"database/sql"
	"encoding/json"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"

	_ "github.com/mattn/go-sqlite3"
)

var DbConnection *sql.DB

type Post struct {
	Name string `json:"name"`
	Content string `json:"category"`
	Tag string `json:"image"`
}

func addPost(c echo.Context) error {
	return c.String(http.StatusOK, "OK")
}

func showPost(c echo.Context) error {
	DbConnection,_:=sql.Open("sqlite3","mercari.sqlite3")
	defer DbConnection.Close()

	cmd := "SELECT name,content,tag FROM post"
	rows, err := DbConnection.Query(cmd)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()
	
	var posts []Post
	for rows.Next(){
		var post Post
		err := rows.Scan(&post.Name,&post.Content,&post.Tag)
		if err != nil{
			log.Fatal(err)
		}
		posts = append(posts,post)
	}
	n_json, err := json.Marshal(posts)
	if err != nil {
		log.Fatal(err)
	}
	return c.String(http.StatusOK, string(n_json))
}

func main() {
	e := echo.New()

	// Middleware
	e.Use(middleware.Logger())
	e.Use(middleware.Recover())
	e.Logger.SetLevel(log.INFO)

	front_url := os.Getenv("FRONT_URL")
	if front_url == "" {
		front_url = "http://localhost:3000"
	}
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{front_url},
		AllowMethods: []string{http.MethodGet, http.MethodPut, http.MethodPost, http.MethodDelete},
	}))

	// Routes

	// Start server
	e.POST("/post", addPost)
	e.GET("/post", showPost)
	e.Logger.Fatal(e.Start(":9000"))
}
