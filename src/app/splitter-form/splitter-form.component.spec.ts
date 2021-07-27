import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SplitterFormComponent } from './splitter-form.component';

describe('SplitterFormComponent', () => {
  let component: SplitterFormComponent;
  let fixture: ComponentFixture<SplitterFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplitterFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplitterFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
