import { useState } from "react";

const useLoader = () => {
  const [loading, setLoading] = useState(false);

  const showLoader = () => setLoading(true);
  const hideLoader = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setLoading(false);
  };

  return { loading, showLoader, hideLoader };
};

export default useLoader;
