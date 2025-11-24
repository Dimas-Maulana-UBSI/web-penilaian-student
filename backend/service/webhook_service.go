package service

import (
	"context"
	"web_penilaian_student/model/web"
)

type WebHookService interface {
	HandlePush(ctx context.Context,request web.Repository) error
}