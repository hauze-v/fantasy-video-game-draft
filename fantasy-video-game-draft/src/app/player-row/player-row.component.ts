import { Component, Input, OnInit } from '@angular/core';
import { GameComponent } from "../game/game.component";
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-player-row',
    standalone: true,
    templateUrl: './player-row.component.html',
    styleUrl: './player-row.component.scss',
    imports: [GameComponent, CommonModule]
})
export class PlayerRowComponent implements OnInit {
  @Input() public draftedGames: string[] = [ 'Mario Kart', 'Super Smash Bros', 'Super Mario Bros', 'Legend of Zelda', 'Final Fantasy', 'Zelda',
                                             'COD', 'Halo', 'Madden', 'NBA 2K', 'FIFA', 'NHL' ];

  @Input() public playerImgSrc: string = "";

  ngOnInit() {
    console.log(this.draftedGames);
  }
}
