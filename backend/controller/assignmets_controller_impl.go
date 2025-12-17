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
func (controller *AssignmentsControllerImpl) GetAll(ctx *fiber.Ctx) error {
	assignments, err := controller.AssignmentsService.GetAll(ctx.Context())
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

// PUT /assignments/:repository_name
func (controller *AssignmentsControllerImpl) Update(ctx *fiber.Ctx) error {
	repoName := ctx.Params("repository_name")

	var request web.AssignmentsRequest

	// Parse JSON Body
	if err := ctx.BodyParser(&request); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(web.WebResponse{
			Status:  400,
			Message: "invalid request body",
			Data:    nil,
		})
	}

	result, err := controller.AssignmentsService.Update(ctx.Context(), request,repoName)
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

func (controller *AssignmentsControllerImpl) FindByName(ctx *fiber.Ctx) error {
	name := ctx.Params("name")
	if name == "" {
		return ctx.Status(fiber.StatusBadRequest).JSON(web.WebResponse{
			Status:  400,
			Message: "name parameter is required",
			Data:    nil,
		})
	}

	response, err := controller.AssignmentsService.FindByName(ctx.Context(), name)
	if err != nil {
		return ctx.Status(fiber.StatusNotFound).JSON(web.WebResponse{
			Status:  404,
			Message: err.Error(),
			Data:    nil,
		})
	}

	return ctx.Status(fiber.StatusOK).JSON(web.WebResponse{
		Status:  200,
		Message: "success",
		Data:    response,
	})
}

