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
        
    }
}