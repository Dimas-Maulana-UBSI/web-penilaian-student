package service

import (
	"context"
	"web_penilaian_student/model/web"
)

type AuthService interface {
	Login(ctx context.Context,request web.LoginRequest )(web.LoginResponse,error)
}