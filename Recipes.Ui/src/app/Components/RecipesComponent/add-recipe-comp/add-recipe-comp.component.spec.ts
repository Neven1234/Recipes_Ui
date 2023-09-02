import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRecipeCompComponent } from './add-recipe-comp.component';

describe('AddRecipeCompComponent', () => {
  let component: AddRecipeCompComponent;
  let fixture: ComponentFixture<AddRecipeCompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRecipeCompComponent]
    });
    fixture = TestBed.createComponent(AddRecipeCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
