import {Component, OnInit} from '@angular/core';
import { ChatbotService } from '../chatbot.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {
  messages: { role: string; content: string }[] = [];
  newMessage = '';
  botResponses: string[] = [];
  selectedBotResponse: string;

  constructor(private chatbotService: ChatbotService) { }

  ngOnInit(): void {
    // ... (optional) pre-fill messages if needed ...
  }

  sendMessage() {
      const requestData = { prompt: this.newMessage }; // Use this.newMessage
      this.chatbotService.sendMessage(requestData.prompt)
          .subscribe(response => {
              this.messages.push({ role: 'bot', content: response });
              this.botResponses.push(response); // Add this line
              this.selectedBotResponse = response; // Update selectedBotResponse
              this.newMessage = ''; // Clear input field
          });
  }




}
