import { Component } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { ActivatedRoute, Router, RouterLink } from "@angular/router";
import { MatAutocomplete } from "@angular/material/autocomplete"
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AsyncPipe, NgIf } from "@angular/common";
import data from '../../../../../categorias.json';
import { Observable, map, startWith } from 'rxjs';
import * as uuid from 'uuid';
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { UserService } from "../../../../services/user.service";
import { ProductoService } from "../../../../services/producto.service";

export interface Categoria {
  id: number;
  name: string;
}

@Component({
    selector: 'app-new',
    standalone: true,
    imports: [FormsModule, MatFormFieldModule, MatInputModule, ReactiveFormsModule, RouterLink, MatAutocomplete,
      AsyncPipe, MatAutocompleteModule, NgIf
    ],
    templateUrl: './edit-product.component.html',
    styleUrl: './edit-product.component.css'
  })

export class EditProductComponent {
  loading= false;
  filteredOptions: Observable<Categoria[]>;
  options: Categoria[] = data;
  uploadSuccess: boolean;
  archivoCapturado: any;
  
  applyForm = new FormGroup({
    nombre: new FormControl(''),
    descripcion: new FormControl(''),
    precio: new FormControl<number>(null),
    inventario: new FormControl<number>(null),
    categoria: new FormControl<string>(''),
    imagen: new FormControl<File>(null)
  });
    
  constructor(private userService: UserService, private router: Router, private route: ActivatedRoute, private productoService: ProductoService) {}

  ngOnInit() {
    this.filteredOptions = this.applyForm.valueChanges.pipe(
      startWith(''),
      map(value => {
        const name = typeof value === 'string' ? value : value?.categoria;
        return name ? this._filter(name as string) : this.options.slice();
      }),
    );
  }
  private _filter(name: string): Categoria[] {
    const filterValue = name.toLowerCase();
    return this.options.filter(option => option.name.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    this.loading = true;
    const form = this.applyForm.value;
    const storage = getStorage();
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id)
    const storageRef = ref(storage, id + '.' + this.archivoCapturado.type.substring(6));
    const autor = this.userService.currentUserSig().ID
    
    if (form.imagen == null) {
      const obj = {"ID": id, "nombre": form.nombre, "categoria": form.categoria,
          "precio": form.precio, "inventario": form.inventario, "descripcion": form.descripcion, "imagen": "", "autor": autor
        };
        this.productoService.updateProducto(obj).then(() => {this.router.navigate(['/home/sell/list'], { relativeTo: this.route });})
    } else {
      uploadBytes(storageRef, this.archivoCapturado).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      }).then(() => {
        getDownloadURL(ref(storage, id + '.' + this.archivoCapturado.type.substring(6))).then((url) => {
          const obj = {"ID": id, "nombre": form.nombre, "categoria": form.categoria,
            "precio": form.precio, "inventario": form.inventario, "descripcion": form.descripcion, "imagen": url, "autor": autor
          };
          this.productoService.updateProducto(obj).then(()=>{this.router.navigate(['/home/sell/list'], { relativeTo: this.route });});
        }).catch((err) => {
          console.error(err);
          this.loading = false;
        })
      })
    }
    this.loading = false;
  }


  displayFn(categoria: Categoria): string {
    return categoria && categoria.name ? categoria.name : '';
  }
  capturar(event): any{
    this.loading = true;
    this.archivoCapturado = event.target.files[0];
    console.log(this.archivoCapturado.type.substring(6));
    this.loading = false;
  }
}