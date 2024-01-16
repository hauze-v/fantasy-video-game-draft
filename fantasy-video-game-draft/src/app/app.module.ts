import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Import HttpClientModule
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { PlayerRowComponent } from './player-row/player-row.component';
import { GameComponent } from './game/game.component';
import { RouterModule } from '@angular/router';
// import { AuthInterceptor } from './services/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent, 
    PlayerRowComponent,
    GameComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CommonModule, 
    RouterModule, 
  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
