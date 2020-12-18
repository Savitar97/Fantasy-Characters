import {Component, OnInit} from '@angular/core';
import {AppComponent} from '../app.component';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {RegistrationService} from '../registration.service';
import {User} from '../user';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private root: AppComponent, private router: Router, private service: RegistrationService) {
  }

  user: User = new User();
  submitted = true;

  registrationForm = new FormGroup({
    user_name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
  }

  authenticated() {
    return this.root.authenticated;
  }

  get UserName() {
    return this.registrationForm.get('user_name');
  }

  get Password() {
    return this.registrationForm.get('password');
  }

  get Email() {
    return this.registrationForm.get('email');
  }

  doRegistration(form) {
    this.user = new User();
    this.user.username = this.UserName.value;
    this.user.password = this.Password.value;
    this.user.email = this.Email.value;
    this.user.roles = ['ROLE_CLIENT'];
    this.save();
  }

  save() {
    console.log(this.user);
    this.service.SignUp(this.user.username, this.user.password, this.user.email, this.user.roles)
      .subscribe(data => {
        if (data) {
          this.router.navigate(['app-login']);
        }
      }, error => {
        console.log(error);
        this.submitted = false;
      });
    this.user = new User();
  }
}
