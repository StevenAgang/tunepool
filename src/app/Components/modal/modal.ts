import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  imports: [CommonModule],
  templateUrl: './modal.html',
  styleUrl: './modal.css',
})
export class Modal {
  tagActive: boolean = false;
  @Input('visible') visible: boolean = true;
  @Input('tags') tags!: Array<string>;
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
    console.log(this.visible);
    this.close.emit();
  }
  ngOnInit() {
    console.log(this.visible);
  }
}
