import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import { resolvePackage } from '@/lib/support/packages';

const rules = [
  { id: 'ai-automation-starter', name: 'Basic AI Package', price: 499, platforms: 1, workflows: 2, support: 7, delivery: '5–7 business days' },
  { id: 'ai-automation-standard', name: 'Standard AI Package', price: 999, platforms: 3, workflows: 5, support: 14, delivery: '1–2 weeks' },
  { id: 'ai-automation-professional', name: 'Professional AI Package', price: 1999, platforms: 5, workflows: 10, support: 30, delivery: '2–4 weeks' },
  { id: 'ai-automation-premium', name: 'Premium AI Package', price: 3999, platforms: 10, workflows: 20, support: 60, delivery: '4–8 weeks' },
];

function cardFor(page: string, id: string) {
  const content = readFileSync(join(process.cwd(), 'public/nuuke', page), 'utf8');
  const card = content.match(new RegExp(`<article[^>]*data-package="${id}"[\\s\\S]*?</article>`))?.[0];
  if (!card) throw new Error(`Missing ${id} on ${page}`);
  return card;
}

describe('Supplied AI package rules', () => {
  for (const rule of rules) {
    it(`${rule.name} resolves to $${rule.price} in inquiries and both pricing views`, () => {
      expect(resolvePackage(rule.id)).toEqual({ name: rule.name, price: rule.price, service: 'AI Automation' });
      const contact = readFileSync(join(process.cwd(), 'public/nuuke/contact.html'), 'utf8');
      const selection = contact.match(new RegExp(`"${rule.id}": (\\{[^}]*\\})`))?.[1];
      if (!selection) throw new Error('Missing inquiry package');
      expect(JSON.parse(selection)).toEqual(resolvePackage(rule.id));
      for (const page of ['pricing.html', 'pricing/ai-automation.html']) {
        const card = cardFor(page, rule.id);
        const price = card.match(/class="package-price">\$([\d,]+)/)?.[1];
        expect(Number(price?.replaceAll(',', ''))).toBe(rule.price);
        expect(card.match(/&amp;package=([^#]+)/)?.[1]).toBe(rule.id);
      }
    });

    it(`${rule.name} includes ${rule.platforms} platforms, ${rule.workflows} workflows and ${rule.support} support days`, () => {
      for (const page of ['pricing.html', 'pricing/ai-automation.html']) {
        const card = cardFor(page, rule.id);
        const features = [...card.matchAll(/<li>(.*?)<\/li>/g)].map((match) => match[1] ?? '');
        const platforms = features.find((feature) => /business platform/.test(feature));
        const workflows = features.find((feature) => /up to \d+ workflows/.test(feature));
        const support = features.find((feature) => /post-setup support/.test(feature));
        expect(Number(platforms?.match(/\d+/)?.[0])).toBe(rule.platforms);
        expect(Number(workflows?.match(/\d+/)?.[0])).toBe(rule.workflows);
        expect(Number(support?.match(/\d+/)?.[0])).toBe(rule.support);
      }
    });

    it(`${rule.name} has delivery ${rule.delivery}`, () => {
      for (const page of ['pricing.html', 'pricing/ai-automation.html']) {
        const delivery = cardFor(page, rule.id).match(/class="package-delivery"><strong>[^<]*<\/strong>([^<]+)/)?.[1];
        expect(delivery).toBe(rule.delivery);
      }
    });
  }
});