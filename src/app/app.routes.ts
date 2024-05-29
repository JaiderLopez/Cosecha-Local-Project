import { Routes } from '@angular/router';
import { HomeComponent } from './components/main/home/home.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { BuyComponent } from './components/main/buy/buy.component';
import { LandingComponent } from './components/main/landing/landing.component';
import { SellComponent } from './components/main/sell/sell.component';
import { InvestorsComponent } from './components/main/investors/investors.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { ChangePasswordComponent } from './shared/change-password/change-password.component';
import { ListComponent } from './components/main/sell/list/list.component';
import { OrdersComponent } from './components/main/sell/orders/orders.component';
import { NewComponent } from './components/main/sell/new/new.component';
import { DevTestComponent } from './dev-test/dev-test.component';
/*import { canActive, redirectUnauthorizedTo }*/
export const routes: Routes = [

   {path: 'home', component: HomeComponent, title: 'Home',
      children: [
         {path: 'landing', component: LandingComponent, title: 'Landing Page'},
         {path: 'buy', component: BuyComponent, title: 'Buy'},
         {path: 'sell', component: SellComponent, title: 'Sell', 
         children: [
            {path: 'list', component: ListComponent, title: 'List'}, 
            {path: 'orders', component: OrdersComponent, title: 'Orders'}, 
            {path: 'new', component: NewComponent, title: 'New Product'}, 
            ]
         },
         {path: 'investors', component: InvestorsComponent, title: 'Inversores'},
         {path: 'profile', component: ProfileComponent, title: 'Profile'},
         {path: 'change-pass', component: ChangePasswordComponent, title: 'New Password'},
         {path: 'home', redirectTo: 'home/landing', pathMatch: 'full'},
         {path: '', redirectTo: 'home/landing', pathMatch: 'full'},
      ]
   },
   {path: '', redirectTo: 'home/landing', pathMatch: 'full'},
   {path: 'login', component: LoginComponent, title: 'Login'},
   {path: 'register', component: RegisterComponent, title: 'Register'},
   {path: 'test', component: DevTestComponent, title: 'testing'},
   // {path: 'profiles', component: , title: ''},
   // {path: 'profile/:id', component: , title: ''},
];
