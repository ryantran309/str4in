import {Navigate, RouteProps} from "react-router-dom";
  
  export function PrivateRoute({ children }: RouteProps): JSX.Element {
    const token = localStorage.getItem("token");
    return (
      <>
        {token
          ? children
          : <Navigate to="/login"/>
        }
      </>
    );
  }

  export default PrivateRoute;