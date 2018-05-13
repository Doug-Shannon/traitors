// Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Libraries
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
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

// Guards
import { AuthGuard } from './guards/auth.guard';

// Material Design
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule, MatMenuModule, MatIconModule } from '@angular/material';
import { AngularFirestore } from 'angularfire2/firestore';
import { GameCardComponent } from './components/game-card/game-card.component';
import { GameDashboardComponent } from './components/game-dashboard/game-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SplashComponent,
    GameCardComponent,
    GameDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([AuthEffects, GamesEffects]),
    MatCardModule,
    MatButtonModule,
    MatGridListModule,
    MatMenuModule,
    MatIconModule
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
