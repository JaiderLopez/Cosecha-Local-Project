import { Injectable } from '@angular/core';
import { Firestore, collectionData } from '@angular/fire/firestore';
import { Producto } from '../producto';
import { collection, addDoc, setDoc, doc, getDoc, deleteDoc } from 'firebase/firestore';
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
  getProductos(): Observable<Producto[]> {
    const Ref = collection(this.firestore, 'productos');
    return collectionData(Ref, { idField: 'id' }) as Observable<Producto[]>;
  }
  async deleteProducto(id:any) {
    await deleteDoc(doc(this.firestore, "productos", id));
  }
  async updateProducto(producto: Producto) {
    const Ref = doc(this.firestore, 'productos', producto.ID);
    await setDoc(Ref, producto);
  }

  async getProductoByID(id:any) {
    const docRef = doc(this.firestore, "productos", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      console.log("No such document!");
      return undefined
  }
  }
}
