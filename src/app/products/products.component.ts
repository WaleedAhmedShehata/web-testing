import { snapshotChanges } from 'angularfire2/database';

import { ShoppingCartService } from './../shopping-cart.service';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/product';
import  'rxjs/add/operator/switchMap'
import { Router } from "@angular/router";
import {  Observable } from 'rxjs';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit  {
  
  products: Product []=[];
  filteredProducts: Product[]=[];
  _newProoduct;
  category: string;
  cart$: Observable<ShoppingCart>;

  constructor(
    private route:ActivatedRoute,
    private productService:ProductService,
    private shoppingCartService:ShoppingCartService
    
    ) {

  }

   async ngOnInit(){
    this.cart$= await this.shoppingCartService.getCart(); 
    this.populateProducts();
  
  }

   private populateProducts(){
    this._newProoduct=this.productService.getAll().valueChanges()
    this._newProoduct
    .switchMap(products => {
     this.products=products;
     return this.route.queryParamMap;
    })

   .subscribe(params => {
   this.category = params.get('category');
   this.applyFilter();
   });
   }
  private applyFilter(){
    
    this.filteredProducts = (this.category) ?  //filter 
    this.products.filter(p => p.caegory === this.category) :
    this.products;
    
  }
}


