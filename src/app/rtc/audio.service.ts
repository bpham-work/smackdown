import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';
import { SentimentResult } from '../models/sentimentresult';

@Injectable()
export class AudioService {
    constructor(private http: Http) {}

    public submit(audioBlob: Blob): Observable<Response> {
        let body = new FormData();
        body.append('file', audioBlob);
        return this.http.post("http://localhost:8000/api/submit", body);
    }
}