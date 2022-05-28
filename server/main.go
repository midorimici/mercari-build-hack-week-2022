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
	Category string `json:"category"`
	Content string `json:"content"`
	Tag string `json:"tags"`
}

func addPost(c echo.Context) error {
	return c.String(http.StatusOK, "OK")
}

func showPosts(c echo.Context) error {
	DbConnection,_:=sql.Open("sqlite3","mercari.sqlite3")
	defer DbConnection.Close()

	cmd := "SELECT name,category,content,tag FROM post"
	rows, err := DbConnection.Query(cmd)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var posts []Post
	for rows.Next(){
		var post Post
		err := rows.Scan(&post.Name,&post.Category,&post.Content,&post.Tag)
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

@@ -27,6 +70,8 @@ func main() {
	}))

	// Routes
	e.POST("/posts", addPost)
	e.GET("/posts", showPosts)

	// Start server
	e.Logger.Fatal(e.Start(":9000"))
