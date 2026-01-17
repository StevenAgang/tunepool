import { Component } from '@angular/core';
import { Navbar } from '../../Components/navbar/navbar';
import { Cards } from '../../Components/cards/cards';

@Component({
  selector: 'app-home',
  imports: [Navbar, Cards],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  badgeColor: { [key: string]: string } = {
    gold: 'bg-linear-to-br from-yellow-300 to-yellow-600',
    silver: 'bg-linear-to-br from-gray-300 to-gray-600',
    bronze: 'bg-linear-to-br from-yellow-800 to-red-600',
  };
}
