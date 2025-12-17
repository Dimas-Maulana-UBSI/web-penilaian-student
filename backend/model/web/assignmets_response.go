package web

import "time"

type AssignmentsResponse struct {
	Repository_name  string
	Assignments_name string
	Url              string
	Email            string
	Name             string
	Commit           int
	Nilai            int
	Comment          string
	Status           string
	SubmittedAt      time.Time
	Requirements     []Requirement
}