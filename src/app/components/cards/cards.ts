import { Component } from '@angular/core';
import { Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompactNumber } from '../../shared/pipe/compactnumber';
import { PlaylistService } from '../../service/playlist/playlistservice';

@Component({
  selector: 'app-cards',
  imports: [CommonModule, CompactNumber],
  templateUrl: './cards.html',
  styleUrl: './cards.css',
})
export class Cards {
  favorite: boolean = false;
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

  constructor(private playlistService: PlaylistService) {}

  Popularity(type: 'hearts' | 'likes') {
    const playlist = localStorage.getItem(`${this.items.popularity[0].playlist_id}`);
    const parsedPlaylist = playlist ? JSON.parse(playlist) : null;

    console.log(typeof parsedPlaylist);

    if (playlist != null) {
      if (parsedPlaylist.likes != 0 && type == 'likes') {
        this.Emote(parsedPlaylist, 'likes', 'decrement', 'unlikePlaylist');
      }

      if (parsedPlaylist.hearts != 0 && type == 'hearts') {
        this.Emote(parsedPlaylist, 'hearts', 'decrement', 'unheartPlaylist');
      }

      if (parsedPlaylist.likes != 0 && type == 'hearts') {
        this.Emote(parsedPlaylist, 'hearts', 'reverse', 'unlikePlaylist');
      }

      if (parsedPlaylist.hearts != 0 && type == 'likes') {
        this.Emote(parsedPlaylist, 'likes', 'reverse', 'unheartPlaylist');
      }

      if (parsedPlaylist.likes == 0 && parsedPlaylist.hearts == 0) {
        localStorage.removeItem(`${this.items.popularity[0].playlist_id}`);
        return;
      }

      localStorage.setItem(
        `${this.items.popularity[0].playlist_id}`,
        JSON.stringify(parsedPlaylist),
      );
      return;
    }

    this.items.popularity[0][type] += 1;
    if (type == 'likes') {
      this.customLocalStorageSet(1, 0, true);
      this.server('normal', 'likePlaylist', this.items.popularity[0].playlist_id);
    } else {
      this.customLocalStorageSet(0, 1, true);
      this.server('normal', 'heartPlaylist', this.items.popularity[0].playlist_id);
    }
  }

  Emote(
    playlist: any,
    emoteType: 'likes' | 'hearts',
    operation: 'reverse' | 'decrement',
    callType: 'unlikePlaylist' | 'unheartPlaylist' | 'likePlaylist' | 'heartPlaylist',
  ) {
    if (operation == 'reverse') {
      this.items.popularity[0][emoteType == 'hearts' ? 'likes' : 'hearts'] -= 1;
      this.items.popularity[0][emoteType == 'likes' ? 'likes' : 'hearts'] += 1;
      playlist[emoteType == 'hearts' ? 'likes' : 'hearts'] -= 1;
      playlist[emoteType == 'likes' ? 'likes' : 'hearts'] += 1;
      playlist.canUnemote = true;
      this.server(
        'reverse',
        callType == 'unlikePlaylist' ? 'unlikePlaylist' : 'unheartPlaylist',
        this.items.popularity[0].playlist_id,
      );
    } else if (operation == 'decrement') {
      this.items.popularity[0][emoteType] -= 1;
      playlist[emoteType] -= 1;
      playlist.canUnemote = false;
      this.server(
        'normal',
        callType == 'unlikePlaylist' ? 'unlikePlaylist' : 'unheartPlaylist',
        this.items.popularity[0].playlist_id,
      );
    }
  }

  server(
    serverOperation: 'normal' | 'reverse',
    type: 'unlikePlaylist' | 'likePlaylist' | 'heartPlaylist' | 'unheartPlaylist',
    playlist_id: number,
  ) {
    const callMap = {
      unlikePlaylist: 'heartPlaylist',
      unheartPlaylist: 'likePlaylist',
    } as const;
    const actualCallType = callMap[type as 'unlikePlaylist' | 'unheartPlaylist'] || type;
    if (serverOperation == 'normal') {
      this.playlistService[type](playlist_id).subscribe();
    } else {
      this.playlistService[type](playlist_id).subscribe();
      this.playlistService[actualCallType](playlist_id).subscribe();
    }
  }

  customLocalStorageSet(likes: number = 0, hearts: number = 0, emote: boolean = false) {
    localStorage.setItem(
      `${this.items.popularity[0].playlist_id}`,
      JSON.stringify({
        playlist_id: this.items.popularity[0].playlist_id,
        likes: likes,
        hearts: hearts,
        canUnemote: emote,
      }),
    );
  }

  musicFavorite() {
    if (this.favorite == true) {
      this.favorite = false;
      return;
    }
    this.favorite = true;
  }
}
