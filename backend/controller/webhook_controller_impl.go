package controller

import (
	"fmt"
	"web_penilaian_student/model/web"
	"web_penilaian_student/service"

	"github.com/gofiber/fiber/v2"
)

type WebHookControllerImpl struct {
	WebHooksService service.WebHookService
}

func newWebHookController(service service.WebHookService)WebHookController{
	return &WebHookControllerImpl{
		WebHooksService: service,
	}
}

func NewWebHookController(service service.WebHookService) WebHookController {
	return &WebHookControllerImpl{
		WebHooksService: service,
	}
}

func (controller *WebHookControllerImpl) HandlePush(ctx *fiber.Ctx) error {

	fmt.Println("tes")
	request := new(web.Repository)
	if err := ctx.BodyParser(request); err != nil {
		return ctx.Status(fiber.StatusBadRequest).JSON(fiber.Map{
			"error": "Invalid JSON: " + err.Error(),
		})
	}

	err := controller.WebHooksService.HandlePush(ctx.Context(), *request)
	if err != nil {
		return ctx.Status(fiber.StatusInternalServerError).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	// Success response
	return ctx.Status(fiber.StatusOK).JSON(fiber.Map{
		"message": "Webhook processed successfully",
	})
}