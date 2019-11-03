import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-chat-room-template',
  templateUrl: './chat-room-template.component.html',
  styleUrls: ['./chat-room-template.component.css']
})
export class ChatRoomTemplateComponent implements OnInit {
  @Input() roomName: string;
  messageSub: Subscription = new Subscription();
  currentMessage: string = "";
  msgList: string[] = [];

  sendMessage(): void {
    this.messagesService.sendMessage(this.currentMessage);
    this.currentMessage = "";
  }

  constructor(private messagesService: MessagesService) { }

  ngOnInit() {
    this.messagesService.changeRoom(this.roomName);
    this.messageSub = this.messagesService.newMessage.subscribe((data) => {
      this.msgList.push(data.username + ": " + data.message);
      console.log("new message:", data);
    });
  }

  ngOnDestroy() {
    this.messageSub.unsubscribe();
  }
}
