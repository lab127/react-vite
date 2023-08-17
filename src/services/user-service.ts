import create from "./http-service";

export interface UserResType {
  id: number;
  name: string;
}

export default create("/users");
