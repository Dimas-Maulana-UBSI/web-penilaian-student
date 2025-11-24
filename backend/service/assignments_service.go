package service

import (
	"context"
	"web_penilaian_student/model/web"
)

type AssignmentsService interface {
	GetAll(ctx context.Context)([]web.AssignmentsResponse,error)
	Update(ctx context.Context,request web.AssignmentsRequest)(web.AssignmentsResponse,error)
}