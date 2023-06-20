import React, { useState, useEffect } from "react";
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

const PaypalPayment = ({ handleChange, errors, fees, step }: any) => {
  const [open, setOpen] = useState(false);
  const [pay, setPay] = useState(false);
  const [couponAmount, setCouponAmount] = useState(0);
  const [discountedFees, setDiscountedFees] = useState(0);
  const [couponApplied, setCouponApplied] = useState(false);

  const handlePay = () => setPay(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setPay(false);
  };

  const applyCoupon = () => {
    const newDiscountedFees = discountedFees - couponAmount;
    setDiscountedFees(newDiscountedFees);
    setCouponApplied(true);
    localStorage.setItem("DISCOUNTFEES", JSON.stringify(newDiscountedFees));
  };
  useEffect(() => {
    const amount = localStorage.getItem("applicants");
    localStorage.setItem("DISCOUNTFEES", JSON.stringify(fees));
    if (amount) {
      const parsedAmount = parseInt(amount);
      let couponAmount = 0; // Default value of 0

      if (parsedAmount === 1) {
        couponAmount = 250;
      } else if (parsedAmount === 2) {
        couponAmount = 500;
      } else if (parsedAmount >= 3 && parsedAmount <= 5) {
        couponAmount = 1000;
      } else if (parsedAmount >= 6 && parsedAmount <= 9) {
        couponAmount = 2000;
      } else if (parsedAmount === 10) {
        couponAmount = 3000;
      }

      setCouponAmount(couponAmount);
      setDiscountedFees(fees * parsedAmount);
    }
  }, []);

  return (
    <>
      <div className="w-full block lg:grid grid-cols-2 gap-10">
        <div className="flex flex-col space-y-4">
          {/*
          <PayPalScriptProvider options={{ "client-id": "test" }}>
            <PayPalButtons style={{ layout: "horizontal" }} />
          </PayPalScriptProvider> */}
          <div className="drop-shadow-2xl bg-white rounded-md pt-4">
            <div className="mb-6 ml-2">
              <div className="flex space-x-8">
                <span>{discountedFees !== fees ? "New Fee:" : "Fee:"}</span>
                <span className="font-bold text-2xl">₹{discountedFees}</span>
              </div>
              {discountedFees == fees && (
                <div className="flex space-x-4">
                  <span>{`Save ₹${couponAmount} with this code`}</span>
                  <span className="font-light text-[#92c8f7]">{`VISABAZAR${couponAmount}`}</span>
                </div>
              )}
            </div>
            <Button
              type="button"
              variant="contained"
              onClick={applyCoupon}
              fullWidth
              disabled={couponApplied}
            >
              {couponApplied ? "COUPON APPLIED" : "TAP TO APPLY"}
            </Button>
          </div>

          <div className="mt-8">
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
              Pay Later
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
