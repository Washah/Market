import { Typography, Grid } from "@mui/material";
import storeImage from "../../assets/images/store.png";
import useResponsive from "../../hooks/useResponsive";
import "./About.css";

const About = () => {
  const { isXsScreen } = useResponsive();

  return (
    <div className="about">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography
            variant="h3"
            gutterBottom
            className="blueText"
            sx={{
              whiteSpace: "nowrap",
              marginTop: "-1rem",
              fontFamily: "Josefin Sans",
              fontWeight: 500,
              fontSize: isXsScreen ? "1.9rem" : "3.5rem",
            }}
          >
            Welcome to MyStore!
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <img src={storeImage} alt="store" className="storeImage" />
        </Grid>
      </Grid>
    </div>
  );
};

export default About;
