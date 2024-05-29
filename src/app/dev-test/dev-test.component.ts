import { Component, inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TestService } from '../dev-test/test.service';
import {Place} from '../dev-test/test'
import { NgFor, NgStyle } from '@angular/common';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';

@Component({
  selector: 'app-dev-test',
  standalone: true,
  imports: [ReactiveFormsModule, NgFor, NgStyle],
  templateUrl: './dev-test.component.html',
  styleUrl: './dev-test.component.css'
})
export class DevTestComponent {
  places: Place[];
  constructor(private route: ActivatedRoute, private router: Router, private testService: TestService) { }

  applyForm = new FormGroup ({
    name: new FormControl(),
    latitude: new FormControl(),
    longitude: new FormControl(),
    description: new FormControl(),
    image: new FormControl()
  });

  ngOnInit(): void {
    this.testService.getPlaces().subscribe(places => {
      this.places = places;
    })

    
  }
  

  async onSubmit() {
    const storage = getStorage();
    getDownloadURL(ref(storage, 'cebolla.PNG'))
      .then((url) => {
        // Or inserted into an <img> element
        const img = document.getElementById('myimg');
        img.setAttribute('src', url);
      })
      .catch((error) => {
        // Handle any errors
      });
  }
  async onClickDelete(place: Place) {
    const response = await this.testService.deletePlace(place);
    console.log(response);
  }
}
