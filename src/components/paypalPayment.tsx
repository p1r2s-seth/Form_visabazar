import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import illustrationthree from "../images/three.svg";
import paynow from "../images/paynow.jpeg";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PaypalPayment = ({ handleChange, errors }: any) => {
  const [open, setOpen] = useState(false);
  const [pay, setPay] = useState(false);
  const handlePay = () => setPay(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPay(false);
  };

  return (
    <>
      <div className="w-full block lg:grid grid-cols-2 gap-10">
        <div className="flex flex-col space-y-4">
          {/*
          <PayPalScriptProvider options={{ "client-id": "test" }}>
            <PayPalButtons style={{ layout: "horizontal" }} />
          </PayPalScriptProvider> */}
          <div>
            <Button
              variant="contained"
              style={{ background: "#FF6347" }}
              className="h-12"
              onClick={handlePay}
              fullWidth
            >
              {" "}
              Pay Now
            </Button>
            <Modal
              open={pay}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <img src={paynow} alt="paynow" />
              </Box>
            </Modal>
          </div>
          <div>
            <Button
              variant="contained"
              className="h-12"
              onClick={handleOpen}
              fullWidth
            >
              {" "}
              Bank Transfer
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Company Name:- UPLIFT TOURISM PVT. LTD.
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Bank Name - HDFC
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  Branch - Paharganj, Delhi
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  A/c No - 04572320000263
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  IFSC- HDFC0000457
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  SWIFT - HDFCINBBDEL
                </Typography>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  UPI - 9810018312@upi
                </Typography>
              </Box>
            </Modal>
          </div>
        </div>
        <div>
          <img
            src={illustrationthree as any}
            className="hidden lg:block"
            alt="Test"
          />
        </div>
      </div>
    </>
  );
};
export default PaypalPayment;
