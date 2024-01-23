import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Status } from '../player-row/player-row.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit, OnChanges {
  @Input() public name: string = "";
  @Input() public imageUrl: string | undefined;
  @Input() public releaseDateDisplay: string | undefined;
  @Input() public releaseDateRaw: number | undefined;
  public status: string = Status.unknown;

  public score: number | undefined;

  constructor(
  ) { }

  public ngOnInit() {
    this.setGameStatus();
  };

  public ngOnChanges(changes: SimpleChanges) {
    // console.log('changes', changes);

    // if (changes['releaseDate' || 'score']) {
    //   this.setGameStatusColor();
    // }
  }

  private setGameStatus(): void {
    console.log('inside setGameStatus');

    if (this.releaseDateRaw && this.releaseDateDisplay) {

      let releaseDate: number = this.releaseDateRaw + 86400;
      
      // TODO: Implement a counter to check if it's the third game that's been delayed
      // If the release date is greater than 2024, set the status to bad/delayed
      if (releaseDate > 1735689600) {
        this.status = Status.bad; // The game was delayed
        this.releaseDateDisplay = 'Delayed';
      }

      // If the game has released, set the status based on the game's score
      if (releaseDate < Date.now() / 1000) {
        if (this.score) {
          if (this.score >= 80) {
            this.status = Status.great;
          } else if (this.score >= 70) {
            this.status = Status.good;
          } else if (this.score >= 60) {
            this.status = Status.average;
          } else {
            this.status = Status.bad;
          }
        }
      }

    } else {
      this.status = Status.unknown;
    }
  };
}
