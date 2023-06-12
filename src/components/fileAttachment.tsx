import React, { useState } from "react";
import { Button, Modal, Box } from "@mui/material";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Stack from "@mui/material/Stack";
import illustratintwo from "../images/two.svg";
import photograph from "../images/photograph.jpeg";
import frontImg from "../images/front.jpeg";
import backImg from "../images/back.jpeg";
import Compressor from "compressorjs";

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
  errors,
  values,
  setFieldValue,
  setFieldError,
}: any) => {
  const [back, setBack] = useState(false);
  const [front, setFront] = useState(false);
  const [photo, setPhoto] = useState(false);

  const handleFileChange = async (e: any, field: any) => {
    const file = e.target.files[0];
    //filesize setting
    if (!file) {
      setFieldError(field, "Please select a file");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      setFieldError(field, "File Too Large");
      return;
    }
    new Compressor(file, {
      quality: 0.4, // set the image quality to 60%
      maxWidth: 500, // set the maximum width of the image to 800px
      success: async (compressedFile: any) => {
        const formData = new FormData();
        formData.append("file", compressedFile);
        formData.append("upload_preset", "de15kswn");
        formData.append("cloud_name", "ddabevp0t");

        try {
          const res = await fetch(
            `https://api.cloudinary.com/v1_1/ddabevp0t/image/upload`,
            {
              method: "POST",
              body: formData,
            }
          );

          if (!res.ok) {
            throw new Error("Failed to upload file");
          }

          const data = await res.json();
          setFieldValue(field, data.secure_url);
        } catch (error: any) {
          console.log(error.message);
        }
      },
      error: (err: any) => {
        console.log(err.message);
      },
    });
  };

  return (
    <>
      <div className="w-full block lg:grid grid-cols-2 gap-10">
        <div className=" h-96 mt-4  flex flex-col space-y-4">
          <div className="text-center text-gray-500 text-sm">
            Please upload passport and photograph for primary visa applicant For
            other visa applicants email documents to support@visabazar.com
          </div>
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
                  accept="image/jpeg, image/png"
                  onChange={(e: any) => handleFileChange(e, "photoGraph")}
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
                  accept="image/jpeg, image/png"
                  onChange={(e: any) => handleFileChange(e, "front")}
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
                  accept="image/jpeg, image/png"
                  required
                  onChange={(e: any) => handleFileChange(e, "back")}
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
