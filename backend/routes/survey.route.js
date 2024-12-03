const express = require("express");
const routes = express();

const { createSurvey } = require("../controller/survey.controller");

routes.post("/create-survey", createSurvey);

module.exports = routes;
