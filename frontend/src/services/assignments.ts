import type { Assignment, AssignmentResponse } from '../types/assignment';
import type { WebResponse } from '../types/response';

const API_BASE_URL = 'http://127.0.0.1:3000';

function mapAssignmentResponse(data: AssignmentResponse): Assignment {
    return {
        repository_name: data.Repository_name,
        assignments_name: data.Assignments_name,
        url: data.Url,
        email: data.Email,
        name: data.Name,
        commit: data.Commit,
        nilai: data.Nilai,
        comment: data.Comment,
        status: data.Status as 'pending' | 'reviewing' | 'graded',
        submitted_at: new Date(data.SubmittedAt),
        requirements: data.Requirement ?? [] 
    };
}


export async function GetAssignments(): Promise<WebResponse<Assignment[]>> {
    try {
        const response = await fetch(`${API_BASE_URL}/assignments`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        });

        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const result: WebResponse<AssignmentResponse[]> = await response.json();
        const mappedData = result.Data.map(mapAssignmentResponse);

        return {
            Status: result.Status,
            Message: result.Message,
            Data: mappedData
        };
    } catch (error) {
        console.error('Error fetching assignments:', error);
        throw error;
    }
}

export async function UpdateAssignment(assignment: Assignment): Promise<WebResponse<Assignment>> {
    try {
        const response = await fetch(
            `${API_BASE_URL}/assignments/${assignment.repository_name}`,
            {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    Repository_name: assignment.repository_name,
                    Assignments_name: assignment.assignments_name,
                    Url: assignment.url,
                    Email: assignment.email,
                    Name: assignment.name,
                    Commit: assignment.commit,
                    Nilai: assignment.nilai,
                    Comment: assignment.comment,
                    Status: assignment.status,
                    SubmittedAt: assignment.submitted_at,
                    Requirements : assignment.requirements,
                })
            }
        );

        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const result: WebResponse<AssignmentResponse> = await response.json();

        return {
            Status: result.Status,
            Message: result.Message,
            Data: mapAssignmentResponse(result.Data)
        };
    } catch (error) {
        console.error('Error updating assignment:', error);
        throw error;
    }
}

export async function GetByName(name : string) : Promise<WebResponse<Assignment[]>>{
    console.log(name)
    try {
        const response = await fetch(`${API_BASE_URL}/assignments/name/${name}`,
            {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
            }
        )
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
        const result: WebResponse<AssignmentResponse[]> = await response.json();
        const mappedData = result.Data.map(mapAssignmentResponse);
         return {
            Status: result.Status,
            Message: result.Message,
            Data: mappedData
        };
    } catch (error) {
        console.error('Error fetching assignments:', error);
        throw error;
    

    }
}