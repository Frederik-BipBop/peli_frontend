import { useState, useEffect } from "react";
import facade from "../apiFacade.js";

function LoggedIn({ username, roles }) {
  const [dataFromServer, setDataFromServer] = useState("Loading...");

  useEffect(() => {
    const promise = facade.fetchData("protected/user_demo"); // behold som din, hvis den virker
    promise.then((data) => {
      setDataFromServer(data);
    });
  }, []);

  return (
    <div>
      <h2>Data Received from server</h2>
      <h3>{dataFromServer}</h3>
      <h3>{username}</h3>
      <h3>{roles}</h3>
    </div>
  );
}

export default LoggedIn;
