// import { Navigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// /**
//  * Wrap any route that requires authentication.
//  * Shows a full-page loader while the auth state is being checked (prevents
//  * a flash-redirect on page reload when the user IS logged in).
//  */
// export default function PrivateRoute({ children }) {
//   const { user, loading } = useAuth();

//   if (loading) {
//     return (
//       <div className="page-loading">
//         <div className="spinner spinner-brand" />
//         <span>Checking session…</span>
//       </div>
//     );
//   }

//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   return children;
// }

export default function PrivateRoute({ children }) {
  //مؤقت عشان ادخل علي الداشبورد بدون تسجيل دخول
  return children;
}
