import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import { useAuth } from "../providers/AuthProvider";

const useAdmissionApplications = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const email = user?.email;

  const {
    data: userColleges = [],
    isLoading: isLoadingUserColleges,
    error,
    refetch: userCollegeRefetch,
  } = useQuery({
    queryKey: ["userData", email],
    queryFn: async () => {
      if (!email) {
        return [];
      }
      const res = await axiosPublic.get("/user-college", {
        params: { email },
      });
      return res.data;
    },
    enabled: !!email,
  });

  if (error) {
    console.error("Error fetching user data:", error);
  }

  return [userColleges, isLoadingUserColleges, userCollegeRefetch];
};

export default useAdmissionApplications;
