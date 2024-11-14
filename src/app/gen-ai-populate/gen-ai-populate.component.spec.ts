import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenAiPopulateComponent } from './gen-ai-populate.component';

describe('GenAiPopulateComponent', () => {
  let component: GenAiPopulateComponent;
  let fixture: ComponentFixture<GenAiPopulateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenAiPopulateComponent]
    });
    fixture = TestBed.createComponent(GenAiPopulateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
