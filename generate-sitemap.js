import { SitemapStream, streamToPromise } from "sitemap";
import { createWriteStream } from "fs";

const sitemap = new SitemapStream({
  hostname: "https://gbl-store.com",
});

const writeStream = createWriteStream("./public/sitemap.xml");

sitemap.pipe(writeStream);

const routes = [
  "/",
  "/collection",
  "/home",
  "/about",
  "/contact",
  "/product/:productId",
  "/terms-and-conditions",
];

routes.forEach((url) => {
  sitemap.write({
    url,
    changefreq: "weekly",
    priority: url === "/" ? 1.0 : 0.8,
  });
});

sitemap.end();

streamToPromise(sitemap);

console.log("Sitemap generated!");
