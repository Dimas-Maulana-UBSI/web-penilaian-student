package controller

import (
	"web_penilaian_student/model/web"
	"web_penilaian_student/service"

	"github.com/gofiber/fiber/v2"
)

type AssignmentsControllerImpl struct {
	AssignmentsService service.AssignmentsService
}

func NewAssignmentsController(assignmentsService service.AssignmentsService) AssignmentsController {
	return &AssignmentsControllerImpl{
		AssignmentsService: assignmentsService,
	}
}

// GET /assignments
func (c *AssignmentsControllerImpl) GetAll(ctx *fiber.Ctx) error {
	assignments, err := c.AssignmentsService.GetAll(ctx.Context())
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(web.WebResponse{
			Status:  500,
			Message: err.Error(),
			Data:    nil,
		})
	}

	return ctx.JSON(web.WebResponse{
		Status:  200,
		Message: "success",
		Data:    assignments,
	})
}

// PUT /assignments
func (c *AssignmentsControllerImpl) Update(ctx *fiber.Ctx) error {
	var request web.AssignmentsRequest

	// Parse body
	if err := ctx.BodyParser(&request); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(web.WebResponse{
			Status:  400,
			Message: "invalid request body",
			Data:    nil,
		})
	}

	result, err := c.AssignmentsService.Update(ctx.Context(), request)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(web.WebResponse{
			Status:  500,
			Message: err.Error(),
			Data:    nil,
		})
	}

	return ctx.JSON(web.WebResponse{
		Status:  200,
		Message: "success",
		Data:    result,
	})
}
