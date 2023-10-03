import { Injectable } from '@angular/core';
import { Cart } from '../shared/models/cart';
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/food';
import { CartItem } from '../shared/models/cartItem';

@Injectable({
  providedIn: 'root'
})
export class CartService {
private cart:Cart = new Cart();
private cartSubject : BehaviorSubject<Cart> = new  BehaviorSubject(this.cart)
  constructor() { }

  
  addToCart(food: Food): void {
    let cartItem = this.cart.items
      .find(item => item.food.id === food.id);
    if (cartItem)
      return;

    this.cart.items.push(new CartItem(food));   
    this.setcarttoLocalStorage();
  }

  removefromcart(foodid:string):void{
    this.cart.items = this.cart.items.filter(item=>item.food.id != foodid)
    this.setcarttoLocalStorage();
  }

  changequantity(foodid:string,quantity:number){
 let cartItem = this.cart.items.find(item=>item.food.id === foodid)
 if(!cartItem)
 return;
 cartItem.quantity=quantity;
  cartItem.price= quantity*cartItem.food.price;
  this.setcarttoLocalStorage();
  }

  clearcart(){
    this.cart = new Cart();
    this.setcarttoLocalStorage();
  }

  getCartObservable():Observable<Cart>{
    return this.cartSubject.asObservable();
  }

  private setcarttoLocalStorage():void{
    this.cart.totalPrice = this.cart.items.reduce((prevSum,currentitem)=> prevSum + currentitem.price,0)
    this.cart.totalcount=this.cart.items.reduce((prevSum,currentitem)=>prevSum+currentitem.quantity,0)

    const cartJson = JSON.stringify(this.cart)
    localStorage.setItem('Cart',cartJson);
    this.cartSubject.next(this.cart);
  }


  private getcartFromLocalStorage():Cart{
    const cartJson =localStorage.getItem('Cart');
    return cartJson ?JSON.parse(cartJson) : new Cart();
  }

}
