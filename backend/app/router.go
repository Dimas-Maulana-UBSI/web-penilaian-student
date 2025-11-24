package app

import (
	"github.com/gofiber/fiber/v2"
)

func NewRouter() *fiber.App{
	db := NewDB()
	app := fiber.New(fiber.Config{

	})
	 app.Use(func(c *fiber.Ctx) error {
        c.Set("Access-Control-Allow-Origin", "http://localhost:5173")
        c.Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        c.Set("Access-Control-Allow-Headers", "Origin, Content-Type, Accept")

        if c.Method() == "OPTIONS" {
            return c.SendStatus(204)
        }

        return c.Next()
    })

	NewAuthRouter(app,db)
    NewWebHookRouter(app,db)
    NewAssignmentsRouter(app,db)


	return app
}