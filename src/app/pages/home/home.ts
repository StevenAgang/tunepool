import { Component, signal } from '@angular/core';
import { Navbar } from '../../components/navbar/navbar';
import { Cards } from '../../components/cards/cards';
import { Modal } from '../../components/modal/modal';
import { PlaylistService } from '../../service/playlist/playlistservice';
import {
  PlatformInterface,
  PlaylistInterface,
  TagsInterface,
} from '../../interface/playlist/playlistinterface';
import { PaginationPage } from '../../shared/paginationpage';
import { FormControl, FormGroup, ɵInternalFormsSharedModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ApiResponseInterface } from '../../interface/apiresponse/apiresponseinterface';

@Component({
  selector: 'app-home',
  imports: [Navbar, Cards, Modal, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  viewLoader = signal(false);
  leaderBoardLoader = signal(false);

  protected post: Array<{
    id: number;
    title: string;
    description: string;
    playList_Urls: string;
    thumbnail: string;
    tags: [{ id: number; name: string }];
    popularity: [{ playlist_id: number; hearts: number; likes: number; rank: number }];
    platform: { id: number; name: string };
  }> = [];

  protected listing: Array<{
    id: number;
    title: string;
    description: string;
    playList_Urls: string;
    thumbnail: string;
    tags: [{ id: number; name: string }];
    popularity: [{ playlist_id: number; hearts: number; likes: number; rank: number }];
    platform: { id: number; name: string };
  }> = [];

  protected tags: TagsInterface[] = [];
  protected platforms: PlatformInterface[] = [];
  modalVisible: boolean = true;

  openModal() {
    document.body.style.overflow = 'hidden';
    this.modalVisible = false;
  }

  closeModal() {
    document.body.style.overflow = 'auto';
    this.modalVisible = true;
  }

  pagination: Array<number> = [1, 2, 3, 4, 5, 6, 8, 9, 10];

  form = new FormGroup({
    metaData: new FormControl(''),
    platform: new FormControl(''),
    tags: new FormControl(''),
  });

  constructor(
    private client: PlaylistService,
    public paginationPage: PaginationPage,
  ) {}

  ngOnInit() {
    this.viewLoader.set(true);
    this.leaderBoardLoader.set(true);
    this.getPlaylistRank();
    this.getAllPlaylist();
    this.getAllTags();
    this.SupportedPlatform();
  }

  getAllPlaylist(refresh?: boolean) {
    if (refresh) {
      this.setLastPage(0, true);
    }
    this.client.getAll(this.paginationPage.getId(), this.form).subscribe({
      next: (response: ApiResponseInterface<Array<PlaylistInterface>>) => {
        this.listing = response.content || [];
        let lastPage = response.lastPage || false;
        let lastId = this.listing.at(-1)?.id || 0;
        this.setLastPage(lastId, lastPage);
      },
      error: () => {
        this.viewLoader.set(false);
      },
      complete: () => {
        this.viewLoader.set(false);
      },
    });
  }

  getPlaylistRank() {
    this.client.getRanking().subscribe({
      next: (response: ApiResponseInterface<Array<PlaylistInterface>>) => {
        this.post = response.content || [];
        this.leaderBoardLoader.set(false);
      },
      error: () => {
        this.leaderBoardLoader.set(false);
      },
      complete: () => {
        this.leaderBoardLoader.set(false);
      },
    });
  }

  getAllTags() {
    this.client.getAllTags().subscribe((response) => (this.tags = response.content || []));
  }
  SupportedPlatform() {
    this.client.getAllPlatform().subscribe((response) => {
      this.platforms = response.content || [];
    });
  }

  cursorPagination() {
    this.client.getAll(this.paginationPage.getId(), this.form).subscribe((response) => {
      var newListing = response.content || [];
      var lastPage = response.lastPage || false;
      this.listing = [...this.listing, ...newListing];
      let lastId = this.listing.at(-1)?.id || 0;
      this.setLastPage(lastId, lastPage);
    });
  }

  setLastPage(id: number, status: boolean) {
    this.paginationPage.setId(id);
    this.paginationPage.setPage(status);
  }
}
