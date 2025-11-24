package service

import (
	"context"
	"database/sql"
	"web_penilaian_student/helper"
	"web_penilaian_student/model/domain"
	"web_penilaian_student/model/web"
	"web_penilaian_student/repository"
)

type AuthServiceImpl struct {
	DB *sql.DB
	AuthRepository repository.AuthRepository
}

func NewAuthService(repository repository.AuthRepository,db *sql.DB)AuthService{
	return &AuthServiceImpl{
		DB: db,
		AuthRepository: repository,
	}
}

func(service *AuthServiceImpl)Login(ctx context.Context,request web.LoginRequest)(web.LoginResponse,error){
	tx,err := service.DB.Begin()
	if err != nil {
		return web.LoginResponse{},err
	}
	data := domain.User{
		ID : 0,
		Email : request.Email,
		Password: request.Password,
		Role: "",
	}
	response,err := service.AuthRepository.GetUser(ctx,tx,data)
	if err != nil {
		return web.LoginResponse{},err
	}
	return helper.ToLoginResponse(response),nil
}