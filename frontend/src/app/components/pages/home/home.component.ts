import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
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
    let foodsobservale :Observable<Food[]>;
    activatedRoute.params.subscribe((params:any)=>{
      if(params.searchTerm)
     foodsobservale=this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
    else if(params.tag)
   foodsobservale=this.foodService.getallfoodbytags(params.tag)
    else
   foodsobservale = foodService.getAll(); 
  foodsobservale.subscribe((severfoods)=>{
    this.foods=severfoods;
  })
    })

   
  }

}
