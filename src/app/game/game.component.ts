import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Game, Status } from '../player-row/player-row.component';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit, OnChanges {
  @Input() public imageUrl: string | undefined;
  @Input() public releaseDateDisplay: string | undefined;
  @Input() public releaseDateRaw: number | undefined;
  @Input() public score: number | undefined;
  public status: string = Status.unknown;

  constructor(
  ) { }

  public ngOnInit() {
    this.setGameStatus();
  };

  public ngOnChanges(changes: SimpleChanges) {
  }

  private setGameStatus(): void {
    if (this.releaseDateRaw && this.releaseDateDisplay) {
      console.log("this.releaseDateRaw", this.releaseDateRaw);
      console.log("this.releaseDateDisplay", this.releaseDateDisplay);

      let releaseDate: number = this.releaseDateRaw + 86400;

      // If the release date is greater than 2026, set the status to bad/delayed
      // 2025 in Unix time is 1735689600
      if (releaseDate > 1767225600) {
        this.status = Status.bad; // The game was delayed
        this.releaseDateDisplay = 'Delayed';
      }

      // If the game has released, set the status based on the game's score
      // if (releaseDate < Date.now() / 1000) {
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
    } else {
      this.status = Status.unknown;
    }
  };
}
