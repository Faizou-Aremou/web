import { User, UserProps } from "../models/User";
import { ViewWithEvent } from "./View";

export class UserForm extends ViewWithEvent<UserProps, User> {

  eventsMap(): { [key: string]: () => void } {
    return {
      'click:button#set-name': this.onSetNameClick,
      'click:button#set-age': this.onSetAgeClick,
      'click:button#save-model': this.onSetModelClick,
    }
  }
  onSetAgeClick(): void {
    this.model.setRandomAge();
    this.model.get('age');
  }
  onSetModelClick(): void {
    console.log('', this.model.save());
  }

  onSetNameClick(): void {
    const input = this.parent.querySelector('input#name');
    if (this.isHTMLInput(input)) {
      const name = input.value
      this.model.set({ name });
    }

  }
  isHTMLInput(value: Element | null | undefined): value is HTMLInputElement {
    return value !== null;
  }


  template(): string {
    return `
         <div> 
           <input placeholder="${this.model.get('name')}" id="name"/>
           <button id="set-name"> Change Name </button>
           <button id="set-age"> Set random age </button>
           <button id="save-model">Save User</button>
          </div
`
  }
}