import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Storage} from '@ionic/storage';
import { Router } from '@angular/router';

const TOKEN_KEY = 'user-access-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any>;
  private authState = new BehaviorSubject(null);

  constructor(private storage: Storage, private router: Router) {
     this.user = this.authState.asObservable();
   }

  singIn(credentials): Observable<any> {
    let email = credentials.email;
    let pw = credentials.pw;
    let user = null;

    if (email === 'admin' && pw === 'admin') {
      user = { email, role: 'ADMIN'};
    }
    else if ( email === 'user' && pw === 'user'){
      user = { email, role: 'USER'};
    }
    this.authState.next(user);
    // storage
    this.storage.set(TOKEN_KEY, user);

    return of(user);

  }

  async singOut() {
    await this.storage.set(TOKEN_KEY, null);
    this.authState.next(null);
    this.router.navigateByUrl('/login');

  }
}
