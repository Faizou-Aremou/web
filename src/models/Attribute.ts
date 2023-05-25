export class Attribute<T> {

  constructor(private data: T) {
  }

  get(propName: keyof T): T[keyof T] {
    return this.data[propName];
  }

  set(update: Partial<T>): void {
    this.data = { ...this.data, ...update }
  }
}