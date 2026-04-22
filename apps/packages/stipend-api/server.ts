import { Api } from ".";

const app = Api("").listen(9000);

console.log(
  `Access the API at http://${app.server?.hostname}:${app.server?.port}`
);
