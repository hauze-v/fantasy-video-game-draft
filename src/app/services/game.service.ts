import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export type GameResponse = {
  id: number;
  first_release_date?: number | undefined;
  cover?: number | undefined;
  status?: string | undefined;
};

export type CoverResponse = {
  id: number;
  image_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private proxyUrl = 'https://ii79ku75d9.execute-api.us-east-2.amazonaws.com/production';
  private headers: HttpHeaders = new HttpHeaders();

  constructor(
    private http: HttpClient
  ) {
    this.headers = this.headers.append('x-api-key', environment.awsApiKey);
  }

  public getGamesById(gameIds: number[]): Observable<GameResponse[]> {
    const requestBody = `fields name,cover,first_release_date,status; 
                         where id = (${gameIds.join(',')});
                         limit 15;`;

    const options = { headers: this.headers };

    return this.http.post<GameResponse[]>(`${this.proxyUrl}/v4/games`, requestBody, options);
  }

  public getCoverImageIds(coverIds: number[]): Observable<CoverResponse[]> {
    const requestBody = `fields image_id; 
                         where id = (${coverIds.join(',')});
                         limit 15;`;

    const options = { headers: this.headers };

    return this.http.post<CoverResponse[]>(`${this.proxyUrl}/v4/covers`, requestBody, options);
  }

}
