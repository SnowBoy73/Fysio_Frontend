import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliteSportComponent } from './elite-sport.component';

describe('EliteSportComponent', () => {
  let component: EliteSportComponent;
  let fixture: ComponentFixture<EliteSportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EliteSportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EliteSportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
