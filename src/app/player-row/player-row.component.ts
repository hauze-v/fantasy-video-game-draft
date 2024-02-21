import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CoverResponse, GameResponse, GameService } from '../services/game.service';

export type Game = {
  igdbId: number;
  openCriticId?: number;
  name: string;
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
  public playerAvgScore: number | null = 83 ;
  public playerTotalScore: number = 0;
  public playerStatus: string = Status.unknown;


  constructor(
    private gameService: GameService,
  ) { }

  public ngOnInit() {
    this.getDraftedGames();
    this.getIGDBData();
    this.getOpenCriticData();
    this.calculateTotalScore();
    this.calculateAvgScore();
  }

  private getDraftedGames(): void {
    switch (this.playerName) {
      case 'John':
        this.draftedGames = [
          { igdbId: 252476, name: `Prince of Persia: The Lost Crown`, cover: 0, openCriticScore: 87 },
          { igdbId: 115060, name: `Dragon's Dogma II`, cover: 0 },
          { igdbId: 217590, name: `Tekken 8`, cover: 0, openCriticScore: 90 },
          { igdbId: 185252, name: `Warhammer 40,000: Space Marine II`, cover: 0 },
          { igdbId: 37062, name: `Skull and Bones`, cover: 0, openCriticScore: 61 },
          { igdbId: 217594, name: `Rise of the Ronin`, cover: 0 },
          { igdbId: 122123, name: `Homeworld 3`, cover: 0 },
          { igdbId: 127342, name: `Senua's Saga: Hellblade II`, cover: 0 },
          { igdbId: 30208, name: `Dragon Age: Dreadwolf`, cover: 0 },
          { igdbId: 216320, name: `Assassin's Creed Red`, cover: 0 },
          { igdbId: 26602, name: `Metaphor: ReFantazio`, cover: 0 },
          { igdbId: 279636, name: `Visions of Mana`, cover: 0 }
        ];
        break;
      case 'Buster':
        this.draftedGames = [
          { igdbId: 228525, name: `Hades II`, cover: 0 },
          { igdbId: 217623, name: `Like a Dragon: Infinite Wealth`, cover: 0, openCriticScore: 90 },
          { igdbId: 240009, name: `Elden Ring: Shadow of the Erdtree`, cover: 0 },
          { igdbId: 213237, name: `Alone in the Dark`, cover: 0 },
          { igdbId: 254340, name: `Princess Peach: Showtime!`, cover: 0 },
          { igdbId: 266687, name: `Bandle Tale: A League of Legends Story`, cover: 0, openCriticScore: 74 },
          { igdbId: 252827, name: `Star Wars Outlaws`, cover: 0 },
          { igdbId: 101440, name: `S.T.A.L.K.E.R. 2: Heart of Chornobyl`, cover: 0 },
          { igdbId: 252502, name: `Baby Steps`, cover: 0 },
          { igdbId: 115289, name: `Hollow Knight: Silksong`, cover: 0 },
          { igdbId: 116530, name: `Vampire: The Masquerade - Bloodlines 2`, cover: 0 },
          { igdbId: 252997, name: `Apollo Justice: Ace Attorney Trilogy`, cover: 0, openCriticScore: 82 },
        ];
        break;
      case 'Hauze':
        this.draftedGames = [
          { igdbId: 133236, name: `Final Fantasy VII Rebirth`, cover: 0 },
          { igdbId: 252647, name: `Persona 3 Reload`, cover: 0, openCriticScore: 89 },
          { igdbId: 259338, name: `Final Fantasy XIV: Dawntrail`, cover: 0 },
          { igdbId: 136511, name: `Braid: Anniversary Edition`, cover: 0 },
          { igdbId: 68353, name: `Unicorn Overlord`, cover: 0 },
          { igdbId: 266690, name: `Paper Mario: The Thousand-Year Door`, cover: 0 },
          { igdbId: 136627, name: `Suicide Squad: Kill the Justice League`, cover: 0, openCriticScore: 60 },
          { igdbId: 217592, name: `Pacific Drive`, cover: 0 },
          { igdbId: 250645, name: `Destiny 2: The Final Shape`, cover: 0 },
          { igdbId: 262529, name: `Little Nightmares III`, cover: 0 },
          { igdbId: 250623, name: `Foamstars`, cover: 0, openCriticScore: 59 },
          { igdbId: 135994, name: `Avowed`, cover: 0 },
        ];
        break;
      case 'Nick':
        this.draftedGames = [
          { igdbId: 136879, name: `Black Myth: Wukong`, cover: 0 },
          { igdbId: 277143, name: `The Last of Us Part II: Remastered`, cover: 0, openCriticScore: 90 },
          { igdbId: 37136, name: `Metroid Prime 4`, cover: 0 },
          { igdbId: 250634, name: `Metal Gear Solid Delta: Snake Eater`, cover: 0 },
          { igdbId: 250616, name: `Helldivers II`, cover: 0, openCriticScore: 82 },
          { igdbId: 266674, name: `Mario vs. Donkey Kong`, cover: 0, openCriticScore: 78 },
          { igdbId: 95118, name: `Last Epoch`, cover: 0 },
          { igdbId: 222341, name: `Silent Hill 2`, cover: 0 },
          { igdbId: 117170, name: `Stellar Blade`, cover: 0 },
          { igdbId: 261145, name: `South Park: Snow Day!`, cover: 0 },
          { igdbId: 255396, name: `JuJutsu Kaisen Cursed Clash`, cover: 0, openCriticScore: 49 },
          { igdbId: 279635, name: `The Casting of Frank Stone`, cover: 0 },
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

  private async getOpenCriticData(): Promise<void> {
    // For each game in draftedGames, call the OpenCritic API to get the game's ID
    // Then call the OpenCritic API to get the game's top critic score

    // Get the OpenCritic game IDs
    // this.draftedGames.forEach(async (game: Game) => {
    //   game.openCriticId = await firstValueFrom(this.gameService.getOpenCriticGameId(game.name));

    //   // Get the OpenCritic game scores
    //   game.openCriticScore = await firstValueFrom(this.gameService.getOpenCriticScore(game.openCriticId));
    // });
  }

  private calculateAvgScore(): void {
    let totalScore: number = 0;
    let counter: number = 0;

    // Calculate the player's average score based on their list of drafted games and the OpenCritic score
    this.draftedGames.forEach((game: Game) => {
      if (game.openCriticScore) {
        totalScore += game.openCriticScore;
        counter++;
      }
    });

    if (counter === 0) {
      this.playerAvgScore = 0;
      return;
    } else {
      this.playerAvgScore = totalScore / counter;
    }

    // Emit the player's average score to the parent component
    this.playerScoreUpdated.emit({ playerName: this.playerName, avgScore: this.playerAvgScore })
  }

  private calculateTotalScore(): void {
    this.draftedGames.forEach((game: Game) => {
      if (game.openCriticScore) {
        this.playerTotalScore += game.openCriticScore;
      }
    });
  };
}
