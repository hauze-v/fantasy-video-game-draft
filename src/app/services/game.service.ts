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
  private openCriticUrl = 'https://opencritic-api.p.rapidapi.com/game';
  private igdbHeaders: HttpHeaders = new HttpHeaders();
  private openCriticHeaders: HttpHeaders = new HttpHeaders();

  constructor(
    private http: HttpClient
  ) {
    

    this.igdbHeaders = this.igdbHeaders.append('x-api-key', environment.awsApiKey);
    // this.openCriticHeaders = this.openCriticHeaders.append('X-RapidAPI-Key', environment.rapidApiKey);
    this.openCriticHeaders = this.openCriticHeaders.append('X-RapidAPI-Host', 'opencritic-api.p.rapidapi.com');
  }

  public getIGDBGameDataById(gameIds: number[]): Observable<GameResponse[]> {
    const requestBody = `fields name,cover,first_release_date,status; 
                         where id = (${gameIds.join(',')});
                         limit 15;`;

    const options = { headers: this.igdbHeaders };

    return this.http.post<GameResponse[]>(`${this.proxyUrl}/v4/games`, requestBody, options);
  }

  public getCoverImageIds(coverIds: number[]): Observable<CoverResponse[]> {
    const requestBody = `fields image_id; 
                         where id = (${coverIds.join(',')});
                         limit 15;`;

    const options = { headers: this.igdbHeaders };

    return this.http.post<CoverResponse[]>(`${this.proxyUrl}/v4/covers`, requestBody, options);
  }

  public getOpenCriticGameId(gameName: string): Observable<number> {
    const options = { headers: this.openCriticHeaders, params: { criteria: gameName }};

    return this.http.get<number>(`${this.openCriticUrl}/search`, options);
  };

  public getOpenCriticScore(gameId: number) {
    console.log('getting open critic score for gameId', gameId);
    const options = { headers: this.openCriticHeaders };

    // const gameResponse = this.http.get(`${this.openCriticUrl}/game/${gameId}`, options);
    // console.log('gameResponse', gameResponse);

    // return gameResponse.topCriticScore!;
    // Return an observable of the number 1 for now
    return new Observable<number>(observer => {
      observer.next(1);
      observer.complete();
    }
    );
  }

}
