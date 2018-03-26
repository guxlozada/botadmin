import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRuleComponent } from './detail-rule.component';

describe('DetailRuleComponent', () => {
  let component: DetailRuleComponent;
  let fixture: ComponentFixture<DetailRuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailRuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailRuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
