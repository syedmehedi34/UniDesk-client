import { useParams } from "react-router";

const CollegeDetails = () => {
  const { collegeId } = useParams();
  //   console.log(collegeId);

  return (
    <div>
      <h1>details </h1>
    </div>
  );
};

export default CollegeDetails;
