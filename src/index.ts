import { User } from "./models/User";
import { UserEdit } from "./views/UserEdit";
import { UserForm } from "./views/UserForm";

const root = document.querySelector('#root')
if (root) {
  const userEdit = new UserEdit(root, User.buildUser({ name: 'Sam', age: 20 }))

  userEdit.render();
  console.log(userEdit)
} else {
  throw new Error(" the root element was not found");
}
