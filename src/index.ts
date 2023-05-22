import axios from "../node_modules/axios/index";
import { User } from "./models/User";

const user = new User({ name: 'new', age: 0 });
user.save()