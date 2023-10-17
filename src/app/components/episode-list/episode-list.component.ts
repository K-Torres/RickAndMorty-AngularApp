import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { Episode } from 'src/app/types/app.type';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-episode-list',
  templateUrl: './episode-list.component.html',
  styleUrls: ['./episode-list.component.css'],
})
export class EpisodeListComponent implements OnInit {
  episodes: Episode[] = [];
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
      .get<{ results: Episode[] }>('https://rickandmortyapi.com/api/episode')
      .pipe(
        catchError((error) => {
          this.error = this.errorHandlerService.handleHttpError(error);
          this.loading = false;
          console.error('Error:', this.error);
          return throwError(this.error);
        })
      )
      .subscribe((data: { results: Episode[] }) => {
        this.episodes = data.results;
        this.loading = false;
      });
  }

  showEpisodeDetails(episodeId: number) {
    this.router.navigate(['episode', episodeId]);
  }

  performSearch(searchTerm: string) {
    this.http
      .get<{ results: Episode[] }>(
        `https://rickandmortyapi.com/api/episode?name=${searchTerm}`
      )
      .pipe(
        catchError((error) => {
          this.error = this.errorHandlerService.handleHttpError(error);
          console.error('Error:', this.error);
          this.loading = false;
          return throwError(this.error);
        })
      )
      .subscribe((data: { results: Episode[] }) => {
        this.episodes = data.results;
        this.loading = false;
      });
  }
}
