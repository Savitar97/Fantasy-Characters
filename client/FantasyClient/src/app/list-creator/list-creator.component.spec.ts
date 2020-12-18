import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCreatorComponent } from './list-creator.component';

describe('ListCreatorComponent', () => {
  let component: ListCreatorComponent;
  let fixture: ComponentFixture<ListCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
