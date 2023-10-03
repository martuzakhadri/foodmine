import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  implements OnInit{
searchTerm='';

constructor(activatedRoute:ActivatedRoute,private route:Router){
  activatedRoute.params.subscribe((params:any)=>{
    if(params.searchTerm) 
    this.searchTerm= params.searchTerm;
  })
}
ngOnInit(){

}

search(term:string){
  if(term)
  this.route.navigateByUrl('/search/'+term)
}
}
