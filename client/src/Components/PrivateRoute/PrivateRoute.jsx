import { useToast } from "@chakra-ui/react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const token = sessionStorage.getItem("accessToken");
  const toast = useToast({ position: "top" });

  if (!token) {
    toast({
      title: `Please login to continue`,
      status: "error",
      isClosable: true,
    });
return <Navigate to={"/login?next="+window.location.pathname} />;
  }

  return children;
}
export default PrivateRoute;
