import { API_URL } from './constants';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl: string = `${API_URL}/users`;

  connectedUser: User;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {
    if (this.authService.getToken()) {
      this.loadUser().subscribe(result => {
        this.connectedUser = result;
      });
    }
  }

  /**
   * Load the user from the api. Store it in the user service.
   */
  loadUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/me`,
    )
      .pipe(
        tap(result => {
          this.connectedUser = result;
        })
      );
  }

}