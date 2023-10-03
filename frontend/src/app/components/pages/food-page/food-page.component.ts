import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodServiceService } from 'src/app/services/food-service.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css']
})
export class FoodPageComponent {
food!:Food;
  constructor(activatedRoute:ActivatedRoute,foodservice:FoodServiceService){
    activatedRoute.params.subscribe((params)=>{
      if(params.id)
this.food=foodservice.getfodbyid(params.id)
    })
  }
}
