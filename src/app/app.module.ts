import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { AuthModule } from './auth/auth.module';
import { userReducer } from './shared/stores/UserStore/User.reducer';
import { userEffects } from './shared/stores/UserStore/User.effects';
import { DashboardModule } from './dashboard/dashboard.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    DashboardModule,
    StoreModule.forRoot({ user: userReducer }, {}),
    EffectsModule.forRoot([userEffects]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
