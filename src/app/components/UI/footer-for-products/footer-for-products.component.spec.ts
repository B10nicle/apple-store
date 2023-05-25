import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterForProductsComponent } from './footer-for-products.component';

describe('FooterForProductsComponent', () => {
  let component: FooterForProductsComponent;
  let fixture: ComponentFixture<FooterForProductsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterForProductsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterForProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
