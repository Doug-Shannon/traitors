import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers';
import * as AuthActions from '../../actions/auth.actions';
import {AuthState} from '../../reducers/auth.reducer';
import { filter, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private store: Store<AppState>, private router: Router) { }
  private auth;

  ngOnInit() {
    this.auth = this.store.select('auth').pipe(
      filter((auth: AuthState) => !auth.loading && !!auth.user.uid),
      take(1)
    ).subscribe((auth: AuthState) => {
      this.router.navigate(auth.redirectUrlSegment);
    });
  }

  ngOnDestroy() {
    console.log('destroyed');
    this.auth.unsubscribe();
  }

  login() {
    this.store.dispatch(new AuthActions.Login());
  }

}
