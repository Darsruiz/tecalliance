import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  fetchUsers() {
    const url = "https://jsonplaceholder.typicode.com/users"
    return this.http.get<IUser[]>(url)
  }
}
