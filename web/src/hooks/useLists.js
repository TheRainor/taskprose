import { useEffect, useState } from "react";
import {
  listFormSubmit,
  getLists,
  listDeleteSubmit,
} from "../services/index.js";
import { useListCountsContext } from "../contexts/useListCountsContext.jsx";
import { useUser } from "../contexts/userContext.jsx";

export const useLists = (navigate) => {
  const { setUser } = useUser();
  const [listName, setListName] = useState("");
  const [lists, setLists] = useState([]);
  const { refreshListCounts } = useListCountsContext();

  useEffect(() => {
    (async () => {
      const { lists, user } = await getLists(navigate);
      const { first_name, last_name, email } = user;
      setUser({ first_name, last_name, email });
      setLists(lists);
    })();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    await listFormSubmit(formData);
    setListName("");
    const { lists } = await getLists(navigate);
    setLists(lists);
    refreshListCounts();
  };

  const handleDelete = async (listId) => {
    await listDeleteSubmit(listId);
    const { lists } = await getLists(navigate);
    setLists(lists);
    refreshListCounts();
  };

  return { handleSubmit, handleDelete, listName, setListName, lists, setLists };
};
