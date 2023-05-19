interface UserProps {
  name: string;
  age: number;
}

type CallBack = () => void;
export class User {
  events: Record<string, CallBack[]> = {};
  constructor(private data: UserProps) {
  }

  get(propName: keyof UserProps): number | string {
    return this.data[propName];
  }

  set(update: Partial<UserProps>): void {
    this.data = { ...this.data, ...update }
  }

  on(eventName: string, callBack: CallBack): void {
    if (this.events[eventName]) {
      this.events[eventName] = [...this.events[eventName], callBack];
    } else {
      this.events[eventName] = [callBack];
    }
  }
  trigger(eventName: string): void {
    const handlers = this.events[eventName];
    if (!handlers || handlers.length === 0) {
      return;
    }
    handlers.forEach(callback => callback());
  }
}