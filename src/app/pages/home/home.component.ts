import { Component, ElementRef, model, OnInit, ViewChild } from '@angular/core';
import { ITodoEntry } from '../../interfaces/todo-entry.interface';
import { TextBubbleComponent } from '../../components/text-bubble/text-bubble.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroEllipsisHorizontal, heroPaperAirplane } from '@ng-icons/heroicons/outline';
import { FormsModule } from '@angular/forms';
import { EntriesService } from '../../services/entries.service';
import { UsersService } from '../../services/users.service';
import { IUser } from '../../interfaces/user.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TextBubbleComponent, NgIconComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [provideIcons({ heroPaperAirplane, heroEllipsisHorizontal })],
})
export class HomeComponent implements OnInit {
  @ViewChild('chatContainer') private chatContainer: ElementRef | undefined;
  isLoading = false

  message = model<string>('');
  entries: ITodoEntry[] = []
  users: IUser[] = []
  email: string = ''
  currentUserId = 0

  constructor(
    private entriesService: EntriesService,
    private usersService: UsersService,
  ) { }
  ngOnInit(): void {
    this.fetchEmails();
  }

  fetchEmails() {
    this.usersService.fetchUsers().subscribe(data => { this.users = data });
  }


  checkEmail() {
    const user = this.users.find(x => x.email.toLowerCase() == this.email.toLowerCase())
    if (user) {
      this.currentUserId = user.id
      this.fetchEntries()
    }
    else
      alert('Email not found. Try Again')

  }

  fetchEntries() {
    this.entriesService.getEntries(this.currentUserId).subscribe({
      next: (data) => {
        this.entries = data.filter(x => x.userId == this.currentUserId);
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
    const newEntry: ITodoEntry = {
      completed: false,
      title: this.message(),
      userId: this.currentUserId
    }
    this.addEntryServer(newEntry)
  }

  addEntryServer(entry: ITodoEntry) {
    this.isLoading = true
    this.entriesService.addEntry(entry).subscribe({
      next: () => {
        this.isLoading = false
        this.entries.push(entry)
        this.message.update(x => x = '')
        this.scrollToBottom()
      },
      error: () => {
        this.isLoading = false
        alert('Error adding entry')
      }
    })
  }

  modifyEntryServer(event: string, entry: ITodoEntry) {
    this.isLoading = true
    const modifiedEntry = { ...entry }
    modifiedEntry.title = event
    this.entriesService.modifyEntry(modifiedEntry).subscribe({
      next: () => {
        this.isLoading = false
      },
      error: () => {
        this.isLoading = false
        alert('Error modifying entry, the page will reload')
      }
    })
  }

  deleteEntryServer(entry: ITodoEntry) {
    this.isLoading = true
    if (entry.id)
      return this.entriesService.deleteEntry(entry.id).subscribe(
        {
          next: () => {
            this.isLoading = false
            this.entries = this.entries.filter(x => x.id != entry.id)
          },
          error: () => {
            this.isLoading = false
            alert('Error deleting entry, the page will reload')
          }
        })
    else
      return alert('Error deleting entry, id not found')
  }

  private scrollToBottom(): void {
    try {
      setTimeout(() => {
        if (this.chatContainer)
          this.chatContainer.nativeElement.scrollTo({
            top: this.chatContainer.nativeElement.scrollHeight,
            behavior: 'smooth'
          });          

      }, 200);
    } catch (err) { }
  }
}
