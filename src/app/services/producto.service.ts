import { Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { Producto } from '../producto';
import { collection, addDoc } from 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private firestore: Firestore) { }

  addProduct(producto: Producto) {
    const productRef = collection(this.firestore, 'productos2');
    return addDoc(productRef, producto);
  }
}
