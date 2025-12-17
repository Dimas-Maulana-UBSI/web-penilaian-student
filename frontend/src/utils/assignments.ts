import type { Assignment } from "../types/assignment";

export function sortAssignmentsByDate(
  assignments: Assignment[],
  order: "asc" | "desc" = "asc"
): Assignment[] {
  return [...assignments].sort((a, b) => {
    const diff =
      new Date(a.submitted_at).getTime() - new Date(b.submitted_at).getTime();
    return order === "asc" ? diff : -diff;
  });
}

export function getEarliestAssignment(assignments: Assignment[]): Assignment | null {
  if (!assignments || assignments.length === 0) return null;
  return sortAssignmentsByDate(assignments, "asc")[0] ?? null;
}

export function getLatestAssignment(assignments: Assignment[]): Assignment | null {
  if (!assignments || assignments.length === 0) return null;
  return sortAssignmentsByDate(assignments, "desc")[0] ?? null;
}

export function calculateAverageGrade(assignments: { nilai: number }[]) {
    if (assignments.length === 0) return 0;

    const sum = assignments.reduce((t, a) => t + a.nilai, 0);
    return sum / assignments.length;
}

export function distributionAssignment(assignments: Assignment[]) {
  const result = {
    A: 0,
    B: 0,
    C: 0,
    D: 0,
  };

  assignments.forEach((a) => {
    const score = a.nilai;

    if (score >= 90) result.A++;
    else if (score >= 80) result.B++;
    else if (score >= 70) result.C++;
    else result.D++;
  });

  return result;
}

export function getMinMaxGrade(assignments: { nilai: number }[]) {
  if (!assignments || assignments.length === 0)
    return { min: 0, max: 0 };

  const nilaiList = assignments.map(a => a.nilai);

  return {
    min: Math.min(...nilaiList),
    max: Math.max(...nilaiList),
  };
}
