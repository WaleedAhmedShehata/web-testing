import { AngularFireDatabase, AngularFireObject, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  product: {};
  productId: string;
  constructor(private db: AngularFireDatabase) { }


  create(product) {

    console.log('products',product);
    
    return this.db.list('/products').push(product);
  }

  getAll() {
    return this.db.list('/products');
  }



  get(productId) {

    return this.db.object('/products/' + productId);
  }

  update(productId, product) {

    return this.db.object('/products/' + productId).update(product);
  }

  delete(prductId) {

    return this.db.object('/products/' + prductId).remove();
  }

}
