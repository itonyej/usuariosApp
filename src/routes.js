import {prepareRoutes} from "@curi/router";
import Usuarios from "./pages/Usuarios/Usuarios";
import NotFound from "./pages/NotFound";

export default prepareRoutes([{
    name: "usuarios",
    path: "usuarios",
    response() {
      return {body:Usuarios};
    }
  },
  {
    name: "Catch All",
    path: "(.*)",
    response() {
      return {body: NotFound};
    }
  }
]);
