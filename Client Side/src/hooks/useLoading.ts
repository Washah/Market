import React from "react";

// The hook accepts a function and its dependencies
function useLoading(fetchFunction: () => Promise<any>, dependencies: any[]) {
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const fetchDataWithLoading = async () => {
      setIsLoading(true);
      // Promise to execute the fetch function
      const fetchPromise = fetchFunction();
      // Promise to delay for 1 second
      const delayPromise = new Promise(resolve => setTimeout(resolve, 1000));
      // Wait for both promises to complete before setting loading to false
      await Promise.all([fetchPromise, delayPromise]);
      setIsLoading(false);
    };

    fetchDataWithLoading();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies);

  return isLoading;
}

export default useLoading;
