import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import Home from "./Admin/Page/Home/Home";
import { store } from "./Redux/Store";
import TempUI from "./Admin/TempUI/TempUI";
import Login from "./Admin/Page/Login/Login";
import Register from "./Admin/Page/Register/Register";
import FranchiseManagement from "./Admin/Page/FranchiseManagement/FranchiseManagement";
import ProtectedRoute from "./Utils/ProtectedRoute";
import AnonymousRoute from "./Utils/AnonymousRoute ";
import HomeStudent from "./Student/Page/HomeStudent";
import HomeInstructor from "./Instructor/Page/HomeInstructor";
import ForgotPassword from "./Admin/Page/ForgotPassword/ForgotPassword";
import ResetPassword from "./Admin/Page/ForgotPassword/ResetPassword";
import TempUIManager from "./Manager/TempUI/TempUIManager";
import HomeManager from "./Manager/Page/Home/HomeManager";
import ConsultationManagement from "./Manager/Page/ConsultationManagement/ConsultationManagement";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Routes>
          <Route element={<AnonymousRoute />}>
            <Route path="" element={<Login></Login>} />
            <Route path="register" element={<Register></Register>} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route
              path="forgot-password/reset-password"
              element={<ResetPassword />}
            />
          </Route>
          <Route element={<ProtectedRoute requiredRole="Administrator" />}>
            <Route path="admin" element={<TempUI />}>
              <Route path="" element={<Home />} />
              <Route path="franchise" element={<FranchiseManagement />} />
            </Route>
          </Route>

          <Route element={<ProtectedRoute requiredRole="Student" />}>
            <Route path="student" element={<HomeStudent />} />
          </Route>

          <Route element={<ProtectedRoute requiredRole="Instructor" />}>
            <Route path="instructor" element={<HomeInstructor />} />
          </Route>

          <Route element={<ProtectedRoute requiredRole="Manager" />}>
            <Route path="manager" element={<TempUIManager />}>
              <Route path="" element={<HomeManager />} />
              <Route path="consult" element={<ConsultationManagement/>} />
            </Route>
          </Route>
        </Routes>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
