import { HasId } from "../models/has-id";
import { Model } from "../models/Model";

export abstract class View<K extends HasId, T extends Model<K>> {

  constructor(public parent: Element, public model: T) {
    this.bindModel();
  }

  abstract template(): string;

  render(): void {
    if (this.parent) {
      this.parent.innerHTML = '';
    }
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.parent.append(templateElement.content);
  }
  private bindModel() {
    this.model.on('change', () => {
      this.render();
    });
  }
}

export abstract class ViewWithEvent<K extends HasId, T extends Model<K>> extends View<K, T>{

  abstract eventsMap(): { [key: string]: () => void };
  bindEvents(fragment: DocumentFragment): void {
    const eventsMap = this.eventsMap();
    for (const eventKey in eventsMap) {
      const [eventName, selector] = eventKey.split(':');
      fragment.querySelectorAll(selector).forEach((element) => {
        element.addEventListener(eventName, eventsMap[eventKey].bind(this))
      })
    }
  }

  override render(): void {
    if (this.parent) {
      this.parent.innerHTML = '';
    }
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.bindEvents(templateElement.content);
    this.parent.append(templateElement.content);
  }
}
export abstract class ViewWithRegion<K extends HasId, T extends Model<K>> extends View<K, T>{
  regions: { [selector: string]: Element } = {};
  abstract regionsMap(): { [key: string]: string };

  mapRegions(fragment: DocumentFragment): void {
    const regionsMap = this.regionsMap();
    for (let key in regionsMap) {
      const selector = regionsMap[key];
      const element = fragment.querySelector(selector)
      if (element) {
        this.regions[selector] = element
      }

    }
  }
  override render(): void {
    if (this.parent) {
      this.parent.innerHTML = '';
    }
    const templateElement = document.createElement('template');
    templateElement.innerHTML = this.template();
    this.mapRegions(templateElement.content);
    this.parent.append(templateElement.content);
  }
}
