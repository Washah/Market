import React from "react";
import { CSSProperties } from "react";
import useResponsive from "../hooks/useResponsive";

const Page404: React.FC = () => {
  const { isSmallScreen } = useResponsive();

  const style: { [key: string]: CSSProperties } = {
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "88.5vh",
      background: "linear-gradient(to right, #6200ea, #bb86fc)",
      color: "white",
      position: "relative",
    },
    header: {
      fontSize: isSmallScreen ? "8rem" : "12rem",
      fontWeight: "bold",
      marginBottom: "10px",
      textShadow: "5px 5px 15px #bb86fc",
      animation: "bounce 2s infinite",
    },
    text: {
      fontSize: isSmallScreen ? "1.1rem" : "2.5rem",
      fontStyle: "italic",
      textShadow: "2px 2px 8px #bb86fc",
    },
    link: {
      marginTop: "20px",
      fontSize: isSmallScreen ? "0.8rem" : "1.5rem",
      padding: "15px 30px",
      borderRadius: "30px",
      background: "white",
      color: "#6200ea",
      textDecoration: "none",
      boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.3)",
    },
    groceryIcon: {
      position: "absolute",
      top: "10%",
      right: "10%",
      fontSize: isSmallScreen ? "7rem" : "10rem",
      opacity: 0.4,
      zIndex: 1,
    },
  };

  return (
    <div style={style.container}>
      <h1 style={style.header}>404</h1>
      <p style={style.text}>
        Oops! Looks like you've lost your way in our aisles.
      </p>
      <a href="/" style={style.link}>
        Find Your Way Back Home
      </a>
      <div style={style.groceryIcon}>🛒</div>
    </div>
  );
};

export default Page404;
