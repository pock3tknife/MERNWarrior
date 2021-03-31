import React, { useState, useEffect } from "react";
import HeroSection from "../../HeroSection";
import { homeObjOne, homeObjTwo, homeObjThree, homeObjFour } from "./Data";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import useStyles from "../../../components/pages/styles";

const Products = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });
  const post = useSelector((state) =>
    currentId ? state.posts.find((message) => message._id === currentId) : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const clear = () => {
    setCurrentId(0);
    setPostData({ title: "", message: "", tags: "", selectedFile: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (currentId === 0) {
      // dispatch(createPost({ ...postData, name: user?.result?.name }));
      clear();
    } else {
      dispatch();
      //updatePost(currentId, { ...postData, name: user?.result?.name })
      clear();
    }
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to view page content.
        </Typography>
      </Paper>
    );
  }

  return (
    <>
      <HeroSection {...homeObjTwo} />
    </>
  );
};

export default Products;
