import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

user = { email: '', pw: ''};
  
constructor(private auth: AuthService) { }

  ngOnInit() {
  }
  
  signIn() {
    this.auth.singIn(this.user).subscribe(user => {
      console.log('After login: ', user);
    });

  }

}
