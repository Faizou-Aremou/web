import { User, UserProps } from "../models/User";
import { View, ViewWithRegion } from "./View";

export class UserEdit extends ViewWithRegion < UserProps, User>{
  regions: { [selector: string]: Element; }={
    
  }
  regionsMap(): { [key: string]: string; } {
    return {
      userShow:'.user-show',
      userForm:'.user-form'
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