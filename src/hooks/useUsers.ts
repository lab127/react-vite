import { useEffect, useState } from "react";
import userService, { UserResType } from "../services/user-service";
import { AxiosError } from "../services/api-clients";

// p1.7.17 custom hook
const useUsers = () => {
  const [userJson, setUserJson] = useState<UserResType[]>([]);
  const [userError, setUserError] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { request, cancel } = userService.getAll<UserResType>();
        const res = await request;
        setUserJson(res.data);
      } catch (error) {
        setUserError((error as AxiosError).message);
      }
    };
    fetchUsers();
    // jangan lupa empty array
  }, []);

  return { userJson, userError, isLoading, setUserError, setUserJson };
};

export default useUsers;
