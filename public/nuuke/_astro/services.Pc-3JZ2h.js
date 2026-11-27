import{$ as e,A as t,B as n,C as r,Dt as i,E as a,Et as o,I as s,J as c,K as l,L as u,M as d,Mt as f,Nt as p,Pt as m,Q as h,St as g,Tt as _,U as v,X as y,Y as b,Z as x,_ as S,_t as C,a as w,at as T,ct as E,d as D,et as O,f as k,ft as ee,g as A,gt as te,h as ne,ht as re,i as ie,j as ae,kt as oe,l as se,lt as j,mt as M,nt as N,o as ce,p as P,r as le,rt as F,s as ue,tt as I,u as L,ut as R,v as z,vt as B,w as V,xt as H,y as de}from"./core.DZalETXP.js";import{n as fe,t as pe}from"./pipeline.B4lFK_c5.js";var U=`
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
float snoise(vec3 v) {
  const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
  const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy));
  vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz);
  vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy);
  vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + C.xxx;
  vec3 x2 = x0 - i2 + C.yyy;
  vec3 x3 = x0 - D.yyy;
  i = mod289(i);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 0.142857142857;
  vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
  vec4 x_ = floor(j * ns.z);
  vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ * ns.x + ns.yyyy;
  vec4 y = y_ * ns.x + ns.yyyy;
  vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy);
  vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0) * 2.0 + 1.0;
  vec4 s1 = floor(b1) * 2.0 + 1.0;
  vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
  vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
  vec3 p0 = vec3(a0.xy, h.x);
  vec3 p1 = vec3(a0.zw, h.y);
  vec3 p2 = vec3(a1.xy, h.z);
  vec3 p3 = vec3(a1.zw, h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
  m = m * m;
  return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
}
float fbm(vec3 p, int oct) {
  float s = 0.0, a = 0.5;
  for (int i = 0; i < 10; i++) {
    if (i >= oct) break;
    s += a * snoise(p);
    p = p * 2.03 + vec3(1.7, -3.1, 2.3);
    a *= 0.5;
  }
  return s;
}
float ridged(vec3 p, int oct) {
  float s = 0.0, a = 0.5, w = 1.0;
  for (int i = 0; i < 10; i++) {
    if (i >= oct) break;
    float n = 1.0 - abs(snoise(p));
    n *= n;
    n *= w;
    w = clamp(n * 1.6, 0.0, 1.0);
    s += a * n;
    p = p * 2.07 + vec3(-2.1, 1.3, 0.7);
    a *= 0.5;
  }
  return s;
}
vec3 hash33(vec3 p) {
  p = fract(p * vec3(0.1031, 0.1030, 0.0973));
  p += dot(p, p.yxz + 33.33);
  return fract((p.xxy + p.yxx) * p.zyx);
}
float hash13(vec3 p) {
  p = fract(p * 0.1031);
  p += dot(p, p.zyx + 31.32);
  return fract((p.x + p.y) * p.z);
}
// x: distance to nearest feature point, y: second nearest, z: id of nearest cell.
vec3 worley(vec3 x) {
  vec3 n = floor(x);
  vec3 f = fract(x);
  float f1 = 8.0, f2 = 8.0, id = 0.0;
  for (int k = -1; k <= 1; k++)
  for (int j = -1; j <= 1; j++)
  for (int i = -1; i <= 1; i++) {
    vec3 g = vec3(float(i), float(j), float(k));
    vec3 o = hash33(n + g);
    vec3 r = g + o - f;
    float d = dot(r, r);
    if (d < f1) { f2 = f1; f1 = d; id = o.z; }
    else if (d < f2) { f2 = d; }
  }
  return vec3(sqrt(f1), sqrt(f2), id);
}
`,W=`
vec3 uvToDir(vec2 uv) {
  float phi = uv.x * 6.28318530718;
  float th = (1.0 - uv.y) * 3.14159265359;
  return vec3(-cos(phi) * sin(th), cos(th), sin(phi) * sin(th));
}
vec3 eastOf(vec3 p) { return normalize(vec3(p.z, 0.0, -p.x) + vec3(1e-6, 0.0, 0.0)); }
`,G=`
float rh(float x) { return fract(sin(x * 127.1) * 43758.5453); }
float rn(float x) { float i = floor(x); float f = fract(x); f = f * f * (3.0 - 2.0 * f); return mix(rh(i), rh(i + 1.0), f); }
float ringDensity(float x) {
  if (x < 0.0 || x > 1.0) return 0.0;
  float d = 0.45 + 0.35 * rn(x * 18.0) + 0.2 * rn(x * 70.0) + 0.12 * rn(x * 260.0) - 0.08;
  d *= smoothstep(0.0, 0.06, x) * smoothstep(1.0, 0.86, x);
  d *= 1.0 - 0.92 * (1.0 - smoothstep(0.012, 0.03, abs(x - 0.63)));   // main division
  d *= 1.0 - 0.6 * (1.0 - smoothstep(0.004, 0.01, abs(x - 0.86)));    // thin outer gap
  d *= mix(0.45, 1.0, smoothstep(0.18, 0.32, x));                        // faint inner C ring
  return clamp(d, 0.0, 1.0);
}
`,K=`
#include <tonemapping_fragment>
#include <colorspace_fragment>
`,me=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}`,he=class{renderer;jobs=[];scene=new C;cam=new T(-1,1,1,-1,0,1);quad=new O(new E(2,2));targets=[];constructor(e){this.renderer=e,this.quad.frustumCulled=!1,this.scene.add(this.quad)}target(e,t,n,i){let a=i.mips??!0,o=new m(e,t,{depthBuffer:!1,generateMipmaps:a,minFilter:a?x:y,magFilter:y,wrapS:i.wrap===!1?r:M,wrapT:r,count:n}),s=Math.min(8,this.renderer.capabilities.getMaxAnisotropy());return o.textures.forEach(e=>e.anisotropy=s),this.targets.push(o),o}bake(e,t,n,r={},i={}){let a=this.target(t,n,1,i),o=new B({vertexShader:me,fragmentShader:`precision highp float;\nvarying vec2 vUv;\n${U}\n${W}\n${e}`,uniforms:r,depthTest:!1,depthWrite:!1});return this.jobs.push({mat:o,rt:a}),a.texture}bakeMulti(e,t,n,r,i={},a={}){let o=this.target(t,n,r,a),c=Array.from({length:r},(e,t)=>`layout(location = ${t}) out highp vec4 gOut${t};`).join(`
`),l=new B({glslVersion:s,vertexShader:me,fragmentShader:`precision highp float;\nvarying vec2 vUv;\n${c}\n${U}\n${W}\n${e}`,uniforms:i,depthTest:!1,depthWrite:!1});return this.jobs.push({mat:l,rt:o}),o.textures}async flush(e){let t=[];for(;this.jobs.length;){let n=this.jobs.shift();this.quad.material=n.mat;let r=this.renderer.getRenderTarget();this.renderer.setRenderTarget(n.rt);let i=ce(this.renderer,this.scene,this.cam);this.renderer.setRenderTarget(r),await i;let{width:a,height:o}=n.rt,s=n.rt.textures,c=s.map(e=>e.generateMipmaps),l=0,u=!0;for(;l<o;){let t=await e(),r=Math.max(4,Math.min(o-l,Math.floor((u?Math.min(t,32768):t)/a)));u=!1;let i=l+r>=o;s.forEach((e,t)=>e.generateMipmaps=c[t]&&i),n.rt.scissor.set(0,l,a,r),n.rt.scissorTest=!0;let d=this.renderer.xr.enabled,f=this.renderer.getRenderTarget(),p=this.renderer.autoClear;this.renderer.xr.enabled=!1,this.renderer.autoClear=!1,this.renderer.setRenderTarget(n.rt),this.renderer.render(this.scene,this.cam),this.renderer.setRenderTarget(f),this.renderer.autoClear=p,this.renderer.xr.enabled=d,l+=r}n.rt.scissorTest=!1,s.forEach((e,t)=>e.generateMipmaps=c[t]),t.push(n.mat)}t.forEach(e=>e.dispose())}dispose(){this.jobs.forEach(e=>e.mat.dispose()),this.jobs.length=0,this.targets.forEach(e=>e.dispose()),this.targets.length=0,this.quad.geometry.dispose()}},q=new V(1,.94,.88).multiplyScalar(1.55),ge=`
uniform float uPass;
uniform vec3 uSeed;
uniform vec3 uAccent;
uniform float uEps;
uniform float uBumpK;
`,_e=`
float height(vec3 p);
float relief(float h);
void surface(vec3 p, float h, out vec3 alb, out float spec, out float night, out float cloud);
void main() {
  vec3 p = uvToDir(vUv);
  float h = height(p);
  vec3 alb; float spec; float night; float cloud;
  surface(p, h, alb, spec, night, cloud);
  gOut0 = vec4(pow(clamp(alb, 0.0, 1.0), vec3(1.0 / 2.2)), clamp(spec, 0.0, 1.0));
  vec3 e = eastOf(p);
  vec3 n = cross(p, e);
  float r0 = relief(h);
  float he = relief(height(normalize(p + e * uEps)));
  float hn = relief(height(normalize(p + n * uEps)));
  vec2 s = vec2(he - r0, hn - r0) / uEps * uBumpK;
  gOut1 = vec4(clamp(0.5 + 0.5 * s, 0.0, 1.0), clamp(night, 0.0, 1.0), clamp(cloud, 0.0, 1.0));
}`,ve=`
vec3 warpv(vec3 q) { return vec3(fbm(q + 3.1, 4), fbm(q + 7.7, 4), fbm(q + 1.9, 4)); }
float height(vec3 p) {
  vec3 q = p * 1.15 + uSeed;
  vec3 w = warpv(q * 1.4);
  float c = fbm(q + w * 0.6, 7);
  float land = smoothstep(-0.02, 0.2, c);
  float m = ridged(q * 3.2 + w * 0.8, 6);
  return c + land * m * 0.38;
}
float relief(float h) { return max(h, 0.085); }
void surface(vec3 p, float h, out vec3 alb, out float spec, out float night, out float cloud) {
  float sea = 0.085;
  float lat = abs(p.y);
  vec3 q = p * 1.15 + uSeed;
  float e = h - sea;
  if (e < 0.0) {
    float d = smoothstep(0.0, 0.3, -e);
    alb = mix(vec3(0.05, 0.19, 0.26), vec3(0.008, 0.035, 0.085), d);
    alb = mix(alb, vec3(0.03, 0.06, 0.1), smoothstep(0.5, 0.9, lat));
    spec = 1.0;
  } else {
    float moist = fbm(q * 2.6 + 11.0, 5);
    float dry = 1.0 - smoothstep(0.0, 0.5, abs(lat - 0.3));
    vec3 desert = mix(vec3(0.66, 0.46, 0.33), vec3(0.6, 0.32, 0.3), fbm(q * 5.0, 3) * 0.5 + 0.5);
    vec3 green = mix(vec3(0.07, 0.13, 0.06), vec3(0.18, 0.21, 0.1), fbm(q * 7.0, 3) * 0.5 + 0.5);
    float lush = smoothstep(-0.05, 0.25, moist - dry * 0.3);
    vec3 c = mix(desert, green, lush);
    c = mix(c, vec3(0.32, 0.28, 0.26), smoothstep(0.22, 0.42, e));
    c = mix(c, vec3(0.93, 0.93, 0.96), smoothstep(0.5, 0.6, e + lat * 0.25));
    c = mix(c, vec3(0.74, 0.65, 0.52), 1.0 - smoothstep(0.0, 0.012, e));
    c *= 0.86 + 0.28 * (fbm(q * 26.0, 3) * 0.5 + 0.5);
    alb = c;
    spec = 0.03;
  }
  float ice = smoothstep(0.8, 0.86, lat + fbm(q * 4.0, 4) * 0.08);
  alb = mix(alb, vec3(0.88, 0.92, 0.97), ice);
  spec *= 1.0 - ice;
  float landM = smoothstep(0.0, 0.01, e);
  float coast = 1.0 - smoothstep(0.0, 0.14, e);
  float region = smoothstep(-0.05, 0.3, fbm(q * 3.0 + 41.0, 4));
  float pts = smoothstep(0.74, 0.95, snoise(q * 95.0) * 0.5 + 0.5);
  float sprawl = smoothstep(0.62, 0.9, fbm(q * 24.0 + 5.0, 3) * 0.5 + 0.5);
  night = landM * (1.0 - ice) * region * (0.15 + 0.85 * coast * coast) * (pts * 0.9 + sprawl * 0.5);
  vec3 cq = q * 1.05 + 50.0;
  vec3 cw = warpv(cq * 0.8);
  float cl = fbm(vec3(cq.x, cq.y * 1.7, cq.z) + cw * 1.5, 7);
  float streak = fbm(vec3(cq.x * 0.6, cq.y * 7.0, cq.z * 0.6) + cw, 4);
  cloud = smoothstep(0.12, 0.55, cl + streak * 0.2);
  cloud *= 0.6 + 0.4 * smoothstep(0.05, 0.35, lat);
}`,ye=`
float height(vec3 p) { return fbm(vec3(p.x * 3.0, p.y * 16.0, p.z * 3.0) + uSeed, 4) * 0.04; }
float relief(float h) { return h; }
void surface(vec3 p, float h, out vec3 alb, out float spec, out float night, out float cloud) {
  vec3 q = p + uSeed;
  float turb = fbm(vec3(q.x * 2.2, q.y * 7.0, q.z * 2.2), 6);
  vec3 w = vec3(fbm(q * 3.0 + 1.0, 4), fbm(q * 3.0 + 5.0, 4), fbm(q * 3.0 + 9.0, 4));
  float t = p.y * 5.2 + turb * 0.5 + fbm(q * 5.0 + w * 1.6, 5) * 0.2;
  float b = 0.5 + 0.5 * sin(t * 3.0 + sin(t * 1.3) * 1.6);
  vec3 brown = vec3(0.26, 0.13, 0.07), rust = vec3(0.6, 0.29, 0.12), amber = vec3(0.86, 0.52, 0.2), cream = vec3(0.9, 0.8, 0.64);
  vec3 c = mix(brown, rust, smoothstep(0.0, 0.35, b));
  c = mix(c, amber, smoothstep(0.3, 0.62, b));
  c = mix(c, cream, smoothstep(0.62, 0.95, b));
  float fine = fbm(vec3(q.x * 9.0, q.y * 70.0, q.z * 9.0) + w * 0.8, 5);
  c *= 0.84 + 0.32 * (fine * 0.5 + 0.5);
  c = mix(c, vec3(0.32, 0.24, 0.2), smoothstep(0.72, 0.97, abs(p.y)) * 0.7);
  // the great storm
  vec3 s = normalize(vec3(0.62, -0.34, 0.7));
  vec3 se = eastOf(s);
  vec3 sn = cross(s, se);
  vec3 v = p - s;
  vec2 sp = vec2(dot(v, se) / 0.3, dot(v, sn) / 0.16);
  float r = length(sp);
  float sw = (1.0 - smoothstep(0.0, 1.4, r)) * 4.5;
  vec2 rp = mat2(cos(sw), -sin(sw), sin(sw), cos(sw)) * sp;
  float sN = fbm(vec3(rp * 2.6, 3.0), 5);
  float sM = 1.0 - smoothstep(0.82, 1.08, r);
  vec3 sc = mix(vec3(0.66, 0.24, 0.09), vec3(0.95, 0.6, 0.34), sN * 0.5 + 0.5);
  sc = mix(sc, vec3(0.97, 0.9, 0.8), smoothstep(0.62, 0.92, r));
  c = mix(c, sc, sM);
  // a chain of small white ovals in the southern belt
  vec3 wv = worley(vec3(q.x * 5.0, q.y * 2.0, q.z * 5.0) + 7.0);
  float ov = (1.0 - smoothstep(0.1, 0.2, wv.x)) * step(0.55, wv.z) * (1.0 - smoothstep(0.0, 0.06, abs(p.y + 0.6)));
  c = mix(c, vec3(0.97, 0.94, 0.88), ov * 0.85);
  alb = c;
  spec = 0.0;
  float storms = smoothstep(0.7, 0.95, snoise(q * 34.0) * 0.5 + 0.5) * (1.0 - smoothstep(0.3, 0.7, b));
  night = storms;
  cloud = 0.0;
}`,be=`
float lin(vec3 x) { return 1.0 - abs(snoise(x)); }
float relief(float h) { return h; }
void iceF(vec3 p, out float base, out float a, out float b, out float c) {
  vec3 q = p + uSeed;
  vec3 w = vec3(fbm(q * 2.0 + 1.0, 3), fbm(q * 2.0 + 4.0, 3), fbm(q * 2.0 + 8.0, 3)) * 0.35;
  base = fbm(q * 2.0, 6);
  a = lin(q * 2.2 + w);
  b = lin(q * 5.3 + w * 1.5 + 3.0);
  c = lin(q * 12.0 + w * 2.0 + 7.0);
}
float height(vec3 p) {
  float base, a, b, c;
  iceF(p, base, a, b, c);
  return base * 0.07 + pow(a, 34.0) * 0.06 + pow(b, 36.0) * 0.04 + pow(c, 40.0) * 0.025 - pow(a, 10.0) * 0.02 - pow(b, 12.0) * 0.012;
}
void surface(vec3 p, float h, out vec3 alb, out float spec, out float night, out float cloud) {
  vec3 q = p + uSeed;
  float base, a, b, c;
  iceF(p, base, a, b, c);
  vec3 ic = mix(vec3(0.9, 0.95, 0.97), vec3(0.68, 0.82, 0.86), smoothstep(-0.25, 0.45, fbm(q * 3.0, 4)));
  float chaos = smoothstep(0.16, 0.36, fbm(q * 1.5 + 20.0, 5));
  ic = mix(ic, vec3(0.66, 0.68, 0.68) * (0.85 + 0.3 * (fbm(q * 22.0, 3) * 0.5 + 0.5)), chaos * 0.45);
  float la = pow(a, 16.0), lb = pow(b, 20.0), lc = pow(c, 24.0);
  ic = mix(ic, vec3(0.5, 0.38, 0.31), clamp(la * 0.8 + lb * 0.55 + lc * 0.35, 0.0, 1.0));
  float seaN = fbm(q * 1.2 + 70.0, 5);
  float sea = smoothstep(0.3, 0.32, seaN);
  alb = mix(ic, vec3(0.008, 0.07, 0.08), sea);
  alb *= 0.93 + 0.14 * (fbm(q * 40.0, 2) * 0.5 + 0.5);
  spec = mix(0.12, 1.0, sea);
  float shore = smoothstep(0.27, 0.3, seaN) * (1.0 - sea);
  float region = smoothstep(0.0, 0.3, fbm(q * 2.5 + 3.0, 3));
  float hubs = smoothstep(0.8, 0.95, snoise(q * 70.0) * 0.5 + 0.5) * smoothstep(0.5, 0.9, a);
  night = (pow(a, 40.0) * 0.9 + pow(b, 50.0) * 0.4) * region + shore * 0.35 + hubs * 1.2;
  cloud = smoothstep(0.25, 0.75, fbm(vec3(q.x * 1.6, q.y * 3.4, q.z * 1.6) + 30.0, 6)) * 0.5;
}`,xe=`
float relief(float h) { return h; }
void nF(vec3 p, out vec3 v1, out vec3 v2) {
  vec3 q = p + uSeed;
  vec3 wq = q + vec3(fbm(q * 2.0, 3), fbm(q * 2.0 + 5.0, 3), fbm(q * 2.0 + 9.0, 3)) * 0.16;
  v1 = worley(wq * 3.6);
  v2 = worley(wq * 9.5 + 4.0);
}
float height(vec3 p) {
  vec3 v1, v2;
  nF(p, v1, v2);
  float vein1 = 1.0 - smoothstep(0.0, 0.08, v1.y - v1.x);
  float vein2 = 1.0 - smoothstep(0.0, 0.06, v2.y - v2.x);
  return fbm((p + uSeed) * 3.0, 6) * 0.22 - vein1 * 0.05 - vein2 * 0.025;
}
void surface(vec3 p, float h, out vec3 alb, out float spec, out float night, out float cloud) {
  vec3 q = p + uSeed;
  vec3 v1, v2;
  nF(p, v1, v2);
  float vein1 = 1.0 - smoothstep(0.0, 0.022, v1.y - v1.x);
  float vein2 = 1.0 - smoothstep(0.0, 0.016, v2.y - v2.x);
  float halo1 = 1.0 - smoothstep(0.0, 0.09, v1.y - v1.x);
  float node = 1.0 - smoothstep(0.015, 0.06, v1.x);
  vec3 c = mix(vec3(0.03, 0.027, 0.036), vec3(0.15, 0.14, 0.16), smoothstep(-0.3, 0.45, fbm(q * 4.0, 5)));
  c *= 0.82 + 0.36 * (fbm(q * 30.0, 3) * 0.5 + 0.5);
  c = mix(c, uAccent * 0.18, halo1 * 0.35);
  alb = c;
  spec = 0.5 * (1.0 - vein1);
  night = vein1 * 0.7 + halo1 * 0.12 + vein2 * 0.35 * step(0.45, v2.z) + node * step(0.6, v1.z);
  vec3 cq = q * 1.4 + 20.0;
  vec3 cw = vec3(fbm(cq, 4), fbm(cq + 3.0, 4), fbm(cq + 6.0, 4));
  cloud = smoothstep(0.02, 0.6, fbm(vec3(cq.x, cq.y * 2.2, cq.z) + cw * 1.3, 6)) * 0.85;
}`,J=`
${W}
varying vec2 vUv;
varying vec3 vW;
varying vec3 vN;
varying vec3 vE;
varying vec3 vNo;
varying vec3 vP;
void main() {
  vUv = uv;
  vec3 p = normalize(position);
  vP = p;
  vec3 e = eastOf(p);
  mat3 m = mat3(modelMatrix);
  vN = normalize(m * p);
  vE = normalize(m * e);
  vNo = normalize(m * cross(p, e));
  vec4 w = modelMatrix * vec4(position, 1.0);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,Se=`
${G}
uniform sampler2D mapA;
uniform sampler2D mapB;
uniform vec3 uSun;
uniform vec3 uSunCol;
uniform vec3 uAtmo;
uniform vec3 uNight;
uniform float uTime;
uniform float uCloudU;
uniform float uBump;
uniform float uNightK;
uniform float uAtmoK;
uniform vec3 uCenter;
uniform vec3 uRingN;
uniform float uRingIn;
uniform float uRingOut;
varying vec2 vUv;
varying vec3 vW;
varying vec3 vN;
varying vec3 vE;
varying vec3 vNo;
varying vec3 vP;
void main() {
  vec2 uv = vUv;
  vec4 A;
#ifdef FLOW
  float sp = (sin(uv.y * 41.0) * 0.6 + sin(uv.y * 17.0 + 1.0) * 0.4) * 0.02;
  float ph0 = fract(uTime * 0.025);
  float ph1 = fract(uTime * 0.025 + 0.5);
  float w0 = 1.0 - abs(ph0 * 2.0 - 1.0);
  A = texture2D(mapA, uv + vec2(sp * ph0, 0.0)) * w0 + texture2D(mapA, uv + vec2(sp * ph1, 0.0)) * (1.0 - w0);
#else
  A = texture2D(mapA, uv);
#endif
  vec4 B = texture2D(mapB, uv);
  vec3 alb = pow(A.rgb, vec3(2.2));
  vec2 sl = (B.rg * 2.0 - 1.0) * uBump;
  vec3 Ng = normalize(vN);
  vec3 N = normalize(Ng - sl.x * normalize(vE) - sl.y * normalize(vNo));
  vec3 L = normalize(uSun - vW);
  vec3 V = normalize(cameraPosition - vW);
  float ndlG = dot(Ng, L);
  float ndl = dot(N, L);
  float dayMask = smoothstep(-0.06, 0.1, ndlG);
  vec3 sunT = mix(vec3(1.0, 0.42, 0.22), vec3(1.0), smoothstep(0.0, 0.32, ndlG));
  vec3 light = uSunCol * sunT * clamp(ndl, 0.0, 1.0) * dayMask;
  float cloudHere = 0.0;
#ifdef CLOUDS
  cloudHere = texture2D(mapB, uv + vec2(uCloudU, 0.0)).a;
  float cs = texture2D(mapB, uv + vec2(uCloudU + 0.006, -0.003)).a;
  light *= 1.0 - 0.55 * cs;
#endif
#ifdef RINGED
  float dn = dot(L, uRingN);
  if (abs(dn) > 1e-4) {
    float tt = dot(uCenter - vW, uRingN) / dn;
    if (tt > 0.0) {
      float r = length(vW + L * tt - uCenter);
      light *= 1.0 - 0.8 * ringDensity((r - uRingIn) / (uRingOut - uRingIn));
    }
  }
#endif
  vec3 col = alb * (light + vec3(0.006, 0.006, 0.009));
  // sun glint on water and glassy ground
  vec3 H = normalize(L + V);
  float nh = max(dot(normalize(mix(N, Ng, 0.8)), H), 0.0);
  float fres = 0.04 + 0.96 * pow(1.0 - max(dot(Ng, V), 0.0), 5.0);
  float spec = (pow(nh, 220.0) * 3.5 + pow(nh, 22.0) * 0.14) * A.a * (0.45 + fres);
  col += uSunCol * sunT * spec * clamp(ndlG * 5.0, 0.0, 1.0) * (1.0 - 0.8 * cloudHere);
  // atmospheric haze over the lit disc, thickening toward the limb
  float mu = max(dot(Ng, V), 0.0);
  float rim = pow(1.0 - mu, 2.4);
  float dayAtm = smoothstep(-0.3, 0.45, ndlG);
  col = mix(col, uAtmo * dayAtm * 0.4, clamp(rim * uAtmoK * 0.55, 0.0, 1.0));
  col += uAtmo * dayAtm * 0.012 * uAtmoK;
  float nightMask = 1.0 - smoothstep(-0.16, 0.06, ndlG);
#if defined(NEURAL)
  float pulse = 0.5 + 0.5 * sin(uTime * 1.7 - dot(vP, vec3(9.0, 5.0, 7.0)));
  pulse = 0.35 + 0.65 * pulse * pulse;
  col += uNight * B.b * (0.12 + 0.88 * nightMask) * pulse * uNightK * (1.0 - 0.45 * cloudHere);
#elif defined(LIGHTNING)
  // Storm lightning: each cell flashes now and then with a soft rise and fall (not a hard
  // 7 Hz on/off strobe, which made the bloom around the planet blink).
  vec2 cell = floor(uv * vec2(70.0, 35.0));
  float seed = fract(sin(dot(cell, vec2(12.9898, 78.233))) * 43758.5453);
  float ph = uTime * (0.35 + seed * 0.4) + seed * 17.0;
  float on = step(0.94, fract(sin(floor(ph) * 91.7 + seed * 311.0) * 43758.5453));
  float env = sin(fract(ph) * 3.14159);
  float flick = on * env * env * 0.6;
  col += uNight * B.b * flick * nightMask * uNightK;
#else
  float tw = 0.8 + 0.2 * sin(uTime * 2.3 + B.b * 50.0 + vUv.x * 300.0);
  col += uNight * B.b * nightMask * uNightK * tw * (1.0 - 0.7 * cloudHere);
#endif
  gl_FragColor = vec4(col, 1.0);
  ${K}
}`,Ce=`
uniform sampler2D mapB;
uniform vec3 uSun;
uniform vec3 uSunCol;
uniform vec3 uAtmo;
uniform float uCloudU;
uniform float uOpacity;
uniform vec3 uTint;
varying vec2 vUv;
varying vec3 vW;
varying vec3 vN;
varying vec3 vE;
varying vec3 vNo;
varying vec3 vP;
void main() {
  vec2 uv = vUv + vec2(uCloudU, 0.0);
  float c = texture2D(mapB, uv).a;
  // fake relief: compare density toward the sun for soft self-shadowing
  vec3 Ng = normalize(vN);
  vec3 L = normalize(uSun - vW);
  vec3 V = normalize(cameraPosition - vW);
  vec2 toSun = vec2(dot(L, normalize(vE)), dot(L, normalize(vNo)));
  float c2 = texture2D(mapB, uv + toSun * vec2(0.004, 0.008)).a;
  float shade = clamp(1.0 - (c2 - c) * 2.5, 0.55, 1.15);
  float ndl = dot(Ng, L);
  float lit = smoothstep(-0.12, 0.25, ndl);
  vec3 sunT = mix(vec3(1.0, 0.45, 0.25), vec3(1.0), smoothstep(0.0, 0.3, ndl));
  vec3 col = uTint * uSunCol * sunT * (0.1 + 0.9 * clamp(ndl * 0.85 + 0.2, 0.0, 1.0)) * lit * shade * 0.95;
  float rim = pow(1.0 - max(dot(Ng, V), 0.0), 2.0);
  col = mix(col, uAtmo * lit, 0.2 * rim);
  float a = c * uOpacity * (1.0 - 0.35 * pow(rim, 2.0));
  gl_FragColor = vec4(col, a);
  ${K}
}`,we=`
varying vec3 vW;
void main() {
  vec4 w = modelMatrix * vec4(position, 1.0);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,Te=`
uniform vec3 uCenter;
uniform vec3 uSun;
uniform vec3 uColor;
uniform float uR;
uniform float uRa;
uniform float uK;
varying vec3 vW;
void main() {
  vec3 rd = normalize(vW - cameraPosition);
  vec3 oc = uCenter - cameraPosition;
  float tc = dot(oc, rd);
  vec3 cp = cameraPosition + rd * tc;
  float d = length(cp - uCenter);
  float h = (d - uR) / (uRa - uR);
  float glow = h > 0.0 ? pow(clamp(1.0 - h, 0.0, 1.0), 3.2) : pow(clamp(d / uR, 0.0, 1.0), 14.0) * 0.9;
  vec3 n = normalize(cp - uCenter + rd * 0.0001);
  vec3 L = normalize(uSun - uCenter);
  float sunF = dot(n, L);
  float lit = smoothstep(-0.45, 0.35, sunF);
  float fwd = pow(max(dot(rd, L), 0.0), 6.0);
  vec3 sunset = vec3(1.0, 0.5, 0.3);
  vec3 col = mix(uColor, uColor * 0.6 + sunset * 0.5, (1.0 - smoothstep(-0.1, 0.4, sunF)) * lit);
  float k = glow * (lit + fwd * 1.6 * (1.0 - lit * 0.5));
  gl_FragColor = vec4(col * k * uK * 0.55, 1.0);
  ${K}
}`,Ee={terra:ve,giant:ye,ice:be,neural:xe};function De(e,t,n,r,i,a){let o=r.tex,s=r.tex/2,c=e=>({uPass:{value:e},uSeed:{value:new p(...i)},uAccent:{value:new p(n.r,n.g,n.b)},uEps:{value:1.6/o},uBumpK:{value:a}}),l=`${ge}\n${Ee[t]}\n${_e}`,[u,d]=e.bakeMulti(l,o,s,2,c(0));return{a:u,b:d}}async function Y(e,t,n,r){let i=new u,a=new u;a.rotation.z=n.tilt,i.add(a);let o=new u;a.add(o);let{a:s,b:c}=De(e,n.kind,n.accent,t,n.seed,n.bumpK),l={};n.clouds&&(l.CLOUDS=``),r&&(l.RINGED=``),n.kind===`giant`&&(l.FLOW=``,l.LIGHTNING=``),n.kind===`neural`&&(l.NEURAL=``);let d=new p,f=new p,m=new p(0,1,0),h={mapA:{value:s},mapB:{value:c},uSun:{value:d},uSunCol:{value:q},uAtmo:{value:n.atmo},uNight:{value:n.night},uTime:{value:0},uCloudU:{value:0},uBump:{value:n.bump},uNightK:{value:n.nightK},uAtmoK:{value:n.atmoK},uCenter:{value:f},uRingN:{value:m},uRingIn:{value:r?r.inner:0},uRingOut:{value:r?r.outer:1}},_=t.seg,v=new O(new g(n.radius,_,Math.round(_*.75)),new B({vertexShader:J,fragmentShader:Se,uniforms:h,defines:l}));o.add(v);let y=null;if(n.clouds){y=new B({vertexShader:J,fragmentShader:Ce,uniforms:{mapB:{value:c},uSun:{value:d},uSunCol:{value:q},uAtmo:{value:n.atmo},uCloudU:h.uCloudU,uOpacity:{value:n.clouds.opacity},uTint:{value:n.clouds.tint??new V(1,1,1)}},transparent:!0,depthWrite:!1});let e=new O(new g(n.radius*1.012,_,Math.round(_*.75)),y);e.renderOrder=1,o.add(e)}let b=n.radius*n.atmoScale,x=new O(new g(b,64,48),new B({vertexShader:we,fragmentShader:Te,uniforms:{uCenter:{value:f},uSun:{value:d},uColor:{value:n.atmo},uR:{value:n.radius*.995},uRa:{value:b},uK:{value:n.atmoK}},transparent:!0,blending:2,depthWrite:!1}));x.renderOrder=2,i.add(x);let S=n.clouds?.speed??0;return{group:i,tilt:a,spin:o,update:(e,t)=>{o.rotation.y+=t*n.spin,h.uTime.value=e,h.uCloudU.value=(h.uCloudU.value+t*S)%1,i.getWorldPosition(f)},uniforms:h,ringN:m}}function X(e,t,n,r=!0){let i=document.createElement(`canvas`);i.width=e,i.height=t,n(i.getContext(`2d`));let a=new de(i);return r&&(a.colorSpace=te),a}function Z(e=`rgba(255,255,255,1)`,t=`rgba(255,255,255,0.25)`){return X(128,128,n=>{let r=n.createRadialGradient(64,64,0,64,64,64);r.addColorStop(0,e),r.addColorStop(.25,t),r.addColorStop(1,`rgba(0,0,0,0)`),n.fillStyle=r,n.fillRect(0,0,128,128)})}function Oe(){return X(128,128,e=>{e.beginPath(),e.roundRect(6,6,116,116,30);let t=e.createLinearGradient(0,0,128,128);t.addColorStop(0,`#ffffff`),t.addColorStop(1,`#b8b8c8`),e.fillStyle=t,e.fill(),e.fillStyle=`rgba(0,0,0,0.28)`,e.beginPath(),e.roundRect(34,34,60,60,16),e.fill(),e.fillStyle=`rgba(255,255,255,0.9)`,e.beginPath(),e.arc(64,64,14,0,Math.PI*2),e.fill()})}function ke(){return X(256,64,e=>{e.fillStyle=`#0b1530`,e.fillRect(0,0,256,64);for(let t=0;t<16;t++)for(let n=0;n<4;n++){let r=40+Math.random()*30;e.fillStyle=`rgb(${r*.35},${r*.6},${r*1.6})`,e.fillRect(t*16+1,n*16+1,14,14)}e.fillStyle=`rgba(200,210,230,0.5)`,e.fillRect(0,31,256,2)})}function Q(e,t,n,r){return r.set(Math.cos(t)*e,Math.sin(t)*e*Math.sin(n),Math.sin(t)*e*Math.cos(n))}async function Ae(t,n,r,i){let a=1.5,o={inner:a*1.38,outer:a*2.45},s=await Y(t,n,{kind:`terra`,radius:a,accent:r,atmo:new V(.55,.42,1).lerp(r,.45),night:new V(1,.62,.72).multiplyScalar(1.9),seed:[3.1,7.4,1.2],bumpK:.1,bump:.35,nightK:1,atmoK:.95,atmoScale:1.16,clouds:{opacity:.85,speed:.004},tilt:.38,spin:.05},o),c=new B({vertexShader:`
      varying vec3 vW; varying vec2 vL;
      void main() { vL = position.xy; vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,fragmentShader:`
      ${G}
      uniform vec3 uSun; uniform vec3 uCenter; uniform vec3 uN; uniform float uIn; uniform float uOut; uniform float uR; uniform vec3 uTint; uniform vec3 uSunCol;
      varying vec3 vW; varying vec2 vL;
      void main() {
        float r = length(vL);
        float x = (r - uIn) / (uOut - uIn);
        float d = ringDensity(x);
        vec3 L = normalize(uSun - vW);
        vec3 V = normalize(cameraPosition - vW);
        vec3 oc = vW - uCenter;
        float b = dot(oc, L);
        float c = dot(oc, oc) - uR * uR;
        float disc = b * b - c;
        float shadow = (b < 0.0) ? smoothstep(0.0, uR * 0.25, sqrt(max(disc, 0.0))) : 0.0;
        float lightSide = dot(uN, L) * dot(uN, V);
        float fwd = pow(max(dot(-V, L), 0.0), 4.0);
        float k = lightSide > 0.0 ? 0.9 : 0.35 + fwd * 1.2 * (1.0 - d);
        float grain = 0.75 + 0.5 * fract(sin(r * 4321.17) * 917.3);
        vec3 col = mix(vec3(0.78, 0.6, 0.6), vec3(0.95, 0.9, 0.84), rn(x * 40.0)) * uTint;
        col *= uSunCol * k * (1.0 - shadow * 0.92) * grain * 0.55;
        gl_FragColor = vec4(col, d * 0.88);
        ${K}
      }`,uniforms:{uSun:{value:new p},uCenter:s.uniforms.uCenter,uN:s.uniforms.uRingN,uIn:{value:o.inner},uOut:{value:o.outer},uR:{value:a},uTint:{value:new V(1,.92,.95).lerp(r,.12)},uSunCol:{value:q}},transparent:!0,side:2,depthWrite:!1}),l=new O(new re(o.inner,o.outer,n.phone?128:256,1),c);l.rotation.x=-Math.PI/2,l.renderOrder=1,s.tilt.add(l);let f=Math.round(150*n.particles),m=new P(.085,.085,.014,2,.02),g=new v(m,new F({color:12104900,metalness:.85,roughness:.3,envMapIntensity:2}),f),_=new E(.075,.075);_.translate(0,0,.0078);let y=new v(_,new I({map:Oe(),transparent:!0,toneMapped:!1}),f),b=new e,x=new ee,C=new d,w=new p,T=new p,D=[r.clone().multiplyScalar(1.6),new V(1.6,1.3,1.45),new V(.6,.9,2),new V(2,1.2,.5),r.clone().lerp(new V(1,1,1),.5)];for(let e=0;e<f;e++){let t=Math.random()*Math.PI*2,n=h.lerp(o.inner*1.05,o.outer*.98,Math.random()**.8);w.set(Math.cos(t)*n,(Math.random()-.5)*.06,Math.sin(t)*n),C.set(Math.random()*6.28,Math.random()*6.28,Math.random()*6.28),x.setFromEuler(C),T.setScalar(.5+Math.random()*.9),b.compose(w,x,T),g.setMatrixAt(e,b),y.setMatrixAt(e,b),y.setColorAt(e,D[e%D.length].clone().multiplyScalar(.5+Math.random()*.6))}let A=new u;A.add(g,y),s.tilt.add(A);let ne=Math.round(2600*n.particles),ie=new Float32Array(ne*3),ae=new Float32Array(ne);for(let e=0;e<ne;e++){let t=Math.random()*Math.PI*2,n=h.lerp(o.inner*.98,o.outer*1.08,Math.random());ie.set([Math.cos(t)*n,(Math.random()-.5)*.05,Math.sin(t)*n],e*3),ae[e]=Math.random()}let oe=new R(new z().setAttribute(`position`,new S(ie,3)).setAttribute(`aS`,new S(ae,1)),je(new V(1,.85,.9),1.6));A.add(oe);let se=await k(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 375 775"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${i}"/><stop offset="1" stop-color="#5b1d8f"/></linearGradient></defs><rect width="375" height="775" fill="#0b0b10"/><rect x="24" y="80" width="327" height="200" rx="26" fill="url(#g)"/><g fill="#1c1c26"><rect x="24" y="300" width="155" height="150" rx="22"/><rect x="196" y="300" width="155" height="150" rx="22"/><rect x="24" y="470" width="327" height="80" rx="20"/><rect x="24" y="570" width="327" height="80" rx="20"/></g><g fill="${i}" opacity="0.8"><circle cx="70" cy="345" r="18"/><circle cx="242" cy="345" r="18"/></g><rect x="24" y="700" width="327" height="50" rx="25" fill="#fff"/></svg>`,375,775);se.colorSpace=te;let j=L(se);j.screenMat.color.setScalar(.85),j.group.scale.setScalar(.3);let M=new u;M.add(j.group),s.group.add(M);let N=new p;return{group:s.group,radius:a,frame:{dist:6.6,phase:.95,lift:.5},update(e,t,n){s.update(e,t),A.rotation.y+=t*.06,l.updateWorldMatrix(!0,!1),s.uniforms.uRingN.value.set(0,0,1).transformDirection(l.matrixWorld),oe.material.uniforms.uTime.value=e,Q(4.3,e*.12+1.2,.35,N),j.group.position.copy(N),j.group.lookAt(n.position),j.group.rotateY(-.5+Math.sin(e*.25)*.25),j.group.rotateZ(.18)}}}function je(e,t){return new B({vertexShader:`
      attribute float aS; uniform float uTime; uniform float uSize; uniform float uPR; varying float vA;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        float tw = 0.55 + 0.45 * sin(uTime * (1.0 + aS * 3.0) + aS * 40.0);
        vA = (0.35 + 0.65 * aS) * tw;
        gl_PointSize = uSize * uPR * (0.6 + aS) * (6.0 / -mv.z);
      }`,fragmentShader:`
      uniform vec3 uColor; varying float vA;
      void main() { float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.0, d); gl_FragColor = vec4(uColor * a * vA, 1.0); }`,uniforms:{uTime:{value:0},uColor:{value:e},uSize:{value:t},uPR:{value:Math.min(window.devicePixelRatio||1,1.75)}},transparent:!0,blending:2,depthWrite:!1})}async function Me(e,r,i){let a=2.1,s=await Y(e,r,{kind:`giant`,radius:a,accent:i,atmo:new V(1,.72,.42).lerp(i,.3),night:new V(1,.75,.45).multiplyScalar(4),seed:[1.7,.3,5.9],bumpK:.6,bump:.4,nightK:1,atmoK:.9,atmoScale:1.1,tilt:.12,spin:.07}),c=new n(.3,1),d=c.attributes.position,f=(e,t,n)=>`${e.toFixed(3)},${t.toFixed(3)},${n.toFixed(3)}`,m=new Map;for(let e=0;e<d.count;e++){let t=f(d.getX(e),d.getY(e),d.getZ(e));m.has(t)||m.set(t,.78+Math.random()*.45);let n=m.get(t);d.setXYZ(e,d.getX(e)*n,d.getY(e)*n*1.25,d.getZ(e)*n)}c.computeVertexNormals();let h=new O(c,new N({color:8014360,metalness:.35,roughness:.04,clearcoat:1,clearcoatRoughness:.02,iridescence:1,iridescenceIOR:1.8,flatShading:!0,emissive:i,emissiveIntensity:.45,envMapIntensity:3})),g=new _(new o({map:Z(`rgba(255,190,90,1)`,`rgba(255,140,40,0.3)`),blending:2,depthWrite:!1,transparent:!0,opacity:.6}));g.scale.setScalar(1.1);let v=new u;v.add(h,g);let y=new O(new oe(.27,.085,r.phone?120:220,r.phone?14:24),new N({color:16764810,metalness:1,roughness:.16,clearcoat:.6,envMapIntensity:2.6})),x=new u,S=new O(new P(.42,.42,.42,4,.05),new N({color:5920096,metalness:.8,roughness:.38,envMapIntensity:2.4})),C=new b(new t(new A(.435,.435,.435)),new l({color:i.clone().multiplyScalar(2.2),transparent:!0,opacity:.85,blending:2,toneMapped:!1}));x.add(S,C),s.group.add(v,y,x);let w=new p;return{group:s.group,radius:a,frame:{dist:5.6,phase:1.25,lift:.22},update(e,t){s.update(e,t),Q(3.6,e*.16,.22,w),v.position.copy(w),h.rotation.set(e*.2,e*.31,.3),Q(4.4,e*.12+2.3,-.3,w),y.position.copy(w),y.rotation.set(e*.4,e*.25,0),Q(3.1,e*.2+4.2,.45,w),x.position.copy(w),x.rotation.set(e*.3,e*.45,e*.1)}}}async function Ne(e,t,n){let r=1.35,i=await Y(e,t,{kind:`ice`,radius:r,accent:n,atmo:new V(.45,.8,1).lerp(n,.5),night:n.clone().multiplyScalar(2.6),seed:[8.3,2.2,4.4],bumpK:.25,bump:.7,nightK:1,atmoK:1,atmoScale:1.15,clouds:{opacity:.55,speed:.006,tint:new V(.92,1,1)},tilt:-.25,spin:.06}),s=r*4.6,c=new B({vertexShader:`varying vec2 vL; void main() { vL = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`
      uniform float uTime; uniform float uR; uniform vec3 uColor; varying vec2 vL;
      void main() {
        float r = length(vL);
        float ang = atan(vL.y, vL.x);
        vec3 col = vec3(0.0);
        for (int i = 0; i < 4; i++) {
          float fi = float(i);
          float k = fract(uTime * 0.16 + fi * 0.25);
          float rad = uR * 1.12 + k * uR * 3.2;
          float w = 0.012 + k * 0.03;
          float d = r - rad;
          float ring = exp(-d * d / (w * w)) + exp(-max(-d, 0.0) * 9.0) * step(d, 0.0) * 0.12;
          float fade = pow(1.0 - k, 1.7) * smoothstep(0.0, 0.06, k);
          float packets = 0.35 + 0.65 * smoothstep(0.55, 1.0, sin(ang * 18.0 - uTime * 1.5 + fi * 2.1));
          col += uColor * ring * fade * packets;
        }
        col *= smoothstep(uR * 1.02, uR * 1.12, r);
        gl_FragColor = vec4(col * 1.6, 1.0);
      }`,uniforms:{uTime:{value:0},uR:{value:r},uColor:{value:n.clone().multiplyScalar(1.4)}},transparent:!0,blending:2,depthWrite:!1,side:2}),l=new O(new E(s*2,s*2),c);l.rotation.x=-Math.PI/2+.08,i.tilt.add(l);let d=ke(),f=new F({color:14198346,metalness:1,roughness:.38,envMapIntensity:2}),m=new F({map:d,metalness:.5,roughness:.3,side:2,envMapIntensity:1.5}),h=new F({color:15263982,metalness:.2,roughness:.5}),v=Z(`rgba(255,255,255,1)`,`rgba(255,255,255,0.2)`),y=[0,1,2].map(e=>{let t=new u,i=new O(new A(.1,.1,.15),f),s=new O(new E(.62,.11),m);s.rotation.x=Math.PI/2;let c=new O(new a(.006,.006,.62,6),h);c.rotation.z=Math.PI/2;let l=new O(new g(.06,20,10,0,Math.PI*2,0,Math.PI/2.6),h);l.material.side=2,l.position.z=.1,l.rotation.x=-Math.PI/2;let d=new _(new o({map:v,color:n.clone().multiplyScalar(2),blending:2,depthWrite:!1,transparent:!0}));return d.scale.setScalar(.12),d.position.y=.07,t.add(i,s,c,l,d),t.scale.setScalar(1.15),{g:t,beacon:d,r:r*(1.75+e*.42),incl:[.5,-.35,1.1][e],speed:[.32,.24,.18][e],off:e*2.1}});y.forEach(e=>i.group.add(e.g));let b=new p,x=new p;return{group:i.group,radius:r,frame:{dist:7.2,phase:1.55,lift:.3},update(e,t){i.update(e,t),c.uniforms.uTime.value=e,y.forEach((t,n)=>{Q(t.r,e*t.speed+t.off,t.incl,b),t.g.position.copy(b),t.g.lookAt(i.group.getWorldPosition(x)),t.beacon.material.opacity=Math.max(0,Math.sin(e*3+n*2))**12})}}}async function Pe(e,t,n){let r=1.55,i=await Y(e,t,{kind:`neural`,radius:r,accent:n,atmo:new V(.55,.45,1).lerp(n,.6),night:n.clone().lerp(new V(.8,.85,1),.25).multiplyScalar(3.2),seed:[4.6,9.1,2.7],bumpK:.22,bump:.9,nightK:1,atmoK:1.05,atmoScale:1.15,clouds:{opacity:.6,speed:.008,tint:new V(.85,.82,1)},tilt:.2,spin:.045}),a=Math.round(260*t.particles),o=6*a,s=new Float32Array(o*3),c=new Float32Array(o*3),l=new Float32Array(o*4),u=new p,d=new p,f=new p;for(let e=0;e<6;e++){f.set(Math.random()-.5,1.4,Math.random()-.5).normalize(),u.set(1,0,0).cross(f).normalize(),d.copy(f).cross(u).normalize();let t=r*(1.3+e*.16),n=(.25+Math.random()*.25)*(e%2?1:-1);for(let r=0;r<a;r++){let i=e*a+r;s.set([u.x,u.y,u.z],i*3),c.set([d.x,d.y,d.z],i*3);let o=r<a*.7,f=o?Math.floor(Math.random()*7)*.9+Math.random()*.22:r/a*Math.PI*2;l.set([f,n,t,+!!o],i*4)}}let m=new z;m.setAttribute(`position`,new S(new Float32Array(o*3),3)),m.setAttribute(`aU`,new S(s,3)),m.setAttribute(`aV`,new S(c,3)),m.setAttribute(`aP`,new S(l,4)),m.boundingSphere=new H(new p,r*3);let h=new B({vertexShader:`
      attribute vec3 aU; attribute vec3 aV; attribute vec4 aP; uniform float uTime; uniform float uPR; varying float vA; varying float vPk;
      void main() {
        float a = aP.x + uTime * aP.y;
        vec3 p = (cos(a) * aU + sin(a) * aV) * aP.z;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        vPk = aP.w;
        vA = aP.w > 0.5 ? 1.0 : 0.22;
        gl_PointSize = uPR * (aP.w > 0.5 ? 2.6 : 1.4) * (8.0 / -mv.z);
      }`,fragmentShader:`
      uniform vec3 uColor; varying float vA; varying float vPk;
      void main() { float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.0, d); vec3 c = mix(uColor, vec3(1.6), vPk * 0.35); gl_FragColor = vec4(c * a * vA, 1.0); }`,uniforms:{uTime:{value:0},uPR:{value:Math.min(window.devicePixelRatio||1,1.75)},uColor:{value:n.clone().multiplyScalar(1.8)}},transparent:!0,blending:2,depthWrite:!1}),g=new R(m,h);return i.group.add(g),{group:i.group,radius:r,frame:{dist:6,phase:1.75,lift:.26},update(e,t){i.update(e,t),h.uniforms.uTime.value=e}}}var $=3.2,Fe=`
varying vec3 vP;
varying vec3 vN;
varying vec3 vW;
void main() {
  vP = normalize(position);
  vN = normalize(mat3(modelMatrix) * normal);
  vec4 w = modelMatrix * vec4(position, 1.0);
  vW = w.xyz;
  gl_Position = projectionMatrix * viewMatrix * w;
}`,Ie=`
${U}
uniform float uTime;
varying vec3 vP;
varying vec3 vN;
varying vec3 vW;
void main() {
  vec3 p = vP;
  float t = uTime;
  // slow convection: domain-warped supergranules
  vec3 w = vec3(snoise(p * 2.0 + t * 0.03), snoise(p * 2.0 + 7.0 - t * 0.025), snoise(p * 2.0 + 13.0 + t * 0.02));
  float big = fbm(p * 2.6 + w * 0.6 + vec3(0.0, t * 0.015, 0.0), 5);
  float mid = fbm(p * 9.0 + w * 1.2 - vec3(t * 0.02), 4);
  // granulation: bright cell centres, dark intergranular lanes
  vec3 g1 = worley(p * 26.0 + w * 0.8 + vec3(t * 0.05, 0.0, -t * 0.04));
  vec3 g2 = worley(p * 60.0 + w + vec3(-t * 0.07, t * 0.05, 0.0));
  float gran = smoothstep(0.0, 0.22, g1.y - g1.x) * (1.0 - 0.5 * g1.x) * 0.65 + smoothstep(0.0, 0.2, g2.y - g2.x) * 0.35;
  // active regions: bright faculae, dark sunspots with a penumbra
  float act = fbm(p * 1.4 + 30.0 + t * 0.004, 4);
  float spotN = snoise(p * 7.0 + 4.0) * 0.5 + 0.5;
  float umbra = smoothstep(0.5, 0.6, act) * smoothstep(0.62, 0.78, spotN);
  float pen = smoothstep(0.45, 0.58, act) * smoothstep(0.5, 0.66, spotN) * (1.0 - umbra);
  float fac = smoothstep(0.2, 0.45, act) * (1.0 - pen - umbra);
  float mu = clamp(dot(normalize(vN), normalize(cameraPosition - vW)), 0.0, 1.0);
  float limb = 0.32 + 0.68 * pow(mu, 0.55);
  float heat = 0.42 + gran * 0.38 + big * 0.42 + mid * 0.18 + fac * 0.22 - pen * 0.35 - umbra * 0.7;
  heat = clamp(heat * (0.6 + 0.4 * mu), 0.0, 1.3);
  vec3 c0 = vec3(0.55, 0.05, 0.16);
  vec3 c1 = vec3(1.0, 0.3, 0.3);
  vec3 c2 = vec3(1.0, 0.6, 0.36);
  vec3 c3 = vec3(1.0, 0.84, 0.62);
  vec3 col = mix(c0, c1, smoothstep(0.05, 0.4, heat));
  col = mix(col, c2, smoothstep(0.35, 0.7, heat));
  col = mix(col, c3, smoothstep(0.65, 1.05, heat));
  col *= limb * (0.42 + heat * 0.95);
  gl_FragColor = vec4(col, 1.0);
  ${K}
}`,Le=`
${U}
uniform float uTime;
uniform float uR;
uniform float uSize;
varying vec2 vUv;
void main() {
  vec2 c = (vUv - 0.5) * uSize;
  float r = length(c);
  float a = atan(c.y, c.x);
  float x = r / uR;
  if (x < 0.98) discard;
  float rays = 0.0;
  rays += snoise(vec3(cos(a) * 3.0, sin(a) * 3.0, uTime * 0.04)) * 0.5 + 0.5;
  rays += (snoise(vec3(cos(a) * 9.0, sin(a) * 9.0, uTime * 0.06 + 3.0)) * 0.5 + 0.5) * 0.6;
  rays += (snoise(vec3(cos(a) * 22.0, sin(a) * 22.0, uTime * 0.08 + 7.0)) * 0.5 + 0.5) * 0.35;
  rays /= 1.95;
  float fall = exp(-(x - 1.0) * 2.6);
  float inner = exp(-(x - 1.0) * 14.0);
  float streak = pow(rays, 2.4) * exp(-(x - 1.0) * (1.2 + (1.0 - rays) * 2.5));
  vec3 col = vec3(1.0, 0.4, 0.6) * fall * 0.16 + vec3(1.0, 0.72, 0.6) * inner * 0.9 + vec3(1.0, 0.5, 0.58) * streak * 0.55;
  float edge = smoothstep(uSize * 0.5, uSize * 0.32, r);
  gl_FragColor = vec4(col * edge, 1.0);
  ${K}
}`;function Re(e){let t=new u,n=new B({vertexShader:Fe,fragmentShader:Ie,uniforms:{uTime:{value:0}}}),r=new O(new g($,e?64:96,e?48:72),n);t.add(r);let i=$*7,a=new B({vertexShader:`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:Le,uniforms:{uTime:{value:0},uR:{value:$},uSize:{value:i}},transparent:!0,blending:2,depthWrite:!1}),s=new O(new E(i,i),a);t.add(s);let c=X(256,256,e=>{let t=e.createRadialGradient(128,128,0,128,128,128);t.addColorStop(0,`rgba(255,255,255,1)`),t.addColorStop(.12,`rgba(255,255,255,0.45)`),t.addColorStop(.35,`rgba(255,255,255,0.1)`),t.addColorStop(1,`rgba(0,0,0,0)`),e.fillStyle=t,e.fillRect(0,0,256,256)}),l=new _(new o({map:c,color:new V(1,.25,.55),blending:2,depthWrite:!1,transparent:!0,opacity:.16}));l.scale.setScalar($*13);let d=new _(new o({map:c,color:new V(1,.7,.55),blending:2,depthWrite:!1,transparent:!0,opacity:.22}));d.scale.setScalar($*5),t.add(l,d);let f=X(128,128,e=>{let t=e.createRadialGradient(64,64,40,64,64,62);t.addColorStop(0,`rgba(255,255,255,0)`),t.addColorStop(.75,`rgba(255,255,255,0.35)`),t.addColorStop(1,`rgba(255,255,255,0)`),e.fillStyle=t,e.fillRect(0,0,128,128)}),m=X(128,128,e=>{e.translate(64,64),e.beginPath();for(let t=0;t<6;t++){let n=t/6*Math.PI*2+Math.PI/6;e.lineTo(Math.cos(n)*56,Math.sin(n)*56)}e.closePath();let t=e.createRadialGradient(0,0,0,0,0,58);t.addColorStop(0,`rgba(255,255,255,0.15)`),t.addColorStop(.85,`rgba(255,255,255,0.35)`),t.addColorStop(1,`rgba(255,255,255,0.05)`),e.fillStyle=t,e.fill()}),v=X(256,32,e=>{let t=e.createLinearGradient(0,0,256,0);t.addColorStop(0,`rgba(255,255,255,0)`),t.addColorStop(.5,`rgba(255,255,255,1)`),t.addColorStop(1,`rgba(255,255,255,0)`),e.fillStyle=t,e.fillRect(0,0,256,32),e.globalCompositeOperation=`destination-in`;let n=e.createLinearGradient(0,0,0,32);n.addColorStop(0,`rgba(0,0,0,0)`),n.addColorStop(.5,`rgba(0,0,0,1)`),n.addColorStop(1,`rgba(0,0,0,0)`),e.fillStyle=n,e.fillRect(0,0,256,32)}),y=(e,t)=>{let n=new _(new o({map:e,color:t,blending:2,depthWrite:!1,depthTest:!1,transparent:!0,opacity:0}));return n.renderOrder=10,n.frustumCulled=!1,n},b=[{sprite:y(v,16748472),at:0,size:1.3,base:.16},{sprite:y(m,16734880),at:.35,size:.06,base:.25},{sprite:y(f,8370431),at:.62,size:.16,base:.22},{sprite:y(m,16756848),at:.9,size:.035,base:.35},{sprite:y(m,10189823),at:1.25,size:.09,base:.18},{sprite:y(f,16743088),at:1.6,size:.28,base:.12}],x=new u;b.forEach(e=>x.add(e.sprite));let S=new p,C=new p,w=new p,T=0,D=/[?&]hjdebug\b/.test(location.search)?{}:null;return{group:t,flareGroup:x,dbg:D,update(e,t,i,o=1/60){n.uniforms.uTime.value=e,a.uniforms.uTime.value=e,s.quaternion.copy(t.quaternion),r.rotation.y=e*.01,S.set(0,0,0).project(t);let c=S.z<1?1-h.smoothstep(Math.max(Math.abs(S.x),Math.abs(S.y)),.85,1.25):0;w.set(0,0,0).sub(t.position);let l=w.length();w.normalize();let u=1;for(let e of i){C.copy(e.c).sub(t.position);let n=C.dot(w);if(n<=0||n>l)continue;let r=Math.sqrt(Math.max(0,C.lengthSq()-n*n)),i=h.clamp((r-e.r)/(n/l*$)+.5,0,1);u=Math.min(u,i)}let d=c*u;T+=(d-T)*(1-Math.exp(-9.75*Math.min(o,.1))),D&&(D.vis=T,D.target=d,D.onScreen=c,D.occl=u,D.ndc=[S.x,S.y,S.z]);for(let n of b){let r=1-n.at;C.set(S.x*r,S.y*r,.5).unproject(t),C.sub(t.position).normalize().multiplyScalar(4).add(t.position),n.sprite.position.copy(C);let i=n.size*4*(n.at,1);n.at===0?n.sprite.scale.set(i*2.2,i*.025,1):n.sprite.scale.setScalar(i),n.sprite.material.opacity=n.base*T*(n.at===0?1:.8+.2*Math.sin(e*.7+n.at*5))}x.visible=T>.002}}}var ze=`
void main() {
  vec3 d = uvToDir(vUv);
  vec3 gN = normalize(vec3(0.32, 0.86, 0.4));
  float gl = dot(d, gN);
  float band = exp(-pow(gl / 0.3, 2.0));
  vec3 w = vec3(fbm(d * 2.0 + 1.0, 4), fbm(d * 2.0 + 5.0, 4), fbm(d * 2.0 + 9.0, 4));
  float n1 = fbm(d * 2.4 + w * 0.9, 7) * 0.5 + 0.5;
  float n2 = fbm(d * 5.0 + w * 1.4 + 3.0, 6) * 0.5 + 0.5;
  float lanes = smoothstep(0.45, 0.75, fbm(d * 7.0 + w * 2.0 + 11.0, 6) * 0.5 + 0.5);
  vec3 col = vec3(0.0025, 0.0022, 0.0045);
  // milky band glow
  col += vec3(0.05, 0.035, 0.06) * band * (0.4 + 0.8 * n2);
  // nebula: magenta and violet clouds, teal wisps, warm knots
  float neb = pow(n1, 3.2) * (0.35 + 0.9 * band);
  vec3 nc = mix(vec3(0.42, 0.06, 0.24), vec3(0.16, 0.07, 0.38), smoothstep(0.3, 0.7, n2));
  nc = mix(nc, vec3(0.03, 0.2, 0.24), smoothstep(0.62, 0.85, fbm(d * 3.0 + 40.0, 4) * 0.5 + 0.5) * 0.8);
  col += nc * neb * 0.55;
  col += vec3(0.5, 0.22, 0.12) * pow(n2, 8.0) * band * 0.6;
  // dark dust lanes cutting through the glow
  col *= 1.0 - lanes * band * 0.8;
  // a dense field of faint, unresolved stars
  vec3 cell = floor(d * 420.0);
  float h = hash13(cell);
  vec3 fp = hash33(cell) - 0.5;
  float sd = length(fract(d * 420.0) - 0.5 - fp * 0.6);
  float star = step(0.985 - band * 0.012, h) * smoothstep(0.32, 0.0, sd) * (0.15 + 0.85 * pow(fract(h * 37.0), 4.0));
  vec3 tint = mix(vec3(0.75, 0.82, 1.0), vec3(1.0, 0.85, 0.7), fract(h * 91.0));
  col += tint * star * 0.55;
  gl_FragColor = vec4(pow(clamp(col, 0.0, 1.0), vec3(1.0 / 2.2)), 1.0);
}`;function Be(e,t){let n=new u,r=e.bake(ze,t.phone?1024:2048,t.phone?512:1024,{},{mips:!1}),i=new O(new g(900,64,32),new B({vertexShader:`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:`uniform sampler2D map; uniform float uK; varying vec2 vUv; void main() { vec3 c = pow(texture2D(map, vUv).rgb, vec3(2.2)) * uK; gl_FragColor = vec4(c, 1.0); ${K} }`,uniforms:{map:{value:r},uK:{value:.85}},side:1,depthWrite:!1}));i.renderOrder=-10,i.frustumCulled=!1,n.add(i);let a=new B({vertexShader:`
      attribute float aSize; attribute vec3 aColor; uniform float uTime; uniform float uPR; varying vec3 vC;
      void main() {
        vec4 mv = modelViewMatrix * vec4(position, 1.0);
        gl_Position = projectionMatrix * mv;
        float tw = 0.8 + 0.2 * sin(uTime * (0.6 + fract(aSize * 13.0) * 2.0) + aSize * 50.0);
        vC = aColor * tw;
        gl_PointSize = aSize * uPR;
      }`,fragmentShader:`
      varying vec3 vC;
      void main() { float d = length(gl_PointCoord - 0.5); float a = exp(-d * d * 30.0) + exp(-d * d * 120.0); gl_FragColor = vec4(vC * a, 1.0); }`,uniforms:{uTime:{value:0},uPR:{value:Math.min(window.devicePixelRatio||1,1.75)}},transparent:!0,blending:2,depthWrite:!1}),o=[new V(.7,.8,1),new V(1,1,1),new V(1,.9,.75),new V(1,.72,.6),new V(1,.6,.8)],s=(e,t,n,r)=>{let i=new Float32Array(e*3),s=new Float32Array(e),c=new Float32Array(e*3),l=new p;for(let a=0;a<e;a++){l.randomDirection().multiplyScalar(h.lerp(t,n,Math.random())),i.set([l.x,l.y,l.z],a*3);let e=Math.random()**7;s[a]=(1.2+e*5.5)*r;let u=o[Math.floor(Math.random()*o.length)],d=.25+e*2.6;c.set([u.r*d,u.g*d,u.b*d],a*3)}let u=new z;u.setAttribute(`position`,new S(i,3)),u.setAttribute(`aSize`,new S(s,1)),u.setAttribute(`aColor`,new S(c,3));let d=new R(u,a);return d.frustumCulled=!1,d},c=s(Math.round(1400*t.particles),70,130,1),l=s(Math.round(3200*t.particles),220,420,.85);n.add(c,l);let d=X(512,512,e=>{e.fillStyle=`#000`,e.fillRect(0,0,512,512),e.globalCompositeOperation=`lighter`;let t=e.createRadialGradient(256,256,0,256,256,120);t.addColorStop(0,`rgba(255,236,210,0.95)`),t.addColorStop(.2,`rgba(255,190,160,0.35)`),t.addColorStop(1,`rgba(0,0,0,0)`),e.fillStyle=t,e.fillRect(0,0,512,512);for(let t=0;t<2;t++)for(let n=0;n<2600;n++){let n=Math.random(),r=t*Math.PI+n*Math.PI*3.2,i=18+n*210,a=(1-n*.5)*22*Math.random(),o=256+Math.cos(r)*i+(Math.random()-.5)*a*2,s=256+Math.sin(r)*i+(Math.random()-.5)*a*2;e.fillStyle=Math.random()<.6?`rgba(150,170,255,${.05+Math.random()*.12})`:`rgba(255,140,190,${.04+Math.random()*.1})`,e.beginPath(),e.arc(o,s,1+Math.random()*3.5*(1-n*.6),0,Math.PI*2),e.fill()}e.globalCompositeOperation=`destination-in`;let n=e.createRadialGradient(256,256,150,256,256,256);n.addColorStop(0,`rgba(0,0,0,1)`),n.addColorStop(1,`rgba(0,0,0,0)`),e.fillStyle=n,e.fillRect(0,0,512,512)}),f=new O(new E(150,150),new I({map:d,transparent:!0,blending:2,depthWrite:!1,opacity:.5,color:16771314}));return f.position.set(260,-40,-560),f.lookAt(0,0,0),f.rotateX(1.05),f.rotateZ(.6),n.add(f),{group:n,update(e,t){i.position.copy(t.position),a.uniforms.uTime.value=e,l.position.copy(t.position).multiplyScalar(.85)}}}function Ve(t,r,i){let a=new u,o=(e,t)=>{let r=new n(1,t),i=r.attributes.position,a=new p,o=(e,t,n,r,i)=>Math.sin(e*r+i)*Math.sin(t*r*1.3+i*2.1)*Math.sin(n*r*.9+i*.7);for(let t=0;t<i.count;t++){a.fromBufferAttribute(i,t);let n=1+o(a.x,a.y,a.z,1.6,e*3.1)*.32+o(a.x,a.y,a.z,3.7,e*5.3)*.12+o(a.x,a.y,a.z,8.3,e*1.7)*.05+Math.abs(o(a.x,a.y,a.z,15,e))*-.04;a.multiplyScalar(n),i.setXYZ(t,a.x*(1+e*.15),a.y*(.72+e*.08),a.z)}return r.computeVertexNormals(),r},s=X(256,256,e=>{e.fillStyle=`#8a8076`,e.fillRect(0,0,256,256);for(let t=0;t<900;t++){let t=70+Math.random()*110;e.fillStyle=`rgba(${t},${t*.93},${t*.86},${.15+Math.random()*.3})`,e.beginPath(),e.arc(Math.random()*256,Math.random()*256,.5+Math.random()*5,0,Math.PI*2),e.fill()}for(let t=0;t<40;t++)e.strokeStyle=`rgba(30,26,22,${Math.random()*.4})`,e.lineWidth=1+Math.random()*2,e.beginPath(),e.arc(Math.random()*256,Math.random()*256,3+Math.random()*14,0,Math.PI*2),e.stroke()});s.wrapS=s.wrapT=M;let c=new F({color:11576728,map:s,bumpMap:s,bumpScale:3,roughness:.92,metalness:.04}),l=Math.round(1500*t.particles),f=new e,m=new ee,h=new d,g=new p,_=new p,y=new V,b=[],x=t.phone?1:2;for(let e=0;e<3;e++){let t=Math.round(l/3),n=[],s=[],u=[],d=[];for(let e=0;e<t;e++){let e=Math.random()*Math.PI*2,t=(Math.random()+Math.random()+Math.random())/3-.5,a=r+t*i*2;g.set(Math.cos(e)*a,(Math.random()-.5)*i*.35*(1-Math.abs(t)),Math.sin(e)*a),h.set(Math.random()*6.3,Math.random()*6.3,Math.random()*6.3),m.setFromEuler(h);let o=.012+Math.random()**5*.16;_.set(o*(.8+Math.random()*.5),o*(.7+Math.random()*.4),o*(.8+Math.random()*.5)),f.compose(g,m,_);let c=.5+Math.random()*.6;y.setRGB(c*(.95+Math.random()*.1),c*.92,c*(.82+Math.random()*.12)),(o>.05?n:s).push(f.clone()),(o>.05?u:d).push(y.clone())}for(let[t,r,i]of[[n,u,x],[s,d,Math.max(0,x-1)]]){if(!t.length)continue;let n=new v(o(e,i),c,t.length);t.forEach((e,t)=>{n.setMatrixAt(t,e),n.setColorAt(t,r[t])}),b.push(n),a.add(n)}}let C=Math.round(3e3*t.particles),w=new Float32Array(C*3),T=new Float32Array(C);for(let e=0;e<C;e++){let t=Math.random()*Math.PI*2,n=r+((Math.random()+Math.random())/2-.5)*i*2.4;w.set([Math.cos(t)*n,(Math.random()-.5)*i*.4,Math.sin(t)*n],e*3),T[e]=Math.random()}let E=new z().setAttribute(`position`,new S(w,3)).setAttribute(`aS`,new S(T,1)),D=b.map(e=>e.count);return{group:a,meshes:b,dustGeo:E,setBudget(e){b.forEach((t,n)=>t.count=Math.max(1,Math.round(D[n]*Math.min(1,e)))),E.setDrawRange(0,Math.round(C*Math.min(1,e)))}}}function He(e){let t=Math.round(160*e.particles),n=new Float32Array(t*3),r=new Float32Array(t);for(let e=0;e<t;e++)n.set([Math.random()*16,Math.random()*16,Math.random()*16],e*3),r[e]=Math.random();let i=new z;i.setAttribute(`position`,new S(n,3)),i.setAttribute(`aS`,new S(r,1));let a=new B({vertexShader:`
      attribute float aS; uniform vec3 uCam; uniform float uTime; uniform float uPR; uniform float uBox; varying float vA;
      void main() {
        vec3 p = position + vec3(sin(uTime * 0.1 + aS * 6.0), cos(uTime * 0.13 + aS * 4.0), sin(uTime * 0.08 + aS * 9.0)) * 0.6;
        p = mod(p - uCam, uBox) - uBox * 0.5 + uCam;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        float z = -mv.z;
        vA = smoothstep(0.4, 1.5, z) * (1.0 - smoothstep(4.0, 8.0, z)) * (0.25 + 0.75 * aS);
        gl_PointSize = uPR * (10.0 + aS * 30.0) * (2.0 / max(z, 0.4));
      }`,fragmentShader:`
      varying float vA;
      void main() { float d = length(gl_PointCoord - 0.5); float a = smoothstep(0.5, 0.15, d) * (0.75 + 0.25 * smoothstep(0.3, 0.45, d)); gl_FragColor = vec4(vec3(1.0, 0.85, 0.9) * a * vA * 0.2, 1.0); }`,uniforms:{uCam:{value:new p},uTime:{value:0},uPR:{value:Math.min(window.devicePixelRatio||1,1.75)},uBox:{value:16}},transparent:!0,blending:2,depthWrite:!1}),o=new R(i,a);return o.frustumCulled=!1,o.renderOrder=5,{points:o,update(e,t){a.uniforms.uTime.value=e,a.uniforms.uCam.value.copy(t)}}}var Ue=`
uniform float uTime;
uniform float uCA;
uniform float uGrain;
void main() {
  vec2 c = vUv - 0.5;
  float r2 = dot(c, c);
  vec3 col;
  if (uCA > 0.0) {
    vec2 off = c * r2 * uCA;
    col = vec3(display(hdr(vUv + off)).r, display(hdr(vUv)).g, display(hdr(vUv - off)).b);
  } else {
    col = display(hdr(vUv));
  }
  col *= 1.0 - smoothstep(0.12, 0.62, r2) * 0.42;
  float n = fract(sin(dot(floor(vUv * uRes) + fract(uTime * 7.31) * 113.0, vec2(12.9898, 78.233))) * 43758.5453);
  col += (n - 0.5) * 0.022 * uGrain;
  gl_FragColor = vec4(col, 1.0);
}`,We=[8.5,13.5,20.5,25.5],Ge=[-.7,.3,4.25,5.35],Ke=17,qe=e=>{let t=h.clamp(e,0,1);return t*t*t*(t*(t*6-15)+10)};async function Je(e,t){let n=/[?&]perf\b/.test(location.search),r=performance.now(),a=async(e=``)=>{n&&performance.measure(`ss ${e}`,{start:r,end:performance.now()});let t=await le(1);return r=performance.now(),t},o=!1,s=!1,d=new IntersectionObserver(e=>{let t=!s&&(e[0]?.isIntersecting??!1);t!==o&&ie(o=t)},{rootMargin:`150% 0px`});d.observe(e.closest(`[data-ss]`)??e);let m=se()||window.innerWidth<760,g=ue(e,{fov:38,z:40,alpha:!1,env:!1}),{scene:_,camera:v,renderer:y}=g;g.setRender(()=>{});let b=0;D(e=>b=e.tier)();let x=m?{phone:!0,tex:512,seg:48,particles:.3}:b>=3?{phone:m,tex:768,seg:72,particles:.45}:b===2?{phone:m,tex:1024,seg:96,particles:.75}:b===1?{phone:m,tex:1536,seg:112,particles:.9}:{phone:m,tex:1536,seg:128,particles:1};await a(`stage`),_.environment=await w(y),await a(`env`),v.near=.05,v.far=2400,v.updateProjectionMatrix(),y.setClearColor(131587,1),_.environmentIntensity=.3,_.add(new j(16773348,2.8,0,0)),_.add(new ne(8423679,.025));let S=new he(y),C=Be(S,x);_.add(C.group);let T=Re(m);_.add(T.group,T.flareGroup);let E=new u;_.add(E);let O=t.map(e=>new V(e));await a(`space+sun`);let k=[];k.push(await Ae(S,x,O[0],t[0])),await a(`mobile`),k.push(await Me(S,x,O[1])),await a(`animation`),k.push(await Ne(S,x,O[2])),await a(`marketing`),k.push(await Pe(S,x,O[3])),await a(`ai`);let ee=new l({color:13222655,transparent:!0,opacity:.1,depthWrite:!1});We.forEach((e,t)=>{let n=new ae(0,0,e,e,0,Math.PI*2).getPoints(256);E.add(new c(new z().setFromPoints(n.map(e=>new p(e.x,0,e.y))),ee)),k[t].group.position.set(Math.cos(Ge[t])*e,0,Math.sin(Ge[t])*e),E.add(k[t].group)});let A=Ve(x,Ke,1),te=new R(A.dustGeo,je(new V(.9,.78,.66),1.1));A.group.add(te),E.add(A.group),await a(`belt`);let re=He(x);_.add(re.points);let oe=()=>{let e=y.getPixelRatio();_.traverse(t=>{let n=t.material;n&&`uniforms`in n&&n.uniforms?.uPR&&(n.uniforms.uPR.value=e)})},M=fe({small:!0});M.group.scale.setScalar(.12),_.add(M.group),await a(`rocket`);let N=pe(y,_,v,{bloom:{strength:m?.55:.62,radius:.45,threshold:1,knee:.4},maxSamples:m?0:4,finalFrag:Ue,uniforms:{uTime:{value:0},uCA:{value:m?0:.012},uGrain:{value:1}}}),ce={uniforms:N.uniforms};D(e=>{N.setQuality(e),A.setBudget(e.particles/x.particles),ce.uniforms.uCA.value=m||!e.extras?0:.012,ce.uniforms.uGrain.value=+!!e.extras,oe()});let P=0,F=0,I=new p,L=new p,B=new p,H=new p,de=new p,U=new p,W=new p,G={pos:new p,look:new p},K={pos:new p,look:new p},me=new f,q=()=>y.getSize(me).x||1,ge=()=>y.getSize(me).y||1,_e=()=>q()<760,ve=(e,t,n)=>{let r=_e();if(e===0){let e=Math.sin(t*.05)*.06;return r?n.pos.set(Math.sin(e)*44,50,Math.cos(e)*44):n.pos.set(Math.sin(e+.1)*39,15,Math.cos(e+.1)*39),n.look.set(r?4.5:1.5,r?0:-1.5,-3),n}let i=k[e-1];i.group.getWorldPosition(I),H.copy(I).negate().setY(0).normalize();let a=i.frame.phase+Math.sin(t*.06+e)*.08,o=Math.cos(a),s=Math.sin(a),c=H.x*o-H.z*s,l=H.x*s+H.z*o;H.set(c,i.frame.lift,l).normalize();let u=i.radius*i.frame.dist*(r?1.02:1)*(1+Math.sin(t*.13+e)*.025);return n.pos.copy(I).addScaledVector(H,u),n.look.copy(I),n},ye=new f,be=null,xe=e=>{e.beta!=null&&e.gamma!=null&&(be||={b:e.beta,g:e.gamma},ye.set(h.clamp((e.gamma-be.g)/25,-1,1),h.clamp((e.beta-be.b)/25,-1,1)))};m&&window.addEventListener(`deviceorientation`,xe,{passive:!0});let J=new f,Se=k.map(e=>({c:new p,r:e.radius})),Ce=new p,we=new p,Te=new p,Ee=new p,De=-1,Y=!0,X=e=>{let t=De<0?.016:Math.min(.5,Math.max(0,e-De));De=e,k.forEach(n=>n.update(e,t,v)),A.group.rotation.y=e*.004,te.material.uniforms.uTime.value=e;let n=k.length+1,r=h.clamp(P*(n-1),0,n-1);F=Y?r:F+(r-F)*(1-Math.exp(-t*2.6));let i=Math.min(n-2,Math.floor(F)),a=F-i,o=qe((a-.1)/.8),s=qe((a-.04)/.74);ve(i,e,G),ve(i+1,e,K);let c=G.pos.distanceTo(K.pos),l=Math.sin(Math.PI*o);H.copy(G.pos).lerp(K.pos,o),H.y+=l*c*.1,B.copy(G.look).lerp(K.look,s),W.copy(H).sub(B).normalize(),H.addScaledVector(W,l*c*.08),L.copy(H);let u=q(),d=ge(),f=_e(),p=Math.min(1,F),m=f?0:u*h.lerp(.1,.18,p),_=f?d*h.lerp(.2,.21,p):0;v.fov=f?55:38,v.setViewOffset(u,d,-m,_,u,d);let y=L.distanceTo(B);v.position.copy(L),v.lookAt(B),de.setFromMatrixColumn(v.matrixWorld,0),U.setFromMatrixColumn(v.matrixWorld,1),J.copy(g.pointer).add(ye);let b=Math.sin(e*.37)*.6+Math.sin(e*1.13+1.3)*.25+Math.sin(e*2.7)*.05,x=Math.sin(e*.29+1.1)*.5+Math.sin(e*.97+.4)*.22+Math.sin(e*2.3+2)*.05;v.position.addScaledVector(de,(J.x*.07+b*.006)*y).addScaledVector(U,(J.y*.05+x*.006)*y),v.lookAt(B),v.rotateZ(Math.sin(e*.21)*.006-J.x*.012),v.updateMatrixWorld(),Y=!1,ee.opacity=.03+.09*(1-p),W.copy(B).sub(v.position).normalize();let S=Math.sin(Math.PI*h.clamp(a,0,1));Ce.copy(v.position).addScaledVector(W,y*(.42+S*.12)).addScaledVector(de,y*(f?.12:.2-S*.08)).addScaledVector(U,y*(f?.2:-.12+Math.sin(e*.8)*.01)),we.lengthSq()===0&&M.group.position.copy(Ce),M.group.position.lerp(Ce,1-Math.exp(-t*2.2)),Te.copy(M.group.position).sub(we),we.copy(M.group.position),Ee.copy(M.group.position).add(Te.lengthSq()>1e-5?Te.normalize():W),Ee.lerp(H.copy(M.group.position).add(W),.6),M.group.lookAt(Ee),M.group.rotateX(Math.PI/2),M.group.scale.setScalar(y*.012),M.update(e,.18+S*.6),C.update(e,v),re.update(e,v.position),k.forEach((e,t)=>e.group.getWorldPosition(Se[t].c)),T.update(e,v,Se,t),ce.uniforms.uTime.value=e};X(0),await S.flush(()=>a(`bake strip`));try{await N.compileAsync()}catch{}await a(`compile`);let Z=new Set;_.traverse(e=>{let t=e.material;for(let e of Array.isArray(t)?t:t?[t]:[]){for(let t of Object.values(e))t?.isTexture&&Z.add(t);let t=e.uniforms;if(t)for(let e in t)t[e].value?.isTexture&&Z.add(t[e].value)}});for(let e of Z)e.isRenderTargetTexture||(y.initTexture(e),await a(`texture`));X(0),await N.primeObjects(()=>a(`prime object`)),N.prime(),await a(`prime scene`),N.primeBloom(),await a(`prime bloom`),s=!0,d.disconnect(),o&&ie(o=!1),g.setRender(N.render),g.invalidate(),g.onFrame(e=>X(e)),/[?&]hjdebug\b/.test(location.search)&&(window.__ss=()=>({...T.dbg,cam:v.position.toArray(),fs:F,progress:P})),e.closest(`[data-ss]`)?.setAttribute(`data-gl-cover`,``),window.dispatchEvent(new Event(`nuuke:gl-cover`));let Oe=new p,ke=k.map(()=>({x:0,y:0,visible:!1}));return{setProgress:e=>P=e,planetsOnScreen:()=>{let e=q(),t=ge();U.setFromMatrixColumn(v.matrixWorld,1);let n=!_e()||F<.5;return k.forEach((r,i)=>{r.group.getWorldPosition(I);let a=Oe.copy(I).project(v),o=H.copy(I).addScaledVector(U,r.radius).project(v),s=Math.min(e-120,(a.x*.5+.5)*e),c=(-a.y*.5+.5)*t,l=Math.abs((-o.y*.5+.5)*t-c),u=c+Math.max(0,l-18),d=ke[i];d.x=s,d.y=u,d.visible=n&&a.z<1&&s>-40&&s<e+40&&u>-40&&u<t+40}),ke},dispose:()=>{window.removeEventListener(`deviceorientation`,xe),g.setRender(()=>{});let t=new Set;_.traverse(e=>{let n=e;n.geometry?.dispose(),(Array.isArray(n.material)?n.material:n.material?[n.material]:[]).forEach(e=>{Object.values(e).forEach(e=>e instanceof i&&t.add(e));let n=e.uniforms;n&&Object.values(n).forEach(e=>e?.value instanceof i&&t.add(e.value)),e.dispose()})}),t.forEach(e=>e.dispose()),S.dispose(),N.dispose(),e.closest(`[data-ss]`)?.removeAttribute(`data-gl-cover`),window.dispatchEvent(new Event(`nuuke:gl-cover`)),g.dispose()}}}export{Je as initServices};