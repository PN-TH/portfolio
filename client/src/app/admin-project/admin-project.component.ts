import { Component, OnInit } from '@angular/core';
import { Portfolio } from '../portfolio';
import { GenService } from '../gen.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-admin-project',
  templateUrl: './admin-project.component.html',
  styleUrls: ['./admin-project.component.scss']
})
export class AdminProjectComponent implements OnInit {
  
  projectId: number;
  projects: Portfolio[]

  myProject = this.fb.group({
    id: [' ']
  });

  constructor(private genService: GenService, private fb: FormBuilder) { }

  ngOnInit() {
    this.getPortfolio();
  }

  getPortfolio(){
    this.genService.getPortfolio().subscribe((response: any) => {
      this.genService.works = response;
    })
  };
  
  selectExperience(event) {
    this.projectId = parseInt(event.target.value)
    console.log(this.projectId);
  }

  onSubmit(){
    

    this.genService.deleteProject(this.projectId).subscribe(()=>{
      console.log("success");
 }); }

}
