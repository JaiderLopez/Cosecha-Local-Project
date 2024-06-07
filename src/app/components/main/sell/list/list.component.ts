import { Component } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { ProductoService } from '../../../../services/producto.service';
import { NgFor } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { error } from 'console';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  constructor (private userService: UserService, private productoService: ProductoService, private router: Router, private route: ActivatedRoute) {}
  productos: any[] = [];
  trackBy(index,obj)
  {
    return index
  }
  ngOnInit() {
    this.getProductos();
  }

  getProductos() {
    this.productoService.getProductos().subscribe((data) => {
      data.forEach((element:any) => {
        if (element.autor == this.userService.currentUserSig().ID){
          this.productos.push(element);
        }
      })
    })
  }

  async eliminar(id:any) {
    await this.productoService.deleteProducto(id).then(() => {
      console.log('producto eliminado');
      location.reload()
    }).catch((err) => {
      console.error(err)
    }) 
  }
}
