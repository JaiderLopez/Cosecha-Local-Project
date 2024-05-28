import { Component, OnDestroy, OnInit } from "@angular/core";
import { ProductItemComponent } from "../product-item/product-item.component";
import { ProductoService } from "../../../../services/producto.service";
import { Producto } from "../../../../producto";
import { NgFor } from "@angular/common";
import { Subscription } from "rxjs";

@Component({
    selector: 'app-product-list',
    standalone: true,
    imports: [ProductItemComponent, NgFor],
    templateUrl: './product-list.component.html',
    styleUrl: 'product-list.component.css'
})
export class ProductListComponent implements OnInit, OnDestroy{
    producto: Producto[] = [];
    productoSub: Subscription | undefined;

    constructor(private productoService: ProductoService) {}

    ngOnInit(): void {
        this.productoSub = this.productoService.getProducto()
            .subscribe({
                next: ( producto: Producto[] ) => {
                    this.producto = producto
                    console.log(this.producto)
                },
                error: ( err: any ) => {
                    console.error(err)
                },
                complete: () => {
                    console.log('completado')   
                }
            })
    }

    ngOnDestroy(): void {
        this.productoSub?.unsubscribe()
    }
}