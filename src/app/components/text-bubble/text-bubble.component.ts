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
  constructor() { }

  isUserTextBuble = input<boolean>(false)
  isCompleted = model<boolean>(true)
  imageUrl = input<string>('https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp')
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
