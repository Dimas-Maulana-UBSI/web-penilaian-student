package repository

import(
	"context"
	"database/sql"
	"web_penilaian_student/model/domain"
)

type AuthRepository interface {
	GetUser(ctx context.Context,tx *sql.Tx,data domain.User)(domain.User,error)
}