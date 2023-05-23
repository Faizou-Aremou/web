import axios from "../../node_modules/axios/index";
export class Sync {
  async fetch(): Promise<void> {
    const response = await axios.get(`http://localhost:3000/users/${this.get('id')}`);
   // this.set(response.data);
  }

  save(): void {
    // const id = this.get('id');
    // if (this.get('id')) {
    //   axios.put(`http://localhost:3000/users/${id}`, this.data);
    // } else {
    //   axios.post('http://localhost:3000/users', this.data);
    // }
  }
}