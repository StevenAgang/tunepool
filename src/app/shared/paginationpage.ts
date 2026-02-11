import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationPage {
  private lastId: number = 0;
  private lastPage: boolean = true;

  setId(id: number) {
    this.lastId = id;
  }
  getId() {
    return this.lastId;
  }

  setPage(page: boolean) {
    this.lastPage = page;
  }
  getPage() {
    return this.lastPage;
  }
}
