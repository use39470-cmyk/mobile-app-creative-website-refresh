import{t as e}from"./feeld.B__zIchR.js";import{D as t,E as n,L as r,Mt as i,Nt as a,Q as o,St as s,ct as c,d as l,et as u,ht as ee,lt as te,nt as d,s as f,tt as p,vt as m,w as h,z as g}from"./core.DZalETXP.js";var _=`
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }
`,v=`
precision highp float;
varying vec2 vUv;
uniform float uTime;
uniform float uAspect;
uniform vec2 uTouch;
uniform float uHeat;
uniform float uPulse;
uniform vec3 uStops[7];
uniform float uPos[7];
uniform float uGrain;

float k(vec2 p, vec2 c, float r) { vec2 d = p - c; return exp(-dot(d, d) / (r * r)); }
float hash(vec2 p) { return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453); }

vec3 ramp(float x) {
  vec3 c = uStops[0];
  for (int i = 0; i < 6; i++) {
    float t = clamp((x - uPos[i]) / (uPos[i + 1] - uPos[i]), 0.0, 1.0);
    c = mix(c, uStops[i + 1], smoothstep(0.0, 1.0, t));
  }
  return c;
}

void main() {
  vec2 p = vec2((vUv.x - 0.5) * uAspect, vUv.y - 0.5);
  float t = uTime;
  float breath = 1.0 + 0.05 * sin(t * 6.2831 / 5.5);
  float f = 0.0;
  f += 0.95 * k(p, vec2(-0.32 * uAspect + 0.08 * sin(t * 0.21), 0.12 + 0.06 * cos(t * 0.27)), 0.34 * breath);
  f += 0.85 * k(p, vec2(0.28 * uAspect + 0.07 * cos(t * 0.19), -0.16 + 0.07 * sin(t * 0.23)), 0.3 * breath);
  f += 0.6 * k(p, vec2(0.05 * sin(t * 0.17), 0.3 + 0.05 * sin(t * 0.31)), 0.24);
  f += 0.55 * k(p, vec2(0.36 * uAspect * cos(t * 0.11), -0.38), 0.26);
  f += 0.35 * k(p, vec2(-0.1, -0.05), 0.5);
  // Touch: warmth gathers where the pointer rests.
  f += uHeat * 0.9 * k(p, vec2((uTouch.x - 0.5) * uAspect, uTouch.y - 0.5), 0.2);
  f += uPulse * 0.35 * k(p, vec2(0.0, 0.02), 0.42);
  float v = f / (0.55 + f) * 1.28;
  vec3 col = ramp(clamp(v, 0.0, 1.0));
  col += (hash(vUv * 900.0 + fract(t)) - 0.5) * uGrain;
  gl_FragColor = vec4(col, 1.0);
}
`;function y(y,b){let x=f(y,{fov:32,z:9}),{scene:S,camera:C,onFrame:w,reduced:T,renderer:E,pointer:D}=x;E.toneMapping=0;let O=e.map(([,e])=>new a(e[0]/255,e[1]/255,e[2]/255)),k={uTime:{value:0},uAspect:{value:1},uTouch:{value:new i(.62,.6)},uHeat:{value:0},uPulse:{value:0},uStops:{value:O},uPos:{value:e.map(([e])=>e)},uGrain:{value:.035}},A=new u(new c(1,1),new m({vertexShader:_,fragmentShader:v,uniforms:k,depthWrite:!1}));A.position.z=-4,A.renderOrder=-1,S.add(A);let j=0,M=()=>{if(C.aspect===j)return;j=C.aspect;let e=C.position.z-A.position.z,t=2*Math.tan(o.degToRad(C.fov/2))*e*1.04;A.scale.set(t*C.aspect,t,1),k.uAspect.value=C.aspect};S.add(new g(16773610,3809116,.6));let N=new t(16777215,1.6);N.position.set(3,4,6),S.add(N);let P=new te(16740277,18,14);P.position.set(-2.5,-1.5,3),S.add(P);let F=new r;S.add(F);let I=[{c:16117994,r:.62,base:new a(-.9,.35,0),ph:0},{c:13088511,r:.46,base:new a(1.05,.75,-.6),ph:2.1},{c:16752250,r:.4,base:new a(.55,-.95,.4),ph:4.2}],L=48,R=I.map(e=>{let t=new u(new s(e.r,L,Math.round(L*.66)),new d({color:e.c,roughness:.18,metalness:0,clearcoat:1,clearcoatRoughness:.12,iridescence:.75,iridescenceIOR:1.35,sheen:.4,sheenColor:new h(16763299),envMapIntensity:1.1}));return t.position.copy(e.base),F.add(t),t}),z=[[0,1],[0,2],[1,2]],B=new p({color:16774118,transparent:!0,opacity:.55}),V=z.map(()=>{let e=new u(new n(.014,.014,1,8,1,!0),B);return F.add(e),e}),H=new u(new s(.07,16,12),new p({color:16777215}));F.add(H);let U=new u(new ee(.72,.76,64),new p({color:16774118,transparent:!0,opacity:0,side:2,depthWrite:!1}));F.add(U);let W=new a(0,1,0),G=new a,K=new a,q=(e,t,n)=>{G.subVectors(n,t);let r=G.length();K.addVectors(t,n).multiplyScalar(.5),e.position.copy(K),e.scale.set(1,r,1),e.quaternion.setFromUnitVectors(W,G.normalize())},J=()=>{let e=y.clientWidth<520;F.scale.setScalar(e?.8:1),F.position.set(e?0:.15,e?.1:0,0)};J(),new ResizeObserver(J).observe(y),l(e=>{k.uGrain.value=e.extras?.035:0;let t=e.tier>=3?28:48;t!==L&&(L=t,R.forEach((e,t)=>{e.geometry.dispose(),e.geometry=new s(I[t].r,L,Math.round(L*.66))}))});let Y=b.getBoundingClientRect(),X=()=>Y=b.getBoundingClientRect();window.addEventListener(`scroll`,X,{passive:!0}),window.addEventListener(`resize`,X,{passive:!0});let Z=new i(.62,.6),Q=0,$=e=>{Z.set((e.clientX-Y.left)/Math.max(1,Y.width),1-(e.clientY-Y.top)/Math.max(1,Y.height)),Q=1,x.invalidate()};return b.addEventListener(`pointermove`,$,{passive:!0}),b.addEventListener(`pointerdown`,$,{passive:!0}),b.addEventListener(`pointerleave`,()=>Q=0),w((e,t)=>{M();let n=T?2.4:e;k.uTime.value=n,k.uTouch.value.lerp(Z,1-Math.exp(-6*t)),k.uHeat.value+=(Q-k.uHeat.value)*(1-Math.exp(-(Q?4:1.2)*t));let r=Math.sin(n*Math.PI*2/5.5);R.forEach((e,t)=>{let i=I[t];e.position.set(i.base.x+Math.sin(n*.5+i.ph)*.12,i.base.y+Math.cos(n*.42+i.ph)*.14,i.base.z+Math.sin(n*.3+i.ph)*.1),e.scale.setScalar(1+r*.025)}),z.forEach(([e,t],n)=>q(V[n],R[e].position,R[t].position));let i=T?.7:n%6/6,a=Math.min(1,i/.35),o=a*a*(3-2*a);H.position.lerpVectors(R[0].position,R[1].position,o),H.visible=i<.36;let s=i>.35&&i<.6?Math.sin((i-.35)/.25*Math.PI):0;k.uPulse.value=s,U.position.copy(R[1].position),U.lookAt(C.position),U.scale.setScalar(.7+(i>.35?(i-.35)*1.6:0)),U.material.opacity=s*.7,B.opacity=.45+s*.4,F.rotation.y=-.15+D.x*.18,F.rotation.x=.06-D.y*.1}),x}export{y as initHero};