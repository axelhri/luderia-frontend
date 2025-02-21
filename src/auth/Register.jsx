import { useMutation } from "@tanstack/react-query";
import { useContext, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import { registerSchema } from "./auth.schema";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { setIsAuthenticated } = useContext(AuthContext);

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/register`,
        { email, password }
      );
      return data;
    },
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("userId", data.user.id);
      setIsAuthenticated(true);
    },
    onError: (error) => {
      console.log(error.response.data.message || "Une erreur est survenue");
    },
  });

  const submitForm = (e) => {
    e.preventDefault();

    const result = registerSchema.safeParse({ email, password });

    if (!result.success) {
      setError(result.error.errors[0].message);
    } else {
      mutation.mutate();
    }
  };

  return (
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
      <button>créer un compte</button>
    </form>
  );
}

export default Register;
