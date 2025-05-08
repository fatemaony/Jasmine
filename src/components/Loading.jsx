import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigation } from "react-router";

const Loading = () => {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";
  return (
    isLoading && (
      <div className="flex items-center justify-center min-h-screen bg-base-200">
        <AiOutlineLoading3Quarters className="animate-spin size-16 text-primary" />
      </div>
    )
  );
};

export default Loading;