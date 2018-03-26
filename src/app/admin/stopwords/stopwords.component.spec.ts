import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StopwordsComponent } from './stopwords.component';

describe('StopwordsComponent', () => {
  let component: StopwordsComponent;
  let fixture: ComponentFixture<StopwordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StopwordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StopwordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
