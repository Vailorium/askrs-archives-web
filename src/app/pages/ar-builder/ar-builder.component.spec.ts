import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ArBuilderComponent } from './ar-builder.component';

describe('ArBuilderComponent', () => {
  let component: ArBuilderComponent;
  let fixture: ComponentFixture<ArBuilderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ArBuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArBuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
