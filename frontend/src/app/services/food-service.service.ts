import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_foods, sample_tags } from 'src/data';
import { Tag } from '../shared/models/tag';

@Injectable({
  providedIn: 'root'
})
export class FoodServiceService {

  constructor() { }
  getAll():Food[]{
    return sample_foods;
  }
  getAllFoodsBySearchTerm(searchTerm:string){
    return this.getAll().filter((food)=>food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  getalltags():Tag[]{
    return sample_tags;
  }
  getallfoodbytags(tag:string):Food[]{
    return tag== 'All'?
    this.getAll():
    this.getAll().filter(food=>food.tags?.includes(tag))
  }

  getfodbyid(foodid:string):Food{
    return this.getAll().find(food=> food.id == foodid) ?? new Food();
  }

}
