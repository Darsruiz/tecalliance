import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'text-bubble',
  standalone: true,
  imports: [NgClass],
  templateUrl: './text-bubble.component.html',
  styleUrl: './text-bubble.component.scss'
})
export class TextBubbleComponent {
  isUserTextBuble = input<boolean>(false)
  imageUrl = input<string>('https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp')
  bubbleText = input<string>('Empty message')
}
