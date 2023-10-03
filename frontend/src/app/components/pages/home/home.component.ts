import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodServiceService } from 'src/app/services/food-service.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: ' ',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  foods:Food[]=[]
  constructor(private foodService:FoodServiceService,activatedRoute:ActivatedRoute){
    activatedRoute.params.subscribe((params:any)=>{
      if(params.searchTerm)
      this.foods=this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
    else if(params.tag)
    this.foods=this.foodService.getallfoodbytags(params.tag)
    else
    this.foods = foodService.getAll(); 
    })

   
  }

}
