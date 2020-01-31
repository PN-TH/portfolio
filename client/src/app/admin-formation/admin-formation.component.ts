import { Component, OnInit } from '@angular/core';
import { GenService } from '../gen.service';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Formation } from '../formation';

@Component({
  selector: 'app-admin-formation',
  templateUrl: './admin-formation.component.html',
  styleUrls: ['./admin-formation.component.scss']
})
export class AdminFormationComponent implements OnInit {

  formId: number

  myFormation = this.fb.group({
    id: [''],
    title: [''],
    school: [''],
    description: [''],
    date: ['']
  });

  constructor(private genService: GenService, private fb: FormBuilder, private router: Router) { }

  ngOnInit() {
    this.getFormations();
  }

  selectFormation(event) {
    this.formId = parseInt(event.target.value)
    console.log(this.formId);
  }

  getFormations(){
    this.genService.getFormation().subscribe((response: any) => {
      this.genService.formations = response;
    })
  };

  onSubmit() {
    // Modify Formation

    const formation = new Formation();
    formation.id = this.formId
    formation.title = this.myFormation.value.title;
    formation.school = this.myFormation.value.society;
    formation.description = this.myFormation.value.description;
    formation.date = this.myFormation.value.date;
    formation.user_id = 1;

    this.genService.updateFormation(formation).subscribe((result: Formation) => {
      return result
   });  

   this.router.navigate(['/cv'])


  }

}
