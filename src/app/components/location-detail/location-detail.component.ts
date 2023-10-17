import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { Location } from 'src/app/types/app.type';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
  styleUrls: ['./location-detail.component.css'],
})
export class LocationDetailComponent implements OnInit {
  location: Location = {} as Location;

  loading: boolean = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const locationId = params['id'];
      this.http
        .get<Location>(`https://rickandmortyapi.com/api/location/${locationId}`)
        .pipe(
          catchError((error) => {
            this.error = this.errorHandlerService.handleHttpError(error);
            this.loading = false;
            console.error('Error:', this.error);
            return throwError(this.error);
          })
        )
        .subscribe((data: any) => {
          this.location = data;
          this.loading = false;
        });
    });
  }
}
