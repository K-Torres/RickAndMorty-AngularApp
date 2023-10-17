import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { Episode } from 'src/app/types/app.type';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
  styleUrls: ['./episode-detail.component.css'],
})
export class EpisodeDetailComponent implements OnInit {
  episode: Episode = {} as Episode;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const episodeId = params['id'];
      this.http
        .get<Episode>(`https://rickandmortyapi.com/api/episode/${episodeId}`)
        .pipe(
          catchError((error) => {
            this.error = this.errorHandlerService.handleHttpError(error);
            this.loading = false;
            console.error('Error:', this.error);
            return throwError(this.error);
          })
        )
        .subscribe((data: Episode) => {
          this.episode = data;
          this.loading = false;
        });
    });
  }
}
