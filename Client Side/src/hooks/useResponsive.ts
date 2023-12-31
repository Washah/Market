import { useMediaQuery } from "react-responsive";

const useResponsive = () => {
  const isSmallDesktop = useMediaQuery({ query: "(max-width: 87.5em)" }); //1400px
  const isXsDesktop = useMediaQuery({ query: "(max-width: 65.62em)" }); //1050px
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 50em)" }); //800px
  const isSmallScreen = useMediaQuery({ query: "(max-width: 40.62em)" }); //650px
  const isXsScreen = useMediaQuery({ query: "(max-width: 37.5em)" }); //600px
  const isXXsScreen = useMediaQuery({ query: "(max-width: 31.25em)" }); //500px

  return {
    isTabletOrMobile,
    isXsScreen,
    isSmallScreen,
    isSmallDesktop,
    isXsDesktop,
    isXXsScreen,
  };
};

export default useResponsive;
