import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import AuthApi from "@/api/auth-api";

export const useSignOut = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: () => AuthApi.postSignOut(),
    onSuccess: () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
      localStorage.removeItem("role");
      sessionStorage.removeItem("isLoading");
      navigate("/");
    },
  });
};
