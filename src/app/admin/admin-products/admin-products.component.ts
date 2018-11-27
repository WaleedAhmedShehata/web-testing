import { ProductService } from 'src/app/product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
    products: Product [];
    filteredProducts : any[];
    subscription:Subscription;
  constructor(private ProductService:ProductService) {
    this.subscription = this.ProductService.getAll().valueChanges()
    .subscribe(products => this.filteredProducts=products);
   }

   
   transform(items: any[], filterQuery: any): any[] {
    if (!filterQuery) return items;
    return items.filter(item => item.whateverProperty.toLowerCase().includes(filterQuery.toLowerCase()));
  }


   ngOnDestroy(){
    
    this.subscription.unsubscribe();
   }

  ngOnInit() {
  }

}
