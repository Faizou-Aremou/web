import { CallBack } from "./Model";

export class Eventing {
  events: Record<string, CallBack[]> = {};
  on = (eventName: string, callBack: CallBack): void =>{
    if (this.events[eventName]) {
      this.events[eventName] = [...this.events[eventName], callBack];
    } else {
      this.events[eventName] = [callBack];
    }
  }
  trigger=(eventName: string): void =>{
    const handlers = this.events[eventName];
    if (!handlers || handlers.length === 0) {
      return;
    }
    handlers.forEach(callback => callback());
  }
}