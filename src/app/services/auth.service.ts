import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Storage} from '@ionic/storage';
import { Router } from '@angular/router';
import { filter } from 'rxjs/operators';

const TOKEN_KEY = 'user-access-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<any>;
  private authState = new BehaviorSubject(null);

  constructor(private storage: Storage, private router: Router) {
    this.loadUser();
    // changing the code so the obserable with not return null
     this.user = this.authState.asObservable().pipe(filter(response => response));
   }
   loadUser() {
     this.storage.get(TOKEN_KEY).then( data=> {
       console.log ('Loaded user[ Service ]: ', data);
      //  if (data && data.email && data.role){
        if (data) {
         this.authState.next(data);
       } else { 
         this.authState.next({email: null, role: null});
       }
     });
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
