import { Component, OnInit } from '@angular/core';
import { GenService } from '../gen.service';
import { FormBuilder } from '@angular/forms';
import { Portfolio } from '../portfolio';
import { Experience } from '../experience';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {


  myProject = this.fb.group({
    title: [' '],
    image: [' '],
    description: [' '],
    url: [' '],
    theme: [' '],
    techno: [' '],
  });


  constructor(private genService: GenService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.getPortfolio();
  }

  getPortfolio(){
    this.genService.getPortfolio().subscribe((response: any) => {
      this.genService.works = response;
    })
  };

   onSubmit() {
    // Add Project

    const project = new Portfolio();

    project.title = this.myProject.value.title;
    project.image = this.myProject.value.image;
    project.description = this.myProject.value.description;
    project.url = this.myProject.value.url;
    project.theme = this.myProject.value.theme;
    project.techno = this.myProject.value.techno;
    project.collaborateur = 4;
    project.user_id = 1;
    console.log(project);

    this.genService.addProject(project).subscribe((res: any) => {
      this.genService.works.push(res);
      console.log(res)
   }); 
   this.router.navigate(['/portfolio'])

  }



}
