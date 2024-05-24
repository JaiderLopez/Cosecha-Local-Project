import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css'
})
export class LandingComponent {
  constructor(private route: ActivatedRoute, private router: Router) {}
  goToItems() {
    this.router.navigate(['/register'], { relativeTo: this.route });
  }
}
