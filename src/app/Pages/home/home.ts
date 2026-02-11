import { Component } from '@angular/core';
import { Navbar } from '../../Components/Navbar/Navbar';
import { Cards } from '../../Components/Cards/Cards';
import { Modal } from '../../Components/Modal/Modal';
import { PlaylistService } from '../../Service/Playlist/PlaylistService';
import { PlatformInterface, TagsInterface } from '../../Interface/Playlist/PlaylistInterface';
import { PaginationPage } from '../../Shared/PaginationPage';
import { FormControl, FormGroup, ɵInternalFormsSharedModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  imports: [Navbar, Cards, Modal, ɵInternalFormsSharedModule, ReactiveFormsModule],
  templateUrl: './Home.html',
  styleUrl: './Home.css',
})
export class Home {
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
    this.getPlaylistRank();
    this.getAllPlaylist();
    this.getAllTags();
    this.SupportedPlatform();
  }

  getAllPlaylist(refresh?: boolean) {
    if (refresh) {
      this.setLastPage(0, true);
    }
    console.log(this.form.value);
    this.client.getAll(this.paginationPage.getId(), this.form).subscribe((response) => {
      this.listing = response.content || [];
      let lastPage = response.lastPage || false;
      let lastId = this.listing.at(-1)?.id || 0;
      this.setLastPage(lastId, lastPage);
    });
  }

  getPlaylistRank() {
    this.client.getRanking().subscribe((response) => {
      this.post = response.content || [];
      // this.post.sort((a, b) => b.id - a.id);
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
