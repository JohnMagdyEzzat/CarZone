import {
  Component,
  ElementRef,
  EventEmitter,
  inject,
  Input,
  Output,
  viewChild,
} from '@angular/core';
import { IComment } from '../../models/comment';
import { ReactionsComponent } from '../reactions/reactions.component';
import { reactionPayload } from '../../models/reaction';
import { ReactionsService } from '../../services/reactions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-comments-cards',
  imports: [ReactionsComponent],
  templateUrl: './comments-cards.component.html',
  styleUrl: './comments-cards.component.css',
})
export class CommentsCardsComponent {
  @Input({ required: true }) comments: IComment[] = [];
  @Output() reactionChange: EventEmitter<void> = new EventEmitter();

  reactionService = inject(ReactionsService);
  router = inject(Router);

  commentCards = viewChild('commentCards');

  activeCircle = 0;

  nextComment(btn?: HTMLButtonElement, noOfMovements: number = 1): void {
    const elementRef = this.commentCards() as ElementRef;
    const element = window.getComputedStyle(elementRef.nativeElement);

    const elementWidth =
      Number(element.width.replace('px', '')) * noOfMovements;
    const elementPadding =
      Number(element.paddingRight.replace('px', '')) * noOfMovements;
    const elementBorder =
      Number(element.borderWidth.replace('px', '')) * noOfMovements;
    const elementMargin =
      Number(element.marginRight.replace('px', '')) * noOfMovements;

    (this.commentCards() as ElementRef).nativeElement.parentNode.scrollLeft +=
      elementWidth + elementPadding * 2 + elementBorder * 2 + elementMargin;
    if (btn && this.activeCircle + 1 < this.comments.length) {
      btn.disabled = true;
      this.activeCircle++;
      setTimeout(() => {
        btn.disabled = false;
      }, 500);
    }
  }

  previousComment(btn?: HTMLButtonElement, noOfMovements: number = 1): void {
    const elementRef = this.commentCards() as ElementRef;
    const element = window.getComputedStyle(elementRef.nativeElement);

    const elementWidth =
      Number(element.width.replace('px', '')) * noOfMovements;
    const elementPadding =
      Number(element.paddingRight.replace('px', '')) * noOfMovements;
    const elementBorder =
      Number(element.borderWidth.replace('px', '')) * noOfMovements;
    const elementMargin =
      Number(element.marginRight.replace('px', '')) * noOfMovements;

    (this.commentCards() as ElementRef).nativeElement.parentNode.scrollLeft -=
      elementWidth + elementPadding * 2 + elementBorder * 2 + elementMargin;
    if (btn && this.activeCircle > 0) {
      btn.disabled = true;
      this.activeCircle--;
      setTimeout(() => {
        btn.disabled = false;
      }, 500);
    }
  }

  activateCircle(id: number): void {
    if (id > this.activeCircle) {
      const noOfMovements = id - this.activeCircle;
      for (let i = 0; i < noOfMovements; i++) {
        this.nextComment(undefined, noOfMovements);
      }
    } else if (id < this.activeCircle) {
      const noOfMovements = this.activeCircle - id;
      for (let i = 0; i < noOfMovements; i++) {
        this.previousComment(undefined, noOfMovements);
      }
    }
    this.activeCircle = id;
  }

  submitReaction(commentId: number, reactionType: string): void {
    if (localStorage.getItem('id')) {
      const reactionPayload: reactionPayload = {
        comment_id: commentId,
        user_id: Number(localStorage.getItem('id')),
        type: reactionType,
      };
      this.reactionService.postReaction(reactionPayload).subscribe({
        next: () => {
          this.reactionChange.emit();
        },
        error: () => {
          console.log('Failed to submit the transaction');
        },
      });
    } else {
      this.router.navigate(['/login']);
    }
  }
}
