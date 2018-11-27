import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent  {
   
  @Input ('product') product:Product;    // علشان يستخدم حجات اللي فيها
  @Input ('shopping-cart') ShoppingCartComponent;  //input property

  constructor(private cartService:ShoppingCartService) { }

  addToCart() {

   this.cartService.addToCart(this.product);
      
  } 

  removeFromCart(){

   this.cartService.removeFromCart(this.product);

  }

 

  

  
}
