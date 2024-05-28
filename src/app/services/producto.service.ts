import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Producto } from '../producto';
import { collection, addDoc } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private firestore: Firestore) { }

  addProduct(producto: Producto) {
    const productRef = collection(this.firestore, 'productos');
    return addDoc(productRef, producto);
  }
  getProducto(): Observable<Producto[]> {
    const placeRef = collection(this.firestore, 'productos');
    return collectionData(placeRef, { idField: 'id' }) as Observable<Producto[]>;
  }
}
