import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("restores all supplied pages with Mobile App Creative branding", () => {
    const websiteDirectory = join(process.cwd(), "public/nuuke");
    const htmlPages = readdirSync(websiteDirectory, { recursive: true })
      .filter((entry): entry is string => typeof entry === "string" && entry.endsWith(".html"))
      .map((entry) => join(websiteDirectory, entry));

    expect(htmlPages).toHaveLength(35);
    for (const pagePath of htmlPages) {
      const page = readFileSync(pagePath, "utf8");
      expect(page, pagePath).toContain("Mobile App Creative");
      expect(page, pagePath).toContain("info@mobileappcreative.com");
      expect(page, pagePath).not.toMatch(/(?<![\w/@.:-])nuuke(?![\w/.@:-])/i);
      expect(page, pagePath).toContain(
        "brand/badges/mobile-app-creative-logo-hd.png",
      );
    }
  });

  it("links each core service to its own quote-based pricing page", () => {
    const websiteDirectory = join(process.cwd(), "public/nuuke");
    const services = [
      ["mobile-app", "Mobile App"],
      ["video-production", "Video Production"],
      ["digital-marketing", "Digital Marketing"],
      ["3d-website-design", "3D Website Design"],
      ["animation", "2D/3D Animation"],
      ["paid-ads", "Paid Ads"],
      ["ai-automation", "AI Automation"],
    ];
    const pricing = readFileSync(join(websiteDirectory, "pricing.html"), "utf8");

    for (const [service, inquiryValue] of services) {
      const detailPath = join(websiteDirectory, "pricing", `${service}.html`);
      const detail = readFileSync(detailPath, "utf8");
      expect(pricing).toContain(`pricing/${service}.html`);
      expect(detail).toContain("Request a tailored quote");
      expect(detail).toContain(`?service=${inquiryValue}#main`);
      expect(detail).toContain("$499");
      expect(detail).toContain("$999");
      expect(detail).toContain("$1,999");
    }

    const homepage = readFileSync(join(websiteDirectory, "index.html"), "utf8");
    expect(homepage).toContain("View all pricing");
    expect(homepage).toContain('href="pricing/mobile-app.html"');
    expect(homepage).toContain('href="pricing/animation.html"');
    expect(homepage).toContain('href="pricing/digital-marketing.html"');
    expect(homepage).toContain('href="pricing/ai-automation.html"');
    expect(homepage).toContain("footer-certifications");
  });

  it("retains the supplied homepage sections and adds pricing with footer badges", () => {
    const homepage = readFileSync(join(process.cwd(), "public/nuuke/index.html"), "utf8");

    expect(homepage.match(/<section\b/gi)).toHaveLength(13);
    expect(homepage).toContain('class="h-w h-w--brand"');
    expect(homepage).toContain('style="white-space:normal;overflow-wrap:anywhere"');
    expect(homepage).toContain('brand/badges/mobile-app-creative-logo-hd.png');
    expect(readFileSync(join(process.cwd(), "public/audio/ambient.webm"))).toHaveLength(820932);
  });

  const packageRules = [
    { tier: "starter", price: 499, duration: "up to 30 seconds", revisions: "1 round of revisions", delivery: "5–7 business days" },
    { tier: "professional", price: 999, duration: "up to 60 seconds", revisions: "2 rounds of revisions", delivery: "10–14 business days" },
    { tier: "premium", price: 1999, duration: "up to 90 seconds", revisions: "3 rounds of revisions", delivery: "2–4 weeks" },
  ];
  for (const rule of packageRules) {
    it(`preserves the supplied ${rule.tier} price, scope, revisions and delivery on both pricing pages`, () => {
      for (const page of ["pricing.html", "pricing/animation.html"]) {
        const content = readFileSync(join(process.cwd(), "public/nuuke", page), "utf8");
        const card = content.match(new RegExp(`<article class="package-card" data-package="${rule.tier}"[\\s\\S]*?</article>`))?.[0];
        expect(card).toBeDefined();
        expect(card).toContain(`data-price="${rule.price}"`);
        expect(card).toContain(rule.duration);
        expect(card).toContain(rule.revisions);
        expect(card).toContain(rule.delivery);
        expect(card).toContain(`package=${rule.tier}`);
      }
    });
  }
});
