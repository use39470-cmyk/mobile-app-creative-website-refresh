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
        "/__l5e/assets-v1/6883227f-c191-4873-810a-3e55ecd789bb/mobile-app-creative-header-logo.jpg",
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
      expect(detail).not.toMatch(/\$\s?\d/);
    }

    const homepage = readFileSync(join(websiteDirectory, "index.html"), "utf8");
    expect(homepage).toContain("View all pricing");
    expect(homepage).toContain('href="pricing/mobile-app.html"');
    expect(homepage).toContain('href="pricing/animation.html"');
    expect(homepage).toContain('href="pricing/digital-marketing.html"');
    expect(homepage).toContain('href="pricing/ai-automation.html"');
    expect(homepage).toContain("partner-proof");
  });

  it("retains the supplied homepage sections and adds partnership and pricing sections", () => {
    const homepage = readFileSync(join(process.cwd(), "public/nuuke/index.html"), "utf8");

    expect(homepage.match(/<section\b/gi)).toHaveLength(11);
    expect(homepage).toContain('class="h-w h-w--brand"');
    expect(homepage).toContain('style="white-space:normal;overflow-wrap:anywhere"');
    expect(homepage).toContain('/__l5e/assets-v1/6883227f-c191-4873-810a-3e55ecd789bb/mobile-app-creative-header-logo.jpg');
    expect(readFileSync(join(process.cwd(), "public/audio/ambient.webm"))).toHaveLength(820932);
  });
});
