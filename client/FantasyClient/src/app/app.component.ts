import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FantasyClient';

  authenticated = false;

  logout(){
    sessionStorage.clear();
    this.authenticated=false;
  }
}
