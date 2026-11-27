import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const source = readFileSync('public/nuuke/_astro/gl-support.B6dJgBJh.js', 'utf8').replace(/export\{[^}]*\};?$/, '');

function graphicsSupport(width: number, renderer: string, resets: number, available = true) {
  const context = available ? {
    getExtension: (name: string) => name === 'WEBGL_debug_renderer_info' ? { UNMASKED_RENDERER_WEBGL: 1 } : { loseContext() {} },
    getParameter: () => renderer,
  } : null;
  return new Function('window', 'document', 'localStorage', 'location', `${source}; return i();`)(
    { innerWidth: width },
    { createElement: () => ({ getContext: () => context }) },
    { getItem: () => JSON.stringify({ n: resets, t: Date.now() }) },
    { search: '' },
  );
}

describe('Mobile Services graphics recovery', () => {
  it('retries real Android graphics after historical driver resets', () => {
    expect(graphicsSupport(393, 'Adreno (TM) 730', 2)).toBe(true);
    expect(graphicsSupport(360, 'Mali-G78', 4)).toBe(true);
  });
  it('keeps unsupported graphics on the visual fallback', () => {
    expect(graphicsSupport(393, 'SwiftShader', 0)).toBe(false);
    expect(graphicsSupport(393, '', 0, false)).toBe(false);
  });
  it('preserves desktop reset protection', () => {
    expect(graphicsSupport(1280, 'NVIDIA', 2)).toBe(false);
    expect(graphicsSupport(1280, 'NVIDIA', 0)).toBe(true);
  });
});