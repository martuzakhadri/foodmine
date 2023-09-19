import { Component } from '@angular/core';
import { FoodServiceService } from 'src/app/services/food-service.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  foods:Food[]=[]
  constructor(private foodService:FoodServiceService){
    this.foods = foodService.getAll(); 
  }

}
