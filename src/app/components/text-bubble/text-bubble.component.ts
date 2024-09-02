import { NgClass } from '@angular/common';
import { Component, input, model, output } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';
import { EntriesService } from '../../services/entries.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'text-bubble',
  standalone: true,
  imports: [NgClass, NgIconComponent, FormsModule],
  templateUrl: './text-bubble.component.html',
  styleUrl: './text-bubble.component.scss',
  providers: [provideIcons({ heroPencilSquare, heroTrash })],
})
export class TextBubbleComponent {
  modifyBubble = output<string>();
  deleteBubble = output();
  isModifying = false
  modifiedText = ''

  isCompleted = model<boolean>(true)
  imageUrl = 'https://www.flaticon.com/download/icon/3273762?icon_id=3273762&author=219&team=219&keyword=Robot&pack=3273628&style=1&style_id=914&format=png&color=%23000000&colored=2&size=512&selection=1&type=standard'
  bubbleText = model<string>('Empty message')

  changeTaskCompletion() {
    this.isCompleted.update(x => x = !x)
  }

  toggleModifyText() {
    this.modifiedText = this.bubbleText()
    this.isModifying = !this.isModifying
  }

  emitTextModifications() {
    this.bubbleText.update(x => x = this.modifiedText)
    this.modifyBubble.emit(this.modifiedText)
    this.isModifying = false
  }

  removeBubble() {
    this.deleteBubble.emit()
  }
}
