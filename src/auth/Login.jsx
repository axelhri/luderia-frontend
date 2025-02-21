import { useContext, useState } from "react";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { AuthContext } from "../context/AuthContext";
import { loginSchema } from "./auth.schema";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);
  const [error, setError] = useState("");

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        { email, password }
      );
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.userId);
      setIsAuthenticated(true);
    },
    onError: (error) => {
      setError(error.response.data.message || "Identifiants invalides");
    },
  });

  const submitForm = async (e) => {
    e.preventDefault();

    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      setError(result.error.errors[0].message);
    } else {
      mutation.mutate();
    }
  };

  return (
    <div>
      <form onSubmit={submitForm}>
        <input
          type="email"
          value={email}
          placeholder="email"
          onChange={handleChangeEmail}
        />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={handleChangePassword}
        />
        {error && <p>{error}</p>}
        <button type="submit">Connexion</button>
      </form>
    </div>
  );
}

export default Login;
