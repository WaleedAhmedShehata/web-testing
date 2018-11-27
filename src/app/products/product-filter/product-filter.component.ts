import { CategoryService } from 'src/app/category.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  categories;
  @Input ('category') category;

  constructor(CategoryService:CategoryService) { 
      CategoryService.getAll().subscribe(res=>{
        this.categories = res;
    });
  }

  ngOnInit() {
  }

  getCategory(category){

  }
}
