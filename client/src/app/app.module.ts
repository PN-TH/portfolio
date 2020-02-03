import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ExpComponent } from './exp/exp.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { AdminExpComponent } from './admin-exp/admin-exp.component';
import { AdminProjectComponent } from './admin-project/admin-project.component';
import { AdminFormationComponent } from './admin-formation/admin-formation.component';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { RoleGuardService } from './role-guard.service';
import { AuthInterceptor } from './auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    PortfolioComponent,
    ExpComponent,
    AdminUserComponent,
    AdminComponent,
    AdminExpComponent,
    AdminProjectComponent,
    AdminFormationComponent,
    AuthFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [RoleGuardService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
