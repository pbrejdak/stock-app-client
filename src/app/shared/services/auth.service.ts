import { Injectable, OnDestroy } from "@angular/core";
import { Constants } from "../classes/constants";
import { User } from "../classes/models/user.model";
import { BehaviorSubject, ReplaySubject, Observable, of } from "rxjs";
import { tap } from 'rxjs/operators';
import { RegisterForm } from "../classes/models/register-form.model";

@Injectable({
  providedIn: "root"
})
export class AuthService implements OnDestroy {
  constructor() {
    this.initService();
  }

  private loggedUserSource: ReplaySubject<User> = new ReplaySubject<User>();
  loggedUser$: Observable<User> = this.loggedUserSource.asObservable();

  redirectUrl: string = '';

  private initService() {
    this.getUser();
  }

  private getUser() {
    if (sessionStorage.getItem(Constants.sessionStorageUserKey)) {
      try {
        const user: User = JSON.parse(
          sessionStorage.getItem(Constants.sessionStorageUserKey)
        );
      } catch (err) {
        this.loggedUserSource.next(null);
      }
    } else {
      this.loggedUserSource.next(null);
    }
  }

  private setLoggedUser(user: User) {
    sessionStorage.setItem(Constants.sessionStorageUserKey, JSON.stringify(user));
    this.loggedUserSource.next(user);
  }

  ngOnDestroy() {
    this.loggedUserSource.complete();
  }

  logout() {
    sessionStorage.clear();
    this.loggedUserSource.next(null);
  }

  login(email: string, password: string) {
    // api call;

    return of(null)
      .pipe(
        tap((loggedUser) => this.setLoggedUser(loggedUser)),
        tap(() => {
          this.redirectUrl ? this.router.navigate(this.redirectUrl) : this.router.navigate('/dashboard');
          this.redirectUrl = '';
        })
      );
  }

  register(registerForm: RegisterForm) {
    return of(null)
      .pipe(
        tap((loggedUser) => this.setLoggedUser(loggedUser)),
        tap(() => {
          this.redirectUrl ? this.router.navigate(this.redirectUrl) : this.router.navigate('/dashboard');
          this.redirectUrl = '';
        })
      );
  }
}
