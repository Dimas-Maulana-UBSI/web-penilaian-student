// hooks/useAssignments.ts
import { useQuery } from '@tanstack/react-query';
import { GetAssignments, GetByName } from '../services/assignments';
import type { Assignment } from '../types/assignment';

export const assignmentKeys = {
  all: ['assignments'] as const,
  lists: () => [...assignmentKeys.all, 'list'] as const,
  list: (filters: string) => [...assignmentKeys.lists(), { filters }] as const,
  details: () => [...assignmentKeys.all, 'detail'] as const,
  detail: (id: string) => [...assignmentKeys.details(), id] as const,
  byName: (name: string) => [...assignmentKeys.all, 'name', name] as const,
};

export function useAssignments() {
  return useQuery({
    queryKey: assignmentKeys.lists(),
    queryFn: async () => {
      const response = await GetAssignments();
      if (response.Status !== 200) {
        throw new Error(response.Message);
      }
      return response.Data as Assignment[];
    },
  });
}

export function useAssignmentsByName(name: string) {
  console.log(name);
  return useQuery({
    queryKey: assignmentKeys.byName(name),
    queryFn: async () => {
      const response = await GetByName(name);
      if (response.Status !== 200) {
        throw new Error(response.Message);
      }
      return response.Data as Assignment[];
    },
    enabled: !!name && name.length > 0,
  });
}
