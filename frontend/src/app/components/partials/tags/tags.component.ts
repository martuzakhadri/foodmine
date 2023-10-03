import { Component } from '@angular/core';
import { FoodServiceService } from 'src/app/services/food-service.service';
import { Tag } from 'src/app/shared/models/tag';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css']
})
export class TagsComponent {
tags?:Tag[]
constructor(foodservice:FoodServiceService){
  this.tags=foodservice.getalltags();
}
}
