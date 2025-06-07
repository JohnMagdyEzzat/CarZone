import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CommentService } from '../../services/comment.service';
import { Subscription, tap } from 'rxjs';
import { IComment, ICommentCreation } from '../../models/comment';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommentsCardsComponent } from '../comments-cards/comments-cards.component';

@Component({
  selector: 'app-comments',
  imports: [FormsModule, CommentsCardsComponent],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css',
})
export class CommentsComponent implements OnInit, OnDestroy {
  comments: IComment[] = [];
  commentService = inject(CommentService);
  router = inject(Router);
  commentsSubscription: Subscription = new Subscription();
  addCommentWindow = false;
  commentAddedSuccess = false;
  commentAddedError = false;
  userComment = '';

  ngOnInit(): void {
    this.getAllComments();
  }

  getAllComments(): void {
    this.commentService
      .getAllComments()
      .pipe(
        tap((res) => {
          this.comments = res.data;
        })
      )
      .subscribe();
  }

  onAddComment(): void {
    const userLogged = localStorage.getItem('id') || '';
    if (userLogged !== '') {
      this.addCommentWindow = true;
    } else {
      this.router.navigate(['/login']);
    }
  }
  onCancelComment(): void {
    this.addCommentWindow = false;
  }

  submitComment(): void {
    const commentPayload: ICommentCreation = {
      user_id: Number(localStorage.getItem('id')),
      body: this.userComment,
    };
    this.commentService.createComment(commentPayload).subscribe({
      next: () => {
        this.getAllComments();
        this.addCommentWindow = false;
        this.commentAddedError = false;
        this.commentAddedSuccess = true;
      },
      error: () => {
        this.addCommentWindow = false;
        this.commentAddedError = true;
        this.commentAddedSuccess = false;
      },
    });
  }

  ngOnDestroy(): void {
    this.commentsSubscription.unsubscribe();
  }
}
