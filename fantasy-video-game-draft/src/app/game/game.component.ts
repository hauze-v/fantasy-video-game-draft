import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit {
 @Input() public game: string = "";

  ngOnInit() {
    console.log('game', this.game)
  }
}
