import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  user!: User;
  cartquantity = 0;
  constructor(cartservice: CartService, private userservice: UserService) {
    cartservice.getCartObservable().subscribe((cart) => {
      this.cartquantity = cart.totalcount;
    });
    userservice.userObservable.subscribe((newuser) => {
      this.user = newuser;
    });
  }
  logout(){
    this.userservice.logout();
  }
  get isAuth(){
    return this.user.token;
  }
}
