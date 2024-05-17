import { Routes } from '@angular/router';
import { HomeComponent } from './components/main/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { BuyComponent } from './components/main/buy/buy.component';
import { SellComponent } from './components/main/sell/sell.component';
import { InvestorsComponent } from './components/main/investors/investors.component';

export const routes: Routes = [

   {path: 'home', component: HomeComponent, title: 'Home'},
   {path: '', redirectTo: 'home', pathMatch: 'full'},
   {path: 'login', component: LoginComponent, title: 'Login'},
   {path: 'register', component: RegisterComponent, title: 'Register'},
   {path: 'buy', component: BuyComponent, title: 'Buy'},
   {path: 'sell', component: SellComponent, title: 'Sell'},
   {path: 'investors', component: InvestorsComponent, title: 'Inversores'},
   // {path: 'profiles', component: , title: ''},
   // {path: 'profile/:id', component: , title: ''},
];
