package repository

import (
	"context"
	"database/sql"
	"fmt"
	"web_penilaian_student/model/domain"
)

type AuthRepositoryImpl struct {
}

func NewAuthRepository()AuthRepository{
	return &AuthRepositoryImpl{}
}

func (repository *AuthRepositoryImpl) GetUser(ctx context.Context,tx *sql.Tx, data domain.User)(domain.User,error){
	sql := "select id,name,email,password,role from users where email = ? and password = ?"
	row,err := tx.QueryContext(ctx,sql,data.Email,data.Password)
	if err != nil {
		return domain.User{},err
	}
	defer row.Close()
	user := domain.User{}
	fmt.Println(row)
	if !row.Next() {
        return domain.User{}, fmt.Errorf("invalid email or password")
    }
	 if err := row.Scan(
        &user.ID,
        &user.Name,
        &user.Email,
        &user.Password,
        &user.Role,
    ); err != nil {
        return domain.User{}, err
    }

    return user, nil
	
}