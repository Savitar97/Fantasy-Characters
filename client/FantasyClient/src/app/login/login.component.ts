import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {User} from '../user';
import {LoginService} from '../login.service';
import {HttpHeaders} from '@angular/common/http';
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();
  invalid = false;
  loginForm = new FormGroup({
    user_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  });

  constructor(private root: AppComponent, private loginService: LoginService, private router: Router) {
  }

  ngOnInit(): void {
  }

  checkLogin() {
    this.user = new User();
    this.user.username = this.UserName.value;
    this.user.password = this.Password.value;
    sessionStorage.setItem('username', this.user.username);
    const resp = this.loginService.loggedIn(this.user.username, this.user.password);
    resp.subscribe(data => {
      sessionStorage.setItem('token', 'Bearer ' + data);
      if (data) {
        this.root.authenticated = true;
        this.router.navigate(['view-creator']);
      }
    }, error => {
      console.log(error);
      this.invalid = true;
    });
  }

  get UserName() {
    return this.loginForm.get('user_name');
  }

  get Password() {
    return this.loginForm.get('password');
  }

  authenticated() {
    return this.root.authenticated;
  }

}
