import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './Navbar.html',
  styleUrl: './Navbar.css',
})
export class Navbar {
  @Output() openModal = new EventEmitter<void>();

  triggerModal() {
    this.openModal.emit();
  }
}
