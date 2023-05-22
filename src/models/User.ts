import axios from "../../node_modules/axios/index";

interface UserProps {
  id?: number
  name: string;
  age: number;
}

type CallBack = () => void;
export class User {
  events: Record<string, CallBack[]> = {};
  constructor(private data: UserProps) {
  }

  get(propName: keyof UserProps): number | string | undefined {
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

  async fetch(): Promise<void> {
    const response = await axios.get(`http://localhost:3000/users/${this.get('id')}`);
    this.set(response.data);
  }

  save(): void {
    const id = this.get('id');
    if (this.get('id')) {
      axios.put(`http://localhost:3000/users/${id}`, this.data);
    } else {
      axios.post('http://localhost:3000/users', this.data);
    }
  }
}