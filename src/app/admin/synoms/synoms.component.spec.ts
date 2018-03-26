import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SynomsComponent } from './synoms.component';

describe('SynomsComponent', () => {
  let component: SynomsComponent;
  let fixture: ComponentFixture<SynomsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SynomsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SynomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
