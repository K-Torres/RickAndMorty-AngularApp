import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { Character } from 'src/app/types/app.type';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.css'],
})
export class CharacterListComponent implements OnInit {
  characters: Character[] = [];
  loading: boolean = false;
  error: string | null = null;
  currentPage = 1;
  itemsPerPage = 16;

  constructor(
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading = true;
    this.http
      .get<{ results: Character[] }>(
        'https://rickandmortyapi.com/api/character'
      )
      .pipe(
        catchError((error) => {
          this.error = this.errorHandlerService.handleHttpError(error);
          console.error('Error:', this.error);
          this.loading = false;
          return throwError(this.error);
        })
      )
      .subscribe((data: { results: Character[] }) => {
        this.characters = data.results;
        this.loading = false;
      });
  }

  showCharacterDetails(characterId: number) {
    this.router.navigate(['character', characterId]);
  }

  performSearch(searchTerm: string) {
    this.http
      .get<{ results: Character[] }>(
        `https://rickandmortyapi.com/api/character?name=${searchTerm}`
      )
      .pipe(
        catchError((error) => {
          this.error = this.errorHandlerService.handleHttpError(error);
          console.error('Error:', this.error);
          this.loading = false;
          return throwError(this.error);
        })
      )
      .subscribe((data: { results: Character[] }) => {
        this.characters = data.results;
        this.loading = false;
      });
  }
}
