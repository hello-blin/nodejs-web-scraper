import * as cheerio from "cheerio";
import fetch from "node-fetch";

async function getFormulaOneDrivers() {
  try {
    const response = await fetch("https://www.formula1.com/en/drivers.html");
    console.log(response);
  } catch (err) {}
}

getFormulaOneDrivers();
