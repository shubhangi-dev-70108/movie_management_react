import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import SuccessPopup from "../componenets/SuccessPopup";
import axios from "axios";

const AddMovieForm = () => {
  const [open, setOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const formattedData = {
      ...data,
      Year: Number(data.Year),
      imdbRating: Number(data.imdbRating),
      Poster:
        "https://i.pinimg.com/474x/4f/49/30/4f49301d8cd85eb0db6bffce4e03713b.jpg",
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/movies",
        formattedData,
      );

      if (response.status === 201) {
        setOpen(true);
      }
    } catch (error) {
      alert("Adding failed");
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    navigate("/movies");
  };

  const navigate = useNavigate();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        minHeight: "70vh",
        justifyContent: "center",
        alignItems: "center",
        p: 2,
        maxWidth: 370,
        width: "100%",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
        gap: 2,
        background: "linear-gradient(135deg, #f1f6e5, #e1f2e3)",
        borderRadius: 3,
        boxShadow: 5,
      }}
    >
      <Typography variant="h6" mb={1}>
        Add Movie
      </Typography>

      {/* Title */}
      <Controller
        name="Title"
        control={control}
        rules={{ required: "Title is required" }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Title"
            error={!!errors.Title}
            helperText={errors.Title?.message as string}
            fullWidth
          />
        )}
      />

      {/* Year */}
      <Controller
        name="Year"
        control={control}
        rules={{
          required: "Year is required",
          pattern: {
            value: /^\d{4}$/,
            message: "Enter a valid 4-digit year",
          },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Year"
            error={!!errors.Year}
            helperText={errors.Year?.message as string}
            onChange={(e) => {
              const val = e.target.value.slice(0, 4); // limit 4 digits
              field.onChange(val);
            }}
            fullWidth
          />
        )}
      />

      {/* Rating */}
      <Controller
        name="imdbRating"
        control={control}
        rules={{
          required: "Rating is required",
          min: { value: 1, message: "Min rating is 1" },
          max: { value: 10, message: "Max rating is 10" },
        }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Rating"
            type="number"
            error={!!errors.imdbRating}
            helperText={errors.imdbRating?.message as string}
            fullWidth
          />
        )}
      />

      {/* Submit Button */}
      <>
        <Button variant="contained" type="submit">
          Submit
        </Button>

        {/* Popup */}
        <SuccessPopup
          open={open}
          handleOk={handleOk}
          handleClose={handleClose}
          title={"Movie added sucessfully !"}
        />
      </>
    </Box>
  );
};

export default AddMovieForm;
