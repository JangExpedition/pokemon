import axios from "axios";

export class Api {
  url;

  constructor(url) {
    this.url = url;
  }

  async getData() {
    return (await axios.get(this.url)).data.results;
  }
}
