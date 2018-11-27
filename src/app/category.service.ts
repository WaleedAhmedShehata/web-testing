import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private db: AngularFireDatabase) { }
  
  /**
   * all categories
   * 
   * 
   */
  getAll(){
    return this.db.list('/categories').valueChanges();
  }

}



