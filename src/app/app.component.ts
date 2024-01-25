import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  public title = 'fantasy-video-game-draft';
  public playerScores: { [playerName: string]: number } = {};
  public standings: { [playerName: string]: number } = {};

  constructor(
  ) {
  }

  public async ngOnInit() {

  }

  public ngAfterViewInit() {
    // After the view is initialized, calculate which player is winning
    this.calculatePlayerStandings();
  }

  private calculatePlayerStandings(): void {
    
  };

  private calculateStandings(): void {
    // Create an array of player names, sorted by their scores in descending order
    const sortedPlayers = Object.keys(this.playerScores).sort((a, b) => this.playerScores[b] - this.playerScores[a]);

    // Assign standings
    sortedPlayers.forEach((playerName, index) => {
      this.standings[playerName] = index + 1; // 1 for highest score, 2 for second highest, etc.
    });

    // The standings object now has the standing for each player
  }

  /* ----------------------------- Event Handlers ----------------------------- */

  public updateStandings(playerScoreData: { playerName: string, avgScore: number }): void {
    this.playerScores[playerScoreData.playerName] = playerScoreData.avgScore;

    if (Object.keys(this.playerScores).length === 4) { // Assuming 4 players
      this.calculateStandings();
    }
  }

  
}
