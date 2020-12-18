import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCreatorComponent } from './add-creator.component';

describe('AddCreatorComponent', () => {
  let component: AddCreatorComponent;
  let fixture: ComponentFixture<AddCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
