import { Component } from '@angular/core';
import { Input } from '@angular/core';

@Component({
  selector: 'app-cards',
  imports: [],
  templateUrl: './cards.html',
  styleUrl: './cards.css',
})
export class Cards {
  img: string = 'https://admin.lofigirl.com/uploads/main_radio_99bce02a7b.png';
  @Input('content') text: string = '';
  @Input('background-color') color: string = '';
  @Input('place') place: number = 0;
  @Input('playList') items: Array<{
    title: string;
    subtitle: string;
    imgSrc: string;
    tags: string;
    hearts: number;
    likes: number;
  }> = [];
}
