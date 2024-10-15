import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarComponent } from './navbar.component';
import { provideMockStore } from '@ngrx/store/testing';
import { RouterLinkWithHref, RouterModule } from '@angular/router';
import { routes } from 'src/app/app-routing.module';
import { MockComponent } from 'ng-mocks';
import { LogoComponent } from '../logo/logo.component';
import { NavElementsComponent } from './nav-elements/nav-elements.component';
import { By } from '@angular/platform-browser';
import { getNativeElement } from 'src/app/testing/testing-support';
import { selectUser } from '../..';

xdescribe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        NavbarComponent,
        MockComponent(LogoComponent),
        MockComponent(NavElementsComponent),
      ],
      imports: [RouterModule.forRoot(routes)],
      providers: [
        provideMockStore({
          selectors: [
            {
              selector: selectUser,
              value: {
                name: 'Max',
                imagePath:
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Olaf_Scholz_2024.jpg/220px-Olaf_Scholz_2024.jpg',
              },
            },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('U-Test-1: Should create', () => {
    expect(component).toBeTruthy();
  });

  it('U-Test-2: The logo (first) anchor element should link to the dashboard route', () => {
    const debugElement = fixture.debugElement.query(By.css('a'));
    const routerLink = debugElement.injector.get(RouterLinkWithHref);
    expect(routerLink['href']).toEqual('/dashboard');
  });

  it('U-Test-3: An image should appear as profile button if an url is provided', () => {
    const element = getNativeElement<NavbarComponent, HTMLImageElement>(
      fixture,
      '.profile-btn'
    );
    expect(element).toBeTruthy();
    expect(element).toBeInstanceOf(HTMLImageElement);
  });

  it('U-Test-4: An p element should appear as profile button with the first character of the user name, if an url is not provided', () => {
    component.imagePath = '';
    fixture.detectChanges();
    const element = getNativeElement<NavbarComponent, HTMLParagraphElement>(
      fixture,
      '.profile-btn'
    );
    expect(element).toBeTruthy();
    expect(element).toBeInstanceOf(HTMLParagraphElement);
  });
});
