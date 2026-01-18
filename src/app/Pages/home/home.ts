import { Component } from '@angular/core';
import { Navbar } from '../../Components/navbar/navbar';
import { Cards } from '../../Components/cards/cards';
import { Modal } from '../../Components/modal/modal';

@Component({
  selector: 'app-home',
  imports: [Navbar, Cards, Modal],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  modalVisible: boolean = true;
  openModal() {
    console.log(this.modalVisible);
    this.modalVisible = false;
  }
  closeModal() {
    console.log(this.modalVisible);
    this.modalVisible = true;
  }
  badgeColor: { [key: string]: string } = {
    gold: 'bg-linear-to-br from-yellow-300 to-yellow-600',
    silver: 'bg-linear-to-br from-gray-300 to-gray-600',
    bronze: 'bg-linear-to-br from-yellow-800 to-red-600',
  };

  pagination: Array<number> = [1, 2, 3, 4, 5, 6, 8, 9, 10];

  tags: Array<string> = ['Lofi', 'Syntethic'];

  post: Array<{
    title: string;
    subtitle: string;
    imgSrc: string;
    tags: string[];
    hearts: number;
    likes: number;
    platform: string;
    rank: number;
    bgColor: string;
    link: string;
  }> = [
    {
      title: 'Cybercity Midnight',
      subtitle: 'Drenched in synths and city lights. For those 2AM drives through neon districts.',
      imgSrc: 'https://admin.lofigirl.com/uploads/main_radio_99bce02a7b.png',
      tags: ['Vibe', 'Chill'],
      hearts: 12400,
      likes: 21234,
      platform: 'youtubemusic',
      rank: 1,
      bgColor: this.badgeColor['gold'],
      link: 'https://music.youtube.com/playlist?list=PLTull_1lcSyr5tngo4ul7gCAJjH8Td6Or&si=HkwC2fZHnrdr0c_P',
    },
    {
      title: 'Programmer Chill',
      subtitle: 'Drenched in synths and city lights. For those 2AM drives through neon districts.',
      imgSrc: 'https://admin.lofigirl.com/uploads/main_radio_99bce02a7b.png',
      tags: ['Energizer', 'Focus'],
      hearts: 12400,
      likes: 20000,
      platform: 'spotify',
      rank: 2,
      bgColor: this.badgeColor['silver'],
      link: 'https://open.spotify.com/playlist/4HjyFX2PH4o6pTFyCyurQO',
    },
    {
      title: 'Late Night Music',
      subtitle: 'Drenched in synths and city lights. For those 2AM drives through neon districts.',
      imgSrc: 'https://admin.lofigirl.com/uploads/main_radio_99bce02a7b.png',
      tags: ['Sleepy', 'Good Mood'],
      hearts: 12400,
      likes: 20000,
      platform: 'applemusic',
      rank: 3,
      bgColor: this.badgeColor['bronze'],
      link: 'https://music.apple.com/us/playlist/vol-de-nuit/pl.faeb447ec5a341ef83e7e65189bd1c63',
    },
  ];

  listing: Array<{
    title: string;
    subtitle: string;
    imgSrc: string;
    tags: string[];
    hearts: number;
    likes: number;
    platform: string;
    rank: number;
    bgColor: string;
    link: string;
  }> = [
    {
      title: 'Cybercity Midnight',
      subtitle: 'Drenched in synths and city lights. For those 2AM drives through neon districts.',
      imgSrc: 'https://admin.lofigirl.com/uploads/main_radio_99bce02a7b.png',
      tags: ['Vibe', 'Chill'],
      hearts: 12400,
      likes: 20000,
      platform: 'youtubemusic',
      rank: 0,
      bgColor: this.badgeColor['gold'],
      link: 'https://music.youtube.com/playlist?list=PLTull_1lcSyr5tngo4ul7gCAJjH8Td6Or&si=HkwC2fZHnrdr0c_P',
    },
    {
      title: 'Programmer Chill',
      subtitle: 'Drenched in synths and city lights. For those 2AM drives through neon districts.',
      imgSrc: 'https://admin.lofigirl.com/uploads/main_radio_99bce02a7b.png',
      tags: ['Energizer', 'Focus'],
      hearts: 12400,
      likes: 20000,
      platform: 'spotify',
      rank: 0,
      bgColor: this.badgeColor['silver'],
      link: 'https://open.spotify.com/playlist/4HjyFX2PH4o6pTFyCyurQO',
    },
    {
      title: 'Late Night Music',
      subtitle: 'Drenched in synths and city lights. For those 2AM drives through neon districts.',
      imgSrc: 'https://admin.lofigirl.com/uploads/main_radio_99bce02a7b.png',
      tags: ['Sleepy', 'Good Mood'],
      hearts: 12400,
      likes: 20000,
      platform: 'applemusic',
      rank: 0,
      bgColor: this.badgeColor['bronze'],
      link: 'https://music.apple.com/us/playlist/vol-de-nuit/pl.faeb447ec5a341ef83e7e65189bd1c63',
    },
  ];
}
