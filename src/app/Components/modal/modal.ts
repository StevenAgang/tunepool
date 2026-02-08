import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Input, Output } from '@angular/core';
import { tagsInterface } from '../../Interface/Playlist/playlistInterface';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  tagCount: number = 0;
  tagActive: boolean = false;
  @Input('visible') visible: boolean = true;
  @Input('tags') tags!: tagsInterface[];
  @Output('close') close = new EventEmitter<void>();

  turnActive() {
    if (this.tagActive == true) {
      console.log('not active');
      this.tagActive = false;
      return;
    }
    console.log('active');
    this.tagActive = true;
  }
  closed() {
    this.close.emit();
  }
  ngOnInit() {
    console.log(this.visible);
  }
}
