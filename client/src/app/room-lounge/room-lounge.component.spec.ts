import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomLoungeComponent } from './room-lounge.component';

describe('RoomLoungeComponent', () => {
  let component: RoomLoungeComponent;
  let fixture: ComponentFixture<RoomLoungeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoomLoungeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoomLoungeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
