import { Component, ElementRef, HostListener, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Conversation } from "src/app/models/conversation/conversation.model";
import { Message } from "src/app/models/message/message.model";
import { AiAssistantService } from "src/app/service/kanban-management/ai-assistant/ai-assistant.service";
import { ContentFilterService } from "src/app/service/kanban-management/badwords/content-filter.service";
import { CoreService } from "src/app/service/notificationDialog/core.service";
import { AuthenticService } from "src/app/service/usermanagement/guard/authentic.service";
import { TokenService } from "src/app/service/usermanagement/token-svc/token-service.service";
import { ImageInspectorComponent } from "../image-inspector/image-inspector.component";

@Component({
  selector: "app-ai-image-generate",
  templateUrl: "./ai-image-generate.component.html",
  styleUrls: ["./ai-image-generate.component.css"],
})
export class AiImageGenerateComponent {
  @ViewChild("chatContainer") private chatContainer!: ElementRef;
  showButtons = false;
  conversation: Conversation;
  selectedConversation: Conversation;
  tokenDetails: any;
  ownerId: number;
  messageToSend: String = "";
  processing: boolean = false;
  constructor(
    private conversationService: AiAssistantService,
    private authenticService: AuthenticService,
    private tokenService: TokenService,
    private _coreService: CoreService,
    private contentFilterService: ContentFilterService,
    private dialog: MatDialog
  ) {}
  ngOnInit(): void {
    this.authenticService.getId().subscribe((id) => {
      this.ownerId = id;
      this.tokenDetails = this.tokenService.getTokenDetails();
      if (this.ownerId) {
        this.loadRecentConversation(this.ownerId);
      }
    });
  }

  loadRecentConversation(userId: number): void {
    if (userId) {
      const storedConversation = localStorage.getItem("conversation");
      this.conversation = storedConversation
        ? JSON.parse(storedConversation)
        : null;
      this.selectedConversation = this.conversation;
      console.log(this.conversation);
      console.log(storedConversation);
      console.log(this.selectedConversation);
      if (
        this.conversation &&
        this.conversation.userId === this.ownerId &&
        this.selectedConversation &&
        this.selectedConversation.id === this.conversation.id
      ) {
        this.selectedConversation = this.conversation;
        this.scrollToBottom();
      } else {
        this.createNewConversation();
      }
    }
  }
  createNewConversation(): void {
    localStorage.removeItem("conversation");
    this.conversation = new Conversation();
    this.conversation.messages = [];
    const assistantMessage = new Message();
    assistantMessage.role = "assistant";
    assistantMessage.content =
      "I'm Dalle3, your AI image generator! Tell me what you're looking for, and I'll create an image for you in no time. Whether it's landscapes, portraits, or abstract art, I've got you covered. Just let me know your preferences, and I'll work my magic to bring your vision to life!";
    this.conversation.messages.push(assistantMessage);
    this.conversation.userId = this.ownerId;
    const randomNumber = Math.random();
    const scaledRandomNumber = Math.floor(randomNumber * (999 - 1 + 1)) + 1;
    this.conversation.id = scaledRandomNumber;
    localStorage.setItem("conversation", JSON.stringify(this.conversation));
    this.selectedConversation = this.conversation;
    this._coreService.openSnackBar(
      "Starting a new chat, This chat conversation is temporary and is tied to your current session.",
      "Done",
      5000
    );
  }

  onClickCreateNewConversation() {
    if (confirm("Are you sure you want to reset this Conversation?")) {
      this.createNewConversation();
    }
  }

  sendMessage(): void {
    const prompt = this.messageToSend.trim();
    if (prompt !== "") {
      if (!this.contentFilterService.containsInappropriateWords(prompt)) {
        if (
          this.selectedConversation !== null &&
          this.conversation &&
          this.conversation.userId === this.ownerId &&
          this.conversation.id === this.selectedConversation.id
        ) {
          const userMessage = new Message();
          userMessage.content = prompt;
          userMessage.role = "user";
          const assistantMessage = new Message();
          assistantMessage.content =
            "I'll try that. Please wait, this might take a little while...";
          assistantMessage.role = "assistant";
          this.conversation.messages.push(userMessage);
          this.conversation.messages.push(assistantMessage);
          this.selectedConversation = this.conversation;
          localStorage.setItem(
            "conversation",
            JSON.stringify(this.conversation)
          );
          // Send message to the backend and update the conversation
          this.processing = true;
          this.conversationService.generateImage(prompt).subscribe(
            (generatedImage) => {
              if (
                this.ownerId &&
                this.conversation !== null &&
                this.conversation.userId === this.ownerId &&
                this.selectedConversation !== null
              ) {
                if (generatedImage && generatedImage.imageUrl !== "") {
                  const assistantMessage_2 = new Message();
                  assistantMessage_2.content =
                    "• This image is temporary. Please download the image if you want to keep it. • Image information: size: 1024 x 1024, format: PNG.";
                  assistantMessage_2.role = "assistant";
                  const assistantMessage_3 = new Message();
                  assistantMessage_3.content = generatedImage.imageUrl;
                  assistantMessage_3.role = "assistant_ImageUrl";
                  this.conversation.messages.push(assistantMessage_2);
                  this.conversation.messages.push(assistantMessage_3);
                  this.selectedConversation = this.conversation;
                  localStorage.setItem(
                    "conversation",
                    JSON.stringify(this.conversation)
                  );
                  this.scrollToBottom();
                  this.processing = false;
                  this.messageToSend = "";
                } else {
                  this.scrollToBottom();
                  this.processing = false;
                  this.messageToSend = "";
                  const assistantMessage_2 = new Message();
                  assistantMessage_2.content =
                    "Something went wrong. Please try again!";
                  assistantMessage_2.role = "assistant";
                  this.conversation.messages.push(assistantMessage_2);
                  this.selectedConversation = this.conversation;
                  localStorage.setItem(
                    "conversation",
                    JSON.stringify(this.conversation)
                  );
                  this._coreService.openSnackBar(
                    "Sorry, there's a problem generating the image. Please try again!",
                    "Ok",
                    4000
                  );
                }
              }
            },
            (error) => {
              this.scrollToBottom();
              this.processing = false;
              this.messageToSend = "";
              this._coreService.openSnackBar(
                "Error Sending Message!",
                "error",
                2000
              );
              console.log(error);
            }
          );
        } else {
          this.processing = false;
          this.messageToSend = "";
          this.createNewConversation();
        }
      } else {
        this.processing = false;
        this.messageToSend = "";
        this._coreService.openSnackBar(
          "Oops! It looks like you've used inappropriate language. Let's keep the conversation respectful, okay?",
          "OK",
          4000
        );
      }
    } else {
      this._coreService.openSnackBar(
        "Please type something first!",
        "OK",
        3000
      );
    }
  }

  scrollToBottom(): void {
    setTimeout(() => {
      try {
        this.chatContainer.nativeElement.scrollTop =
          this.chatContainer.nativeElement.scrollHeight;
      } catch (err) {}
    }, 100);
  }
  downloadImage(imageUrl: string) {
   // Create a new Blob object containing the image data
   fetch(imageUrl)
   .then(response => response.blob())
   .then(blob => {
     const randomNumber = Math.random();
     const scaledRandomNumber = Math.floor(randomNumber * (9999 - 1 + 1)) + 1;
     const date = new Date();
     const imgName =
       date.toLocaleDateString() + "_" + scaledRandomNumber.toString() + "_generated.png";
    // Create a temporary anchor element to trigger download
     const link = document.createElement("a");
     link.href = URL.createObjectURL(blob);
     link.download = imgName;
     link.click();
     // Clean up the Blob URL after the download is complete
     setTimeout(() => URL.revokeObjectURL(link.href), 1000);
   });
  }

  openImageInspectorModal(imageUrl: string) {
    this.dialog.open(ImageInspectorComponent, {
      data: { imageUrl },
    });
  }
  
}
