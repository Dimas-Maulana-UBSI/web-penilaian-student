package controller

import (
	"web_penilaian_student/model/web"
	"web_penilaian_student/service"

	"github.com/gofiber/fiber/v2"
)

type AuthControllerImpl struct {
	AuthService service.AuthService
}

func NewAuthController(service service.AuthService)AuthController{
	return &AuthControllerImpl{
		AuthService: service,
	}
}

func(controller *AuthControllerImpl)Login(ctx *fiber.Ctx)error{
	var user web.LoginRequest
	err := ctx.BodyParser(&user)
	if err != nil {
		return ctx.JSON(web.WebResponse{Status: 404,
		Message: err.Error(),
		Data: ""})
	}
	response,err := controller.AuthService.Login(ctx.Context(),user)
	if err != nil {
		return ctx.JSON(web.WebResponse{Status: 404,
		Message: err.Error(),
		Data: ""})
	}
	return ctx.JSON(web.WebResponse{
		Status: ctx.Response().StatusCode(),
		Message: "succes",
		Data: response,
	})
}