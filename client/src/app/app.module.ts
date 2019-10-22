import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AuthGuard } from './auth/auth.guard';
import { UserManagerService } from './user-manager.service';
import { MessagesService } from './messages.service';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RoomLoungeComponent } from './room-lounge/room-lounge.component';
import { ChatRoomTemplateComponent } from './chat-room-template/chat-room-template.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RoomLoungeComponent,
    ChatRoomTemplateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [AuthGuard, UserManagerService, MessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
