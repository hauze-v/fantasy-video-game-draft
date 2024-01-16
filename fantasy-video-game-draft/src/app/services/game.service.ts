import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GameService {

  private gameUrl = 'https://7el7deymsb.execute-api.us-east-2.amazonaws.com/production/v4/games';
  // private accessToken: string | null = localStorage.getItem('accessToken');
  private clientId: string | null = environment.clientId;
  private headers: HttpHeaders = new HttpHeaders();

  constructor(
    private http: HttpClient
  ) {

    this.headers = this.headers.set('Authorization', 'Bearer j9qkog5bpi9i1emzl897iah004n94p');

    if (this.clientId) {
      this.headers = this.headers.set('Client-ID', this.clientId);
      console.log('clientId is: ', this.clientId);
    }

    this.headers = this.headers.set('Accept', "/",);
    this.headers = this.headers.set('Content-Type', 'text/plain');
  }

  public getGameId(gameName: string): Observable<Object> {
    const requestBody = `fields name,first_release_date,cover,screenshots,status,url; search "${gameName}";`;
    const options = { headers: this.headers };

    return this.http.post(this.gameUrl, requestBody, options)
  }

}
