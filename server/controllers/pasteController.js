import express from "express";
import mongoose from "mongoose";
import { Paste } from "../models/pasteModel.js";

// business logic for creating paste

export const createPaste = async (req, res) => {
  try {
    const { paste, expiryDate, maxViews } = req.body;
    if (!paste) {
      return res.status(400).json({
        success: false,
        message: "Paste content is required",
      });
    }
    const currentDate = new Date();
    if (expiryDate && new Date(expiryDate) <= currentDate) {
      return res.status(400).json({
        success: false,
        message: `Invalid expiry date`,
      });
    }

    if (maxViews !== undefined && maxViews !== null && maxViews !== "") {
      const parsedMaxViews = Number(maxViews);

      
      if (
        Number.isNaN(parsedMaxViews) ||
        !Number.isInteger(parsedMaxViews) ||
        parsedMaxViews < 1
      ) {
        return res.json({
          success: false,
          message: "maxViews count must be a positive integer",
        });
      }
    }

    const newPaste = await Paste.create({
      paste,
      expiryDate: expiryDate || null,
      maxViews: maxViews || null,
    });

    return res.json({
      success: true,
      newPaste,
    });
  } catch (error) {
    console.log("error in creating paste ", error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const getPaste = async (req, res) => {
  try {
    const pasteId = req.params.id;
    const paste = await Paste.findById(pasteId);
    if (!paste) {
      return res.status(404).json({
        success: false,
        message: "paste not found",
      });
    }
    if (paste.maxViews != null && paste.viewsCount >= paste.maxViews) {
      return res.json({
        success: false,
        message: "paste view limit exceeded",
      });
    }

    paste.viewsCount += 1;
    await paste.save();

    if (paste.maxViews !== null && paste.viewsCount >= paste.maxViews) {
      paste.expiryDate = new Date();
      await paste.save();
    }

    return res.json({
      success: true,
      paste,
    });
  } catch (error) {
    console.log("error in geting the paste", error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};
