import { useEffect, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { Controller, useForm } from "react-hook-form";
import SuccessPopup from "../componenets/SuccessPopup";
import axios from "axios";

const EditMovieForm = ({}) => {
  const [open, setOpen] = useState(false);
  const { id } = useParams();
  const { control, reset, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      year: "",
      imdbRating: "",
    },
  });

  const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/movies/${id}`);

      reset({
        ...res?.data,
        title: res.data.Title,
        year: res.data.Year,
        imdbRating: res.data.imdbRating,
      });
      if (res.status == 200) {
        alert("Movie updated successfully!");
      }
    } catch (error) {
      alert("Failed to update movie");
    }
  };

  // on load getting data of movie id
  useEffect(() => {
    fetchData();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      const response = await axios.put(`http://localhost:3000/movies/${id}`, {
        ...data,
        Title: data.title,
        Year: data.year,
        imdbRating: data.imdbRating,
      });
      if (response.status == 200) {
        alert("Movie updated successfully!");
      }
    } catch (error) {
      alert("Failed to updated movie!");
    }

    setOpen(true);
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
        background: "linear-gradient(135deg, #dfe9f3, #ffffff)",
        borderRadius: 3,
        boxShadow: 5,
      }}
    >
      <Typography variant="h6" mb={1}>
        Edit Movie
      </Typography>

      {/* Title Feild */}
      <Controller
        name="title"
        control={control}
        render={({ field }) => <TextField {...field} label="Title" fullWidth />}
      />

      <Controller
        name="year"
        control={control}
        render={({ field }) => <TextField {...field} label="Year" fullWidth />}
      />

      <Controller
        name="imdbRating"
        control={control}
        render={({ field }) => (
          <TextField {...field} label="Rating" fullWidth />
        )}
      />

      <>
        {/* Submit Button */}
        <Button variant="contained" type="submit">
          Update
        </Button>

        {/* Popup */}
        <SuccessPopup
          open={open}
          handleOk={handleOk}
          handleClose={handleClose}
          title={"Movie editted sucessfully !"}
        />
      </>
    </Box>
  );
};

export default EditMovieForm;
