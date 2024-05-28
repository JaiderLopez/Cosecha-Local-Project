import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-sell',
  standalone: true,
  imports: [RouterLink, RouterOutlet],
  templateUrl: './sell.component.html',
  styleUrl: './sell.component.css'
})
export class SellComponent {
  ngOnInit(): void {
    document.querySelector('.container').classList.remove('menu-open');
  }
}
