import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatRoomTemplateComponent } from './chat-room-template.component';

describe('ChatRoomTemplateComponent', () => {
  let component: ChatRoomTemplateComponent;
  let fixture: ComponentFixture<ChatRoomTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatRoomTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatRoomTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
