import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeActionBarComponent } from './home-action-bar.component';

describe('HomeActionBarComponent', () => {
  let component: HomeActionBarComponent;
  let fixture: ComponentFixture<HomeActionBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeActionBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeActionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
