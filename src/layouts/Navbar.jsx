import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { isAuthenticated } = useContext(AuthContext);
  return (
    <div>
      <p>{isAuthenticated ? "connecté" : "pas connecté"}</p>
    </div>
  );
}

export default Navbar;
