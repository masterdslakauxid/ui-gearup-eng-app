import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestselectorComponent } from './testselector.component';

describe('TestselectorComponent', () => {
  let component: TestselectorComponent;
  let fixture: ComponentFixture<TestselectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TestselectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TestselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
