import { Component, OnInit } from '@angular/core';
import { GenService } from '../gen.service';
import { FormBuilder } from '@angular/forms';
import { Experience } from '../experience';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-exp',
  templateUrl: './admin-exp.component.html',
  styleUrls: ['./admin-exp.component.scss']
})
export class AdminExpComponent implements OnInit {

  expId: number

  myExperience = this.fb.group({
    id: [' '],
    title: [' '],
    society: [' '],
    description: [' '],
    date: [' ']
  });

  constructor(private genService: GenService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.getExperience();
  }

  selectExperience(event) {
    this.expId = parseInt(event.target.value)
    console.log(this.expId);
  }

  getExperience(){
    this.genService.getExperience().subscribe((response: any) => {
      this.genService.exp = response;
    })
  };

  onSubmit() {
    // Modify Experience

    const experience = new Experience();
    experience.id = this.expId
    experience.title = this.myExperience.value.title;
    experience.society = this.myExperience.value.society;
    experience.description = this.myExperience.value.description;
    experience.date = this.myExperience.value.date;
    experience.user_id = 1;
    console.log(experience)

    this.genService.updateExperience(experience).subscribe((result: Experience) => {
      return result
   });  

   this.router.navigate(['/cv'])


  }

}
