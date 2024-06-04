import { Component, OnInit } from '@angular/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import data from '../../../../../categorias.json';
import { FormControl, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Producto } from '../../../../producto';
import { ProductoService } from '../../../../services/producto.service';
import { Router } from '@angular/router';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import * as uuid from 'uuid';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';


export interface Categoria {
  id: number;
  name: string;
}

@Component({
  selector: 'app-new',
  standalone: true,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatAutocompleteModule, 
    ReactiveFormsModule, AsyncPipe, NgIf, RouterLink
  ],
  templateUrl: './new.component.html',
  styleUrl: './new.component.css'
})
export class NewComponent implements OnInit {
  applyForm = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    precio: new FormControl<number>(null),
    inventario: new FormControl<number>(null),
    categoria: new FormControl<string>(''),
    imagen: new FormControl<File>(null)
  });
  options: Categoria[] = data;
  filteredOptions: Observable<Categoria[]>;
  producto: Producto;
  percentDone: number;
  uploadSuccess: boolean;
  loading: boolean;
  archivoCapturado: any;

  constructor(private productoService: ProductoService, private sanitizer: DomSanitizer, private router: Router, private route: ActivatedRoute,) {}

  ngOnInit() {
    this.filteredOptions = this.applyForm.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.categoria;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }

  displayFn(categoria: Categoria): string {
    return categoria && categoria.name ? categoria.name : '';
  }

  private _filter(name: string): Categoria[] {
    const filterValue = name.toLowerCase();

    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    const form = this.applyForm.value;
    const storage = getStorage();
    const id = uuid.v4();
    const storageRef = ref(storage, id + '.' + this.archivoCapturado.type.substring(6));
    
    if (form.imagen == null) {
      const obj = {"ID": id, "nombre": form.nombre, "categoria": form.categoria,
          "precio": form.precio, "inventario": form.inventario, "descripcion": form.descripcion, "imagen": ""
        };
        this.productoService.addProduct(obj);
    } else {
      uploadBytes(storageRef, this.archivoCapturado).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      }).then(() => {
        getDownloadURL(ref(storage, id + '.' + this.archivoCapturado.type.substring(6))).then((url) => {
          const obj = {"ID": id, "nombre": form.nombre, "categoria": form.categoria,
            "precio": form.precio, "inventario": form.inventario, "descripcion": form.descripcion, "imagen": url
          };
          this.productoService.addProduct(obj);
        }).catch((err) => {
          console.error(err);
        })
      })
    }
    this.router.navigate(['/home/sell/list'], { relativeTo: this.route });
  }
  capturar(event): any{
    this.loading = true;
    this.archivoCapturado = event.target.files[0];
    console.log(this.archivoCapturado.type.substring(6));
    this.loading = false;
  }

}
