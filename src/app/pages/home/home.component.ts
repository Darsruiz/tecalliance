import { Component } from '@angular/core';
import { ITodoEntry } from '../../interfaces/todo-entry.interface';
import { TextBubbleComponent } from '../../components/text-bubble/text-bubble.component';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPaperAirplane } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TextBubbleComponent, NgIconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [provideIcons({ heroPaperAirplane })],
})
export class HomeComponent {
  robotImageUrl = 'https://www.flaticon.com/download/icon/3273762?icon_id=3273762&author=219&team=219&keyword=Robot&pack=3273628&style=1&style_id=914&format=png&color=%23000000&colored=2&size=512&selection=1&type=standard'

  entries: ITodoEntry[] = []

  addEntry() {
  }
}
