import axios from "axios";
import chalk from "chalk";
import * as cheerio from "cheerio";
import { writeFileSync } from "fs";
import { bannedUrls } from "./bannedUrls";
import { benchs } from "./constants";
import { scrapItemPage } from "./scrapItemPage";

export const scrapItemsPage = async () => {
  const { data } = await axios.get(
    "https://icarus.fandom.com/wiki/Category:Items"
  );

  const $ = cheerio.load(data);

  const categoriesUrls: string[] = [];
  const itemUrls: string[] = [];

  $("a").each((_, el) => {
    const href = $(el).attr("href");
    if (href && href.startsWith("/wiki/Category:")) {
      categoriesUrls.push(href);
    } else if (
      href &&
      href.startsWith("/wiki/") &&
      !bannedUrls.includes(href) &&
      !itemUrls.includes(href)
    ) {
      if (href.includes(":")) return;
      itemUrls.push(href);
    }
  });

  const items = await Promise.all(itemUrls.map(scrapItemPage));

  // const items = await Promise.all(
  //   [
  //     "/wiki/Aerodynamic_Attachment",
  //     "/wiki/Armor_Attachment_Pack",
  //     // '/wiki/Attack_Speed_Attachment',
  //     // '/wiki/Basic_Scope_Attachment',
  //     // '/wiki/Calibrated_Grip_Attachment',
  //     // '/wiki/Carcass_Harvesting_Attachment',
  //     // '/wiki/Copper_Attachment',
  //     // '/wiki/Economic_Attachment',
  //     // '/wiki/Flexible_Frame_Attachment',
  //     // '/wiki/Gold_Attachment'
  //   ].map(scrapItemPage)
  // );

  items.map((item) => {
    if (item?.craft.length === 0) {
      console.log(
        `${chalk.bgYellow("WARNING")} ${item.name} has no craft (${item.url})`
      );
    }
  });

  console.log(`Scrapped ${items.length} items and ${benchs.length} benches`);

  writeFileSync("items.json", JSON.stringify(items, null, 2));
  writeFileSync("benchs.json", JSON.stringify(benchs, null, 2));
};