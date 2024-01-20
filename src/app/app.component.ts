import { Component, OnInit } from '@angular/core';
// import { AuthenticateService } from './services/authenticate.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit{
  public title = 'fantasy-video-game-draft';

  constructor(
  ) {
  }

  public async ngOnInit() {
  }
}
