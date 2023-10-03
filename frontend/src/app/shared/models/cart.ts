import { CartItem } from "./cartItem";

export class Cart{
    items:CartItem[]=[];
    totalPrice:number=0;
    totalcount:number = 0;
}