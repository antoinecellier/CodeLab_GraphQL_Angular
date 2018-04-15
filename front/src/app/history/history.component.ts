import { Component, Input } from '@angular/core';

@Component({
  selector: 'history',
  templateUrl: './history.html',
  styleUrls: ['./history.css']
})
export class HistoryComponent {
  public messages = [
    {
      sender: {
        lastName: 'Antoine',
        avatar: 'http://lorempixel.com/50/50/people'
      },
      content: 'Hello :)',
      place: 'Nantes',
      datetime: '12:00:00 12/08/17'
    },
        {
      sender: {
        lastName: 'Antoine',
        avatar: 'http://lorempixel.com/50/50/people'
      },
      content: 'Hello :)',
      place: 'Nantes',
      datetime: '12:00:00 12/08/17'
    }
  ]
}
