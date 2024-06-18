export interface Task {
  id: number;
  description: string;
  duration: number;
  assignedTo?: string;
  status: string;
}