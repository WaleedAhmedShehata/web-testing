import { ShoppingCartComponent } from './../shopping-cart/shopping-cart.component';
import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {
 
  @Input ('product') product:Product;    // علشان يستخدم حجات اللي فيها
  @Input ('show-actions') showActions =true;     //by default
  @Input ('shopping-cart') ShoppingCartComponent: ShoppingCart;  //input property

  constructor(private cartService:ShoppingCartService) { }

  addToCart() {

   this.cartService.addToCart(this.product);
      
  } 
 
}
 