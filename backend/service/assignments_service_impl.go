package service

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"web_penilaian_student/helper"
	"web_penilaian_student/model/web"
	"web_penilaian_student/repository"
)

type AssignmentsServiceImpl struct {
	AssignmentsRepository repository.AssignmentsRepository
	DB                    *sql.DB
}

func NewAssignmentsService(assignmentsRepo repository.AssignmentsRepository, db *sql.DB) AssignmentsService {
	return &AssignmentsServiceImpl{
		AssignmentsRepository: assignmentsRepo,
		DB:                    db,
	}
}

func (service *AssignmentsServiceImpl) GetAll(ctx context.Context) ([]web.AssignmentsResponse, error) {
	tx, err := service.DB.Begin()
	if err != nil {
		return nil, err
	}

	defer func() {
		if err != nil {
			tx.Rollback()
		} else {
			tx.Commit()
		}
	}()
	response, err := service.AssignmentsRepository.GetAll(ctx, tx)
	if err != nil {
		return nil, err
	}
	assingments := []web.AssignmentsResponse{}
	for _,assingment := range response{
		assingments = append(assingments,helper.ToAssignmentsResponse(assingment))
	}
	return assingments,nil
}

func (service *AssignmentsServiceImpl) Update(ctx context.Context, request web.AssignmentsRequest,repo string) (web.AssignmentsResponse, error) {
	tx, err := service.DB.Begin()
	if err != nil {
		return web.AssignmentsResponse{}, err
	}

	defer func() {
		if err != nil {
			tx.Rollback()
		} else {
			tx.Commit()
		}
	}()
	jsonData, _ := json.MarshalIndent(request, "", "  ")
	fmt.Println("REQUEST BODY:", string(jsonData))

	response, err := service.AssignmentsRepository.FindByRepo(ctx, tx, repo)
	if err != nil {
		return web.AssignmentsResponse{}, err
	}
	response.Assignments_name = request.Assignments_name
	response.Url = request.Url
	response.Name = request.Name
	response.Email = request.Email
	response.Commit = request.Commit
	response.Nilai = request.Nilai
	response.Comment = request.Comment
	response.Status = request.Status
	response.Requirements = request.Requirements

	updated, err := service.AssignmentsRepository.Update(ctx, tx, request.Repository_name, response)
	if err != nil {
		return web.AssignmentsResponse{}, err
	}

	return helper.ToAssignmentsResponse(updated), nil
}

func (service *AssignmentsServiceImpl) FindByName(ctx context.Context, name string) ([]web.AssignmentsResponse, error) {
	tx, err := service.DB.Begin()
	if err != nil {
		return nil, err
	}
	defer func() {
		if err != nil {
			tx.Rollback()
		} else {
			tx.Commit()
		}
	}()

	data, err := service.AssignmentsRepository.FindByName(ctx, tx, name)
	if err != nil {
		return nil, err
	}

	var response []web.AssignmentsResponse
	for _, d := range data {
		response = append(response, helper.ToAssignmentsResponse(d))
	}

	return response, nil
}

