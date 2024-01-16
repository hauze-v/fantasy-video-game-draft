import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-player-row',
    templateUrl: './player-row.component.html',
    styleUrl: './player-row.component.scss',
})
export class PlayerRowComponent implements OnInit {
  @Input() public draftedGames: string[] = [ 'Mario Kart', 'Super Smash Bros', 'Super Mario Bros', 'Legend of Zelda', 'Final Fantasy', 'Zelda',
                                             'COD', 'Halo', 'Madden', 'NBA 2K', 'FIFA', 'NHL' ];

  @Input() public playerImgSrc: string = "";

  ngOnInit() {
    
  }
}
