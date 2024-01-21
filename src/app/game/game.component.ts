import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { GameService } from '../services/game.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit, OnChanges {
  @Input() public name: string = "";
  @Input() public imageUrl: string | undefined;
  @Input() public releaseDate: number | undefined;
  private id: number | null = null;

  constructor(
  ) { }

  public ngOnInit() {
  };

  public ngOnChanges(changes: SimpleChanges) {
    // if (changes['imageUrl']) {
    //   console.log('imageUrl changed', this.imageUrl);
    // }
  }
}
