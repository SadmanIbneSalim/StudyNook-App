import React from "react";
import { Spinner } from "@heroui/react";

const LoadingPage = () => {
  return (
    <div className="bg-[#F5EDD8] min-h-screen flex flex-col justify-center items-center gap-3">
      <Spinner size="lg" className="text-[#3B2F1E]" />

      <span className="text-sm font-medium text-[#7A5C38] tracking-wider animate-pulse">
        Loading StudyNook...
      </span>
    </div>
  );
};

export default LoadingPage;
