package repository

import (
	"context"
	"database/sql"
	"web_penilaian_student/model/domain"
)

type AssignmentsRepository interface {
	StoreData(ctx context.Context,tx *sql.Tx,data domain.Assignments)error
	FindByRepo(ctx context.Context,tx *sql.Tx,repo string)(domain.Assignments,error)
	Update(ctx context.Context,tx *sql.Tx,repo string,data domain.Assignments)(domain.Assignments,error)
	GetAll(ctx context.Context,tx *sql.Tx)([]domain.Assignments,error)
}