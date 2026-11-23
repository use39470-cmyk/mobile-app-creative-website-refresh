import{$ as e,Dt as t,E as n,Et as r,L as i,Mt as a,N as o,Nt as s,Ot as c,P as l,Pt as u,Q as d,R as f,S as p,St as m,Tt as h,U as g,W as _,_t as v,at as y,ct as b,et as x,ft as S,gt as C,jt as w,lt as T,mt as E,nt as D,o as O,pt as ee,rt as te,tt as k,v as ne,vt as A,w as j,x as re,y as ie,yt as ae}from"./core.DZalETXP.js";var M=new Map;function N(e,t){return M.has(e)||M.set(e,t()),M.get(e)}function oe(){for(let e of[`concretetrue`,`concretefalse`,`scorch`,`groundFade`]){let n=M.get(e);if(!n)continue;let r=n instanceof t?[n]:[n.map,n.rough];for(let e of r)e.dispose();M.delete(e)}}function P(e){let t=e>>>0||1;return()=>(t^=t<<13,t^=t>>>17,t^=t<<5,(t>>>0)%1e5/1e5)}function se(e,t,n){let r=P(n),i=new Float32Array(e*t);for(let e=0;e<i.length;e++)i[e]=r();return(n,r)=>{let a=Math.floor(n),o=Math.floor(r),s=n-a,c=r-o,l=s*s*(3-2*s),u=c*c*(3-2*c),d=(a%e+e)%e,f=(o%t+t)%t,p=(d+1)%e,m=(f+1)%t,h=i[f*e+d],g=i[f*e+p],_=i[m*e+d],v=i[m*e+p];return h+(g-h)*l+(_-h)*u+(h-g-_+v)*l*u}}function F(e,t,n,r,i,a){let o=Array.from({length:i},(e,t)=>se(n<<t,r<<t,a+t*101));return(a,s)=>{let c=0,l=.5,u=0;for(let d=0;d<i;d++)c+=l*o[d](a/e*(n<<d),s/t*(r<<d)),u+=l,l*=.5;return c/u}}function I(e,t){let n=document.createElement(`canvas`);return n.width=e,n.height=t,n}function L(e,t,n=!1){let r=new ie(e);return r.colorSpace=t?C:``,r.wrapS=n?r.wrapT=E:E,r.anisotropy=8,r}function ce(e,t,n,r,i=!1){let a=I(t,n),o=a.getContext(`2d`),s=o.createImageData(t,n),c=(r,a)=>(r=(r+t)%t,a=i?(a+n)%n:Math.min(n-1,Math.max(0,a)),e[a*t+r]);for(let e=0;e<n;e++)for(let n=0;n<t;n++){let i=(c(n+1,e)-c(n-1,e))*r,a=(c(n,e-1)-c(n,e+1))*r,o=Math.hypot(i,a,1),l=(e*t+n)*4;s.data[l]=(-i/o*.5+.5)*255,s.data[l+1]=(-a/o*.5+.5)*255,s.data[l+2]=(1/o*.5+.5)*255,s.data[l+3]=255}return o.putImageData(s,0,0),a}var R=e=>e<0?0:e>1?1:e,z=(e,t,n)=>{let r=R((n-e)/(t-e));return r*r*(3-2*r)},B=1.9;function le(e){return N(`hull`+e,()=>{let t=e?512:1024,n=e?256:512,r=t/1024,i=I(t,n),a=I(t,n),o=new Float32Array(t*n).fill(.5),s=new Float32Array(t*n),c=e=>Math.round((1-e/B)*n),l=[0,1,2,3,4,5].map(e=>(e+.5)/6*t),u=[.55,1.62].map(c),d=(e,r,i)=>{if(r<0||r>=n)return;let a=(Math.round(e)%t+t)%t;o[r*t+a]-=i,s[r*t+a]=Math.max(s[r*t+a],i*2)};l.forEach(e=>{for(let t=0;t<n;t++)d(e,t,.5),d(e-1,t,.22),d(e+1,t,.22)}),u.forEach(e=>{for(let n=0;n<t;n++)d(n,e,.5),d(n,e-1,.22),d(n,e+1,.22)});let f=[],p=Math.max(5,9*r);l.forEach(e=>{for(let t=p;t<n-p*.5;t+=p)f.push([e-6*r,t],[e+6*r,t])}),u.forEach(e=>{for(let n=p*.5;n<t;n+=p)l.some(e=>Math.abs(e-n)<10*r)||f.push([n,e-6*r],[n,e+6*r])});let m=Math.max(1.6,2.4*r);f.forEach(([e,r])=>{for(let i=Math.floor(r-m-1);i<=r+m+1;i++)if(!(i<0||i>=n))for(let n=Math.floor(e-m-1);n<=e+m+1;n++){let a=Math.hypot(n-e,i-r)/m;if(a>1.35)continue;let s=(n%t+t)%t;a<=1?o[i*t+s]+=.55*(1-a*a):o[i*t+s]-=.12}});let h=P(7);for(let e=0;e<26;e++){let e=h()*t,i=h()*n,a=(18+h()*40)*r,s=.03+h()*.05;for(let r=Math.max(0,Math.floor(i-a*2));r<Math.min(n,i+a*2);r++)for(let n=Math.floor(e-a*2);n<e+a*2;n++){let c=((n-e)**2+(r-i)**2)/(a*a),l=(n%t+t)%t;o[r*t+l]-=s*Math.exp(-c*2)}}let g=se(Math.round(10*Math.max(1,r*2)),Math.round(n*.9),3),_=F(t,n,6,3,4,11),v=F(t,n,48,3,3,23),y=[.012,-.018,.006,-.01,.02,-.004],b=i.getContext(`2d`),x=a.getContext(`2d`),S=b.createImageData(t,n),C=x.createImageData(t,n);for(let e=0;e<n;e++){let i=(1-e/n)*B;for(let n=0;n<t;n++){let a=e*t+n,c=g(n/t*10*Math.max(1,r*2),e*.9)-.5,l=_(n,e)-.5,u=y[Math.floor((n/t*6+.5)%6)],d=z(.42,0,i)*(.45+.75*v(n,e)),f=z(.75,.15,i)*R(.5+l*2)*.35,p=R(s[a]),m=.78+c*.09+l*.06+u;m*=1-p*.45,m*=1-f*.25;let h=m,b=m*.985,x=m*.965,w=z(.16,.02,i);if(w>0){let e=R(i/.16),t=e>.5?.86:.48+e*.6,n=e>.5?.72:.45+e*.45,r=e>.5?.5:.7-e*.3;h+=(t*m-h)*w*.7,b+=(n*m-b)*w*.7,x+=(r*m-x)*w*.7}let T=R(d);h*=1-T*.78,b*=1-T*.8,x*=1-T*.82;let E=a*4;S.data[E]=R(h)*255,S.data[E+1]=R(b)*255,S.data[E+2]=R(x)*255,S.data[E+3]=255;let D=.27+Math.abs(c)*.16+f*.3+T*.5+p*.25+Math.max(0,l)*.08,O=1-T*.45;C.data[E]=255,C.data[E+1]=R(D)*255,C.data[E+2]=R(O)*255,C.data[E+3]=255,o[a]+=c*.025}}b.putImageData(S,0,0),x.putImageData(C,0,0);for(let i=0;i<(e?140:320);i++){let e=h()*t,i=n*(.15+h()*.85),a=(6+h()*40)*r,o=(h()-.5)*.9+(h()<.5?0:Math.PI);b.strokeStyle=`rgba(255,255,255,${.05+h()*.12})`,b.lineWidth=.6+h()*.8,b.beginPath(),b.moveTo(e,i),b.quadraticCurveTo(e+Math.cos(o)*a*.5,i+Math.sin(o)*a*.5+(h()-.5)*4,e+Math.cos(o)*a,i+Math.sin(o)*a),b.stroke(),x.strokeStyle=`rgba(255,${h()<.5?20:150},255,${.25+h()*.3})`,x.lineWidth=1,x.stroke()}for(let i=0;i<(e?30:70);i++){let e=h()*t,i=n*(.05+h()*.22),a=b.createLinearGradient(0,n,0,n-i);a.addColorStop(0,`rgba(18,14,12,${.25+h()*.35})`),a.addColorStop(1,`rgba(18,14,12,0)`),b.fillStyle=a,b.fillRect(e,n-i,(2+h()*8)*r,i)}return{map:L(i,!0),orm:L(a,!1),normal:L(ce(o,t,n,e?2.2:3.2),!1)}})}function ue(e){return N(`paint`+e,()=>{let t=e?256:512,n=I(t,t),r=I(t,t),i=F(t,t,8,8,4,41),a=F(t,t,64,64,2,43),o=n.getContext(`2d`),s=r.getContext(`2d`),c=o.createImageData(t,t),l=s.createImageData(t,t);for(let e=0;e<t;e++)for(let n=0;n<t;n++){let r=(e*t+n)*4,o=i(n,e),s=a(n,e),u=.9+(o-.5)*.12+(s-.5)*.04;c.data[r]=c.data[r+1]=c.data[r+2]=R(u)*255,c.data[r+3]=255;let d=.32+(o-.5)*.22+(s-.5)*.08;l.data[r]=255,l.data[r+1]=R(d)*255,l.data[r+2]=0,l.data[r+3]=255}o.putImageData(c,0,0),s.putImageData(l,0,0);let u=P(5);for(let n=0;n<(e?60:140);n++){let e=u()*t,n=u()*t,r=4+u()*22,i=u()*Math.PI;s.strokeStyle=`rgba(255,${120+u()*120},0,${.3+u()*.4})`,s.lineWidth=.7,s.beginPath(),s.moveTo(e,n),s.lineTo(e+Math.cos(i)*r,n+Math.sin(i)*r),s.stroke(),o.strokeStyle=`rgba(255,255,255,${.04+u()*.08})`,o.stroke()}return{map:L(n,!0,!0),rough:L(r,!1,!0)}})}function de(e){return N(`bell`+e,()=>{let t=e?256:512,n=e?64:128,r=e?72:120,i=I(t,n),a=new Float32Array(t*n),o=i.getContext(`2d`),s=o.createImageData(t,n),c=F(t,n,40,2,3,61),l=[[0,.2,.18,.3],[.25,.3,.36,.58],[.5,.62,.42,.26],[.75,.82,.68,.46],[1,.62,.6,.6]],u=e=>{for(let t=1;t<l.length;t++)if(e<=l[t][0]){let n=l[t-1],r=l[t],i=(e-n[0])/(r[0]-n[0]);return[n[1]+(r[1]-n[1])*i,n[2]+(r[2]-n[2])*i,n[3]+(r[3]-n[3])*i]}return[l[4][1],l[4][2],l[4][3]]};for(let e=0;e<n;e++){let i=u(1-e/n);for(let n=0;n<t;n++){let o=n/t*r%1,l=Math.sin(o*Math.PI);a[e*t+n]=l;let u=.75+c(n,e)*.4,d=.55+l*.45,f=(e*t+n)*4;s.data[f]=R(i[0]*u*d)*255,s.data[f+1]=R(i[1]*u*d)*255,s.data[f+2]=R(i[2]*u*d)*255,s.data[f+3]=255}}return o.putImageData(s,0,0),{map:L(i,!0),normal:L(ce(a,t,n,1.6),!1)}})}function fe(){return N(`cabin`,()=>{let e=I(256,256),t=e.getContext(`2d`),n=t.createRadialGradient(128,107.52,4,128,128,140.8);return n.addColorStop(0,`#ffd7a0`),n.addColorStop(.35,`#f08a3c`),n.addColorStop(.75,`#5a1e14`),n.addColorStop(1,`#140608`),t.fillStyle=n,t.fillRect(0,0,256,256),t.fillStyle=`rgba(20,8,10,0.85)`,t.beginPath(),t.moveTo(0,199.68),t.quadraticCurveTo(128,158.72,256,199.68),t.lineTo(256,256),t.lineTo(0,256),t.fill(),[`#5cf2ff`,`#ff2e88`,`#ffe066`,`#7dff9a`,`#5cf2ff`,`#ff8a3c`].forEach((e,n)=>{t.fillStyle=e,t.beginPath(),t.arc(256*(.28+n*.09),256*(.78-Math.sin(n/5*Math.PI)*.035),3.2,0,Math.PI*2),t.fill()}),t.fillStyle=`rgba(30,10,12,0.55)`,t.beginPath(),t.ellipse(128,153.6,33.28,51.2,0,Math.PI,0),t.fill(),L(e,!0)})}function V(e){return N(`smoke`+e,()=>{let t=e?128:256,n=t*2,r=I(n,n),i=r.getContext(`2d`),a=i.createImageData(n,n),o=P(99);for(let e=0;e<4;e++){let r=e%2*t,i=Math.floor(e/2)*t,s=new Float32Array(t*t),c=Array.from({length:14+Math.floor(o()*8)},()=>{let e=o()*Math.PI*2,t=o()*.2;return{x:.5+Math.cos(e)*t,y:.5+Math.sin(e)*t*.85,r:.09+o()*.16,w:.5+o()*.6}}),l=F(t,t,5,5,4,300+e*17),u=0;for(let e=0;e<t;e++)for(let n=0;n<t;n++){let r=n/t,i=e/t,a=0;for(let e of c){let t=((r-e.x)**2+(i-e.y)**2)/(e.r*e.r);t<4&&(a+=e.w*Math.exp(-t*1.6))}let o=Math.hypot(r-.5,i-.5);a*=z(.5,.28,o),a*=.55+l(n,e)*.9,s[e*t+n]=a,a>u&&(u=a)}for(let e=0;e<t;e++)for(let o=0;o<t;o++){let c=R(s[e*t+o]/u),l=((i+e)*n+r+o)*4,d=c**1.1*255;a.data[l]=d,a.data[l+1]=d,a.data[l+2]=d,a.data[l+3]=255}}i.putImageData(a,0,0);let s=new ie(r);return s.colorSpace=``,s})}function pe(e){return N(`concrete`+e,()=>{let t=e?256:512,n=I(t,t),r=I(t,t),i=F(t,t,6,6,5,501),a=F(t,t,96,96,1,503),o=n.getContext(`2d`),s=r.getContext(`2d`),c=o.createImageData(t,t),l=s.createImageData(t,t),u=t/2;for(let e=0;e<t;e++)for(let n=0;n<t;n++){let r=(e*t+n)*4,o=i(n,e),s=a(n,e),d=Math.min(n%u,u-n%u),f=Math.min(e%u,u-e%u),p=Math.min(d,f)<1.2?.45:1,m=(.34+(o-.5)*.22+(s>.78?.06:s<.22?-.05:0))*p;m=R(m),c.data[r]=m*255*1,c.data[r+1]=m*255*.98,c.data[r+2]=m*255*.95,c.data[r+3]=255,l.data[r]=255,l.data[r+1]=R(.82+(o-.5)*.2)*255,l.data[r+2]=0,l.data[r+3]=255}return o.putImageData(c,0,0),s.putImageData(l,0,0),{map:L(n,!0,!0),rough:L(r,!1,!0)}})}function me(){return N(`scorch`,()=>{let e=I(256,256),t=e.getContext(`2d`);t.fillStyle=`#fff`,t.fillRect(0,0,256,256);let n=P(77);for(let e=0;e<90;e++){let e=n()*Math.PI*2,r=n()*256*.3,i=128+Math.cos(e)*r,a=128+Math.sin(e)*r,o=10+n()*40,s=t.createRadialGradient(i,a,0,i,a,o);s.addColorStop(0,`rgba(25,18,14,${.12+n()*.16})`),s.addColorStop(1,`rgba(25,18,14,0)`),t.fillStyle=s,t.fillRect(i-o,a-o,o*2,o*2)}return L(e,!0)})}function H(){return N(`glow`,()=>{let e=I(128,128),t=e.getContext(`2d`),n=t.createRadialGradient(64,64,0,64,64,64);n.addColorStop(0,`rgba(255,255,255,1)`),n.addColorStop(.15,`rgba(255,255,255,0.55)`),n.addColorStop(.45,`rgba(255,255,255,0.12)`),n.addColorStop(1,`rgba(255,255,255,0)`),t.fillStyle=n,t.fillRect(0,0,128,128);let r=new ie(e);return r.colorSpace=C,r})}function U(){return N(`groundFade`,()=>{let e=I(256,256),t=e.getContext(`2d`),n=t.createRadialGradient(128,128,0,128,128,128);return n.addColorStop(0,`#fff`),n.addColorStop(.35,`#fff`),n.addColorStop(1,`#000`),t.fillStyle=n,t.fillRect(0,0,256,256),L(e,!1)})}var W=`
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
float fbm3(vec3 p) {
  float a = 0.5, s = 0.0;
  for (int i = 0; i < 3; i++) { s += a * snoise(p); p *= 2.03; a *= 0.5; }
  return s;
}
float fbm5(vec3 p) {
  float a = 0.5, s = 0.0;
  for (int i = 0; i < 5; i++) { s += a * snoise(p); p *= 2.01; a *= 0.5; }
  return s;
}
`,he=`
float hash12(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}
`,G=`
${W}
uniform float uTime;
uniform float uLen;
uniform float uR0;
uniform float uR1;
uniform float uTaper;
uniform float uTurb;
uniform float uSpeed;
uniform float uSeed;
uniform float uPinch;
uniform float uDiamonds;
varying float vH;
varying float vAng;
varying vec3 vN;
varying vec3 vView;
void main() {
  float h = clamp(-position.y, 0.0, 1.0);
  float ang = atan(position.z, position.x);
  float r = mix(uR0, uR1, smoothstep(0.0, 0.22, h));
  r *= 1.0 - pow(h, uTaper);
  float dia = 0.5 + 0.5 * cos(h * uDiamonds * 6.2831);
  r *= 1.0 - uPinch * dia * smoothstep(0.85, 0.0, h);
  float n = snoise(vec3(cos(ang) * 1.3 + uSeed, sin(ang) * 1.3, h * 3.5 * uLen - uTime * uSpeed));
  r *= 1.0 + n * uTurb * (0.3 + h * 1.4);
  vec3 p = vec3(cos(ang) * r, -h * uLen, sin(ang) * r);
  float sway = h * h * uLen * uTurb * 0.6;
  p.x += sin(uTime * 11.0 + h * 4.0 + uSeed) * sway;
  p.z += cos(uTime * 8.7 + h * 3.0 + uSeed) * sway;
  vH = h;
  vAng = ang;
  vec4 wp = modelMatrix * vec4(p, 1.0);
  vN = normalize(mat3(modelMatrix) * vec3(cos(ang), 0.0, sin(ang)));
  vView = normalize(cameraPosition - wp.xyz);
  gl_Position = projectionMatrix * viewMatrix * wp;
}`,ge=`
${W}
uniform float uTime;
uniform float uSeed;
uniform float uSpeed;
uniform float uLen;
uniform vec3 uC0;
uniform vec3 uC1;
uniform float uGain;
uniform float uAlpha;
uniform float uEdgePow;
uniform float uShock;
uniform float uDiamonds;
varying float vH;
varying float vAng;
varying vec3 vN;
varying vec3 vView;
void main() {
  float facing = abs(dot(normalize(vN), normalize(vView)));
  float dens = pow(facing, uEdgePow);
  float n = fbm3(vec3(cos(vAng) * 1.4 + uSeed, sin(vAng) * 1.4 + vH * 0.5, vH * 4.0 * uLen - uTime * uSpeed * 1.4));
  float along = pow(1.0 - vH, 1.25);
  float breakup = smoothstep(0.0, 0.4, (1.0 - vH) + n * 0.55 - 0.08);
  float I = dens * along * breakup * (0.6 + 0.8 * (n * 0.5 + 0.5));
  vec3 col = mix(uC0, uC1, smoothstep(0.0, 0.85, vH + (1.0 - facing) * 0.35 + n * 0.1));
  // Shock diamonds: bright pinched knots along the core at full thrust
  float dd = pow(0.5 + 0.5 * cos(vH * uDiamonds * 6.2831 + 3.14159), 10.0) * smoothstep(0.9, 0.05, vH) * uShock;
  I += dd * 1.4 * dens;
  col += vec3(1.3, 1.1, 0.9) * dd * 1.6;
  I *= 0.86 + 0.14 * sin(uTime * 61.0 + vH * 31.0 + uSeed * 7.0);
  gl_FragColor = vec4(col * I * uGain * uAlpha, 1.0);
}`;function _e(e,t=.27){let a=new i,o=[{frac:1.25,r0:t*1.08,r1:t*1.75,taper:1.6,turb:.22,speed:7,pinch:0,c0:new j(1.6,.62,.16),c1:new j(.7,.14,.05),gain:.55,edge:1.6},{frac:1,r0:t*.95,r1:t*1.25,taper:1.9,turb:.13,speed:10,pinch:.06,c0:new j(2.3,1.45,.55),c1:new j(1.5,.42,.08),gain:.9,edge:1.25},{frac:.6,r0:t*.62,r1:t*.7,taper:2.4,turb:.05,speed:14,pinch:.22,c0:new j(.85,1.15,2.3),c1:new j(2.3,1.75,.9),gain:1.2,edge:.9}],s=new n(1,1,1,e?20:32,e?26:44,!0);s.translate(0,-.5,0);let c=[];o.forEach((e,t)=>{let n=new A({vertexShader:G,fragmentShader:ge,transparent:!0,depthWrite:!1,blending:2,side:2,uniforms:{uTime:{value:0},uLen:{value:1},uR0:{value:e.r0},uR1:{value:e.r1},uTaper:{value:e.taper},uTurb:{value:e.turb},uSpeed:{value:e.speed},uSeed:{value:t*3.7},uPinch:{value:e.pinch},uDiamonds:{value:4.5},uC0:{value:e.c0},uC1:{value:e.c1},uGain:{value:e.gain},uAlpha:{value:1},uEdgePow:{value:e.edge},uShock:{value:0}}}),r=new x(s,n);r.renderOrder=3+t,r.frustumCulled=!1,a.add(r),c.push(n)});let l=new r({map:H(),color:new j(1.5,.9,.42),blending:2,depthWrite:!1,transparent:!0}),u=new h(l);u.position.y=-.08,u.renderOrder=6,a.add(u);let f=new r({map:H(),color:new j(1.2,.45,.12),blending:2,depthWrite:!1,transparent:!0,opacity:.6}),p=new h(f);return p.renderOrder=2,a.add(p),{group:a,update(e,t,n,r=0){let i=t>.02&&n>.01;if(a.visible=i,!i)return;let s=(.35+t*1.25)*(1+r),m=d.smoothstep(t,.9,1.35),h=.94+Math.sin(e*37)*.03+Math.sin(e*23.3)*.03;c.forEach((r,i)=>{let a=r.uniforms;a.uTime.value=e,a.uLen.value=s*o[i].frac*h,a.uAlpha.value=n*Math.min(1,t*3),a.uShock.value=i===2?m:0,a.uDiamonds.value=3.2+1.4/Math.max(.6,s*.6)});let g=Math.min(1.6,t)*n;u.scale.setScalar(.55+g*.55),l.opacity=Math.min(1,g*1.2)*h,p.position.y=-s*.35,p.scale.set(1.2+g*1.4,s*1.1,1),f.opacity=g*.45},dispose(){s.dispose(),c.forEach(e=>e.dispose()),l.dispose(),f.dispose()}}}var ve=11735580,ye=6949392;function K(e,t=64){return new _(e.map(([e,t])=>new a(e,t)),t)}var q=new re([[.4,0],[.47,.12],[.53,.42],[.56,.78],[.55,1.15],[.51,1.5],[.45,1.82],[.43,B]].map(([e,t])=>new s(e,t,0)),!1,`centripetal`).getPoints(400);function be(e){if(e<=q[0].y)return q[0].x;for(let t=1;t<q.length;t++)if(e<=q[t].y){let n=q[t-1],r=q[t];return n.x+(e-n.y)/(r.y-n.y||1)*(r.x-n.x)}return q[q.length-1].x}function J(t={}){let r=t.lite??(t.small||window.innerWidth<760||window.matchMedia(`(pointer: coarse)`).matches),l=t.flame??(t.small?.3:1),u=r?48:96,d=new i,f=new i;f.position.y=-.95,d.add(f);let h=le(r),_=ue(r),v=de(r);_.map.repeat.set(2,2),_.rough.repeat.set(2,2);let y=new D({color:16777215,map:h.map,metalness:1,metalnessMap:h.orm,roughness:1,roughnessMap:h.orm,normalMap:h.normal,normalScale:new a(.55,.55),anisotropy:r?0:.5,clearcoat:.25,clearcoatRoughness:.25}),b=new D({color:ve,map:_.map,roughness:1,roughnessMap:_.rough,metalness:.05,clearcoat:1,clearcoatRoughness:.05}),C=new D({color:ye,roughness:.45,metalness:.1,clearcoat:.8,clearcoatRoughness:.12}),w=new D({color:15329774,metalness:1,roughness:.12,clearcoat:.6,clearcoatRoughness:.05}),E=new te({color:16777215,map:v.map,normalMap:v.normal,metalness:.85,roughness:.38}),O=new te({color:1709074,roughness:.85,metalness:.3,emissive:16734746,emissiveIntensity:0,side:1}),ee=new D({color:460812,metalness:0,roughness:.03,clearcoat:1,clearcoatRoughness:.02,emissive:16777215,emissiveMap:fe(),emissiveIntensity:1,envMapIntensity:1.8}),k=new te({color:1315862,roughness:.7,metalness:.5}),ne=[y,b,C,w,E,O,ee,k],A=[];for(let e=0;e<=60;e++){let t=e/60*B;A.push([be(t),t])}
let PW=1.18,PH=2.95,PD=.26,PR=.2,pY=PH/2+.02;
const rr=(w,h,rad)=>{let S=new ae;S.moveTo(-w/2+rad,-h/2);S.lineTo(w/2-rad,-h/2);S.quadraticCurveTo(w/2,-h/2,w/2,-h/2+rad);S.lineTo(w/2,h/2-rad);S.quadraticCurveTo(w/2,h/2,w/2-rad,h/2);S.lineTo(-w/2+rad,h/2);S.quadraticCurveTo(-w/2,h/2,-w/2,h/2-rad);S.lineTo(-w/2,-h/2+rad);S.quadraticCurveTo(-w/2,-h/2,-w/2+rad,-h/2);return S};
let bodyG=new o(rr(PW,PH,PR),{depth:PD,bevelEnabled:!0,bevelThickness:.05,bevelSize:.045,bevelSegments:r?4:8,curveSegments:r?10:20});bodyG.translate(0,pY,-PD/2);
f.add(new x(bodyG,y));
let backG=new o(rr(PW-.06,PH-.06,PR-.03),{depth:.01,bevelEnabled:!1,curveSegments:r?10:20});backG.translate(0,pY,-PD/2-.035);f.add(new x(backG,b));
let sc=I(1024,2048),cx=sc.getContext("2d");cx.scale(4,4);let gr=cx.createLinearGradient(0,0,256,512);gr.addColorStop(0,"#2a0b3d");gr.addColorStop(.55,"#7a1f6e");gr.addColorStop(1,"#ff4f9a");cx.fillStyle=gr;cx.fillRect(0,0,256,512);
[["#ff5fa8",86,170],["#c86bff",136,170],["#9a4dff",86,220],["#ff8ad0",136,220]].forEach(([c,X0,Y0])=>{cx.fillStyle=c;cx.beginPath();cx.roundRect?cx.roundRect(X0-4,Y0-4,42,42,10):cx.rect(X0-4,Y0-4,42,42);cx.fill()});
cx.fillStyle="#fff";cx.textAlign="center";cx.font="900 30px "Helvetica Neue",Arial,sans-serif";cx.fillText("mobile app",128,320);cx.fillText("creative",128,352);cx.font="bold 15px Arial,sans-serif";cx.fillStyle="rgba(255,255,255,.75)";cx.fillText("MAKE IT MATTER",128,384);
cx.fillStyle="rgba(255,255,255,.18)";for(let k=0;k<4;k++){cx.beginPath();cx.arc(56+k*48,450,14,0,Math.PI*2);cx.fill()}
cx.fillStyle="#000";cx.beginPath();cx.roundRect?cx.roundRect(98,14,60,18,9):cx.rect(98,14,60,18);cx.fill();
let scTex=L(sc,!0);scTex.anisotropy=16;let SW=PW-.1,SH=PH-.12,scG=new o(rr(SW,SH,PR-.05),{depth:.004,bevelEnabled:!1,curveSegments:r?10:20});
{let e=scG.attributes.position,t=scG.attributes.uv;for(let n=0;n<e.count;n++)t.setXY(n,e.getX(n)/SW+.5,e.getY(n)/SH+.5)}
scG.translate(0,pY,PD/2+.03);let scM=new D({color:328965,roughness:.06,metalness:0,clearcoat:1,clearcoatRoughness:.03,emissive:16777215,emissiveMap:scTex,emissiveIntensity:.9});ne.push(scM);f.add(new x(scG,scM));
let camI=new i;camI.position.set(-PW/2+.24,pY+PH/2-.26,-PD/2-.04);let camB=new o(rr(.34,.34,.09),{depth:.03,bevelEnabled:!0,bevelThickness:.01,bevelSize:.01,bevelSegments:2});camB.translate(0,0,-.03);camI.add(new x(camB,C));
[[-.075,.075],[.075,.075],[-.075,-.075]].forEach(([X0,Y0])=>{let l=new x(new n(.055,.055,.04,24),w);l.rotation.x=Math.PI/2;l.position.set(X0,Y0,-.04);camI.add(l);let g2=new x(new p(.035,24),k);g2.rotation.y=Math.PI;g2.position.set(X0,Y0,-.061);camI.add(g2)});f.add(camI);
[[PW/2+.03,pY+.5,.32],[PW/2+.03,pY+.05,.2],[-PW/2-.03,pY+.4,.2]].forEach(([X0,Y0,hh])=>{let bt=new x(new n(.025,.025,hh,12),w);bt.position.set(X0,Y0,0);f.add(bt)});
let U=.165,W=.42,he=Math.asin(U/W),G=new m(W,40,8,0,Math.PI*2,0,he);G.rotateX(Math.PI/2),G.translate(0,0,-Math.cos(he)*W+.004);let ge=new x(G,ee);ge.visible=!1;let z=new i;z.position.set(0,pY+.2,PD/2+.04);z.add(ge);f.add(z);
let J=new i;for(let e=0;e<3;e++){let t=.3-e*.035,nn=new x(new c(t,.036,16,u),e%2?C:b);nn.rotation.x=Math.PI/2,nn.position.y=-.025-e*.07,J.add(nn)}let xe=[[.3,-.43],[.285,-.38],[.255,-.32],[.22,-.26],[.2,-.2],[.205,-.14]];J.add(new x(K(xe,u),E)),J.add(new x(K(xe.map(([e,t])=>[e-.012,t+.004]),u),O));let Y=new x(new c(.3,.008,8,u),w);Y.rotation.x=Math.PI/2,Y.position.y=-.43,J.add(Y),f.add(J);
let Q=_e(r,.29);Q.group.position.y=-.43,f.add(Q.group);let $=new T(16747050,0,t.small?1.2:7,1.6);$.position.y=-.85,f.add($);let Ce=new s(0,-1.38,0),we=1,Te=1;return{group:d,nozzle:Ce,porthole:z,portholeRadius:U,update(e,n,r=0){Q.update(e,n,we*l,r),$.intensity=n*we*l*(t.small?.15:1)*(5+Math.sin(e*40)*.45+Math.sin(e*17)*.3),O.emissiveIntensity=Math.min(1.6,n*1.1),ee.emissiveIntensity=Te*(.95+Math.sin(e*3.1)*.03),scM.emissiveIntensity=.85+Te*.25+Math.sin(e*2.3)*.04},setOpacity(e){we=e,ne.forEach(t=>{t.transparent=e<1,t.opacity=e}),d.visible=e>.01},setCabin(e){Te=e},setFlameIntensity(e){l=e},dispose(){d.traverse(e=>{let t=e;t.isMesh&&t.geometry.dispose()}),ne.forEach(e=>e.dispose()),Q.dispose()}}}var xe=class{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error(`THREE.Pass: .render() must be implemented in derived pass.`)}dispose(){}},Y=new y(-1,1,1,-1,0,1),X=new class extends ne{constructor(){super(),this.setAttribute(`position`,new l([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute(`uv`,new l([0,2,0,0,2,0],2))}},Z=class{constructor(e){this._mesh=new x(X,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,Y)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},Se={name:`CopyShader`,uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`},Q={name:`LuminosityHighPassShader`,uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new j(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`},$=class e extends xe{constructor(e,t=1,n,r){super(),this.strength=t,this.radius=n,this.threshold=r,this.resolution=e===void 0?new a(256,256):new a(e.x,e.y),this.clearColor=new j(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let i=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new u(i,o,{type:f,depthBuffer:!1}),this.renderTargetBright.texture.name=`UnrealBloomPass.bright`,this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let t=new u(i,o,{type:f,depthBuffer:!1});t.texture.name=`UnrealBloomPass.h`+e,t.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(t);let n=new u(i,o,{type:f,depthBuffer:!1});n.texture.name=`UnrealBloomPass.v`+e,n.texture.generateMipmaps=!1,this.renderTargetsVertical.push(n),i=Math.round(i/2),o=Math.round(o/2)}let c=Q;this.highPassUniforms=w.clone(c.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new A({uniforms:this.highPassUniforms,vertexShader:c.vertexShader,fragmentShader:c.fragmentShader}),this.separableBlurMaterials=[];let l=[6,10,14,18,22];i=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new a(1/i,1/o),i=Math.round(i/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;let d=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=d,this.bloomTintColors=[new s(1,1,1),new s(1,1,1),new s(1,1,1),new s(1,1,1),new s(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=w.clone(Se.uniforms),this.blendMaterial=new A({uniforms:this.copyUniforms,vertexShader:Se.vertexShader,fragmentShader:Se.fragmentShader,premultipliedAlpha:!0,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new j,this._oldClearAlpha=1,this._basic=new k,this._fsQuad=new Z(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let n=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(n,r);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(n,r),this.renderTargetsVertical[e].setSize(n,r),this.separableBlurMaterials[e].uniforms.invSize.value=new a(1/n,1/r),n=Math.round(n/2),r=Math.round(r/2)}render(t,n,r,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();let o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let s=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[n]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=e.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[n]),t.clear(),this._fsQuad.render(t),s=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(r),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(e){let t=[],n=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(n*n))/n);let r=[],i=[];for(let n=1;n<e;n+=2){let a=t[n],o=n+1<e?t[n+1]:0,s=a+o;r.push((n*a+(n+1)*o)/s),i.push(s)}return new A({defines:{KERNEL_PAIRS:r.length},uniforms:{colorTexture:{value:null},invSize:{value:new a(.5,.5)},direction:{value:new a(.5,.5)},centerWeight:{value:t[0]},gaussianOffsets:{value:r},gaussianWeights:{value:i}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float centerWeight;
				uniform float gaussianOffsets[KERNEL_PAIRS];
				uniform float gaussianWeights[KERNEL_PAIRS];

				void main() {

					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * centerWeight;

					for ( int i = 0; i < KERNEL_PAIRS; i ++ ) {

						vec2 uvOffset = direction * invSize * gaussianOffsets[ i ];
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * gaussianWeights[ i ];

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new A({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}};$.BlurDirectionX=new a(1,0),$.BlurDirectionY=new a(0,1);var Ce=new a(1,0),we=new a(0,1),Te=720,Ee=`
uniform sampler2D tDiffuse;
uniform float luminosityThreshold;
uniform float smoothWidth;
uniform vec2 uTap;
varying vec2 vUv;
vec4 tap(vec2 uv) {
  // Finite and non-negative: one NaN or Inf texel (an old driver's bad pixel) would otherwise
  // be smeared over the whole screen by the blur. max() first: D3D maps max(NaN, 0) to 0.
  vec4 t = min(max(texture2D(tDiffuse, uv), 0.0), 4096.0);
  float v = dot(t.rgb, vec3(0.299, 0.587, 0.114));
  return t * smoothstep(luminosityThreshold, luminosityThreshold + smoothWidth, v);
}
void main() {
  gl_FragColor = 0.25 * (tap(vUv + uTap * vec2(-1.0, -1.0)) + tap(vUv + uTap * vec2(1.0, -1.0)) + tap(vUv + uTap * vec2(-1.0, 1.0)) + tap(vUv + uTap * vec2(1.0, 1.0)));
}`,De=class extends ${constructor(e,t,n,r){super(e,t,n,r),this.materialHighPassFilter.dispose(),this.materialHighPassFilter=new A({uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:r},smoothWidth:{value:.01},uTap:{value:new a(.001,.001)}},vertexShader:`varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,fragmentShader:Ee,depthTest:!1,depthWrite:!1}),this.highPassUniforms=this.materialHighPassFilter.uniforms}get hp(){return this.highPassUniforms}get texture(){return this.renderTargetsHorizontal[0].texture}setSize(e,t){let n=Te,r=Math.max(4,Math.round(n*e/Math.max(1,t)));super.setSize(r,n);let i=Math.round(r/2),a=Math.round(n/2);this.hp.uTap.value.set(.25/i,.25/a)}materials(){return[this.materialHighPassFilter,...this.separableBlurMaterials,this.compositeMaterial]}renderBloom(e,t){let n=this,r=n._fsQuad;e.getClearColor(n._oldClearColor),n._oldClearAlpha=e.getClearAlpha();let i=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),this.hp.tDiffuse.value=t.texture,this.hp.luminosityThreshold.value=this.threshold,r.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),r.render(e);let a=this.renderTargetBright;for(let t=0;t<this.nMips;t++){let n=this.separableBlurMaterials[t];r.material=n,n.uniforms.colorTexture.value=a.texture,n.uniforms.direction.value=Ce,e.setRenderTarget(this.renderTargetsHorizontal[t]),e.clear(),r.render(e),n.uniforms.colorTexture.value=this.renderTargetsHorizontal[t].texture,n.uniforms.direction.value=we,e.setRenderTarget(this.renderTargetsVertical[t]),e.clear(),r.render(e),a=this.renderTargetsVertical[t]}r.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),r.render(e),e.setClearColor(n._oldClearColor,n._oldClearAlpha),e.autoClear=i}},Oe=`
precision highp float;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
attribute vec3 position;
attribute vec2 uv;
varying vec2 vUv;
void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,ke=`
precision highp float;
uniform sampler2D tDiffuse;
uniform sampler2D tBloom;
uniform vec2 uRes;
varying vec2 vUv;
#include <tonemapping_pars_fragment>
#include <colorspace_pars_fragment>
vec3 hdr(vec2 uv) { return min(max(texture2D(tDiffuse, uv).rgb, 0.0), 4096.0) + min(max(texture2D(tBloom, uv).rgb, 0.0), 4096.0); }
vec3 display(vec3 c) { return sRGBTransferOETF(vec4(ACESFilmicToneMapping(c), 1.0)).rgb; }
`;function Ae(e,t,n,r){let i=r.maxSamples??4,o=new u(2,2,{type:f,samples:0}),s=new De(new a(256,256),r.bloom.strength,r.bloom.radius,r.bloom.threshold),c=/[?&]perf\b.*[?&]knee=([\d.]+)|[?&]knee=([\d.]+).*[?&]perf\b/.exec(location.search),l=c?parseFloat(c[1]??c[2]):r.bloom.knee??0;s.threshold=r.bloom.threshold-l/2,s.hp.smoothWidth.value=Math.max(.01,l);let d={tDiffuse:{value:o.texture},tBloom:{value:s.texture},uRes:{value:new a(1,1)},toneMappingExposure:{value:e.toneMappingExposure},...r.uniforms??{}},p=new ee({vertexShader:Oe,fragmentShader:ke+r.finalFrag,uniforms:d,depthTest:!1,depthWrite:!1}),m=new Z(p),h=new a,g=0,_=0,y=0,S=()=>{e.getSize(h);let t=e.getPixelRatio();if(h.x===g&&h.y===_&&t===y)return;g=h.x,_=h.y,y=t;let n=Math.max(1,Math.round(g*t)),r=Math.max(1,Math.round(_*t));o.setSize(n,r),s.setSize(n,r),d.uRes.value.set(n,r)},C=()=>{S(),d.toneMappingExposure.value=e.toneMappingExposure,d.tBloom.value=s.texture,e.setRenderTarget(o),e.render(t,n),s.renderBloom(e,o),e.setRenderTarget(null);let r=e.autoClear;e.autoClear=!1,m.render(e),e.autoClear=r},w=async()=>{S();let t=new v,r=new b(2,2);for(let e of[...s.materials(),p]){let n=new x(r,e);n.frustumCulled=!1,t.add(n)}await O(e,t,n),r.dispose()};return{render:C,bloom:s,target:o,warmAsync:w,compileAsync:async()=>{S();let r=e.getRenderTarget();e.setRenderTarget(o);let i=O(e,t,n);e.setRenderTarget(r),await i,await w()},primeObjects:async r=>{S();let i=new u(4,4,{type:f}),a=[];t.traverse(e=>{let t=e;(t.isMesh||t.isPoints||t.isLine||t.isSprite)&&a.push(e)});let o=a.map(e=>e.visible),s=a.map(e=>e.frustumCulled),c=new Set,l=e.getRenderTarget();for(let u of a){let d=u.material,f=Array.isArray(d)?d:[d];f.every(e=>c.has(e))||(f.forEach(e=>c.add(e)),a.forEach(e=>e.visible=e===u),u.frustumCulled=!1,e.setRenderTarget(i),e.render(t,n),e.setRenderTarget(l),a.forEach((e,t)=>{e.visible=o[t],e.frustumCulled=s[t]}),await r())}i.dispose()},prime:()=>{let r=new u(16,16,{type:f}),i=e.getRenderTarget();e.setRenderTarget(r),e.render(t,n),e.setRenderTarget(i),r.dispose()},primeBloom:()=>{S();let t=e.getRenderTarget();s.renderBloom(e,o),e.setRenderTarget(t)},uniforms:d,setQuality:e=>{let t=Math.min(i,e.samples);t!==o.samples&&(o.samples=t,o.dispose())},dispose:()=>{o.dispose(),s.dispose(),p.dispose(),m.dispose()}}}export{pe as a,oe as c,W as i,me as l,J as n,H as o,he as r,U as s,Ae as t,V as u};