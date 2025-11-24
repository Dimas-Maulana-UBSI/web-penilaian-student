package web

type Repository struct {
    Repository RepositoryInfo `json:"repository"`
    Pusher     Pusher         `json:"pusher"`
}

type RepositoryInfo struct {
    Name string `json:"name"`
    Url  string `json:"html_url"`
}
