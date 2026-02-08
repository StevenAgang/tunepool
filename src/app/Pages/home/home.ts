import { Component, inject } from '@angular/core';
import { Navbar } from '../../Components/navbar/navbar';
import { Cards } from '../../Components/cards/cards';
import { Modal } from '../../Components/modal/modal';
import { PlaylistService } from '../../Service/Playlist/playlistService';
import { apiResponseInterface } from '../../Interface/ApiResponse/apiResponseInterface';
import { playlistInterface, tagsInterface } from '../../Interface/Playlist/playlistInterface';
import { PaginationPage } from '../../Shared/PaginationPage';

@Component({
  selector: 'app-home',
  imports: [Navbar, Cards, Modal],
  templateUrl: './home.html',
  styleUrl: './home.css',
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

  protected tags: Array<{ id: number; name: string }> = [];

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

  constructor(
    private client: PlaylistService,
    public paginationPage: PaginationPage,
  ) {}

  ngOnInit() {
    this.client.getRanking().subscribe((response) => {
      this.post = (response as apiResponseInterface<Array<playlistInterface>>).content || [];
    });

    this.client.getAll(this.paginationPage.getId()).subscribe((response) => {
      this.listing = (response as apiResponseInterface<Array<playlistInterface>>).content || [];
      this.paginationPage.setId(this.listing.length || 0);
      console.log(this.paginationPage.getId());
    });

    this.client.getAllTags().subscribe((response) => {
      this.tags = (response as apiResponseInterface<Array<tagsInterface>>).content || [];
    });
  }

  cursorPagination() {
    this.client.getAll(this.paginationPage.getId()).subscribe((response) => {
      var newListing = (response as apiResponseInterface<Array<playlistInterface>>).content || [];
      console.log(this.paginationPage.getPage());
      if (newListing.length == 0) {
        this.paginationPage.setPage(true);
        return;
      }
      this.listing = [...this.listing, ...newListing];
      this.paginationPage.setId(this.listing.length || 0);
    });
  }
}
