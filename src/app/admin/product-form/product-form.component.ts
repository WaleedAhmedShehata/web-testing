
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/category.service';
import {  AngularFireDatabase } from 'angularfire2/database';
import { ProductService } from 'src/app/product.service';
import { Router, ActivatedRoute } from '@angular/router';


@Component({  
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

   categories;
   product= {};
   productId: string;
   id;
   

  constructor( 
    db:AngularFireDatabase,
    private router:Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService ,
    private productService:ProductService) {
    
      this.categoryService.getAll().subscribe(res=>{
       this.categories = res;
     });
   
     console.log(this.categories);
     
     this.id = this.route.snapshot.paramMap.get('id');
     if(this.id) this.productService.get(this.id).snapshotChanges().pipe(take(1)).subscribe(p => this.product=p);

  }

    save(product){

     if (this.id) this.productService.update(this.id , product); 
      else this.productService.create(product);

     this.router.navigate(['/admin/products']);

    }
     
    delete(){

      if (!confirm('Are you sure you want to delete this product')) return; 
         this.productService.delete(this.id);
         this.router.navigate(['/admin/products']);

    }

 
  ngOnInit() {

  }

}
