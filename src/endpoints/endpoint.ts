import { AxiosInstance } from "axios";

class Endpoint {
  protected client;

  constructor(client: AxiosInstance) {
    this.client = client;
  }
}

export default Endpoint;
