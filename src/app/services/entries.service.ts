import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITodoEntry } from '../interfaces/todo-entry.interface';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {

  constructor(private http: HttpClient) { }

  getEntries() {
    const url = `https://jsonplaceholder.typicode.com/todos/`
    return this.http.get<ITodoEntry[]>(url)
  }
}
