import { Component, OnInit } from '@angular/core';
import { TchatService } from './tchat.service'

@Component({
  selector: 'tchat',
  templateUrl: './tchat.html',
  styleUrls: ['./tchat.css']
})
export class TchatComponent implements OnInit {

  public spamGuard = false
  public messageContent = ""
  public messages = []

  constructor(private tchatService : TchatService) {}

  ngOnInit() {
    this.tchatService.getMessages().valueChanges.subscribe( ({ data : { getMessages }  } : any) => {
      this.messages = getMessages
    })
  }

  sendMessage() {
    this.spamGuard = true
    const message = {
      sender: {
        pseudo: 'Toto',
        firstName: 'Jean-Michel',
        lastName: 'Graphi'
      },
      content: this.messageContent,
      localisation: 'Nantes',
      status: 'PENDING'
    }
    this.tchatService.saveMessage(message).subscribe(() => {
      this.spamGuard = false
      this.messageContent = ""
    })
    
  } 
  
}
