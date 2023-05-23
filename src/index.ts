import axios from "../node_modules/axios/index";
import { User } from "./models/User";

const user = new User({ name: 'new Record', age: 0 });
user.events.on('change', () => {
  console.log('change')
});

user.events.trigger('change');