import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LoginComponent } from '../../components/user/login/login.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLink, LoginComponent],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {

}
