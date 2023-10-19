import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";

// MATERIAL DONE
// import { Typography } from "@mui/material";
import { StyledTypography } from 'views/styledComponents';
import Profile from "views/components/Profile";
import VideoIntroduction from "./VideoIntroduction";
import CustomPlayerV4 from "views/components/video-player/web/CustomPlayerV4";
import RecommendedVideo from "views/components/video-player/web/RecommendedVideo";

// import MovieImageGridList from "./MovieImageGridList";
// import MovieVideoList from "./MovieVideoList";
// import MovieCastGridList from "./MovieCastGridList";
// import Recommendations from "./Recommendations";

// CORE
import { selectors } from "core/reducers/index";
import { verifyCachedData } from "core/utils";
import { fetchMovie } from "core/actions";

const REQUIRED_FIELDS = ["tagline"];

const api_data = [
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/%40onlymilitarycontent%3Avideo%3A7076002202753584390.mp4",
    url: "https://cdn.coverr.co/videos/coverr-desert-in-california-329/1080p.mp4",
    viewsCount: "1M",
    likesCount: "30K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/jet.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1618595714505-cfc44411d4d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://cdn.coverr.co/videos/coverr-golden-dunes-4546/1080p.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://cdn.coverr.co/videos/coverr-golden-gate-bridge-at-sunset-5420/1080p.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://static.videezy.com/system/resources/previews/000/049/801/original/DJI_0104.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://static.videezy.com/system/resources/previews/000/048/776/original/refinery01.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/r_Mvoq7Oliyrkej0t/videoblocks-v1-0002_dji_0748_r47ojmzkq__ae26123a57af1f09e97017a982c56a24__P360.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/%40onlymilitarycontent%3Avideo%3A7076002202753584390.mp4",
    url: "https://cdn.coverr.co/videos/coverr-desert-in-california-329/1080p.mp4",
    viewsCount: "1M",
    likesCount: "30K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/jet.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1618595714505-cfc44411d4d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://cdn.coverr.co/videos/coverr-golden-dunes-4546/1080p.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://cdn.coverr.co/videos/coverr-golden-gate-bridge-at-sunset-5420/1080p.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://static.videezy.com/system/resources/previews/000/049/801/original/DJI_0104.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://static.videezy.com/system/resources/previews/000/048/776/original/refinery01.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/r_Mvoq7Oliyrkej0t/videoblocks-v1-0002_dji_0748_r47ojmzkq__ae26123a57af1f09e97017a982c56a24__P360.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/%40onlymilitarycontent%3Avideo%3A7076002202753584390.mp4",
    url: "https://cdn.coverr.co/videos/coverr-desert-in-california-329/1080p.mp4",
    viewsCount: "1M",
    likesCount: "30K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/jet.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1618595714505-cfc44411d4d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://cdn.coverr.co/videos/coverr-golden-dunes-4546/1080p.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://cdn.coverr.co/videos/coverr-golden-gate-bridge-at-sunset-5420/1080p.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://static.videezy.com/system/resources/previews/000/049/801/original/DJI_0104.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://static.videezy.com/system/resources/previews/000/048/776/original/refinery01.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/r_Mvoq7Oliyrkej0t/videoblocks-v1-0002_dji_0748_r47ojmzkq__ae26123a57af1f09e97017a982c56a24__P360.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/%40onlymilitarycontent%3Avideo%3A7076002202753584390.mp4",
    url: "https://cdn.coverr.co/videos/coverr-desert-in-california-329/1080p.mp4",
    viewsCount: "1M",
    likesCount: "30K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/jet.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1618595714505-cfc44411d4d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://cdn.coverr.co/videos/coverr-golden-dunes-4546/1080p.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://cdn.coverr.co/videos/coverr-golden-gate-bridge-at-sunset-5420/1080p.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://static.videezy.com/system/resources/previews/000/049/801/original/DJI_0104.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://static.videezy.com/system/resources/previews/000/048/776/original/refinery01.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/r_Mvoq7Oliyrkej0t/videoblocks-v1-0002_dji_0748_r47ojmzkq__ae26123a57af1f09e97017a982c56a24__P360.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/%40onlymilitarycontent%3Avideo%3A7076002202753584390.mp4",
    url: "https://cdn.coverr.co/videos/coverr-desert-in-california-329/1080p.mp4",
    viewsCount: "1M",
    likesCount: "30K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/jet.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1618595714505-cfc44411d4d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://cdn.coverr.co/videos/coverr-golden-dunes-4546/1080p.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://cdn.coverr.co/videos/coverr-golden-gate-bridge-at-sunset-5420/1080p.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://static.videezy.com/system/resources/previews/000/049/801/original/DJI_0104.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://static.videezy.com/system/resources/previews/000/048/776/original/refinery01.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/r_Mvoq7Oliyrkej0t/videoblocks-v1-0002_dji_0748_r47ojmzkq__ae26123a57af1f09e97017a982c56a24__P360.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/%40onlymilitarycontent%3Avideo%3A7076002202753584390.mp4",
    url: "https://cdn.coverr.co/videos/coverr-desert-in-california-329/1080p.mp4",
    viewsCount: "1M",
    likesCount: "30K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/jet.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1618595714505-cfc44411d4d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://cdn.coverr.co/videos/coverr-golden-dunes-4546/1080p.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://cdn.coverr.co/videos/coverr-golden-gate-bridge-at-sunset-5420/1080p.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://static.videezy.com/system/resources/previews/000/049/801/original/DJI_0104.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://static.videezy.com/system/resources/previews/000/048/776/original/refinery01.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/r_Mvoq7Oliyrkej0t/videoblocks-v1-0002_dji_0748_r47ojmzkq__ae26123a57af1f09e97017a982c56a24__P360.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/%40onlymilitarycontent%3Avideo%3A7076002202753584390.mp4",
    url: "https://cdn.coverr.co/videos/coverr-desert-in-california-329/1080p.mp4",
    viewsCount: "1M",
    likesCount: "30K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/jet.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1618595714505-cfc44411d4d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://cdn.coverr.co/videos/coverr-golden-dunes-4546/1080p.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://cdn.coverr.co/videos/coverr-golden-gate-bridge-at-sunset-5420/1080p.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://static.videezy.com/system/resources/previews/000/049/801/original/DJI_0104.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://static.videezy.com/system/resources/previews/000/048/776/original/refinery01.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/r_Mvoq7Oliyrkej0t/videoblocks-v1-0002_dji_0748_r47ojmzkq__ae26123a57af1f09e97017a982c56a24__P360.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/%40onlymilitarycontent%3Avideo%3A7076002202753584390.mp4",
    url: "https://cdn.coverr.co/videos/coverr-desert-in-california-329/1080p.mp4",
    viewsCount: "1M",
    likesCount: "30K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/jet.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1618595714505-cfc44411d4d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://cdn.coverr.co/videos/coverr-golden-dunes-4546/1080p.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://cdn.coverr.co/videos/coverr-golden-gate-bridge-at-sunset-5420/1080p.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://static.videezy.com/system/resources/previews/000/049/801/original/DJI_0104.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://static.videezy.com/system/resources/previews/000/048/776/original/refinery01.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },
  {
    // url: "https://d1ca20q97pi6ei.cloudfront.net/Crystal+Castles+-+Kerosene(American+Psycho).mp4",
    url: "https://dm0qx8t0i9gc9.cloudfront.net/watermarks/video/r_Mvoq7Oliyrkej0t/videoblocks-v1-0002_dji_0748_r47ojmzkq__ae26123a57af1f09e97017a982c56a24__P360.mp4",
    viewsCount: "3.2M",
    likesCount: "100K",
    // thumbNail: "https://d1ca20q97pi6ei.cloudfront.net/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",

    // thumbNail: "https%3A%2F%2Fd1ca20q97pi6ei.cloudfront.net%2Fthumbnail%2FCrystal%2BCastles%2B-%2BKerosene(American%2BPsycho)%2B.jpeg",
    thumbNail: "https://images.unsplash.com/photo-1560440293-855922f9cc7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80",


    // thumbNail: "https://views-test-api.s3.us-west-1.amazonaws.com/thumbnail/Crystal+Castles+-+Kerosene(American+Psycho)+.jpeg",
  },




]


const VideoWrapper = styled.div`

  /* display: flex; */

  display: grid;
  grid-gap: 1em;
  grid-template-columns: repeat(3, 203px);
  /* grid-template-columns: repeat(auto-fill, minmax(160px, 1fr)); */
`;

function VideoProfile() {
  const dispatch = useDispatch();
  const { videoId } = useParams();
  // const isFetching = useSelector(state =>
  //   selectors.selectIsFetchingVideo(state, videoId)
  // );
  // const video = useSelector(state => selectors.selectVideo(state, videoId));
  //
  // useEffect(() => {
  //   dispatch(fetchVideo(videoId, REQUIRED_FIELDS));
  // }, [videoId, dispatch]);

  // const loading = isFetching || !verifyCachedData(video, REQUIRED_FIELDS);

  // return (
  //   <Profile
  //     // loading={loading}
  //     introduction={<VideoIntroduction videoId={videoId} url={api_data[5].url} />}
  //     main={
  //       <>
  //
  //
  //
  //         <VideoWrapper>
  //           {api_data.map((item, index) =>
  //               // <StyledVideoCard
  //               // <VideoCard
  //               // <VideoPlayer
  //               // <CustomPlayer
  //               // <CustomPlayerV2
  //               // <CustomPlayerV3
  //               <CustomPlayerV4
  //               // <CustomBardPlayer
  //               // <VideoPlayerV2
  //                 url={item.url}
  //                 key={index}
  //                 // light={item.url}
  //                 light={item.thumbNail}
  //                 viewsCount={item.viewsCount}
  //                 likesCount={item.likesCount}
  //               />
  //             )
  //           }
  //         </VideoWrapper>
  //       </>
  //     }
  //
  //   />
  // );


  return (
    <div
      style={{display: 'flex'}}

    >
      <div
        style={{width: '1000px'}}
      >
        <VideoIntroduction videoId={videoId} url={api_data[5].url} />
      </div>

      <VideoWrapper
        style={{width: '400px'}}
      >
        {api_data.map((item, index) =>
            // <StyledVideoCard
            // <VideoCard
            // <VideoPlayer
            // <CustomPlayer
            // <CustomPlayerV2
            // <CustomPlayerV3
            // <CustomPlayerV4
            <RecommendedVideo
            // <CustomBardPlayer
            // <VideoPlayerV2
              url={item.url}
              key={index}
              // light={item.url}
              light={item.thumbNail}
              viewsCount={item.viewsCount}
              likesCount={item.likesCount}
            />
          )
        }
      </VideoWrapper>
    </div>
  );


}

export default VideoProfile;
