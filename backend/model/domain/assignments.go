package domain

import "time"

type Assignments struct {
    Repository_name  string
    Assignments_name string
    Url              string
    Name             string
    Email            string
    Commit           int
    Nilai            int
    Comment          string
    Status           string    
    SubmittedAt      time.Time
    Requirements     interface{}
}
