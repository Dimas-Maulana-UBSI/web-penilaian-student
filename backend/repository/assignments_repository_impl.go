package repository

import (
	"context"
	"database/sql"
	"encoding/json"
	"web_penilaian_student/model/domain"
)

type AssignmentsRepositoryImpl struct {
}

func NewAssignmentsRepository() AssignmentsRepository {
	return &AssignmentsRepositoryImpl{}
}

func (repository *AssignmentsRepositoryImpl) StoreData(ctx context.Context,tx *sql.Tx,data domain.Assignments)error{
	sql := "insert into assignments(repository_name,assignments_name,url,name,email,commit,nilai,comment,submitted_at,status) values (?,?,?,?,?,?,?,?,?,?)"
	_,err := tx.ExecContext(ctx,sql,data.Repository_name,data.Assignments_name,data.Url,data.Name,data.Email,data.Commit,data.Nilai,data.Comment,data.SubmittedAt,data.Status)
	if err != nil {
		return err
	}
	return nil
}

func(repository *AssignmentsRepositoryImpl)FindByRepo(ctx context.Context,tx *sql.Tx,repo string)(domain.Assignments,error){
	query := "select repository_name, assignments_name, url, name, email, commit, nilai, comment, status, submitted_at from assignments where repository_name = ?"
	row,err := tx.QueryContext(ctx,query,repo)
	if err != nil {
		return domain.Assignments{},err
	}
	defer row.Close()
	data := domain.Assignments{}
	if !row.Next() {
    	return domain.Assignments{},sql.ErrNoRows
	}
err = row.Scan(
        &data.Repository_name,
        &data.Assignments_name,
        &data.Url,
        &data.Name,
        &data.Email,
        &data.Commit,
        &data.Nilai,
        &data.Comment,
		&data.Status,
		&data.SubmittedAt,
    )
    if err != nil {
        return domain.Assignments{}, err
    }

    return data, nil
}

func (repository *AssignmentsRepositoryImpl) Update(ctx context.Context, tx *sql.Tx, repo string, data domain.Assignments) (domain.Assignments, error) {
    // Convert Requirements to JSON
    jsonReq, err := json.Marshal(data.Requirements)
    if err != nil {
        return domain.Assignments{}, err
    }

    query := `
        UPDATE assignments SET
            assignments_name = ?,
            url = ?,
            name = ?,
            email = ?,
            commit = ?,
            nilai = ?,
            comment = ?,
            submitted_at = ?,
            status = ?,
            requirements = ?
        WHERE repository_name = ?
    `

    _, err = tx.ExecContext(ctx, query,
        data.Assignments_name,
        data.Url,
        data.Name,
        data.Email,
        data.Commit,
        data.Nilai,
        data.Comment,
        data.SubmittedAt,
        data.Status,
        jsonReq,
        repo,
    )
    if err != nil {
        return domain.Assignments{}, err
    }

    return data, nil
}

func (repository *AssignmentsRepositoryImpl) GetAll(ctx context.Context, tx *sql.Tx) ([]domain.Assignments, error) {
	query := "SELECT repository_name, assignments_name, url, name, email, commit, nilai, comment, status, submitted_at FROM assignments"

	rows, err := tx.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var result []domain.Assignments

	for rows.Next() {
		var d domain.Assignments
		if err := rows.Scan(
			&d.Repository_name, 
			&d.Assignments_name, 
			&d.Url, 
			&d.Name,
			&d.Email, 
			&d.Commit, 
			&d.Nilai, 
			&d.Comment,
			&d.Status,
			&d.SubmittedAt,
		); err != nil {
			return nil, err
		}

		result = append(result, d)
	}

	return result, rows.Err()
}

func (repository *AssignmentsRepositoryImpl) FindByName(ctx context.Context, tx *sql.Tx, name string) ([]domain.Assignments, error) {
	query := `
		SELECT repository_name, assignments_name, url, name, email, commit, nilai, comment, status, submitted_at
		FROM assignments
		WHERE name = ?
	`

	rows, err := tx.QueryContext(ctx, query, name)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var result []domain.Assignments

	for rows.Next() {
		var d domain.Assignments
		if err := rows.Scan(
			&d.Repository_name,
			&d.Assignments_name,
			&d.Url,
			&d.Name,
			&d.Email,
			&d.Commit,
			&d.Nilai,
			&d.Comment,
			&d.Status,
			&d.SubmittedAt,
		); err != nil {
			return nil, err
		}
		result = append(result, d)
	}

	if len(result) == 0 {
		return nil, sql.ErrNoRows
	}

	return result, nil
}
