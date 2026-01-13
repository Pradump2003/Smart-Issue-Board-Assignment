import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUser } from "./useUser";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const useFetchApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const { setUser } = useUser();

  const fetchApi = useCallback(
    async ({ url, method = "GET", data = null }) => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${BASE_URL}${url}`, {
          method,
          credentials: "include", 
          headers: {
            "Content-Type": "application/json",
          },
          body: data ? JSON.stringify(data) : null,
        });

        if (res.status === 401) {
          setUser(null);

          if (!url.includes("/user/me")) {
            toast.info("Session expired. Please login again.");
            navigate("/", { replace: true });
          }

          throw new Error("Unauthorized");
        }

        const result = await res.json();

        
        if (!res.ok && res.status !== 409) {
          throw new Error(result.message || "Request failed");
        }
        return { ...result, statusCode: res.status };
      } catch (err) {
        setError(err.message);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [navigate, setUser]
  );

  return { fetchApi, loading, error };
};

export default useFetchApi;
