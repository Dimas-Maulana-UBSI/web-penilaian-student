package controller

import "github.com/gofiber/fiber/v2"

type WebHookController interface {
	HandlePush(ctx *fiber.Ctx)error
}