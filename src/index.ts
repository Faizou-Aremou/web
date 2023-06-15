import { User } from "./models/User";
import { UserForm } from "./views/UserForm";

const root = document.querySelector('#root')
if (root) {
  const userForm = new UserForm(root, User.buildUser({ name: 'Sam', age: 20 }))

  userForm.render();
} else {
  throw new Error(" the root element was not found");
}
