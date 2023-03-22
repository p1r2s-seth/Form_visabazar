import React, { useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Sent from "../images/sent.svg";

const CompletedForm = () => {
  return (
    <>
      <div className="w-full ">
        <img src={Sent as any} className="w-32 h-32 ml-[30%] md:ml-[50%]" alt="Test" />
        <div className="ml-0 md:ml-[10%]">
          <Typography align="center" variant="h4">
            {" "}
            Thank you for choosing visabazar!
          </Typography>

          <Typography align="center">
            We have received your visa request. Our visa specialist will connect
            with you very shortly.
          </Typography>
        </div>
        <div className="ml-[30%] mt-4 md:ml-[50%]">
          <Button variant="contained" href="https://visabazar.com/">
            Go Back Home
          </Button>
        </div>
      </div>
    </>
  );
};
export default CompletedForm;
