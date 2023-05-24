import axios, { AxiosPromise } from "../../node_modules/axios/index";
export class Sync {

  constructor(public rootUrl: string) { }
  async fetch(id: number): AxiosPromise {
    const response = await axios.get(`${this.rootUrl}/${id}`);
    return response;
  }

  save<T extends { id?: number }>(data: T): AxiosPromise {
    const id = data.id;
    if (id) {
      return axios.put(`${this.rootUrl}/${id}`, data);
    } else {
      return axios.post(this.rootUrl, data);
    }
  }
}