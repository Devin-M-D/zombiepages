import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ReplaySubject } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


import { ApiService } from './api.service';
import { Zombie } from '../models';

@Injectable()
export class ZombieService {
  private currentUserSubject = new BehaviorSubject<Zombie>(new Zombie());
  public currentUser = this.currentUserSubject.asObservable().distinctUntilChanged();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  constructor (
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  authorize(type, credentials){
    let route = (type === 'join') ? '/create' : '';
    return this.apiService.post('/zombies' + route, {user: credentials});
    // .map(data => {return data;});
  }
}
