// import { Injectable } from '@angular/core';
// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { environment } from '../../environments/environment';
// import { HttpHeaders } from '@angular/common/http';

// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const accessToken: string | null = localStorage.getItem('accessToken');
//     const clientId: string | null = environment.clientId;

//     let headers: HttpHeaders = new HttpHeaders();

//     if (accessToken) {
//       headers = headers.set('Authorization', `Bearer ${accessToken}`);
//     }

//     if (clientId) {
//       headers = headers.set('Client-ID', clientId);
//     }

//     const authReq = req.clone({ headers });

//     return next.handle(authReq);
//   }
// }
