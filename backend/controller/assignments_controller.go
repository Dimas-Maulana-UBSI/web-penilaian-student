package controller

import "github.com/gofiber/fiber/v2"

type AssignmentsController interface {
	GetAll(ctx *fiber.Ctx)error
	Update(ctx *fiber.Ctx)error
}