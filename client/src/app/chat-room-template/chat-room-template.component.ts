import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-chat-room-template',
  templateUrl: './chat-room-template.component.html',
  styleUrls: ['./chat-room-template.component.css']
})
export class ChatRoomTemplateComponent implements OnInit {
  @Input() roomName: string;

  constructor() { }

  ngOnInit() {
  }

}
