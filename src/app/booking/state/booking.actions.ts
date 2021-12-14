
export class ListenForAvailableTimes {
  static readonly type = '[Booking] Listen For AvailableTimes';
}

export class StopListeningForForAvailableTimes {
  static readonly type = '[Booking] Stop Listening For AvailableTimes';
}

export class UpdateAvailableTimes {
  constructor(public clients: string[]) {}
  static readonly type = '[Comment] Update Clients';
}

export class ListenForHighscoreComments {
  static readonly type = '[Booking] Listen For Comments';
}



