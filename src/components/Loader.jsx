// import { RotatingLines } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen w-screen fixed top-0 left-0 bg-gray-100/80 z-[9999]">
      {/* <RotatingLines
        visible={true}
        height="96"
        width="96"
        color="grey"
        strokeWidth="5"
        animationDuration="0.75"
        ariaLabel="rotating-lines-loading"
        wrapperStyle={{}}
        wrapperClass=""
      /> */}
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
