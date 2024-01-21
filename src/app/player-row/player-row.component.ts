import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { CoverResponse, GameResponse, GameService } from '../services/game.service';

export type Game = {
  id: number;
  name: string;
  releaseDateRaw?: number | undefined;
  releaseDateDisplay?: string;
  cover: number;
  imageUrl?: string | undefined;
  status?: string | undefined;
}

@Component({
  selector: 'app-player-row',
  templateUrl: './player-row.component.html',
  styleUrl: './player-row.component.scss',
})
export class PlayerRowComponent implements OnInit {
  @Input() public playerImgSrc: string = "";
  @Input() public playerName: string = '';
  public draftedGames: Game[] = [];
  public playerAvgScore: number | null = null;
  public playerTotalScore: number | null = null;

  constructor(
    private gameService: GameService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  public ngOnInit() {
    this.getDraftedGames();
    this.getGameData();
    this.calculateAvgScore();
    this.calculateTotalScore();
  }

  private getDraftedGames(): void {
    switch (this.playerName) {
      case 'John':
        this.draftedGames = [
          { id: 252476, name: `Prince of Persia: The Lost Crown`, cover: 0 },
          { id: 115060, name: `Dragon's Dogma II`, cover: 0 },
          { id: 217590, name: `Tekken 8`, cover: 0 },
          { id: 185252, name: `Warhammer 40,000: Space Marine II`, cover: 0 },
          { id: 37062, name: `Skull and Bones`, cover: 0 },
          { id: 217594, name: `Rise of the Ronin`, cover: 0 },
          { id: 122123, name: `Homeworld 3`, cover: 0 },
          { id: 127342, name: `Senua's Saga: Hellblade II`, cover: 0 },
          { id: 30208, name: `Dragon Age: Dreadwolf`, cover: 0 },
          { id: 216320, name: `Assassin's Creed Red`, cover: 0 },
          { id: 26602, name: `Metaphor: ReFantazio`, cover: 0 },
          { id: 279636, name: `Visions of Mana`, cover: 0 }
        ];
        break;
      case 'Fez':
        this.draftedGames = [
          { id: 228525, name: `Hades II`, cover: 0 },
          { id: 217623, name: `Like a Dragon: Infinite Wealth`, cover: 0 },
          { id: 240009, name: `Elden Ring: Shadow of the Erdtree`, cover: 0 },
          { id: 213237, name: `Alone in the Dark`, cover: 0 },
          { id: 254340, name: `Princess Peach: Showtime!`, cover: 0 },
          { id: 266687, name: `Bandle Tale: A League of Legends Story`, cover: 0 },
          { id: 252827, name: `Star Wars Outlaws`, cover: 0 },
          { id: 101440, name: `S.T.A.L.K.E.R. 2: Heart of Chornobyl`, cover: 0 },
          { id: 252502, name: `Baby Steps`, cover: 0 },
          { id: 115289, name: `Hollow Knight: Silksong`, cover: 0 },
          { id: 116530, name: `Vampire: The Masquerade - Bloodlines 2`, cover: 0 },
          { id: 252997, name: `Apollo Justice: Ace Attorney Trilogy`, cover: 0 },
        ];
        break;
      case 'Hauze':
        this.draftedGames = [
          { id: 133236, name: `Final Fantasy VII Rebirth`, cover: 0 },
          { id: 252647, name: `Persona 3 Reload`, cover: 0 },
          { id: 259338, name: `Final Fantasy XIV: Dawntrail`, cover: 0 },
          { id: 136511, name: `Braid: Anniversary Edition`, cover: 0 },
          { id: 68353, name: `Unicorn Overlord`, cover: 0 },
          { id: 266690, name: `Paper Mario: The Thousand-Year Door`, cover: 0 },
          { id: 136627, name: `Suicide Squad: Kill the Justice League`, cover: 0 },
          { id: 217592, name: `Pacific Drive`, cover: 0 },
          { id: 250645, name: `Destiny 2: The Final Shape`, cover: 0 },
          { id: 262529, name: `Little Nightmares III`, cover: 0 },
          { id: 250623, name: `Foamstars`, cover: 0 },
          { id: 135994, name: `Avowed`, cover: 0 },
        ];
        break;
      case 'Nick':
        this.draftedGames = [
          { id: 136879, name: `Black Myth: Wukong`, cover: 0 },
          { id: 277143, name: `The Last of Us Part II: Remastered`, cover: 0 },
          { id: 37136, name: `Metroid Prime 4`, cover: 0 },
          { id: 250634, name: `Metal Gear Solid Delta: Snake Eater`, cover: 0 },
          { id: 250616, name: `Helldivers II`, cover: 0 },
          { id: 266674, name: `Mario vs. Donkey Kong`, cover: 0 },
          { id: 95118, name: `Last Epoch`, cover: 0 },
          { id: 222341, name: `Silent Hill 2`, cover: 0 },
          { id: 117170, name: `Stellar Blade`, cover: 0 },
          { id: 261145, name: `South Park: Snow Day!`, cover: 0 },
          { id: 255396, name: `JuJutsu Kaisen Cursed Clash`, cover: 0 },
          { id: 279635, name: `The Casting of Frank Stone`, cover: 0 },
        ];
        break;
    }
  }

  private async getGameData(): Promise<void> {
    const gameIds: number[] = this.draftedGames.map((game: Game) => game.id);

    const gameData: GameResponse[] = await firstValueFrom(this.gameService.getGamesById(gameIds));

    // Update each game in the draftedGames array with the fetched data
    this.draftedGames = this.draftedGames.map(draftedGame => {
      // Find the corresponding game data
      const additionalGameData = gameData.find(game => game.id === draftedGame.id);

      // If additional data is found, update the draftedGame object
      if (additionalGameData) {
        console.log('First Release Date:', additionalGameData.first_release_date);
        return {
          ...draftedGame,
          releaseDateRaw: additionalGameData.first_release_date,
          cover: additionalGameData.cover !== undefined ? additionalGameData.cover : draftedGame.cover,
          status: additionalGameData.status !== undefined ? additionalGameData.status : draftedGame.status
        };
      }

      // If no additional data is found, return the original draftedGame
      return draftedGame;
    });

    console.log('Updated draftedGames:', this.draftedGames);

    // Now that we have the cover lookup number, use the GameService to get the image_id and update the draftedGames array
    let coverData: CoverResponse[] = await this.getCoverData();

    // Build and set manual cover image urls
    this.buildCoverImageUrls(coverData);

    this.changeDetectorRef.detectChanges();
  }

  private async getCoverData(): Promise<CoverResponse[]> {
    const coverLookupIds: number[] = this.draftedGames.map((game: Game) => game.cover);
    const coverResponse = await firstValueFrom(this.gameService.getCoverImageIds(coverLookupIds));
    console.log('Cover image ids:', coverResponse);

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

    console.log('Cover image urls:', coverData);

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

    console.log('Updated draftedGames:', this.draftedGames);
  }

  private calculateAvgScore(): void {

  };

  private calculateTotalScore(): void {

  };
}
