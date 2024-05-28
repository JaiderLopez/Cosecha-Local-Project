import { Component } from '@angular/core';

@Component({
  selector: 'app-investors',
  standalone: true,
  imports: [],
  templateUrl: './investors.component.html',
  styleUrl: './investors.component.css'
})
export class InvestorsComponent {
  ngOnInit(): void {
    document.querySelector('.container').classList.remove('menu-open');
  }
}
