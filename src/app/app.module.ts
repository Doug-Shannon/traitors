// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

// Libraries
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { StoreModule, Store } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// Reducers
import { reducers, metaReducers, AppState} from './reducers';
import * as AuthActions from './actions/auth.actions';

// Effects
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import { GamesEffects } from './effects/games.effects';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SplashComponent } from './components/splash/splash.component';
import { GameCardComponent } from './components/game-card/game-card.component';
import { GameDashboardComponent } from './components/game-dashboard/game-dashboard.component';
import { NewGameComponent } from './components/new-game/new-game.component';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Material Design
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material';
import { MatGridListModule, MatMenuModule, MatIconModule, MatFormField } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SplashComponent,
    GameCardComponent,
    GameDashboardComponent,
    NewGameComponent,
  ],
  imports: [
    // ANGULAR
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    // NGRX
    StoreModule.forRoot(reducers, {metaReducers}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AuthEffects, GamesEffects]),
    // FIREBASE
    AngularFireAuthModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    // MATERIAL DESIGN
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    AuthGuard,
    AngularFirestore
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(public store: Store<AppState>) {
    this.store.dispatch(new AuthActions.GetUser());
  }
}
