import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Portfolio } from './portfolio';
import { Experience } from './experience';
import { Formation } from './formation';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class GenService {

  works: Portfolio[] = []
  exp: Experience[] = []
  formations: Formation[] = []
  user: User[] = []

  private baseUrl = 'http://localhost:3000'

  constructor(private http : HttpClient) { }



  getPortfolio(): Observable<any> {
    return this.http.get(`${this.baseUrl}/portfolios`);
  }

  getExperience(): Observable<any> {
    return this.http.get(`${this.baseUrl}/experiences`);
  }

  getFormation(): Observable<any> {
    return this.http.get(`${this.baseUrl}/formations`);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}/users`);
  }

  addProject(portfolio: Portfolio){
    return this.http.post(`${this.baseUrl}/portfolios`, portfolio);
  };

  updateExperience(experience: Experience): Observable<any> {
    return this.http.put<Experience>(`${this.baseUrl}/experiences/${experience.id}`, experience);
  };

  updateFormation(formation: Formation): Observable<any> {
    return this.http.put<Formation>(`${this.baseUrl}/formations/${formation.id}`, formation);
  };

  deleteProject (id: number): Observable<{}> {
    const url = `${this.baseUrl}/portfolios/${id}`; // DELETE api/heroes/42
    return this.http.delete(url) }

}


