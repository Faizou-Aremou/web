import axios from "../node_modules/axios/index";
import { Sync } from "./models/Sync";
import { User } from "./models/User";

const rootUrl = 'http://localhost:3000/users'
const sync = new Sync(rootUrl);
const user = new User({ name: 'new Record', age: 0 });
user.events.on('change', () => {
  console.log('change')
});

user.events.trigger('change');