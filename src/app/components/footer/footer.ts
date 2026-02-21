import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
})
export class Footer {
  date: string = '';
  constructor() {
    this.date = formatDate(new Date(), 'yyyy', 'en-PH');
  }
}
