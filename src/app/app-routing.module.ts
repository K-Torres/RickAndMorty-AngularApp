import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { LocationDetailComponent } from './components/location-detail/location-detail.component';
import { LocationListComponent } from './components/location-list/location-list.component';
import { EpisodeListComponent } from './components/episode-list/episode-list.component';
import { EpisodeDetailComponent } from './components/episode-detail/episode-detail.component';

const routes: Routes = [
    { path: '', redirectTo: "/characters", pathMatch: "full" },
    { path: 'characters', component: CharacterListComponent },
    { path: 'character/:id', component: CharacterDetailComponent },
    { path: 'location/:id', component: LocationDetailComponent },
    { path: 'locations', component: LocationListComponent },
    { path: 'episode/:id', component: EpisodeDetailComponent },
    { path: 'episodes', component: EpisodeListComponent }
  ];

  @NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }