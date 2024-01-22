import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

// Define enum for borderColor hex values
enum StatusColor {
  'yellow' = '#eed202',
  'green' = '#5cb85c',
  'orange' = '#ff6700',
  'red' = '#ff0e0e',
  'gray' = '#464646'
};

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss'
})
export class GameComponent implements OnInit, OnChanges {
  @Input() public name: string = "";
  @Input() public imageUrl: string | undefined;
  @Input() public releaseDate: number | undefined;
  public borderColorRule: string = '4px solid ' + StatusColor.gray;
  public backgroundColorRule: string = StatusColor.gray;

  public score: number | undefined;
  private id: number | null = null;

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
    console.log('this.releaseDate', this.releaseDate);


    // If the releaseDate is greater than 2024 set the status to red. 
    // Convert the unix timestamp to a date object and compare the year to 2024.
    if (this.releaseDate && this.releaseDate > 1735689600) {
      this.borderColorRule = '4px solid ' + StatusColor.red;
      this.backgroundColorRule = StatusColor.red;
    };
  };
}
