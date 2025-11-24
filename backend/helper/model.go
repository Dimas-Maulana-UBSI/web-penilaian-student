package helper

import (
	"web_penilaian_student/model/domain"
	"web_penilaian_student/model/web"
)

func ToLoginResponse(data domain.User)web.LoginResponse{
	return web.LoginResponse{
		ID: data.ID,
		Name: data.Name,
		Email: data.Email,
		Role: data.Role,
	}
}

func ToAssignmentsResponse(data domain.Assignments)web.AssignmentsResponse{
	return web.AssignmentsResponse{
		Name: data.Name,
		Email: data.Email,
		Repository_name: data.Repository_name,
		Comment: data.Comment,
		Url: data.Url,
		Commit: data.Commit,
		Assignments_name: data.Assignments_name,
		Nilai: data.Nilai,
		Status: data.Status,
		SubmittedAt: data.SubmittedAt,
	}
}