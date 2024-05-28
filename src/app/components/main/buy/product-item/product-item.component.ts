import { Component, Input, OnInit } from "@angular/core";
import { Producto } from "../../../../producto";
import { NgFor } from "@angular/common";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { Url } from "url";

@Component ({
    selector: 'app-product-item',
    standalone: true,
    imports: [NgFor],
    templateUrl: './product-item.component.html',
    styleUrl:  './product-item.component.css'
})


export class ProductItemComponent implements OnInit{
    @Input() producto: Producto | undefined;
    
    ngOnInit(): void {
        console.log(this.producto);
        /*const storage = getStorage();
        getDownloadURL(ref(storage, this.producto.imagen))
        .then((url) => {
            // Or inserted into an <img> element
            const img = document.getElementById('myimg');
            img.setAttribute('src', url);
            console.log('imagen puesta');
            console.log(url);
        })
        .catch((error) => {
            console.error(error);
        });*/
        
    }
}