// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { environment } from '../../environments/environment';

// export type AuthResponse = {
//   access_token: string;
//   expires_in: number;
//   token_type: string;
// };

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthenticateService {

//   constructor(
//     private http: HttpClient
//   ) { }

//   public async authenticate() {
//     const url = 'https://id.twitch.tv/oauth2/token';
//     const body = new URLSearchParams();
//     body.set('client_id', environment.clientId);
//     body.set('client_secret', environment.clientSecret);
//     body.set('grant_type', 'client_credentials');

//     return await this.http.post<AuthResponse>(url, body.toString(), {
//       headers: {
//         'Content-Type': 'application/x-www-form-urlencoded',
//       }
//     }).subscribe((response: AuthResponse) => {
//       this.storeToken(response.access_token);
//     }, error => {
//       console.error('Authentication error: ', error);
//     });
//   }

//   private storeToken(token: string) {
//     console.log('inside storeToken where accessToken is: ', token);
//     localStorage.setItem('accessToken', token);
//   }
// }
