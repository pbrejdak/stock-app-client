import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService) {}

  private readonly passwordRegex = /[A-Za-z0-9,!@#\$\%\^&\*\.]{8,}/;
  private readonly nameRegex = /[\w]{2,}/;
  private readonly emailRegex = /[\w]{2,}/;

  loginForm: FormGroup = null;
  registerForm: FormGroup = null;

  ngOnInit() {
    this.buildLoginForm();
    this.buildRegisterForm();
  }

  private buildLoginForm() {
    this.loginForm = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(this.passwordRegex)
      ])
    });
  }

  private buildRegisterForm() {
    this.registerForm = new FormGroup({
      name: new FormControl("", [
        Validators.required,
        Validators.pattern(this.nameRegex)
      ]),
      surname: new FormControl("", [
        Validators.required,
        Validators.pattern(this.nameRegex)
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(this.emailRegex)
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern(this.passwordRegex)
      ]),
      confirmPassword: new FormControl("", [
        Validators.required,
        Validators.pattern(this.passwordRegex)
      ]),
      cash: new FormControl("", [Validators.required, Validators.min(0)])
    });
  }

  login() {
    const { email, password } = this.loginForm.value;
    this.auth.login(email, password);
  }

  register() {
    const register = this.registerForm.value;
    delete register.confirmPassword;

    this.auth.register(register);
  }
}
