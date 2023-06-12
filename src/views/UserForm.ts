import { User } from "../models/User";

export class UserForm {

  constructor(public parent: Element | null, public model: User) {
    this.bindModel();
  }

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:button#set-name': this.onSetNameClick,
      'click:button#set-age': this.onSetAgeClick,
    }
  }
  onSetAgeClick(): void {
    this.model.setRandomAge();
    console.log('', this.model.get('age'));
  }

  onSetNameClick(): void {
    this.model.setName('test');
  }


  template(): string {
    return `
         <div> 
           <h1>User Form</h1>
           <div>User name: ${this.model.get('name')}</div>
           <div>User age: ${this.model.get('age')}</div>
           <input/>
           <button id="change-name"> Change Name </button>
           <button id="set-age"> Set random age </button>
          </div
`
  }

  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (const eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey].bind(this))
      })
    }
  }

  render(): void {
    if (this.parent) {
      this.parent.innerHTML = '';
    }

    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent?.append(templateElement.content);
  }
  private bindModel() {
    this.model.on('change', () => {
      this.render();
    });
  }
}