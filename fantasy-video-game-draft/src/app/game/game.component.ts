import { Component, Input, OnInit } from '@angular/core';
import { GameService } from '../services/game.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
  @Input() public game: string = "";

  constructor(
    private gameService: GameService
  ) { }

  public async ngOnInit() {
    let result = await this.gameService.getGameId(this.game).toPromise();
    console.log('result is: ', result);
  }
}
