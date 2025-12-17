package service

import (
	"context"
	"web_penilaian_student/model/web"
)

type AssignmentsService interface {
	GetAll(ctx context.Context) ([]web.AssignmentsResponse, error)
	Update(ctx context.Context, request web.AssignmentsRequest, repo string) (web.AssignmentsResponse, error)
	FindByName(ctx context.Context, name string) ([]web.AssignmentsResponse, error)
}
