import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { SentimentResult } from '../models/sentimentresult';

@Injectable()
export class AudioService {
    constructor(private http: Http) {}

    public submit(audioBlob: Blob): Observable<any> {
        return this.http.post("api/submit", {audioBlob})
            .map(res => SentimentResult.from(res));
    }
}