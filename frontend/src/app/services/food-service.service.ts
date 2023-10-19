import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { Tag } from '../shared/models/tag';
import { HttpClient } from '@angular/common/http';
import { FOODS_BY_SEARCH_URL, FOODS_BY_TAG_URL, FOODS_TAGS_URL, FOODS_URL, FOOD_BY_ID_URL } from '../shared/constants/urls';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FoodServiceService {

  constructor( private http: HttpClient) { }
  getAll(): Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_URL)
  }
  getAllFoodsBySearchTerm(searchTerm:string){
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm)
  }

  getalltags(): Observable <Tag[]>{
    return this.http.get<Tag[]>(FOODS_TAGS_URL)
  }
  getallfoodbytags(tag:string):Observable <Food[]>{
    return tag== 'All'?
    this.getAll():
   this.http.get<Food[]>(FOODS_BY_TAG_URL + tag);
  }

  getfodbyid(foodid:string):Observable <Food>{
    return this.http.get<Food>(FOOD_BY_ID_URL +foodid)
  }

}
