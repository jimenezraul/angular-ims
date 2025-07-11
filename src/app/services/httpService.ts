import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HttpService {
  protected apiUrl = environment.apiUrl;
  constructor(protected http: HttpClient) {}
}