import { controlTokens } from "../index.js";
import { getListsApi } from "../../api/index.js";

export async function getLists(navigate) {
  try {
    const token = await controlTokens();

    if (token.success) {
      const data = await getListsApi(token.accessToken);

      const { success, lists } = data;
      if (!success) throw new Error("Listeler alınamadı");

      const user = {
        email: token.email,
        first_name: token.first_name,
        last_name: token.last_name,
      };
      return { lists, user };
    } else {
      navigate("/auth");
    }
  } catch (err) {
    navigate("/auth");
  }
}
