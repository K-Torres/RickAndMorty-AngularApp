import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ErrorHandlerService } from '../../services/error-handler.service';
import { catchError, throwError } from 'rxjs';
import { Character } from 'src/app/types/app.type';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
  styleUrls: ['./character-detail.component.css'],
})
export class CharacterDetailComponent implements OnInit {
  character: Character = {} as Character;
  loading: boolean = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private errorHandlerService: ErrorHandlerService
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const characterId = params['id'];
      this.http
        .get<Character>(
          `https://rickandmortyapi.com/api/character/${characterId}`
        )
        .pipe(
          catchError((error) => {
            this.error = this.errorHandlerService.handleHttpError(error);
            this.loading = false;
            console.error('Error:', this.error);
            return throwError(this.error);
          })
        )
        .subscribe((data: Character) => {
          this.character = data;
          this.loading = false;
        });
    });
  }
}
