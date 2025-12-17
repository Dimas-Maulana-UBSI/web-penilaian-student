import type { Requirement } from "./requirement";
export type Assignment = {
  repository_name: string;
  assignments_name: string;
  url: string;
  name: string;
  email: string;
  commit: number;
  nilai: number;
  comment: string;
  submitted_at: Date;
  status: 'pending' | 'reviewing' | 'graded';
  requirements?: Requirement[];
};


export type AssignmentResponse = {
    Repository_name: string;
    Assignments_name: string;
    Url: string;
    Email: string;
    Name: string;
    Commit: number;
    Nilai: number;
    Comment: string;
    Status: string;
    SubmittedAt: string;
    Requirement : Requirement[]
}