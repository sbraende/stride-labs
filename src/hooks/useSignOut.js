import { useNavigate } from "react-router-dom";
import { auth } from "@/config/auth.config";

const useSignOut = () => {
  const navigate = useNavigate();

  const signOutUser = async () => {
    try {
      await auth.signOut();
      navigate("/signin");
    } catch (error) {
      console.error("Could not sign user out", error);
      alert("Could not sign you out, please try again or contact site admin");
    }
  };

  return signOutUser;
};

export default useSignOut;
