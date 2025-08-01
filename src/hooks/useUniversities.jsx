import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useUniversities = () => {
  const axiosPublic = useAxiosPublic();

  const {
    data: universities = [],
    isLoading: isLoadingUniversities,
    error,
    refetch: universitiesRefetch,
  } = useQuery({
    queryKey: ["universities"],
    queryFn: async () => {
      const res = await axiosPublic.get("/universities");
      return res.data;
    },
  });

  if (error) {
    console.error("Error fetching:", error);
  }

  return [universities, isLoadingUniversities, universitiesRefetch];
};

export default useUniversities;
