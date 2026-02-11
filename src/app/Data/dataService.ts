import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AppError } from '../Common/Exception/AppError';
import { DataServiceInterface } from '../Interface/Data/DataServiceInterface';
import { PaginationPage } from '../Shared/PaginationPage';
import { FormGroup } from '@angular/forms';
import { ApiResponseInterface } from '../Interface/ApiResponse/ApiResponseInterface';
import {
  PlatformInterface,
  PlaylistInterface,
  TagsInterface,
} from '../Interface/Playlist/PlaylistInterface';

export const API_URL = new InjectionToken<string>('API_URL');

@Injectable({
  providedIn: 'root',
})
export class DataService implements DataServiceInterface {
  constructor(
    @Inject(API_URL) private url: string,
    private paginationPageToken: PaginationPage,
    private http: HttpClient,
  ) {}

  getRanking() {
    return this.http.get(this.url + 'GetRanking').pipe(
      map((response) => {
        return response as ApiResponseInterface<Array<PlaylistInterface>>;
      }),
      catchError((error) => {
        return throwError(() => new AppError(error));
      }),
    );
  }

  getAll(lastId?: number, form?: FormGroup) {
    let metaData = form?.get('metaData')?.value;
    let platform = form?.get('platform')?.value;
    let tags = form?.get('tags')?.value;
    return this.http
      .get(this.url + `GetAllPlaylist`, {
        params: {
          lastId: lastId ?? 0,
          metaData: metaData ?? '',
          platform: platform ?? 0,
          tags: tags ?? 0,
        },
      })
      .pipe(
        map((response) => {
          return response as ApiResponseInterface<Array<PlaylistInterface>>;
        }),
        catchError((error: Response) => {
          this.paginationPageToken.setPage(true);
          return throwError(() => new AppError(error));
        }),
      );
  }

  getAllTags() {
    return this.http.get(this.url + 'GetAllTags').pipe(
      map((response) => {
        return response as ApiResponseInterface<Array<TagsInterface>>;
      }),
      catchError((error) => {
        return throwError(() => new AppError(error));
      }),
    );
  }

  getAllPlatform() {
    return this.http.get(this.url + 'GetAllPlatform').pipe(
      map((response) => {
        return response as ApiResponseInterface<Array<PlatformInterface>>;
      }),
      catchError((error) => {
        return throwError(() => new AppError(error));
      }),
    );
  }

  addPlaylist(data: object): Observable<any> {
    return this.http.post(this.url + 'AddPlaylist', data).pipe(
      catchError((error) => {
        return throwError(() => new AppError(error));
      }),
    );
  }

  likePlaylist(id: number) {
    return this.http.patch(this.url + `LikePlaylist`, null, { params: { playlistId: id } }).pipe(
      catchError((err) => {
        return throwError(() => new AppError(err));
      }),
    );
  }

  heartPlaylist(id: number) {
    return this.http.patch(this.url + `HeartPlaylist`, null, { params: { playlistId: id } }).pipe(
      catchError((err) => {
        return throwError(() => new AppError(err));
      }),
    );
  }

  unlikePlaylist(id: number) {
    return this.http.patch(this.url + `UnlikePlaylist`, null, { params: { playlistId: id } }).pipe(
      catchError((err) => {
        return throwError(() => new AppError(err));
      }),
    );
  }

  unheartPlaylist(id: number) {
    return this.http.patch(this.url + `UnheartPlaylist`, null, { params: { playlistId: id } }).pipe(
      catchError((err) => {
        return throwError(() => new AppError(err));
      }),
    );
  }
}
