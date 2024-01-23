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
  @Input() public releaseDate: number | undefined;
  public status: string = Status.unknown;

  public score: number | undefined;

  constructor(
  ) { }

  public ngOnInit() {
    this.setGameStatusColor();
  };

  public ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);

    if (changes['releaseDate' || 'score']) {
      this.setGameStatusColor();
    }
  }

  private setGameStatusColor(): void {
    console.log('inside setGameStatusColor');


    // If the releaseDate is greater than 2024 set the status to red. 
    // Convert the unix timestamp to a date object and compare the year to 2024.
    if (this.releaseDate && this.releaseDate > 1735689600) {
      this.status = Status.bad;
    };
  };
}
