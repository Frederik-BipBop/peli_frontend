import { useState } from "react";
import { useNavigate } from "react-router";
import facade from "../apiFacade.js";

export default function LoginPage() {
  const navigate = useNavigate();

  const init = { username: "", password: "" };
  const [loginCredentials, setLoginCredentials] = useState(init);
  const [error, setError] = useState("");

  const performLogin = async (evt) => {
    evt.preventDefault();
    setError("");
    try {
      await facade.login(
        loginCredentials.username,
        loginCredentials.password
      );
      navigate("/favorites");
    } catch {
      setError("Login failed (wrong credentials)");
    }
  };

  const onChange = (evt) => {
    setLoginCredentials({
      ...loginCredentials,
      [evt.target.id]: evt.target.value,
    });
  };

  if (facade.loggedIn()) {
    return (
      <>
        <h1>Login</h1>
        <p>You are already logged in.</p>
      </>
    );
  }

  return (
    <>
      <h1>Login</h1>

      <form
        onSubmit={performLogin}
        style={{ display: "grid", gap: "0.5rem", maxWidth: 320 }}
      >
        <input
          placeholder="User Name"
          id="username"
          onChange={onChange}
          value={loginCredentials.username}
        />
        <input
          placeholder="Password"
          id="password"
          type="password"
          onChange={onChange}
          value={loginCredentials.password}
        />
        <button type="submit">Login</button>
      </form>

      {error && <p style={{ color: "crimson" }}>{error}</p>}
    </>
  );
}
