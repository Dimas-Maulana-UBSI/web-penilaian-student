package app

import (
	"database/sql"
	"web_penilaian_student/controller"
	"web_penilaian_student/repository"
	"web_penilaian_student/service"

	"github.com/gofiber/fiber/v2"
)

func NewAssignmentsRouter(app *fiber.App, db *sql.DB) {

	// init repository
	assignmentsRepo := repository.NewAssignmentsRepository()

	// init service
	assignmentsService := service.NewAssignmentsService(assignmentsRepo, db)

	// init controller
	assignmentsController := controller.NewAssignmentsController(assignmentsService)

	// routes
	app.Get("/assignments", assignmentsController.GetAll)
	app.Put("/assignments", assignmentsController.Update)
}
