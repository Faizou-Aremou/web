export class Attribute<T> {

  constructor(private data: T) {
  }

  get =<K extends keyof T>(key: K): T[K]=> {
    return this.data[key];
  }

  set(update: Partial<T>): void {
    this.data = { ...this.data, ...update }
  }
}