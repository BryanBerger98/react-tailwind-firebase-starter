import { Navigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

function AuthGuard({children, mustBeAuthenticated}) {

    const authContext = useAuthContext();
    const auth = mustBeAuthenticated ? authContext.currentUser : mustBeAuthenticated;
    const location = useLocation();

    if (auth) {
        return children
    } else {
        return <Navigate from={location} to={'/'}/>
    }
}
export default AuthGuard;