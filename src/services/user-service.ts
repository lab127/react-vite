import apiClients from "./api-clients";

export interface UserResType {
  id: number;
  name: string;
}

class UserService {
  getAllUsers() {
    const controller = new AbortController();
    const request = apiClients.get<UserResType[]>("/users", {
      signal: controller.signal,
    });

    // cancel disini digunakan untuk cancel request
    // pengganti controller.abort()
    return {
      request,
      cancel: () => controller.abort(),
    };
  }

  deleteUser(id: number) {
    return apiClients.delete("/users/" + id);
  }

  createUser(newUser: UserResType) {
    return apiClients.post("/users", newUser);
  }

  updateUser(user: UserResType) {
    return apiClients.patch("/users/" + user.id, user);
  }
}

export default new UserService();
