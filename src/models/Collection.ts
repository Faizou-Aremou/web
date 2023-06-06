import axios, { AxiosResponse } from "../../node_modules/axios/index";
import { Eventing } from "./Eventing";

export class Collection<T, K extends { id?: number }> { // view Model Base for collections
  models: T[] = [];
  events: Eventing = new Eventing();

  constructor(public rootUrl: string, public deserialize: (json: K) => T) {

  }

  get on() {
    return this.events.on;
  }

  get trigger() {
    return this.events.trigger;
  }

  fetch(): void {
    axios.get(this.rootUrl).then((
      (response: AxiosResponse) => {
        response.data.forEach((value: K) => {
          const viewModel = this.deserialize(value);
          this.models = [...this.models, viewModel];
        });

        this.trigger('change');
      }
    ))
  }
}