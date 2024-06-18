import { fromFetch } from 'rxjs/fetch';
import { map, catchError, switchMap } from 'rxjs/operators';
import {of} from "rxjs";

const API_BASE_URL = 'http://localhost:4000';

export function fetchTasks() {
  return fromFetch(`${API_BASE_URL}/tasks`).pipe(
    switchMap(response => {
      if (!response.ok) {
        return of({ error: 'Network response was not ok' });
      }
      return response.json();
    }),
    catchError(error => {
      console.error('Failed to fetch tasks', error);
      return of({ error: 'Failed to fetch tasks' });
    })
  );
}

export function createTask(description: string, duration: number) {
  return fromFetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    body: JSON.stringify({ description, duration }),
    headers: { 'Content-Type': 'application/json' },
  }).pipe(map(response => response.json()));
}

export function getTaskStatus(taskId: number) {
  return fromFetch(`${API_BASE_URL}/tasks/${taskId}`).pipe(
    map(response => response.json())
  );
}

export function updateTaskStatus(taskId: number, status: string) {
  return fromFetch(`${API_BASE_URL}/tasks/${taskId}/status`, {
    method: 'POST',
    body: JSON.stringify({ status }),
    headers: { 'Content-Type': 'application/json' },
  }).pipe(map(response => response.json()));
}

export function deleteTask(taskId: number) {
  return fromFetch(`${API_BASE_URL}/tasks/${taskId}`, {
    method: 'DELETE',
  }).pipe(map(response => response.json()));
}

export function assignTask(taskId: number, userId: string) {
  return fromFetch(`${API_BASE_URL}/tasks/${taskId}/assign`, {
    method: 'POST',
    body: JSON.stringify({ assignedTo: userId }),
    headers: { 'Content-Type': 'application/json' },
  }).pipe(map(response => response.json()));
}

export function findExecutor(taskId: number) {
  return fromFetch(`${API_BASE_URL}/tasks/${taskId}/executor`).pipe(
    map(response => response.json())
  );
}
