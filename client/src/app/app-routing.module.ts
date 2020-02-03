import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { HomeComponent } from './home/home.component';
import { ExpComponent } from './exp/exp.component';
import { AdminComponent } from './admin/admin.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { RoleGuardService as RoleGuard } from './role-guard.service';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'portfolio',
    component: PortfolioComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'cv',
    component: ExpComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [RoleGuard], 
     data: { 
       expectedRole: 'admin'
     }  
  },
  {
    path: 'connectez-vous',
    component: AuthFormComponent 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
