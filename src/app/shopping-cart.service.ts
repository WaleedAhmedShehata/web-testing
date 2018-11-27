
import { Observable } from "rxjs";
import { Product } from 'src/app/models/product';
import { AngularFireDatabase } from 'angularfire2/database';
import { Injectable, Input } from '@angular/core';
import { ShoppingCart } from './models/shopping-cart';
import { ShoppingCartItem } from './models/shopping-cart-item';
import {map } from 'rxjs/operators/map';
import { take } from 'rxjs/operators/take';




@Injectable({
  providedIn: 'root'
})

export class ShoppingCartService {
   @Input(' quantity')  quantity: ShoppingCartItem;

   items: ShoppingCartItem[] = [];

    constructor(private db:AngularFireDatabase) { }

   async getCart():Promise<Observable<ShoppingCart>>  {
     let cartId =  await this.getOrCreateCartId();
     return this.db.object('/shopping-carts/' + cartId)
     .snapshotChanges().pipe(
         map( (x) => new ShoppingCart(x.items))
      )   
   }

  async addToCart(product: Product) {

    this.updateItem(product, 1);
 }

 async removeFromCart(product:Product) {
  
   this.updateItem(product, -1);
 }
  async clearCart(){

    let cartId = await this.getOrCreateCartId();
     this.db.object('/shopping-carts/' + cartId + '/items').remove();

   }

  private create(){

   return this.db.list('/shopping-carts').push({

   dataCreated: new Date().getTime() 

   });

  }
 
  private getItem(cartId:string , productId: string) {
     return this.db.object('/shopping-carts/' + cartId  + '/items/' + productId);
  }
     
   private async  getOrCreateCartId(): Promise<string> {
         
   let cartId = localStorage.getItem('cartId');
                                                
                  //if you have shopping cart
         if (cartId) return cartId;

         // if not found call firebase by generate service
         let result = await this.create();
         localStorage.setItem('cartId' , result.key);
         return result.key;
   }

  private async updateItem(product:Product , change: number){

    let cartId = await this.getOrCreateCartId();
     let item$ = this.getItem(cartId, product.$key); 
    item$.snapshotChanges().pipe(take(1)).subscribe( item=>{

    //  let quantity = (item.quantity || 0) + change;
     let quantity = 1;

     if (quantity === 0) item$.remove();
     else item$.update({
       title: product.title,
       imageUrl: product.imageUrl,
       price: product.price,
      //  quantity: quantity
      });   
    });
 
  }

}
  