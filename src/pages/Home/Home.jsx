import React from "react";
import Header from "./Header";

const Home = () => {
  return (
    <div>
      <Header onSearch={(query) => console.log(query)} />
    </div>
  );
};

export default Home;
