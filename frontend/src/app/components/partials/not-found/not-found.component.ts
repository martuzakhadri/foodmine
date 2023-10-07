import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {
  @Input()
  visible = false;
  @Input()
  notFoundMessage = "Cart Is Empty...!";
  @Input()
  resetLinkText = "Go To Home Page";
  @Input()
  resetLinkRoute = "/";
  constructor(){}
  
  ngOnInit():void{

  }
}
