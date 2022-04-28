import * as cheerio from "cheerio";
import fetch from "node-fetch";
import fs from "fs";

async function getFormulaOneDrivers() {
  try {
    const response = await fetch("https://www.formula1.com/en/drivers.html");
    const body = await response.text();
    const $ = await cheerio.load(body);

    let items = [];
    $(".listing-items--wrapper > .row > .col-12").map((i, e) => {
      const rank = $(e).find(".rank").text();
      const points = $(e).find(".points > .f1-wide--s").text();
      const name = $(e).find(".listing-item--name span:first").text();
      const surname = $(e)
        .find(".listing-item--name span:nth-child(even)")
        .text();
      const team = $(e).find(".listing-item--team").text();
      const photo = $(e).find(".listing-item--photo img").attr("data-src");

      items.push({
        rank,
        points,
        name,
        surname,
        team,
        photo,
      });

      //First version of listing items

      //   console.log(
      //     `${rank} - Points ${points}: ${name} ${surname} - Team: ${team} - Picture: ${photo} `
      //   );

      //Second version of listing items in the console
      //   console.log(items);
    });

    //Create a file in the JSON format where we store all the data fetched inside it.
    fs.writeFile("formula.json", JSON.stringify(items), (err) => {
      if (err) console.log(err);
      console.log(
        "Formula.json is file saved in the current folder with the data inside"
      );
    });
  } catch (err) {
    console.log(err.message);
  }
}

getFormulaOneDrivers();
