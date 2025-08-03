import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useAuth } from "../providers/AuthProvider";

const useUsers = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const email = user?.email;

  const {
    data: userData = [],
    isLoading: isLoadingUserData,
    error,
    refetch: userDataRefetch,
  } = useQuery({
    queryKey: ["userData", email],
    queryFn: async () => {
      if (!email) {
        return [];
      }
      const res = await axiosPublic.get("/user-data", {
        params: { email },
      });
      return res.data;
    },
    enabled: !!email,
  });

  if (error) {
    console.error("Error fetching user data:", error);
  }

  return [userData, isLoadingUserData, userDataRefetch];
};

export default useUsers;
