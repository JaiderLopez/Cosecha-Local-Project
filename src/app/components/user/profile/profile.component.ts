import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private route: ActivatedRoute, private router: Router) { }
  ngOnInit(): void {
    document.querySelector('.container').classList.remove('menu-open');
  }
  goToItems() {
    this.router.navigate(['/home/change-pass'], { relativeTo: this.route });
    console.log("found!");
    
  }
  
}
