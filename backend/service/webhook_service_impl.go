package service

import (
	"context"
	"database/sql"
	"strings"
	"time"
	"web_penilaian_student/model/domain"
	"web_penilaian_student/model/web"
	"web_penilaian_student/repository"
)

type WebHookServiceImpl struct {
	WebHookRepository repository.AssignmentsRepository
	DB *sql.DB
}

func NewWebHookService(repository repository.AssignmentsRepository,db *sql.DB)WebHookService{
    return &WebHookServiceImpl{
        WebHookRepository: repository,
        DB: db,
    }
}

func (service *WebHookServiceImpl) HandlePush(ctx context.Context, request web.Repository) error {
    tx, err := service.DB.Begin()
    if err != nil {
        return err
    }
    defer tx.Rollback()
    repoName := request.Repository.Name

    assignment, username := ParseRepoName(repoName, request.Pusher.Name)

    dataAssignments, err := service.WebHookRepository.FindByRepo(ctx, tx, repoName)

    if err == sql.ErrNoRows {
        data := domain.Assignments{
            Repository_name:  repoName,
            Assignments_name: assignment,
            Url:              request.Repository.Url,
            Name:             username,
            Email:            request.Pusher.Email,
            Commit:           1,
            Nilai:            0,
            Comment:          "",
            Status: "pending",
            SubmittedAt: time.Now(),
        }

        if err := service.WebHookRepository.StoreData(ctx, tx, data); err != nil {
            return err
        }

    } else if err == nil {

        dataAssignments.Commit += 1
        dataAssignments.Url = request.Repository.Url
        dataAssignments.Name = username
        dataAssignments.Email = request.Pusher.Email
        dataAssignments.SubmittedAt = time.Now()

        _, err := service.WebHookRepository.Update(ctx, tx, dataAssignments.Repository_name, dataAssignments)
        if err != nil {
            return err
        }

    } else {
        return err
    }

    return tx.Commit()
}


func ParseRepoName(repo string, username string) (string, string) {
    repo = strings.ToLower(repo)
    username = strings.ToLower(username)
    username = strings.ReplaceAll(username, " ", "-") 

    parts := strings.Split(repo, "-")
    for i := 0; i < len(parts); i++ {
        candidate := strings.Join(parts[i:], "-")
        if strings.HasPrefix(candidate, username) {
            assignment := strings.Join(parts[:i], "-")
            student := strings.Join(parts[i:], "-")
            return assignment, student
        }
    }

    return repo, ""
}
