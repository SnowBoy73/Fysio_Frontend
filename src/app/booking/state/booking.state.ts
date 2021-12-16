import {Action, Selector, State, StateContext} from '@ngxs/store';
import {ListenForAvailableTimes, UpdateAvailableTimes} from './booking.actions';
import {BookingService} from '../shared/booking.service';
import {state} from '@angular/animations';
import {tap} from 'rxjs/operators';
// import {Subscription} from 'rxjs';
import { Injectable } from '@angular/core';
import {Subject, Subscription} from 'rxjs';
import {FormControl} from '@angular/forms';

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
  constructor(private bookingService: BookingService) {}

  @Selector()
  static availableTimesOnDateSelected(state: BookingStateModel): string[] {
    return state.availableTimesOnDateSelected;
  }

  @Action(ListenForAvailableTimes)
  getAvailableTimesOnDateSelected(ctx: StateContext<BookingStateModel>, at: ListenForAvailableTimes): void {
    this.bookingService.listenForAvailableTimes()
      .subscribe(availableTimes => {
        console.log('@Action(ListenForAvailableTimes) length' + availableTimes.length)
        ctx.dispatch(new UpdateAvailableTimes(availableTimes));
      });
  }

  @Action(UpdateAvailableTimes)
  updateAvailableTimesOnDateSelected(ctx: StateContext<BookingStateModel>, uat: UpdateAvailableTimes): void {

        const state = ctx.getState();
        console.log('fsdsggsth' + uat.availableTimes.length)

        const newState: BookingStateModel = {
          ...state,
          availableTimesOnDateSelected: uat.availableTimes
        };
        ctx.setState(newState);

        console.log('@Action(ListenForAvailableTimes2) length' + state.availableTimesOnDateSelected.length)

  }


}

    /*

      @Selector()
      static availableTimes(state: BookingStateModel): string[] {
        return state.availableTimes;
      }

    /*
      @Action(ListenForNewBooking)
      getNewBooking(ctx: StateContext<BookingStateModel>): void {
        this.bookingService.listenForNewBooking()
          .subscribe(booking => {
            //ctx.dispatch(new (booking));
          });
          */










  /*{/*getState, patchState, dispatch}: StateContext<AvailableTimesStateModel>) {
  patchState({availableTimesOnDateSelected: //[...state.availableTimes, payload]
    /*   return this.bookingService.listenForAvailableTimes().pipe(
         tap()
       )
     }
   //   { payload}: UpdateAvailableTimes) { // ???
       //const state = getState();
   /*
       dispatch()
       patchState({
         availableTimesOnDateSelected: [...state.availableTimes, payload]
       })
     }
   */




  /*@Selector()
    static getAvailableTimes(state: AvailableTimesStateModel) {
      return state.availableTimes;
    }*/

