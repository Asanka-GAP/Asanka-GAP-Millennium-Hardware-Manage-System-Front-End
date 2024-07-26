import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentingItemComponent } from './renting-item.component';

describe('RentingItemComponent', () => {
  let component: RentingItemComponent;
  let fixture: ComponentFixture<RentingItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentingItemComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RentingItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
