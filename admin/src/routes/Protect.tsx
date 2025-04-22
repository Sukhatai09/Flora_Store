import React, { useState, useEffect } from "react";
import { AddminOnly } from "../api/auth";
import useAuthStore from "../store/authStore";
import { Navigate } from "react-router-dom";
import Loading from "./Loading";

interface ProtectProps {
  children: React.ReactNode;
}
const Protect: React.FC<ProtectProps> = ({ children }) => {
  const [ok, setOk] = useState(false);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    if (user) {
      AddminOnly()
        .then((res) => {
          console.log(res.data);
          setOk(true);
        })
        .catch((err) => {
          console.error(err.message);
          console.error(err.response.data.message);
          setOk(false);
        });
    }
  }, []);
  
  return ok ? children : < Loading  />;
};

export default Protect;
