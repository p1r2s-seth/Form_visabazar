import React, { useState } from "react";
import { Button, Typography, Modal, Box } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Stack from "@mui/material/Stack";
import illustratintwo from "../images/two.svg";
import photograph from "../images/photograph.jpeg";
import frontImg from "../images/front.jpeg";
import backImg from "../images/back.jpeg";

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

const FileAttachment = ({
  handleChange,
  errors,
  values,
  setFieldValue,
}: any) => {
  const [back, setBack] = useState(false);
  const [front, setFront] = useState(false);
  const [photo, setPhoto] = useState(false);

  return (
    <>
      <div className="w-full block lg:grid grid-cols-2 gap-10">
        <div className=" h-96  flex flex-col space-y-4">
          <div>
            <div className="flex space-x-4">
              <h1>Digital Photograph:</h1>
              <InfoOutlinedIcon
                onClick={() => setPhoto(true)}
                className="cursor-pointer"
              />
            </div>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button
                variant="outlined"
                className={`h-24 overflow-hidden border  ${
                  errors.photoGraph && "border border-red-600"
                }`}
                component="label"
                fullWidth
              >
                {!values.photoGraph && (
                  <PhotoCamera
                    className={`${errors.photoGraph && "text-red-600"}`}
                  />
                )}

                <input
                  hidden
                  name="photoGraph"
                  id="photoGraph"
                  accept=".png, .jpeg, .jpg"
                  onChange={(e: any) => {
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                      if (fileReader.readyState === 2) {
                        setFieldValue("photoGraph", fileReader.result);
                      }
                    };
                    fileReader.readAsDataURL(e.target.files[0]);
                  }}
                  type="file"
                />
                <span className="text-red-600">{errors.photoGraph}</span>
                {values.photoGraph && <img src={values.photoGraph} />}
              </Button>

              <Modal
                open={photo}
                onClose={() => setPhoto(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <img src={photograph} alt="photograph" />
                </Box>
              </Modal>
            </Stack>
          </div>
          <div>
            <div className="flex space-x-4">
              <h1>Passport Front:</h1>
              <InfoOutlinedIcon
                onClick={() => setFront(true)}
                className="cursor-pointer"
              />
            </div>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button
                variant="outlined"
                className={`h-24 overflow-hidden border  ${
                  errors.front && "border border-red-600"
                }`}
                component="label"
                fullWidth
              >
                {!values.front && (
                  <PhotoCamera
                    className={`${errors.front && "text-red-600"}`}
                  />
                )}

                <input
                  hidden
                  name="front"
                  id="front"
                  accept=".png, .jpeg, .jpg"
                  onChange={(e: any) => {
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                      if (fileReader.readyState === 2) {
                        setFieldValue("front", fileReader.result);
                      }
                    };
                    fileReader.readAsDataURL(e.target.files[0]);
                  }}
                  type="file"
                />
                <span className="text-red-600">{errors.front}</span>
                {values.front && <img src={values.front} />}
              </Button>

              <Modal
                open={front}
                onClose={() => setFront(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <img src={frontImg} alt="Front" />
                </Box>
              </Modal>
            </Stack>
          </div>
          <div className="flex flex-col ">
            <div className="flex space-x-4">
              <h1>Passport Back:</h1>{" "}
              <InfoOutlinedIcon
                onClick={() => setBack(true)}
                className="cursor-pointer"
              />
            </div>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Button
                variant="outlined"
                className={`h-24 overflow-hidden border  ${
                  errors.back && "border border-red-600"
                }`}
                component="label"
                fullWidth
              >
                {!values.back && (
                  <PhotoCamera className={`${errors.back && "text-red-600"}`} />
                )}
                <input
                  hidden
                  name="back"
                  id="back"
                  accept=".png, .jpeg, .jpg"
                  required
                  onChange={(e: any) => {
                    const fileReader = new FileReader();
                    fileReader.onload = () => {
                      if (fileReader.readyState === 2) {
                        setFieldValue("back", fileReader.result);
                      }
                    };
                    fileReader.readAsDataURL(e.target.files[0]);
                  }}
                  type="file"
                />
                <span className="text-red-600">{errors.back}</span>
                {values.back && <img src={values.back} />}
              </Button>

              <Modal
                open={back}
                onClose={() => setBack(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style}>
                  <img src={backImg} alt="Back" />
                </Box>
              </Modal>
            </Stack>
          </div>
        </div>
        <div>
          <img
            src={illustratintwo as any}
            className="hidden lg:block"
            alt="Test"
          />
        </div>
      </div>
    </>
  );
};

export default FileAttachment;
