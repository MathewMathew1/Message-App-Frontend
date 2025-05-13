import { Grid, Typography, Box } from "@mui/material";
import Oliphant from "../../Oliphant.png";
import { SxProps } from "@mui/system";
import "./AboutSite.css";

const ChatRoomStyle: SxProps = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "4rem 1rem",
  backgroundColor: "#121212",
  minHeight: "100vh",
};

const heroIntro: SxProps = {
  width: "100%",
  maxWidth: "600px",
  padding: "2em",
  position: "relative",
  color: "#fff",
  textAlign: "center",
  backgroundColor: "rgba(30,30,30,0.8)",
  borderRadius: "1rem",
  boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
  backdropFilter: "blur(6px)",
};

const imageStyle: SxProps = {
  width: "120px",
  height: "120px",
  borderRadius: "50%",
  objectFit: "cover",
  marginBottom: "1.5rem",
  border: "3px solid white",
};

const customStyle: any = {

};

const AboutSite = (): JSX.Element => {
  return (
    <Grid sx={ChatRoomStyle} container>
      <Box sx={heroIntro}>
        <Box component="img" src={Oliphant} alt="Oliphant" sx={imageStyle} />
        <Typography variant="h4" gutterBottom>
          Welcome to Oliphant
        </Typography>
    
        <Typography
          className="type"
          style={{ ...customStyle }}
          variant="body1"
        >
          Oliphant is a messaging app inspired by Discord. You might be wondering—
          why is it called Oliphant? Simple. In ancient India, elephants were said
          to be used to deliver messages between cities, like feathered messengers
          of their own. Is it true? Yes. Maybe. No. Possibly.
        </Typography>
      </Box>
    </Grid>
  );
};

export default AboutSite;
