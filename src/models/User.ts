interface UserProps {
  name: string;
  age: number;
}

type CallBack = <T>(value: T) => void;
export class User {
  events: Record<string, CallBack[]> = {}
  constructor(private data: UserProps) {
  }

  get(propName: keyof UserProps): number | string {
    return this.data[propName];
  }

  set(update: Partial<UserProps>): void {
    this.data = { ...this.data, ...update }
  }

  on(eventName: string, callBack: CallBack) {

  }
}