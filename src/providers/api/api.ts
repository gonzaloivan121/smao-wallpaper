import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ApiProvider {

  url: string = "assets/imgs/wallpapers/wallpapers.json";
  headers: HttpHeaders = new HttpHeaders({
    "Content-Type": "application/json"
  });

  constructor(public http: HttpClient) {
    
  }

  get(id?: number) {
    let newUrl: string = id ? this.url + "?id=" + id : this.url;

    return new Promise((resolve, reject) => {
      this.http.get(newUrl, { headers: this.headers })
      .subscribe(
        data => {
            resolve(data);
        },
        err => {
            reject(err);
        }
      )
    });
  }

}
