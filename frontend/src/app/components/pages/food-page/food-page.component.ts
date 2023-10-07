import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { FoodServiceService } from 'src/app/services/food-service.service';
import { Food } from 'src/app/shared/models/food';

@Component({
  selector: 'app-food-page',
  templateUrl: './food-page.component.html',
  styleUrls: ['./food-page.component.css'],
})
export class FoodPageComponent implements OnInit {
  food!: Food;
  constructor(activatedRoute: ActivatedRoute, foodservice: FoodServiceService ,private router:Router,private cart:CartService) {
    activatedRoute.params.subscribe((params) => {
      if (params.id) this.food = foodservice.getfodbyid(params.id);
    });
  }

  ngOnInit():void{
    
  }
  addToCart(){
    this.cart.addToCart(this.food)
    this.router.navigateByUrl('/cart-page')
  }



  }
 


