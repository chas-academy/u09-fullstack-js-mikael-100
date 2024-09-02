import express from "express";
import upload from "../config/uploadsConfig";

const uploadConfigRoutes = express.Router();

uploadConfigRoutes.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) {
    // Om ingen fil laddades upp
    return res.status(400).send("Ingen fil laddades upp.");
  }
  res.send("Fil Uppladdad");
});

export default uploadConfigRoutes;
