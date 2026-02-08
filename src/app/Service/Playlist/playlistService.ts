import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL, dataService } from '../../Data/dataService';
import { PaginationPage } from '../../Shared/PaginationPage';

@Injectable({
  providedIn: 'root',
})
export class PlaylistService extends dataService {
  constructor(@Inject(API_URL) url: string, paginationPageToken: PaginationPage, http: HttpClient) {
    super(url, paginationPageToken, http);
  }
}
