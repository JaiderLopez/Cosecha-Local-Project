import { Component } from '@angular/core';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
 constructor (private userService: UserService) {}
}
