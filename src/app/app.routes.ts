import { Routes } from '@angular/router';
import { HomeComponent } from './components/main/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { BuyComponent } from './components/main/buy/buy.component';
import { SellComponent } from './components/main/sell/sell.component';
import { InvestorsComponent } from './components/main/investors/investors.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ChangePasswordComponent } from './shared/change-password/change-password.component';

export const routes: Routes = [

   {path: 'home', component: HomeComponent, title: 'Home',
      children: [
         {path: 'buy', component: BuyComponent, title: 'Buy'},
         {path: 'sell', component: SellComponent, title: 'Sell'},
         {path: 'investors', component: InvestorsComponent, title: 'Inversionistas'},
         {path: 'profile', component: ProfileComponent, title: 'Profile'},
         {path: 'change-pass', component: ChangePasswordComponent, title: 'New Password'},
      ]
   },
   {path: '', redirectTo: 'home/buy', pathMatch: 'full'},
   {path: 'login', component: LoginComponent, title: 'Login'},
   {path: 'register', component: RegisterComponent, title: 'Register'},
   // {path: 'profiles', component: , title: ''},
   // {path: 'profile/:id', component: , title: ''},
];
