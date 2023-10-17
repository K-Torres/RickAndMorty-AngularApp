import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { Location } from 'src/app/types/app.type';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-location-list',
  templateUrl: './location-list.component.html',
  styleUrls: ['./location-list.component.css'],
})
export class LocationListComponent implements OnInit {
  locations: Location[] = [];
  loading: boolean = false;
  error: string | null = null;
  currentPage = 1;
  itemsPerPage = 16;

  constructor(
    private http: HttpClient,
    private router: Router,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.http
      .get<{ results: Location[] }>('https://rickandmortyapi.com/api/location')
      .pipe(
        catchError((error) => {
          this.error = this.errorHandlerService.handleHttpError(error);
          this.loading = false;
          console.error('Error:', this.error);
          return throwError(this.error);
        })
      )
      .subscribe((data: { results: Location[] }) => {
        this.locations = data.results;
        this.loading = false;
      });
  }

  showLocationDetails(locationId: number) {
    this.router.navigate(['location', locationId]);
  }

  performSearch(searchTerm: string) {
    this.http
      .get<{ results: Location[] }>(
        `https://rickandmortyapi.com/api/location?name=${searchTerm}`
      )
      .pipe(
        catchError((error) => {
          this.error = this.errorHandlerService.handleHttpError(error);
          console.error('Error:', this.error);
          this.loading = false;
          return throwError(this.error);
        })
      )
      .subscribe((data: { results: Location[] }) => {
        this.locations = data.results;
        this.loading = false;
      });
  }
}
