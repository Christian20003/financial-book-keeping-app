import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router, RouterLinkWithHref, RouterModule } from '@angular/router';
import { NavElementsComponent } from './nav-elements.component';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { routes } from 'src/app/app-routing.module';
import { AuthenticationService } from 'src/app/auth/auth-overview/authentication.service';
import { deleteUser } from 'src/app/shared';
import { getNativeElement } from 'src/app/testing/testing-support';
import { loginPath } from 'src/app/auth/auth-routing-module';

describe('NavElementsComponent', () => {
  let component: NavElementsComponent;
  let fixture: ComponentFixture<NavElementsComponent>;
  let router: Router;
  let store: MockStore;
  const stubService = jasmine.createSpyObj('AuthenticationService', [
    'deleteLogin',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NavElementsComponent],
      imports: [RouterModule.forRoot(routes)],
      providers: [
        { provide: AuthenticationService, useValue: stubService },
        provideMockStore(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavElementsComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    store = TestBed.inject(MockStore);
    fixture.detectChanges();
  });

  it('U-Test-1: Should create', () => {
    expect(component).toBeTruthy();
  });

  it('U-Test-2: Anchor "dashboard" should link to the dashboard route', () => {
    component.type = 'dashboard';
    fixture.detectChanges();
    const debugElement = fixture.debugElement.query(By.css('a'));
    const routerLink = debugElement.injector.get(RouterLinkWithHref);
    expect(routerLink['href']).toEqual('/dashboard');
  });

  it('U-Test-3: Anchor "finances" should link to the finances route', () => {
    component.type = 'finances';
    fixture.detectChanges();
    const debugElement = fixture.debugElement.query(By.css('a'));
    const routerLink = debugElement.injector.get(RouterLinkWithHref);
    expect(routerLink['href']).toEqual('/finances');
  });

  it('U-Test-4: Anchor "accounts" should link to the accounts route', () => {
    component.type = 'accounts';
    fixture.detectChanges();
    const debugElement = fixture.debugElement.query(By.css('a'));
    const routerLink = debugElement.injector.get(RouterLinkWithHref);
    expect(routerLink['href']).toEqual('/accounts');
  });

  it('U-Test-5: Anchor "profile" should link to the profile route', () => {
    component.type = 'profile';
    fixture.detectChanges();
    const debugElement = fixture.debugElement.query(By.css('a'));
    const routerLink = debugElement.injector.get(RouterLinkWithHref);
    expect(routerLink['href']).toEqual('/profile');
  });

  it('U-Test-6: Anchor "settings" should link to the settings route', () => {
    component.type = 'settings';
    fixture.detectChanges();
    const debugElement = fixture.debugElement.query(By.css('a'));
    const routerLink = debugElement.injector.get(RouterLinkWithHref);
    expect(routerLink['href']).toEqual('/settings');
  });

  it('U-Test-7: After clicking the logout anchor element, the dispatch function should be called with delete action', () => {
    stubService.deleteLogin.and.returnValue(of('Success'));
    component.type = 'logout';
    fixture.detectChanges();
    spyOn(store, 'dispatch');
    const element = getNativeElement<NavElementsComponent, HTMLAnchorElement>(
      fixture,
      'a'
    );
    element.click();
    expect(store.dispatch).toHaveBeenCalledOnceWith(deleteUser());
  });

  it('U-Test-8: After clicking the logout anchor element, the navigate function should be called with the correct route', () => {
    stubService.deleteLogin.and.returnValue(of('Success'));
    component.type = 'logout';
    fixture.detectChanges();
    spyOn(router, 'navigate');
    const element = getNativeElement<NavElementsComponent, HTMLAnchorElement>(
      fixture,
      'a'
    );
    element.click();
    expect(router.navigate).toHaveBeenCalledOnceWith([loginPath]);
  });
});
