import { User } from "./models/User";
import { UserForm } from "./views/UserForm";

const userForm = new UserForm(document.querySelector('#root'), User.buildUser({ name: 'Sam', age: 20 }))

userForm.render();