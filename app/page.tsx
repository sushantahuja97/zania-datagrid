import React from "react";
import DataGrid from "@/components/Datagrid";

const Home: React.FC = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <DataGrid />
    </div>
  );
};

export default Home;