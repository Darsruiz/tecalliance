import { Component, model, OnInit } from '@angular/core';
import { ITodoEntry } from '../../interfaces/todo-entry.interface';
import { TextBubbleComponent } from '../../components/text-bubble/text-bubble.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPaperAirplane } from '@ng-icons/heroicons/outline';
import { FormsModule } from '@angular/forms';
import { EntriesService } from '../../services/entries.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TextBubbleComponent, NgIconComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [provideIcons({ heroPaperAirplane })],
})
export class HomeComponent implements OnInit {
  robotImageUrl = 'https://www.flaticon.com/download/icon/3273762?icon_id=3273762&author=219&team=219&keyword=Robot&pack=3273628&style=1&style_id=914&format=png&color=%23000000&colored=2&size=512&selection=1&type=standard'
  message = model<string>('');
  entries: ITodoEntry[] = []
  currentUserId = 1

  constructor(private entriesService: EntriesService) { }
  ngOnInit(): void {
    this.fetchEntries();
  }

  fetchEntries() {
    this.entriesService.getEntries().subscribe({
      next: (data) => {
        this.entries = data.filter(x => x.userId == this.currentUserId)
        console.log(data)
      }, error: () => {
        this.entries = [
          {
            completed: false,
            id: 0,
            title: "Oh no! An error has ocurred with the server!",
            userId: this.currentUserId
          }
        ]
      }
    })
  }

  addEntry() {
    alert(this.message())
  }
}
