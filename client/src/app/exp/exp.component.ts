import { Component, OnInit } from '@angular/core';
import { GenService } from '../gen.service';
import { User } from '../user';

@Component({
  selector: 'app-exp',
  templateUrl: './exp.component.html',
  styleUrls: ['./exp.component.scss']
})
export class ExpComponent implements OnInit {

  user: User = this.genService.user[0]

  constructor(private genService: GenService) { }

  ngOnInit() {
    this.getExperience();
    this.getFormation();
    this.getUser();
  }

  getExperience(){
    this.genService.getExperience().subscribe((response: any) => {
      this.genService.exp = response;
    })
  };

  getFormation(){
    this.genService.getFormation().subscribe((response: any) => {
      this.genService.formations = response;
    })
  };

  getUser(){
    this.genService.getUsers().subscribe((response: any) => {
      this.genService.user = response;
      console.log(response)
    })
  };

}
