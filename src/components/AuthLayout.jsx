import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";

export default function Protected({ children, authentication = true }) {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus) {
      navigate("/");
    }

    setLoader(false);
  }, [authStatus, navigate, authentication]);

  return loader ? <h1>Loading....</h1> : <>{children}</>;
}
