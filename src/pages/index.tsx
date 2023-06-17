import React, { useEffect, useState } from "react";
import type { HeadFC, PageProps } from "gatsby";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import PersonalInfo from "../components/personalInfo";
import FileAttachment from "../components/fileAttachment";
import PaypalPayment from "../components/paypalPayment";
import { Formik } from "formik";
import * as Yup from "yup";
import "../styles/global.css";
import logo from "../images/logo.png";
import { Home } from "@mui/icons-material";
import { db } from "../../firebase/initFirebase";
import { collection, addDoc, getDoc, doc } from "firebase/firestore";
import { Helmet } from "react-helmet";
import CompletedForm from "../components/completedForm";
import SteinStore from "stein-js-client";
import { navigate } from "gatsby";

const store = new SteinStore(
  "https://api.steinhq.com/v1/storages/6417ffe8d27cdd09f0e9b539"
);

const steps = [
  "Personal Information",
  "Upload Documents",
  "Payment & Checkout",
];

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().required("Required"),
  phoneNumber: Yup.string().required("Required"),
});

const fileAttachSchema = Yup.object().shape({
  photoGraph: Yup.mixed().required("Required"),
  front: Yup.mixed().required("Required"),
  back: Yup.mixed().required("Required"),
});
const IndexPage: React.FC<PageProps> = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [completed, setCompleted] = React.useState<{
    [k: number]: boolean;
  }>({});
  const [basicdata, setBasicData] = useState<any>();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encodedData = urlParams.get("data");
    if (encodedData) {
      // Decode the data
      const decodedData = JSON.parse(atob(encodedData));
      setBasicData(decodedData);
      localStorage.setItem("basicData", JSON.stringify(encodedData));
      navigate("/");
    } else {
      const storedData = localStorage.getItem("basicData");
      if (storedData) {
        const decodeStored = JSON.parse(atob(JSON.parse(storedData)));
        setBasicData(decodeStored);
      }
    }
  }, []);

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <>
      <Helmet>
        <html lang="en" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff"></meta>
      </Helmet>
      <Box
        sx={{
          width: "90%",
        }}
        className="ml-1 mt-1 md:ml-14 md:mt-8 flex flex-col md:flex-row"
      >
        <div className="ml-[50%] md:ml-0">
          <a href="https://visabazar.com/">
            <img src={logo as any} className="w-36 h-14" alt="Test" />
          </a>
        </div>
        <div className="w-full">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
        <div className="hidden md:block">
          <a href="https://visabazar.com/">
            <Home className="text-5xl" />
          </a>
        </div>
      </Box>

      <div className="ml-8  w-4/5 lg:ml-24">
        <Formik
          enableReinitialize
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            phoneNumber: "",
            country: basicdata?.country,
            visatype: basicdata?.visatype,
            photoGraph: "",
            front: "",
            back: "",
            numberOfApplicant: 1,
          }}
          validationSchema={activeStep === 1 ? fileAttachSchema : SignupSchema}
          onSubmit={(values) => {
            console.log(activeStep);
            if (activeStep === 0) {
              localStorage.setItem(
                "applicants",
                JSON.stringify(values.numberOfApplicant)
              );
              try {
                addDoc(collection(db, "user"), {
                  firstName: values.firstName,
                  lastName: values.lastName,
                  email: values.email,
                  phoneNumber: values.phoneNumber,
                  country: values.country,
                  visatype: values.visatype,
                  numberOfApplicant: values.numberOfApplicant,
                });
              } catch (e) {
                console.error("Error adding document: ", e);
              }
              store
                .append("Sheet1", [
                  {
                    firstName: values.firstName,
                    lastName: values.lastName,
                    email: values.email,
                    phoneNumber: values.phoneNumber,
                    country: values.country,
                    visatype: values.visatype,
                  },
                ])
                .then((res: any) => {
                  console.log(res);
                });

              setActiveStep(activeStep + 1);
            } else if (activeStep === 2) {
              const storedDiscountedFees = localStorage.getItem("DISCOUNTFEES");
              const initialDiscountedFees = storedDiscountedFees
                ? JSON.parse(storedDiscountedFees)
                : 0;

              try {
                addDoc(collection(db, "user"), {
                  fees: initialDiscountedFees,
                  photoGraph: values.photoGraph,
                  front: values.front,
                  back: values.back,
                });
              } catch (e) {
                console.error("Error adding document: ", e);
              }
              store
                .append("Sheet1", [
                  {
                    photoGraph: values.photoGraph,
                    front: values.front,
                    back: values.back,
                    fees: initialDiscountedFees,
                  },
                ])
                .then((res: any) => {
                  console.log(res);
                });
              setActiveStep(activeStep + 1);
            } else {
              setActiveStep(activeStep + 1);
            }
          }}
        >
          {({
            handleSubmit,
            handleChange,
            errors,
            values,
            setFieldValue,
            setFieldError,
            error,
          }: any) => (
            <form className="mt-14" onSubmit={handleSubmit} noValidate>
              {activeStep === 0 && (
                <PersonalInfo
                  handleChange={handleChange}
                  errors={errors}
                  values={values}
                  setFieldValue={setFieldValue}
                />
              )}
              {activeStep === 1 && (
                <FileAttachment
                  handleChange={handleChange}
                  values={values}
                  errors={errors}
                  setFieldError={setFieldError}
                  setFieldValue={setFieldValue}
                  error={error}
                />
              )}
              {activeStep === 2 && (
                <PaypalPayment
                  fees={basicdata?.fees}
                  handleChange={handleChange}
                  errors={errors}
                  error={error}
                  step={activeStep}
                />
              )}
              {activeStep > 2 && <CompletedForm />}
              <Box className="mt-0 w-full md:mt-14 ">
                <div>
                  <React.Fragment>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        color="inherit"
                        variant="contained"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        sx={{ mr: 1 }}
                      >
                        Back
                      </Button>

                      <Box sx={{ flex: "1 1 auto" }} />
                      {activeStep <= 2 && (
                        <Button
                          type="submit"
                          variant="contained"
                          sx={{ mr: 1 }}
                        >
                          {activeStep === 2 ? "Finish" : "Next"}
                        </Button>
                      )}
                    </Box>
                  </React.Fragment>
                </div>
              </Box>
            </form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default IndexPage;

export const Head: HeadFC = () => <title>Home Page</title>;
