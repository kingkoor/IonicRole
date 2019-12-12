import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { take, map } from 'rxjs/operators';
import { AuthService } from './../services/auth.service';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, 
    private auth: AuthService, private alertCtrl: AlertController) { }

  canActivate(route: ActivatedRouteSnapshot){
    const expectedRole = route.data.role;
    console.log('expected: ', expectedRole);

    return this.auth.user.pipe(
      take(1),
      map(user => {
       console.log('log: ', user);
       if (user) {
         let role= user['role'];
         if ( expectedRole == role){
           return true
         } else {
          this.showAlert();
          return this.router.parseUrl('/login');
         }
        
       } else {
         this.showAlert();
         return this.router.parseUrl('/login');
       }
      })
    )
  }
  
  async showAlert() {
    let alert = await this.alertCtrl.create({
      header: 'Unauthorized',
      message: 'You are not authorized to visit that page!',
      buttons: ['OK']
    });
    alert.present();
  }
}
