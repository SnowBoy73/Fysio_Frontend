import {Action, Selector, State, StateContext} from '@ngxs/store';
import {ListenForAvailableTimes, StopListeningForAvailableTimes, UpdateAvailableTimes} from './booking.actions';
import {BookingService} from '../shared/booking.service';
import {Subscription} from 'rxjs';
import { Injectable } from '@angular/core';


export interface BookingStateModel {
  availableTimesOnDateSelected: string[];
}


@State<BookingStateModel>({
  name: 'Booking',
  defaults: {
    availableTimesOnDateSelected: [],
  }
})


@Injectable()
export class BookingState {
  private listenerUnsub: Subscription | undefined;
  constructor(private bookingService: BookingService) {}


  @Selector()
  static availableTimesOnDateSelected(state: BookingStateModel): string[] {
    return state.availableTimesOnDateSelected;
  }


  @Action(ListenForAvailableTimes)
  getAvailableTimesOnDateSelected(ctx: StateContext<BookingStateModel>, at: ListenForAvailableTimes): void {
    this.listenerUnsub = this.bookingService.listenForAvailableTimes()
      .subscribe(availableTimes => {
        console.log('@Action(ListenForAvailableTimes) length' + availableTimes.length)
        ctx.dispatch(new UpdateAvailableTimes(availableTimes));
      });
  }


  @Action(StopListeningForAvailableTimes)
  stopListenForAvailableTimes(ctx: StateContext<BookingStateModel>, at: ListenForAvailableTimes): void {
    if (this.listenerUnsub) {
      this.listenerUnsub.unsubscribe();
    }
  }


  @Action(UpdateAvailableTimes)
  updateAvailableTimesOnDateSelected(ctx: StateContext<BookingStateModel>, uat: UpdateAvailableTimes): void {
        const state = ctx.getState();
        const newState: BookingStateModel = {
          ...state,
          availableTimesOnDateSelected: uat.availableTimes
        };
        ctx.setState(newState);
  }

}
