import { fromFetch } from 'rxjs/fetch';
import { map } from 'rxjs/operators';

const API_BASE_URL = 'http://localhost:4000';

export function sendCommand(command: string) {
  return fromFetch(`${API_BASE_URL}/bot/command`, {
    method: 'POST',
    body: JSON.stringify({ command }),
    headers: { 'Content-Type': 'application/json' },
  }).pipe(map(response => response.json()));
}

export function sendMessage(channelId: string, message: string) {
  return fromFetch(`${API_BASE_URL}/bot/send-message`, {
    method: 'POST',
    body: JSON.stringify({ channelId, message }),
    headers: { 'Content-Type': 'application/json' },
  }).pipe(map(response => response.json()));
}
