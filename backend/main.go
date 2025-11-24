package main

import "web_penilaian_student/app"

func main() {
	app := app.NewRouter()
	app.Static("/", "./")
	app.Listen("localhost:3000")
}