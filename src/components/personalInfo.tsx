import React, { useState, useEffect } from "react";
import { Box, TextField, Autocomplete } from "@mui/material";
import { MuiTelInput } from "mui-tel-input";

import illustration from "../images/one.svg";

const PersonalInfo = ({ handleChange, errors, values, setFieldValue }: any) => {


  const phoneChange = (newValue: any) => {
    setFieldValue("phoneNumber", newValue);
  };

  return (
    <>
      <div className="w-full block lg:grid grid-cols-2 gap-10">
        <div className="flex flex-col space-y-6">
          <TextField
            variant="outlined"
            type="text"
            onChange={handleChange}
            name="firstName"
            id="firstName"
            error={!!errors.firstName}
            label="First Name *"
            fullWidth
            margin="dense"
            value={values.firstName}
          />
          <TextField
            variant="outlined"
            type="text"
            onChange={handleChange}
            name="lastName"
            id="lastName"
            error={!!errors.lastName}
            label="Last Name *"
            fullWidth
            margin="dense"
            value={values.lastName}
          />

          <MuiTelInput
            onChange={phoneChange}
            value={values.phoneNumber}
            error={!!errors.phoneNumber}
            fullWidth
            name="phoneNumber"
            id="phoneNumber"
            defaultCountry="IN"
            label="Phone number *"
            margin="dense"
            variant="outlined"
          />
          <TextField
            id="email"
            type="text"
            margin="dense"
            variant="outlined"
            fullWidth
            value={values.country}
            disabled
          />

          <TextField
            id="email"
            label="Email *"
            type="email"
            onChange={handleChange}
            error={!!errors.email}
            margin="dense"
            variant="outlined"
            fullWidth
            value={values.email}
          />
        </div>
        <div>
          <img
            src={illustration as any}
            className="hidden lg:block"
            alt="Test"
          />
        </div>
      </div>
    </>
  );
};
export default PersonalInfo;
