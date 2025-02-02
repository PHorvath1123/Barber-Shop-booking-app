import { PropsWithChildren, useEffect } from "react";
import { auth } from "../firebase.config";
import { useNavigate } from "react-router-dom";

type ProtectedRouterProps = PropsWithChildren
export default function ProtectedRoute({ children }: ProtectedRouterProps) {

  const user = auth.currentUser;
  const userIsLoggedIn = localStorage.getItem('user')
  const navigate = useNavigate();

  useEffect(() => {
    if(user === null && userIsLoggedIn === null){
      navigate("/admin/signin", {replace: true});
    }
  },[navigate, user, userIsLoggedIn])

  return children
}
