import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITodoEntry } from '../interfaces/todo-entry.interface';

@Injectable({
  providedIn: 'root'
})
export class EntriesService {
  url = `https://jsonplaceholder.typicode.com/todos/`
  headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=UTF-8' })
  

  constructor(private http: HttpClient) { }

  getEntries() {
    return this.http.get<ITodoEntry[]>(this.url)
  }

  addEntry(entry: ITodoEntry) {
    return this.http.post(this.url, entry, { headers: this.headers})
  }

  modifyEntry(entry: ITodoEntry) {
    const url = this.url + entry.userId
    return this.http.put(url, entry, { headers: this.headers})
  }
}
