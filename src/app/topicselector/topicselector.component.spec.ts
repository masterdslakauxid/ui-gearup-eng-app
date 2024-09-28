import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopicselectorComponent } from './topicselector.component';

describe('TopicselectorComponent', () => {
  let component: TopicselectorComponent;
  let fixture: ComponentFixture<TopicselectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopicselectorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopicselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
