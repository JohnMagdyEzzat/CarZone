import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { reactionPayload } from '../models/reaction';

@Injectable({
  providedIn: 'root',
})
export class ReactionsService {
  private http = inject(HttpClient);
  private baseUrl = environment.apiUrl + 'commentReactions/';
  constructor() {}

  public postReaction(reactionPayload: reactionPayload) {
    return this.http.post(this.baseUrl, reactionPayload);
  }
}
