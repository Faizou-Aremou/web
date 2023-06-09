import { User, UserProps } from "../models/User";
import { UserForm } from "./UserForm";
import { UserShow } from "./UserShow";
import { View, ViewWithNestingRegions } from "./View";

export class UserEdit extends ViewWithNestingRegions<UserProps, User>{

  onRender(): void {
    new UserShow(this.regions.userShow, this.model).render();
    new UserForm(this.regions.userForm, this.model).render();
  }
  regionsMap(): { [key: string]: string; } {
    return {
      userShow: '.user-show',
      userForm: '.user-form'
    }
  }
  template(): string {
    return `
    <div>
      <div class="user-show"></div>
      <div class="user-form"></div>
    </div>
    `
  }

}