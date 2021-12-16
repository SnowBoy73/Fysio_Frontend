import {BookingDto} from '../shared/booking.dto';
import { dateEnquiryDto } from '../shared/date-enquiry.dto';
// import { AvailableTimes } from '../shared/available-times.model';


export class ListenForAvailableTimes {
  static readonly type = '[Booking] Listen For Available Times';  // Booking??
  //constructor(public payload: string[]) {} // AvailableTimes // ???
}

export class UpdateAvailableTimes {
  constructor(public availableTimes: string[]) {}
  static readonly type = '[Booking] Update Available Times';
}

/*
export class ListenForAvailableTimes {
  static readonly type = '[Booking] Listen For Available Times';  // Booking??
}

export class ListenForNewBooking {
  static readonly type = '[Booking] Listen For New Booking';
}
*/


/*


}
export class PostBooking {
  static readonly type = '[Booking] Post Booking';
  constructor(public booking: BookingDto[]) {}

}
export class ListenForAvailableTimes {
  static readonly type = '[Booking] Listen For AvailableTimes';
}

export class StopListeningForForAvailableTimes {
  static readonly type = '[Booking] Stop Listening For AvailableTimes';
}
*/





