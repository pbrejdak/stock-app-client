import { Injectable, OnDestroy } from "@angular/core";
import { Constants } from "../classes/constants";
import { User } from "../classes/models/user.model";
import { BehaviorSubject, ReplaySubject, Observable } from "rxjs";
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

  ngOnDestroy() {
    this.loggedUserSource.complete();
  }

  logout() {
    sessionStorage.clear();
    this.loggedUserSource.next(null);
  }

  login(email: string, password: string) {}

  register(registerForm: RegisterForm) {}
}
