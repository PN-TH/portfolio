
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import decode from 'jwt-decode';
import { API_URL } from './constants';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = `${API_URL}/users`;

  constructor(private http: HttpClient, private router: Router) { }

  /**
   * Make the api call for the authentification.
   * Store credentials (token and email) into localstorage.
   * @param email user email
   * @param password user password
   */

  addUser(newUser){
      console.log(newUser)
    return this.http.post(`${this.baseUrl}/register`, newUser).pipe(
      tap(results => {
          if (results) {
              this.storeCredentials(results);
            
        }
      })
    );

  }


  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, {
      email,
      password,
    }).pipe(
      tap(results => {
          if (results) {
              this.storeCredentials(results);
          }
      })
    );
  }



  /**
   * Return token from local storage
   */
  getToken() {
    return localStorage.getItem('token');
  }

  /**
   * Store credentials in the browser local storage.
   * @param credentials javascript object which contain token and email
   */
  private storeCredentials(credentials) {
    if (credentials.token) {
      localStorage.setItem('token', credentials.token);
    }
    if (credentials.email) {
      localStorage.setItem('email', credentials.email);
    }
    if (credentials.role) {
      localStorage.setItem('role', credentials.role);
    }
  };


  getRole(){
    const token = localStorage.getItem('token');
    // decode the token to get its payload
    if (!token) {
        return false}

    const tokenPayload = decode(token);

    return tokenPayload.role === 'admin'

  };

  




}
