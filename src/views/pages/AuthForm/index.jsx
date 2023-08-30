import './style.css';
import {useMemo, useState} from "react";

function AuthForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const disabled = useMemo(() => !!(!username || !password), [username, password]);

  const handleChangePassword = (e) => setPassword(e.target.value);

  const handleChangeUsername = (e) => setUsername(e.target.value);

  const onSubmit = (username, password) => console.log(username, password);

  return (
      <form>
        <input
            id="username-input"
            name="username"
            placeholder="username"
            type="text"
            value={username}
            onChange={handleChangeUsername}
        />
        <input
            id="password-input"
            name="password"
            placeholder="password"
            type="password"
            value={password}
            onChange={handleChangePassword}
        />
        <button
            type="button"
            onClick={() => onSubmit(username, password)}
            disabled={disabled}
        >
          Submit
        </button>
      </form>
  );
}

export default AuthForm;
