package web

type Requirement struct {
	Name    string `json:"name"`
	Checked bool   `json:"checked"`
}


type AssignmentsRequest struct {
	Repository_name string
	Assignments_name string
	Url string
	Name string
	Email string
	Commit int
	Nilai int
	Comment string
	Status string
	Requirements     []Requirement
}