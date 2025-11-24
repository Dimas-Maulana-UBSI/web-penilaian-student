package app

import (
	"database/sql"
	"web_penilaian_student/controller"
	"web_penilaian_student/repository"
	"web_penilaian_student/service"

	"github.com/gofiber/fiber/v2"
)

func NewAuthRouter(app *fiber.App,db *sql.DB){

	AuthRepository := repository.NewAuthRepository()
	AuthService := service.NewAuthService(AuthRepository,db)
	AuthController := controller.NewAuthController(AuthService)

	app.Post("/login",AuthController.Login)
}