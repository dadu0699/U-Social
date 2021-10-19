import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';

import { User } from 'src/app/models/user.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
})
export class ChatComponent implements OnInit, OnDestroy {
  public user!: User;
  public chats: any[];
  public chat!: any;
  public content!: string | undefined;

  private subscription!: Subscription;

  constructor(private _chatService: ChatService) {
    this.chats = [];
  }

  async ngOnInit(): Promise<void> {
    await this.getChats();

    const source = interval(2500);
    this.subscription = source.subscribe(() => this.dataChat());
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private async getChats() {
    try {
      const response = await this._chatService.getChats();
      if (response['code'] === 200) {
        this.chats = response['data'];
      }
    } catch (err) {
      console.log(<any>err);
    }
  }

  public async getChat(chat: any) {
    this.chat = chat;
    await this.dataChat();
  }

  public async dataChat() {
    await this.getChats();

    if (this.chat) {
      try {
        const response = await this._chatService.getMessages(this.chat.userID);
        if (response['code'] === 200) {
          this.chat.messages = response['data'];
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  public async sendMessage() {
    if (this.content) {
      try {
        await this._chatService.sendMessage({
          content: this.content,
          friendID: this.chat.userID,
        });
        this.content = undefined;

        await this.dataChat();
      } catch (err) {
        console.log(<any>err);
      }
    }
  }
}
