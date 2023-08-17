import apiClients from "./api-clients";

interface Entity {
  id: number;
}

class HttpService {
  // endpoint sebagai arg getAll(), dibuat disini biar bisa dipakain fungsi yang lain
  endpoint: string;

  // function untuk buat instance class
  constructor(endpoint: string) {
    this.endpoint = endpoint;
  }
  // <T> generic method type parameter
  // Placeholder untuk type
  getAll<T>() {
    const controller = new AbortController();
    // dengan endpoint arg "/users" diganti dengan endpoint
    const request = apiClients.get<T[]>(this.endpoint, {
      signal: controller.signal,
    });

    return {
      request,
      cancel: () => controller.abort(),
    };
  }

  delete(id: number) {
    return apiClients.delete(this.endpoint + "/" + id);
  }

  create<T>(entity: T) {
    return apiClients.post(this.endpoint, entity);
  }

  // extend ke Entity interface untuk mengetahui bahwa entity mempunya properti id
  update<T extends Entity>(entity: T) {
    // compilation error entity.id
    return apiClients.patch(this.endpoint + "/" + entity.id, entity);
  }
}

// export instance harus kasih endpoint seperti dibawah dan harus pass parameter manual dan tidak bisa dinamik
// export default new HttpService('/users');

// solusinya
const create = (arg: string) => new HttpService(arg);

export default create;
