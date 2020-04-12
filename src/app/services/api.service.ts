import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  statsURL = 'https://api.covid19api.com/';
  stats: any;
  statsWorld: any;
  noticias: any;

  constructor(public http: HttpClient) {  }

  getStats() {
    return this.http.get('https://corona-virus-stats.herokuapp.com/api/v1/cases/countries-search?search=nicaragua')
    .pipe(timeout(30000)).toPromise().then((data: any) => {
      this.stats = data.data.rows[0];
    });
  }

  getStatsWorld() {
    return this.http.get('https://corona-virus-stats.herokuapp.com/api/v1/cases/general-stats')
    .pipe(timeout(30000)).toPromise().then((data: any) => {
      this.statsWorld = data.data;
    });
  }

  getNews() {
    return this.http.get('https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fwww.eltiempo.com%2Frss%2Fmundo_latinoamerica.xml')
      .toPromise().then((res: any) => {
        this.noticias = res.items;
    });
  }
}
