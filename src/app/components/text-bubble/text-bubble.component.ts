import { NgClass } from '@angular/common';
import { Component, input, model } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { heroPencilSquare, heroTrash } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'text-bubble',
  standalone: true,
  imports: [NgClass, NgIconComponent],
  templateUrl: './text-bubble.component.html',
  styleUrl: './text-bubble.component.scss',
  providers: [provideIcons({ heroPencilSquare, heroTrash })],
})
export class TextBubbleComponent {
  isUserTextBuble = input<boolean>(false)
  isCompleted = model<boolean>(true)
  imageUrl = input<string>('https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp')
  bubbleText = model<string>('Empty message')

  changeTaskCompletion() {
    this.isCompleted.update(x => x = !x)
  }

  modifyText() {
    alert('aaa')
  }

  removeBubble() {
    
  }
}
