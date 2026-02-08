import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompactNumber } from '../../Shared/Pipe/CompactNumber';

@Component({
  selector: 'app-cards',
  imports: [CommonModule, CompactNumber],
  templateUrl: './cards.html',
  styleUrl: './cards.css',
})
export class Cards {
  favorite: boolean = false;
  img: string = 'https://admin.lofigirl.com/uploads/main_radio_99bce02a7b.png';
  @Input('background-color') color: string = '';
  @Input('playList') items!: {
    id: number;
    title: string;
    description: string;
    playList_Urls: string;
    thumbnail: string;
    tags: [{ id: number; name: string }];
    popularity: [{ playlist_id: number; hearts: number; likes: number; rank: number }];
    platform: { id: number; name: string };
  };

  musicFavorite() {
    if (this.favorite == true) {
      this.favorite = false;
      return;
    }
    this.favorite = true;
  }
}
