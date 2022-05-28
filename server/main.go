package main
//?
import (
	"database/sql"
	"encoding/json"
	"fmt"
	"net/http"
	"os"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	"github.com/labstack/gommon/log"

	_ "github.com/mattn/go-sqlite3"
)

const dbName = "mercari.sqlite3"

var DbConnection *sql.DB

type Post struct {
	Name    string `json:"name"`
	Category    string `json:"category"`
	Content string `json:"content"`
	Tags    string `json:"tags"`
}

func addPost(c echo.Context) error {
	// Get form data
	name := c.FormValue("name")
	category := c.FormValue("category")
	content := c.FormValue("content")
	tags := c.FormValue("tags")

	// Log
	c.Logger().Infof("post received: %s,%s, %s, %s", name,category, content, tags)

	// Open DB
	db, err := sql.Open("sqlite3", dbName)
	if err != nil {
		return fmt.Errorf("addPost failed: %w", err)
	}
	defer db.Close()

	// Create a new post
	_, err = db.Exec("INSERT INTO posts (name,category, content, tags) values (?, ?, ?)", name,category, content, tags)
	if err != nil {
		return fmt.Errorf("addPost failed: %w", err)
	}

	// Response data
	message := fmt.Sprintf("post received: %s,%s, %s, %s", name,category, content, tags)

	return c.String(http.StatusOK, message)
}

func showPosts(c echo.Context) error {
	DbConnection, _ := sql.Open("sqlite3", dbName)
	defer DbConnection.Close()

	cmd := "SELECT name,category, content, tags FROM posts"
	rows, err := DbConnection.Query(cmd)
	if err != nil {
		log.Fatal(err)
	}
	defer rows.Close()

	var posts []Post
	for rows.Next() {
		var post Post
		err := rows.Scan(&post.Name,&post.Category, &post.Content, &post.Tags)
		if err != nil {
			log.Fatal(err)
		}
		posts = append(posts, post)
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
	e.POST("/posts", addPost)
	e.GET("/posts", showPosts)

	// Start server
	e.Logger.Fatal(e.Start(":9000"))
}
