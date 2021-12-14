import { Injectable } from '@angular/core';
import {Action, Selector, State, StateContext} from '@ngxs/store';
import {
  ListenForAvailableTimes, UpdateAvailableTimes,
} from './booking.actions';
import {Subscription} from 'rxjs';
import {BookingService} from '../shared/booking.service';
import {BookingModel} from '../shared/booking.model';

export interface BookingStateModel {
  availableTimesOnDateSelected: string[];
}

@State<BookingStateModel>({
  name: 'booking',
  defaults: {
    availableTimesOnDateSelected: [],
  }
})

@Injectable()
export class BookingState {
  private clientsUnsub: Subscription | undefined;
  constructor(private bookingService: BookingService) {}

  @Selector()
  static availableTimes(state: BookingStateModel): string[] {
    return state.availableTimesOnDateSelected;
  }

  @Action(ListenForAvailableTimes)
  getAvailableTimes(ctx: StateContext<BookingStateModel>): void {
    this.bookingService.listenForAvailableTimes()
      .subscribe(availableTimes => {
        ctx.dispatch(new UpdateAvailableTimes(availableTimes));
      });
  }

/*
  @Action(ListenForClients)
  getClients(ctx: StateContext<CommentStateModel>): void {
    this.clientsUnsub = this.commentService.listenForClients()
      .subscribe(clients => {
        ctx.dispatch(new UpdateClients(clients));
      });
  }

  @Action(StopListeningForClients)
  stopListeningForClients(ctx: StateContext<CommentStateModel>): void {
    if (this.clientsUnsub) {
      this.clientsUnsub.unsubscribe();
    }
  }

  @Action(UpdateClients)
  updateClients(ctx: StateContext<CommentStateModel>, uc: UpdateClients): void {
    this.commentService.listenForClients()
      .subscribe(clients => {
        const state = ctx.getState();
        const newState: CommentStateModel = {
          ...state,
          clients: uc.clients
        };
        ctx.setState(newState);
      });
  }

  @Action(ListenForHighscoreComments)
  getHighcoreComments(ctx: StateContext<CommentStateModel>): void {
    this.commentService.listenForHighscoreComments()
      .subscribe(comments => {
        ctx.dispatch(new UpdateHighscoreComments(comments));
      });
  }

  @Action(UpdateHighscoreComments)
  updateHighcoreComments(ctx: StateContext<CommentStateModel>, uhc: UpdateHighscoreComments): void {
    this.commentService.listenForHighscoreComments()
      .subscribe(comments => {
        const state = ctx.getState();
        const newState: CommentStateModel = {
          ...state,
          comments: uhc.comments
        };
        ctx.setState(newState);
      });
  }
*/
}












