import React from "react";

const useSearchQuery = () => {
  // state to capture and store search queries
  const [searchQuery, setSearchQuery] = React.useState("");
  //capture keypress and update the search query
  React.useEffect(() => {
    let timer: NodeJS.Timeout;
    const handleKeyPress = (e: KeyboardEvent) => {
      setSearchQuery(prevQuery => prevQuery + e.key);
      // Clear any existing timer before setting a new one
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        setSearchQuery("");
      }, 4000);
    };
    window.addEventListener("keypress", handleKeyPress);
    return () => {
      window.removeEventListener("keypress", handleKeyPress);
      clearTimeout(timer); // Clear the timer when the component unmounts
    };
  }, []);
  return searchQuery;
};

export default useSearchQuery;
