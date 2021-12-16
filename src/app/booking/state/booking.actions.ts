
export class ListenForAvailableTimes {
  static readonly type = '[Booking] Listen For Available Times';
}


export class StopListeningForAvailableTimes {
  static readonly type = '[Booking] Stop Listening For AvailableTimes';
}


export class UpdateAvailableTimes {
  constructor(public availableTimes: string[]) {}
  static readonly type = '[Booking] Update Available Times';
}


