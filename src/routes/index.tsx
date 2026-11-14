import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mobile App Creative | Built for market leaders." },
      {
        name: "description",
        content:
          "Mobile App Creative is a design and engineering studio for mobile apps, immersive 3D web, animation, digital marketing and applied AI.",
      },
      {
        property: "og:title",
        content: "Mobile App Creative | Built for market leaders.",
      },
      {
        property: "og:description",
        content:
          "Mobile apps, immersive digital experiences, animation, marketing and AI automation by Mobile App Creative.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content: "Mobile App Creative | Built for market leaders.",
      },
      {
        name: "twitter:description",
        content:
          "Mobile apps, immersive digital experiences, animation, marketing and AI automation by Mobile App Creative.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main aria-label="Mobile App Creative website" className="site-preview">
      <iframe
        allow="autoplay; fullscreen"
        className="site-preview-frame"
        title="Mobile App Creative website"
        src="/nuuke/index.html"
      />
    </main>
  );
}
