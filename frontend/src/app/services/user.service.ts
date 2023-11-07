import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/user';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { USER_LOGIN_URL } from '../shared/constants/urls';
import { ToastrService } from 'ngx-toastr';
const USERKEY='user';
@Injectable({
  providedIn: 'root',
})

export class UserService {
  
  private usersubject = new BehaviorSubject<User>(this.getuserfromlocalstorage());
  public userObservable: Observable<User>;

  constructor(private http: HttpClient, private toasterService: ToastrService) {
    this.userObservable = this.usersubject.asObservable();
  }

  login(userLogin: IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_URL, userLogin).pipe(
      tap({
        next: (user) => {
        this.setUserToLocalSAtorage(user);
          this.usersubject.next(user);
          this.toasterService.success(
            `welcome to foodmine ${user.name}!`,
            'login successfull'
          );
        },
        error: (errorrespnse) => {
          this.toasterService.error(errorrespnse.error, `login failed`);
        },
      })
    );
  }

  private setUserToLocalSAtorage(user:User){
    localStorage.setItem(USERKEY,JSON.stringify(user))
  }

  private getuserfromlocalstorage():User{
    const userJson = localStorage.getItem(USERKEY);
    if(userJson) return JSON.parse(userJson) as User;
    return new User();

  }

  logout(){
    this.usersubject.next(new User());
    localStorage.removeItem(USERKEY);
    window.location.reload();
  }
}
