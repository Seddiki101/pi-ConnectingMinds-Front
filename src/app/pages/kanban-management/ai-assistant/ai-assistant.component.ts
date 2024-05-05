import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { Conversation } from "src/app/models/conversation/conversation.model";
import { AiAssistantService } from "src/app/service/kanban-management/ai-assistant/ai-assistant.service";
import { ContentFilterService } from "src/app/service/kanban-management/badwords/content-filter.service";
import { CoreService } from "src/app/service/notificationDialog/core.service";
import { AuthenticService } from "src/app/service/usermanagement/guard/authentic.service";
import { TokenService } from "src/app/service/usermanagement/token-svc/token-service.service";

@Component({
  selector: "app-ai-assistant",
  templateUrl: "./ai-assistant.component.html",
  styleUrls: ["./ai-assistant.component.css"],
})
export class AiAssistantComponent implements OnInit {
  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  conversations: Conversation[] = [];
  selectedConversationId: number | null = null;
  selectedConversation: Conversation | null | undefined;
  tokenDetails: any;
  ownerId: number;
  messageToSend: String = "";

  constructor(
    private conversationService: AiAssistantService,
    private authenticService: AuthenticService,
    private tokenService: TokenService,
    private _coreService: CoreService,
    private contentFilterService: ContentFilterService
  ) {}
  ngOnInit(): void {
    this.authenticService.getId().subscribe((id) => {
      this.ownerId = id;
      this.tokenDetails = this.tokenService.getTokenDetails();
      console.log(this.ownerId);
      if (this.ownerId) {
        this.loadRecentConversations(this.ownerId);
      }
    });
  }
  onClickConversationHistory(conversationId: number): void {
    // Store the selected conversation ID in local storage
    if (conversationId) {
      this.conversationService
        .getConversationById(conversationId)
        .subscribe((conversation) => {
          if (conversation) {
            localStorage.setItem(
              "selectedConversationId",
              conversationId.toString()
            );
            this.selectedConversationId = conversation.id;
            this.selectedConversation = conversation;
            this.scrollToBottom();
          } else {
            this._coreService.openSnackBar(
              "Error loading Conversation!",
              "error",
              2000
            );
          }
        });
    }
  }
  loadRecentConversations(userId: number): void {
    if (userId) {
      const storedId = localStorage.getItem("selectedConversationId");
      this.conversationService.getAllConversationsByUserId(userId).subscribe(
        (conversations) => {
          this.conversations = conversations;
          if (this.conversations.length != 0) {
            if (
              !this.selectedConversation &&
              this.selectedConversationId === null &&
              this.conversations.length === 1
            ) {
              this.selectedConversation = this.conversations[0];
              this.selectedConversationId = this.selectedConversation.id;
            } else if (
              !this.selectedConversation &&
              this.selectedConversationId === null &&
              this.conversations.length > 1 &&
              storedId == null
            ) {
              this.selectedConversation =
                this.conversations[this.conversations.length - 1];
              this.selectedConversationId = this.selectedConversation.id;
            } else if (
              !this.selectedConversation &&
              this.selectedConversationId === null &&
              this.conversations.length > 1 &&
              storedId !== null
            ) {
              const id = parseInt(storedId, 10);
              this.selectedConversation = this.conversations.find(
                (conversation) => conversation.id === id
              );
              if (this.selectedConversation) {
                this.selectedConversationId = this.selectedConversation.id;
              }
            } else {
              this.loadSelectedConversationId();
            }
          } else {
            this.createNewConversation();
          }
        },
        (error) => {
          this._coreService.openSnackBar(
            "Error loading Conversations!",
            "error",
            2000
          );
        }
      );
    }
  }
  loadSelectedConversationId(): void {
    // Load selected conversation ID from local storage
    const storedId = localStorage.getItem("selectedConversationId");
    if (storedId !== null) {
      this.selectedConversationId = parseInt(storedId, 10);
      if (this.conversations.length > 0) {
        this.selectedConversation = this.conversations.find(
          (conversation) => this.selectedConversationId === conversation.id
        );
      }
    }
  }
  onClickCreateNewConversation() {
    localStorage.removeItem("selectedConversationId");
    this.createNewConversation();
    this._coreService.openSnackBar(
      "Starting a new conversation!",
      "Done",
      2000
    );
  }

  onClickDeleteConversation(conversationId: number) {
    if (confirm("Are you sure you want to delete this Conversation?")) {
      if (
        conversationId &&
        conversationId === this.selectedConversationId &&
        this.selectedConversation?.id === conversationId
      ) {
        this.conversationService
          .deleteConversation(conversationId)
          .subscribe((result) => {
            if (result) {
              localStorage.removeItem("selectedConversationId");
              this.selectedConversation = null;
              this.loadRecentConversations(this.ownerId);
            }
          });
      } else if (
        conversationId &&
        conversationId !== this.selectedConversationId &&
        this.selectedConversation?.id !== conversationId
      ) {
        this.conversationService
          .deleteConversation(conversationId)
          .subscribe((result) => {
            if (result) {
              this.loadRecentConversations(this.ownerId);
            }
          });
      }
    }
  }

  sendMessage(): void {
    if (this.messageToSend.trim() !== "") {
      if (
        !this.contentFilterService.containsInappropriateWords(
          this.messageToSend.trim()
        )
      ) {
        if (this.selectedConversationId !== null && this.selectedConversation) {
          // Send message to the backend and update the conversation
          this.conversationService
            .createOrUpdateConversation(
              this.messageToSend.trim(),
              undefined,
              this.selectedConversationId
            )
            .subscribe(
              (updatedConversation) => {
                if (this.ownerId) {
                  this.conversationService
                    .getAllConversationsByUserId(this.ownerId)
                    .subscribe((conversations) => {
                      //update everything afer adding new conversation
                      this.conversations = conversations;
                      this.selectedConversation = updatedConversation;
                      this.selectedConversationId = updatedConversation.id;
                      localStorage.setItem(
                        "selectedConversationId",
                        updatedConversation.id.toString()
                      );
                      this.messageToSend = "";
                      this.scrollToBottom();
                    });
                }
              },
              (error) => {
                this._coreService.openSnackBar(
                  "Error Sending Message!",
                  "error",
                  2000
                );
              }
            );
        }
      } else {
        this._coreService.openSnackBar(
          "You can't say in the chat please behave! ok ?",
          "OK",
          3000
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
  createNewConversation(): void {
    const message = "Hello !";
    this.conversationService
      .createOrUpdateConversation(message, this.ownerId, undefined)
      .subscribe(
        (newConversation) => {
          if (this.ownerId) {
            this.conversationService
              .getAllConversationsByUserId(this.ownerId)
              .subscribe((conversations) => {
                this.conversations = conversations;
                this.messageToSend = "";
                localStorage.setItem(
                  "selectedConversationId",
                  newConversation.id.toString()
                );
                this.selectedConversationId = newConversation.id;
                this.selectedConversation = newConversation;
              });
          }
        },
        (error) => {
          this._coreService.openSnackBar(
            "Error creating conversation!",
            "error",
            2000
          );
        }
      );
  }
  scrollToBottom(): void {
    setTimeout(() => {
      try {
        this.chatContainer.nativeElement.scrollTop = this.chatContainer.nativeElement.scrollHeight;
      } catch(err) { }
    }, 100); // Adjust the delay time as needed
  }
}
