package app

import (
	"database/sql"
	"web_penilaian_student/controller"
	"web_penilaian_student/repository"
	"web_penilaian_student/service"

	"github.com/gofiber/fiber/v2"
)

func NewWebHookRouter(app *fiber.App, db *sql.DB) {

	// init repository
	webHookRepo := repository.NewAssignmentsRepository()

	// init service
	webHookService := service.NewWebHookService(webHookRepo, db)

	// init controller
	webHookController := controller.NewWebHookController(webHookService)

	// route
	app.Post("/webhook", webHookController.HandlePush)
}
