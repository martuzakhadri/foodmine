import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_foods } from 'src/data';

@Injectable({
  providedIn: 'root'
})
export class FoodServiceService {

  constructor() { }
  getAll():Food[]{
    return sample_foods;
  }
  
}
