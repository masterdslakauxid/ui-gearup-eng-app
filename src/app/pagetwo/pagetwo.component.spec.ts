import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagetwoComponent } from './pagetwo.component';

describe('PagetwoComponent', () => {
  let component: PagetwoComponent;
  let fixture: ComponentFixture<PagetwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PagetwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PagetwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
