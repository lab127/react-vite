import apiClients from "./api-clients";
// penulisan user-service.ts jika menggukan function method

export interface UserResType {
  id: number;
  name: string;
}

export function getAllUsers() {
  const controller = new AbortController();
  const request = apiClients.get<UserResType[]>("/users", {
    signal: controller.signal,
  });

  return {
    request,
    cancel: () => controller.abort(),
  };
}

export function deleteUser(id: number) {
  return apiClients.delete("/users/" + id);
}

export function createUser(newUser: UserResType) {
  return apiClients.post("/users", newUser);
}

export function updateUser(user: UserResType) {
  return apiClients.patch("/users/" + user.id, user);
}
