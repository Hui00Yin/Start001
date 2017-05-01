import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PCreatorComponent } from './p-creator.component';

describe('PCreatorComponent', () => {
  let component: PCreatorComponent;
  let fixture: ComponentFixture<PCreatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PCreatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
