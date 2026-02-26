import { Injectable } from '@angular/core';
import { startWith, Subject } from 'rxjs';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { io, Socket } from 'socket.io-client';

export type GameScore = {
  lakers: number;
  denver: number;
};
const initialState = {
  lakers: 0,
  denver: 0,
};

@Injectable({
  providedIn: 'root',
})
export class ScoreService {
  private API = 'http://localhost:3000';

  private abortController = new AbortController();

  private scoreSubject$ = new Subject<GameScore>();
  public scores$ = this.scoreSubject$
    .asObservable()
    .pipe(startWith(initialState));

  private getFeed(): void {
    const token = localStorage.getItem('hw_token');

    fetchEventSource(`${this.API}/events`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal: this.abortController.signal,

      onmessage: (event) => {
        const { scores } = JSON.parse(event.data);
        this.scoreSubject$.next(scores);
      },

      onerror: (err) => {
        console.error('😭 SSE error', err);
        throw err; // trigger auto-reconnect
      },
    });
  }

  public start(): void {
    this.getFeed();
  }

  public stop(): void {
    this.abortController.abort();
    this.abortController = new AbortController();

    this.scoreSubject$.next(initialState);
  }

  // Socket.IO Service
  private socket!: Socket;

  public startSocket(): void {
    const token = localStorage.getItem('hw_token');

    this.socket = io(this.API, {
      // if backend use handshake.auth to receiving token
      // auth: {
      //   token: `Bearer ${token}`,
      // },
      
      // if backend use handshake.headers to receiving token 
      extraHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    this.socket.on('connect', () => {
      console.log('✅ Connected to WebSocket');
    });

    this.socket.on('score-update', (data) => {
      this.scoreSubject$.next(data.scores);
    });

    this.socket.on('connect_error', (err) => {
      console.error('❌ WS Error:', err.message);
    });
  }

  public stopSocket(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.scoreSubject$.next(initialState);
    }
  }
}
