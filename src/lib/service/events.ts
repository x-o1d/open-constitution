class _Event {
  name: string | undefined;
  subscriptions: ((data?: any) => void)[] = [];

  constructor(name: string) {
    this.name = name;
  }

  subscribe = (callback: (data?: any) => void) => {
    this.subscriptions.push(callback);
  }

  trigger = (data?: any) => {
    this.subscriptions.forEach(c => c(data));
  }
}

const events: _Event[] = [];

export const getEvent = (name: string) => {
  const event = events.find(e => e.name === name);
  if(event) {
    return event;
  } else {
    const event = new _Event(name);
    events.push(event);
    return event;
  }
}