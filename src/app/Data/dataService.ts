import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { appError } from '../Common/Exception/appError';
import { dataServiceInterface } from '../Interface/Data/dataServiceInterface';
import { PaginationPage } from '../Shared/PaginationPage';

export const API_URL = new InjectionToken<string>('API_URL');

@Injectable({
  providedIn: 'root',
})
export class dataService implements dataServiceInterface {
  constructor(
    @Inject(API_URL) private url: string,
    private paginationPageToken: PaginationPage,
    private http: HttpClient,
  ) {}

  getRanking() {
    return this.http.get(this.url + 'GetRanking').pipe(
      catchError((error) => {
        return throwError(() => new appError(error));
      }),
    );
  }

  getAll(lastId: number) {
    return this.http.get(this.url + `GetAllPlaylist?lastId=${lastId}`).pipe(
      catchError((error: Response) => {
        this.paginationPageToken.setPage(true);
        return throwError(() => new appError(error));
      }),
    );
  }

  getAllTags() {
    return this.http.get(this.url + 'GetAllTags').pipe(
      catchError((error) => {
        return throwError(() => new appError(error));
      }),
    );
  }

  likePlaylist(data: object) {
    return this.http.patch(this.url + 'LikePlaylist', data).pipe(
      catchError((err) => {
        return throwError(() => new appError(err));
      }),
    );
  }

  heartPlaylist(data: object) {
    return this.http.patch(this.url + 'HeartPlaylist', data).pipe(
      catchError((err) => {
        return throwError(() => new appError(err));
      }),
    );
  }
}
