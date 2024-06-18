import { fromFetch } from 'rxjs/fetch';
import {catchError, map, switchMap} from 'rxjs/operators';
import {of} from "rxjs";

const API_BASE_URL = 'http://localhost:4000';

export function fetchSurveys() {
  return fromFetch(`${API_BASE_URL}/surveys`).pipe(
    switchMap(response => {
      if (!response.ok) {
        return of({ error: 'Network response was not ok' });
      }
      return response.json();
    }),
    catchError(error => {
      console.error('Failed to fetch surveys', error);
      return of({ error: 'Failed to fetch surveys' });
    })
  );
}

export function createSurvey(title: string, questions: string[]) {
  return fromFetch(`${API_BASE_URL}/surveys`, {
    method: 'POST',
    body: JSON.stringify({ title, questions }),
    headers: { 'Content-Type': 'application/json' },
  }).pipe(map(response => response.json()));
}

export function getSurveyStatus(surveyId: number) {
  return fromFetch(`${API_BASE_URL}/surveys/${surveyId}/status`).pipe(
    map(response => response.json())
  );
}

export function deleteSurvey(surveyId: number) {
  return fromFetch(`${API_BASE_URL}/surveys/${surveyId}`, {
    method: 'DELETE',
  }).pipe(map(response => response.json()));
}
