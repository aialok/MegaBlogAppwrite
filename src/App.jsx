import { useDispatch } from "react-redux";
import variables from "./config/config";
import authServices from "./appwrite/auth-service";
import { useEffect, useState } from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { Outlet } from "react-router-dom";
import { login, logout } from "./store/authSlice";
import RTE from "./components/RTE";

export default function App() {
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    authServices
      .getUserSessions()
      .then((userData) => {
        if (userData) {
          dispatch(login(userData));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return !loading ? <div className="min-h-screen flex flex-wrap content-between bg-slate-300">
    <div>
      <Header/>
      <main>
       TODO: {/* <Outlet/> */}
       <RTE/>
      </main>
      <Footer/>
    </div>
  </div> : null;
}
