import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CoverResponse, GameResponse, GameService } from '../services/game.service';

export type Game = {
  igdbId: number;
  openCriticId?: number;
  releaseDateRaw?: number | undefined;
  releaseDateDisplay?: string;
  cover: number;
  imageUrl?: string | undefined;
  status?: string | undefined;
  openCriticScore?: number;
}

export enum Status {
  'good' = '238, 210, 2',
  'great' = '92, 184, 92',
  'average' = '255, 103, 0',
  'bad' = '255, 14, 14',
  'unknown' = '91, 92, 98'
};

@Component({
  selector: 'app-player-row',
  templateUrl: './player-row.component.html',
  styleUrl: './player-row.component.scss',
})
export class PlayerRowComponent implements OnInit {
  @Input() public playerImgSrc: string = "";
  @Input() public playerName: string = '';
  @Input() public playerColor: string = '';
  @Input() public playerStanding: number | null = null;
  @Output() playerScoreUpdated = new EventEmitter<{ playerName: string, avgScore: number }>();
  public draftedGames: Game[] = [];
  public playerAvgScore: number | null = 83;
  public playerTotalScore: number = 0;
  public playerStatus: string = Status.unknown;
  private readonly GAMES_TO_COUNT = 10;
  private readonly END_OF_2025 = 1767225600; // Unix timestamp for 12/31/2025 23:59:59

  constructor(
    private gameService: GameService,
  ) { }

  public ngOnInit() {
    this.getDraftedGames();
    this.getIGDBData();
    // TODO: Maybe scrape someday?
    // this.getOpenCriticData();
    this.processScores();
  }

  private getDraftedGames(): void {
    switch (this.playerName) {
      case 'Hauze':
        this.draftedGames = [
          { igdbId: 52189, cover: 0 },
          { igdbId: 325594, cover: 0, openCriticScore: 90 },
          { igdbId: 302704, cover: 0 },
          { igdbId: 318381, cover: 0 },
          { igdbId: 135994, cover: 0, openCriticScore: 82 },
          { igdbId: 228527, cover: 0 },
          { igdbId: 214492, cover: 0, openCriticScore: 81 },
          { igdbId: 313762, cover: 0, openCriticScore: 77 },
          { igdbId: 313595, cover: 0, openCriticScore: 84 },
          { igdbId: 314931, cover: 0 },
          { igdbId: 303808, cover: 0, openCriticScore: 81 },
          { igdbId: 314238, cover: 0, openCriticScore: 73 },
        ];
        break;
      case 'John':
        this.draftedGames = [
          { igdbId: 305006, cover: 0, openCriticScore: 82 },
          { igdbId: 279661, cover: 0, openCriticScore: 90 },
          { igdbId: 250634, cover: 0 },
          { igdbId: 141542, cover: 0 },
          { igdbId: 288327, cover: 0 },
          { igdbId: 279655, cover: 0 },
          { igdbId: 320140, cover: 0 },
          { igdbId: 279051, cover: 0, openCriticScore: 82 },
          { igdbId: 279633, cover: 0 },
          { igdbId: 266155, cover: 0 },
          { igdbId: 267648, cover: 0 },
          { igdbId: 314252, cover: 0 }
        ];
        break;
      case 'Nick':
        this.draftedGames = [
          { igdbId: 115289, cover: 0 },
          { igdbId: 37136, cover: 0 },
          { igdbId: 287846, cover: 0, openCriticScore: 85 },
          { igdbId: 321048, cover: 0, openCriticScore: 84 },
          { igdbId: 314246, cover: 0 },
          { igdbId: 305152, cover: 0, openCriticScore: 92 },
          { igdbId: 252826, cover: 0, openCriticScore: 77 },
          { igdbId: 252853, cover: 0, openCriticScore: 86 },
          { igdbId: 298526, cover: 0, openCriticScore: 89 },
          { igdbId: 250618, cover: 0 },
          { igdbId: 125633, cover: 0 },
          { igdbId: 279647, cover: 0 },
        ];
        break;
      case 'Fez':
        this.draftedGames = [
          { igdbId: 228525, cover: 0 },
          { igdbId: 92550, cover: 0 },
          { igdbId: 317627, cover: 0 },
          { igdbId: 325591, cover: 0 },
          { igdbId: 306143, cover: 0, openCriticScore: 78 },
          { igdbId: 317317, cover: 0, openCriticScore: 81 },
          { igdbId: 228530, cover: 0 },
          { igdbId: 300976, cover: 0, openCriticScore: 81 },
          { igdbId: 216315, cover: 0 },
          { igdbId: 126460, cover: 0 },
          { igdbId: 314276, cover: 0 },
          { igdbId: 252502, cover: 0 },
        ];
        break;
    }
  }

  private async getIGDBData(): Promise<void> {
    const gameIds: number[] = this.draftedGames.map((game: Game) => game.igdbId);

    const gameData: GameResponse[] = await firstValueFrom(this.gameService.getIGDBGameDataById(gameIds));

    // Update each game in the draftedGames array with the fetched data
    this.draftedGames = this.draftedGames.map(draftedGame => {
      // Find the corresponding game data
      const additionalGameData = gameData.find(game => game.id === draftedGame.igdbId);

      // If additional data is found, update the draftedGame object
      if (additionalGameData) {
        return {
          ...draftedGame,
          name: additionalGameData.name,
          releaseDateRaw: additionalGameData.first_release_date,
          releaseDateDisplay: this.formatReleaseDate(additionalGameData.first_release_date),
          cover: additionalGameData.cover !== undefined ? additionalGameData.cover : draftedGame.cover,
          status: additionalGameData.status !== undefined ? additionalGameData.status : draftedGame.status
        };
      }

      // If no additional data is found, return the original draftedGame
      return draftedGame;
    });

    // Now that we have the cover lookup number, use the GameService to get the image_id and update the draftedGames array
    let coverData: CoverResponse[] = await this.getCoverData();

    // Build and set manual cover image urls
    this.buildCoverImageUrls(coverData);
  }

  private formatReleaseDate(releaseDate: number | undefined): string {
    if (releaseDate) {
      releaseDate = releaseDate + 86400;
      const date = new Date(releaseDate * 1000);
      return date.toLocaleString('en-US', { month: 'long', day: 'numeric' });
    } else {
      return 'Unknown';
    }
  };

  private async getCoverData(): Promise<CoverResponse[]> {
    const coverLookupIds: number[] = this.draftedGames.map((game: Game) => game.cover);
    const coverResponse = await firstValueFrom(this.gameService.getCoverImageIds(coverLookupIds));

    return coverResponse;
  };

  private buildCoverImageUrls(coverData: CoverResponse[]): void {
    const baseUrl: string = 'https://images.igdb.com/igdb/image/upload/t_cover_big/';

    // Map the cover.image_id to the appropriate url
    coverData = coverData.map((cover: CoverResponse) => {
      return {
        id: cover.id,
        image_id: `${baseUrl}${cover.image_id}.png`
      }
    });


    // Add the image urls to the draftedGames array where the cover lookup id matches the cover id
    this.draftedGames = this.draftedGames.map((draftedGame: Game) => {
      // Find the corresponding cover data
      const cover = coverData.find(cover => cover.id === draftedGame.cover);

      // If cover data is found, update the draftedGame object
      if (cover) {
        return {
          ...draftedGame,
          imageUrl: cover.image_id
        };
      }

      // If no cover data is found, return the original draftedGame
      return draftedGame;
    });

  }

  private processScores(): void {
    // First, set scores of 0 for delayed games
    this.draftedGames = this.draftedGames.map(game => {
      if (!game.openCriticScore) {
        // If no score and it's a delayed game (or no release date, which we know are all delayed)
        if (!game.releaseDateRaw || game.releaseDateRaw > this.END_OF_2025) {
          return {
            ...game,
            openCriticScore: 0
          };
        }
      }
      return game;
    });

    // Get all valid scores (non-zero) and sort them in descending order
    const validScores = this.draftedGames
      .map(game => game.openCriticScore || 0)
      .filter(score => score > 0)
      .sort((a, b) => b - a);

    // Determine how many scores to use (all scores if less than GAMES_TO_COUNT, otherwise GAMES_TO_COUNT)
    const scoresToUse = Math.min(validScores.length, this.GAMES_TO_COUNT);

    // Take the top N scores
    const topScores = validScores.slice(0, scoresToUse);

    // Calculate total from scores
    this.playerTotalScore = topScores.reduce((sum, score) => sum + score, 0);

    // Calculate average using the actual number of scores we're counting
    this.playerAvgScore = scoresToUse > 0 ? this.playerTotalScore / scoresToUse : 0;

    // Emit the updated average score
    this.playerScoreUpdated.emit({
      playerName: this.playerName,
      avgScore: this.playerAvgScore
    });
  }
}
