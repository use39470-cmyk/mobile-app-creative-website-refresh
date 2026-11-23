import{c as e,i as t,l as n,s as r,u as i}from"./audio.BVyMN1l2.js";import{$ as a,At as o,D as s,E as c,Et as l,H as u,L as d,Mt as f,Nt as p,Pt as m,Q as h,S as g,St as _,Tt as v,U as y,V as b,X as x,_ as ee,_t as te,at as ne,c as re,ct as ie,d as ae,dt as oe,et as S,ft as se,g as ce,ht as le,i as ue,k as de,l as fe,lt as C,m as pe,mt as me,n as w,ot as he,r as ge,rt as _e,s as ve,tt as T,ut as E,v as ye,vt as D,w as O,x as k,z as be}from"./core.DZalETXP.js";import{a as xe,c as Se,i as Ce,l as we,n as Te,o as A,r as Ee,s as De,t as Oe,u as ke}from"./pipeline.B4lFK_c5.js";var Ae=.22,j=.34,M=null,je={};function Me(e,t,n){let r=Math.floor(e.sampleRate*t),i=Math.floor(e.sampleRate*.25),a=e.createBuffer(2,r,e.sampleRate);for(let e=0;e<2;e++){let t=a.getChannelData(e),o=new Float32Array(r+i),s=0;for(let e=0;e<o.length;e++){let t=Math.random()*2-1;n?(s=(s+.02*t)/1.02,o[e]=s*3.5):o[e]=t}for(let e=0;e<r;e++)t[e]=e<i?o[e]*(e/i)+o[r+e]*(1-e/i):o[e]}return a}function Ne(e,t=2.2){let n=Math.floor(e.sampleRate*t),r=e.createBuffer(2,n,e.sampleRate);for(let e=0;e<2;e++){let t=r.getChannelData(e),i=0;for(let e=0;e<n;e++){let r=e/n,a=.55-.45*r;i+=a*(Math.random()*2-1-i),t[e]=i*(1-r)**2.4*(e<400?e/400:1)}}return r}function Pe(){let e=1024,t=new Float32Array(e);for(let n=0;n<e;n++){let e=n/1023*2-1;t[n]=Math.tanh(2.2*e)/Math.tanh(2.2)}return t}var N=()=>e()&&!document.hidden;function Fe(e){let t=e.createGain();t.gain.value=Ae;let n=e.createBiquadFilter();n.type=`highpass`,n.frequency.value=28,n.Q.value=.6;let r=e.createDynamicsCompressor();r.threshold.value=-18,r.knee.value=8,r.ratio.value=3,r.attack.value=.012,r.release.value=.3;let i=e.createDynamicsCompressor();i.threshold.value=-6,i.knee.value=0,i.ratio.value=20,i.attack.value=.001,i.release.value=.12;let a=e.createGain();a.gain.value=N()?j:0,t.connect(n).connect(r).connect(i).connect(a).connect(e.destination);let o=e.createGain(),s=e.createConvolver();s.buffer=Ne(e);let c=e.createGain();c.gain.value=.55,o.connect(s).connect(c).connect(t);let l={c:e,in:t,room:o,out:a,white:Me(e,2,!1),brown:Me(e,4,!0),curve:Pe()};return document.addEventListener(`visibilitychange`,()=>{l.out.gain.setTargetAtTime(N()?j:0,e.currentTime,document.hidden?.05:.3),document.hidden||Xe(!0)}),l}function Ie(){if(!N())return null;let e=r();if(!e)return null;if(!M||M.c!==e){for(let e in je)delete je[e];V=null,Ge=-1,H=null,M=Fe(e)}return M}var Le=[];function Re(t){e()||!n()||document.hidden||Le.length>4||Le.push({run:t,at:performance.now()})}function ze(e,t,n){let r=e.c.currentTime;return r-(je[t]??-1e9)<n?!1:(je[t]=r,!0)}function P(e,t,n,r,i=1){let a=e.c.createBufferSource();return a.buffer=t,a.loop=!0,a.playbackRate.value=i,a.start(n,Math.random()*(t.duration-.5)),a.stop(n+r),a}function F(e,t,n,r=.7){let i=e.c.createBiquadFilter();return i.type=t,i.frequency.value=n,i.Q.value=r,i}function I(e,t=0){let n=e.c.createGain();return n.gain.value=t,n}function L(e,t,n,r,i,a=0){let o=e.c.createOscillator();return o.type=t,o.frequency.value=n,o.detune.value=a,o.start(r),o.stop(r+i),o}function R(e,t){let n=I(e,t),r=e.c.createWaveShaper();return r.curve=e.curve,r.oversample=`2x`,n.connect(r),{in:n,out:r}}function z(e,t,n,r=!1){e.setValueAtTime(n[0][1],t+n[0][0]);for(let i=1;i<n.length;i++){let[a,o]=n[i];r||o===0||n[i-1][1]===0?e.linearRampToValueAtTime(o,t+a):e.exponentialRampToValueAtTime(o,t+a)}}function Be(e,t,n,r,i,a){e.setValueAtTime(0,t);let o=t;for(let s=0;s<400;s++){let s=(o-t)/(n-t);if(o+=-Math.log(1-Math.random())/Math.max(.5,r(s)),o>=n)break;let c=i((o-t)/(n-t))*(.3+.7*Math.random());e.setValueAtTime(c,o),e.setTargetAtTime(0,o+5e-4,a*(.6+.8*Math.random()))}}function B(e,t){let n=10**(t/20),r=I(e,n),i=I(e,n);return r.connect(e.in),i.connect(e.room),{in:r,room:i}}var Ve=(e,t,n)=>Math.min(n,Math.max(t,e));function He(e=2.2){let n=Ie();if(!n)return Re(t=>He(Math.max(.6,(Number(e)||2.2)-t)));if(!ze(n,`ignition`,1.2))return;let r=B(n,-4),i=Ve(Number(e)||2.2,.6,8),a=n.c.currentTime+.02,o=2.4;t(-6,i+.6,.6,1.8);let s=P(n,n.white,a,i+.4),c=F(n,`highpass`,1600,.5),l=F(n,`peaking`,3200,1);l.gain.value=4;let u=I(n);Be(u.gain,a,a+i*.95,e=>5+45*e,e=>.1*(.4+.6*e)*(e>.8?(1-e)*5:1),.007),s.connect(c).connect(l).connect(u).connect(r.in),u.connect(r.room);let d=P(n,n.white,a,i+.6),f=F(n,`lowpass`,420,.9),p=I(n);Be(p.gain,a,a+i*.85,e=>2+10*e,e=>.55*(.5+.5*e),.045),d.connect(f).connect(p).connect(r.in);let m=P(n,n.brown,a,i+o+.1),h=F(n,`lowpass`,90,.9);z(h.frequency,a,[[0,90],[i,560],[i+.5,520],[i+o,160]]);let g=I(n);z(g.gain,a,[[0,1e-4],[i*.3,.05],[i,.62],[i+.5,.58],[i+o,1e-4]]),m.connect(h).connect(g).connect(r.in),g.connect(r.room);let _=P(n,n.white,a,i+o),v=F(n,`lowpass`,1400,.5),y=I(n);z(y.gain,a,[[0,1e-4],[i*.5,.001],[i,.04],[i+.5,.035],[i+o-.4,1e-4]]),_.connect(v).connect(y).connect(r.in);let b=L(n,`sine`,34,a,i+o),x=L(n,`sine`,37,a,i+o);z(b.frequency,a,[[0,34],[i,46]]),z(x.frequency,a,[[0,37],[i,49.5]]);let ee=R(n,1.6),te=F(n,`lowpass`,260,.7),ne=I(n);z(ne.gain,a,[[0,1e-4],[i*.25,1e-4],[i,.34],[i+.5,.32],[i+o,1e-4]]),b.connect(ee.in),x.connect(ee.in),ee.out.connect(te).connect(ne).connect(r.in)}function Ue(){let e=Ie();if(!e)return Re(()=>Ue());if(!ze(e,`liftoff`,2))return;let n=B(e,-3),r=e.c.currentTime+.02,i=4.8;t(-4.5,2.4,.3,2.2);let a=P(e,e.brown,r,4.8999999999999995),o=F(e,`lowpass`,600,.8);z(o.frequency,r,[[0,600],[.6,1300],[1.4,900],[i,130]]);let s=I(e);z(s.gain,r,[[0,.25],[.45,.8],[1.1,.7],[i,1e-4]]),a.connect(o).connect(s).connect(n.in),s.connect(n.room);let c=P(e,e.white,r,i),l=F(e,`bandpass`,2400,.6);z(l.frequency,r,[[0,2400],[.6,2800],[i,450]]);let u=I(e);z(u.gain,r,[[0,.01],[.5,.06],[1.2,.04],[3.4,1e-4]]),c.connect(l).connect(u).connect(n.in),u.connect(n.room);let d=P(e,e.white,r,3),f=F(e,`highpass`,2e3,.5),p=I(e);Be(p.gain,r,r+2.8,e=>40*(1-e)+3,e=>.07*(1-e),.006),d.connect(f).connect(p).connect(n.in);let m=L(e,`sine`,52,r,3.4),h=L(e,`sine`,55,r,3.4);z(m.frequency,r,[[0,52],[2.6,30]]),z(h.frequency,r,[[0,55],[2.6,32]]);let g=R(e,1.8),_=I(e);z(_.gain,r,[[0,1e-4],[.15,.36],[.8,.28],[3.3,1e-4]]),m.connect(g.in),h.connect(g.in),g.out.connect(F(e,`lowpass`,240,.7)).connect(_).connect(n.in)}var V=null,We=0,Ge=-1,Ke=0,qe=.125;function Je(e){let t=e.c,n=t.currentTime,r=t.createBufferSource();r.buffer=e.brown,r.loop=!0,r.start(n,Math.random()*3);let i=F(e,`highpass`,40,.6),a=F(e,`lowpass`,160,.8),o=I(e,0),s=t.createOscillator();s.frequency.value=.11;let c=I(e,35);s.connect(c).connect(a.frequency);let l=t.createOscillator();l.frequency.value=.29;let u=I(e,0);return l.connect(u).connect(o.gain),s.start(n),l.start(n),r.connect(i).connect(a).connect(o).connect(e.in),{srcs:[r,s,l],lp:a,g:o,flutter:u}}function Ye(){if(!V)return;let e=V;V=null,Ge=-1;let t=e.g.context.currentTime;e.g.gain.cancelScheduledValues(t),e.g.gain.setTargetAtTime(0,t,.15),e.flutter.gain.setTargetAtTime(0,t,.15),setTimeout(()=>{e.srcs.forEach(e=>e.stop()),e.g.disconnect()},1200)}function Xe(e=!1){let t=Ie();if(!t)return;let n=We;if(!e&&Math.abs(n-Ge)<.01&&(n!==0||Ge===0)){n===0&&V&&t.c.currentTime-Ke>2&&Ye();return}if(n===0&&!V)return;V||=Je(t);let r=t.c.currentTime,i=qe*n;V.g.gain.setTargetAtTime(i,r,.35),V.flutter.gain.setTargetAtTime(i*.18,r,.35),V.lp.frequency.setTargetAtTime(140+300*n,r,.4),n===0&&Ge!==0&&(Ke=r),Ge=n}function Ze(t){We=t>0?t<1?t:1:0,e()&&Xe()}i(e=>{let t=Le.splice(0);if(e){let e=Ie();e&&e.out.gain.setTargetAtTime(j,e.c.currentTime,.3),Xe(!0);let n=performance.now();for(let e of t){let t=(n-e.at)/1e3;t<2.5&&e.run(t)}}else M&&(M.out.gain.setTargetAtTime(0,M.c.currentTime,.2),Ye())});function Qe(e=.5){let t=Ie();if(!t||!ze(t,`whoosh`,.5))return;let n=B(t,6),r=Ve(Number(e)||0,0,1),i=t.c.currentTime+.01,a=.8+.7*r,o=a*.45,s=Math.random()<.5?-1:1,c=P(t,t.white,i,a+.05),l=F(t,`bandpass`,320,1.1);z(l.frequency,i,[[0,320],[o,800+1400*r],[a,380]]);let u=t.c.createStereoPanner();z(u.pan,i,[[0,-.65*s],[a,.65*s]],!0);let d=I(t);z(d.gain,i,[[0,0],[o,.06+.12*r],[a,0]],!0),c.connect(l).connect(d).connect(u).connect(n.in),u.connect(n.room);let f=P(t,t.brown,i,a+.05),p=F(t,`lowpass`,300,.7),m=I(t);z(m.gain,i,[[0,0],[o,.08+.12*r],[a,0]],!0),f.connect(p).connect(m).connect(n.in)}function $e(){let e=Ie();if(!e||!ze(e,`cloud`,1))return;let t=B(e,7.5),n=e.c.currentTime+.01,r=1.9,i=P(e,e.white,n,r),a=F(e,`lowpass`,500,.6);z(a.frequency,n,[[0,500],[.12,2600],[r,300]]);let o=I(e);z(o.gain,n,[[0,0],[.08,.1],[.3,.06],[r,1e-4]]),i.connect(a).connect(o).connect(t.in),o.connect(t.room);let s=P(e,e.brown,n,r),c=F(e,`lowpass`,280,.7),l=I(e);z(l.gain,n,[[0,0],[.06,.45],[r*.7,1e-4]]),s.connect(c).connect(l).connect(t.in);let u=L(e,`sine`,82,n,.7);z(u.frequency,n,[[0,82],[.35,40]]);let d=R(e,1.2),f=I(e);z(f.gain,n,[[0,0],[.01,.22],[.6,1e-4]]),u.connect(d.in),d.out.connect(f).connect(t.in)}var H=null;function et(){let e=Ie();if(!e||!ze(e,`warp`,1))return;let n=B(e,3),r=e.c.currentTime+.01,i=1.25,a=r+i+.35;t(-4,i,.8,1.4);let o=I(e,1);o.connect(n.in),o.connect(n.room);let s=[],c=F(e,`lowpass`,300,5);z(c.frequency,r,[[0,300],[i,5200]]);let l=I(e);z(l.gain,r,[[0,.0015],[i,.05],[1.55,1e-4]]);for(let t of[-11,0,11]){let n=L(e,`sawtooth`,110,r,1.6,t);z(n.frequency,r,[[0,110],[i,880]]),n.connect(c),s.push(n)}c.connect(l).connect(o);let u=P(e,e.white,r,1.6),d=F(e,`bandpass`,3500,2.5);z(d.frequency,r,[[0,3500],[i,9500]]);let f=I(e,.5),p=L(e,`sine`,9,r,1.6);z(p.frequency,r,[[0,9],[i,26]]);let m=I(e,.5);p.connect(m).connect(f.gain);let h=I(e);z(h.gain,r,[[0,.002],[i,.11],[1.55,1e-4]]),u.connect(d).connect(f).connect(h).connect(o),s.push(u,p);let g=L(e,`sine`,38,r,1.6);z(g.frequency,r,[[0,38],[i,58]]);let _=R(e,1.4),v=I(e);z(v.gain,r,[[0,1e-4],[i,.2],[1.55,1e-4]]),g.connect(_.in),_.out.connect(v).connect(o),s.push(g),H={g:o,srcs:s,end:a}}function tt(){let e=Ie();if(!e||!ze(e,`drop`,1))return;let n=B(e,-2),r=e.c.currentTime+.01;H&&H.end>r&&(H.g.gain.setTargetAtTime(0,r,.025),H.srcs.forEach(e=>e.stop(r+.25))),H=null,t(-6,.5,.03,2.4);let i=L(e,`sine`,68,r,2.8);z(i.frequency,r,[[0,68],[1.2,26]]);let a=R(e,2.2),o=F(e,`lowpass`,200,.7),s=I(e);z(s.gain,r,[[0,0],[.008,.5],[.35,.32],[2.7,1e-4]]),i.connect(a.in),a.out.connect(o).connect(s).connect(n.in),s.connect(n.room);let c=P(e,e.brown,r,1.4),l=F(e,`lowpass`,420,.8);z(l.frequency,r,[[0,420],[1.2,110]]);let u=I(e);z(u.gain,r,[[0,0],[.01,.6],[1.3,1e-4]]),c.connect(l).connect(u).connect(n.in),u.connect(n.room);let d=P(e,e.white,r,.5),f=F(e,`lowpass`,2400,.6),p=I(e);z(p.gain,r,[[0,0],[.004,.06],[.4,1e-4]]),d.connect(f).connect(p).connect(n.in),p.connect(n.room)}function nt(){let e=Ie();if(!e||!ze(e,`land`,1.5))return;let t=B(e,6),n=e.c.currentTime+.01,r=L(e,`sine`,96,n,1);z(r.frequency,n,[[0,96],[.25,48]]);let i=R(e,1.1),a=I(e);z(a.gain,n,[[0,0],[.012,.26],[.9,1e-4]]),r.connect(i.in),i.out.connect(a).connect(t.in);let o=P(e,e.brown,n,.8),s=F(e,`lowpass`,360,.7),c=I(e);z(c.gain,n,[[0,0],[.02,.3],[.7,1e-4]]),o.connect(s).connect(c).connect(t.in);let l=P(e,e.white,n,2.8),u=F(e,`bandpass`,7200,1.6),d=I(e);z(d.gain,n,[[0,0],[.3,.035],[2.7,0]],!0),l.connect(u).connect(d).connect(t.in),d.connect(t.room);let f=I(e,1);f.connect(t.in),f.connect(t.room);for(let t=0;t<12;t++){let t=n+.08+Math.random()**1.6*1.6,r=L(e,`sine`,3200+Math.random()*4800,t,.4),i=e.c.createStereoPanner();i.pan.value=Math.random()*1.6-.8;let a=I(e);z(a.gain,t,[[0,0],[.003,.012+Math.random()*.012],[.35,1e-5]]),r.connect(a).connect(i).connect(f)}}var U=`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,rt=`
uniform vec3 uTop;
uniform vec3 uMid;
uniform vec3 uHorizon;
uniform vec3 uGround;
uniform vec3 uSunDir;
uniform vec3 uSunCol;
varying vec3 vDir;
void main() {
  vec3 d = normalize(vDir);
  float e = d.y;
  vec3 c = e > 0.0 ? mix(uHorizon, uMid, smoothstep(0.0, 0.25, e)) : mix(uHorizon, uGround, smoothstep(0.0, 0.12, -e));
  if (e > 0.25) c = mix(uMid, uTop, smoothstep(0.25, 0.9, e));
  float s = max(dot(d, normalize(uSunDir)), 0.0);
  c += uSunCol * (pow(s, 6.0) * 0.6 + pow(s, 120.0) * 6.0);
  gl_FragColor = vec4(c, 1.0);
}`;function W(e,t,n,r,i,a=[0,0,0]){let o=new S(new ie(e,t),new T({color:new O(n).multiplyScalar(r),side:2}));return o.position.set(...i),o.lookAt(...a),o}function it(e,t){let n=new te,r=t===`dusk`,i=new S(new _(50,48,24),new D({vertexShader:U,fragmentShader:rt,side:1,depthWrite:!1,uniforms:r?{uTop:{value:new O(.01,.02,.06)},uMid:{value:new O(.04,.08,.2)},uHorizon:{value:new O(.9,.38,.16)},uGround:{value:new O(.04,.035,.04)},uSunDir:{value:new p(-.5,.06,-1)},uSunCol:{value:new O(3,1.5,.6)}}:{uTop:{value:new O(.02,.02,.05)},uMid:{value:new O(.04,.035,.09)},uHorizon:{value:new O(.12,.06,.16)},uGround:{value:new O(.01,.01,.02)},uSunDir:{value:new p(.55,.3,-1)},uSunCol:{value:new O(2.4,2.2,2)}}}));n.add(i),r?(n.add(W(3,1.5,16052714,1.6,[10,16,20])),n.add(W(8,3,12374271,.7,[-14,18,6])),n.add(W(24,2,16751186,1.4,[-10,1.5,-26])),n.add(W(2.5,14,16777215,1.1,[22,6,-4])),n.add(W(2.5,14,16767152,.8,[-22,6,8]))):(n.add(W(16,10,16773600,2.4,[-14,16,12])),n.add(W(4,22,10138879,2.2,[22,2,-6])),n.add(W(14,3,16723592,1.6,[6,-16,8])),n.add(W(20,2,16777215,.9,[0,3,26])));let a=new pe(e),o=a.fromScene(n,.02);return a.dispose(),n.traverse(e=>{let t=e;t.isMesh&&(t.geometry.dispose(),t.material.dispose())}),o.texture}var at={value:new a},ot=`
uniform mat4 uProj;
varying vec3 vDir;
void main() {
  vDir = position;
  vec4 p = uProj * modelViewMatrix * vec4(position, 1.0);
  gl_Position = p.xyww;
}`,st=`
${Ce}
varying vec2 vUv;
void main() {
  float lon = (vUv.x - 0.5) * 6.28318530718;
  float lat = (vUv.y - 0.5) * 3.14159265359;
  vec3 d = vec3(cos(lat) * cos(lon), sin(lat), cos(lat) * sin(lon));
  vec3 sp = vec3(0.004, 0.004, 0.01);
  float n1 = fbm5(d * 2.2);
  float n2 = fbm3(d * 5.0 + 3.1);
  float band = exp(-pow(dot(d, normalize(vec3(0.3, 0.8, -0.5))) * 2.6, 2.0));
  float neb = smoothstep(-0.15, 0.6, n1) * (0.35 + band * 0.9);
  sp += vec3(0.16, 0.035, 0.12) * neb * neb * 0.55;
  sp += vec3(0.04, 0.07, 0.2) * smoothstep(0.0, 0.7, n2) * band * 0.35;
  sp += vec3(0.26, 0.05, 0.16) * pow(max(n1 * n2, 0.0), 1.5) * band * 0.6;
  gl_FragColor = vec4(sqrt(clamp(sp, 0.0, 1.0)), 1.0);
}`,ct=`
${Ee}
uniform float uAlt;      // 0 = ground at dusk, 1 = space
uniform vec3 uSunDir;
uniform float uSunBoost;
uniform float uTime;
uniform float uFlash;
uniform sampler2D tNebula;
varying vec3 vDir;
void main() {
  vec3 d = normalize(vDir);
  float e = d.y;
  float s = max(dot(d, normalize(uSunDir)), 0.0);
  float spaceK = smoothstep(0.55, 1.0, uAlt);
  vec3 atm = vec3(0.0);
  if (spaceK < 1.0) {
    // Dusk atmosphere
    vec3 zenith = vec3(0.005, 0.01, 0.035);
    vec3 mid = vec3(0.022, 0.05, 0.14);
    vec3 glowBand = vec3(0.32, 0.2, 0.3);
    vec3 hor = vec3(0.85, 0.34, 0.12);
    vec3 ground = vec3(0.012, 0.011, 0.016);
    atm = mix(hor, glowBand, smoothstep(0.0, 0.07, e));
    atm = mix(atm, mid, smoothstep(0.05, 0.3, e));
    atm = mix(atm, zenith, smoothstep(0.3, 0.9, e));
    float haze = exp(-abs(e) * 30.0);
    atm = e < 0.0 ? mix(ground, hor * 0.45, haze) : atm;
    atm += vec3(1.0, 0.42, 0.15) * (pow(s, 6.0) * 0.35 + pow(s, 60.0) * 0.5) * (1.0 - smoothstep(0.0, 0.35, e));
    atm += vec3(2.4, 1.2, 0.55) * pow(s, 1400.0) * 2.5;
    // As we climb, the sky thins to violet then black
    vec3 thin = mix(vec3(0.02, 0.02, 0.07), vec3(0.08, 0.05, 0.18), exp(-abs(e - 0.0) * 6.0));
    atm = mix(atm, thin, smoothstep(0.35, 0.8, uAlt));
  }
  vec3 sp = vec3(0.0);
  if (spaceK > 0.0) {
    // Deep space with a nebula (baked), and the sun: white core, a soft warm halo
    vec2 uv = vec2(atan(d.z, d.x) / 6.28318530718 + 0.5, asin(clamp(e, -1.0, 1.0)) / 3.14159265359 + 0.5);
    vec3 nb = texture2D(tNebula, uv).rgb;
    sp = nb * nb;
    sp += (vec3(1.6, 1.45, 1.3) * pow(s, 2400.0) * 9.0 + vec3(1.6, 1.25, 0.9) * pow(s, 120.0) * 0.1 + vec3(1.5, 1.05, 0.7) * pow(s, 14.0) * 0.007) * uSunBoost;
  }
  vec3 c = mix(atm, sp, spaceK);
  c += vec3(1.0) * uFlash;
  c += (hash12(gl_FragCoord.xy + uTime) - 0.5) / 255.0;
  gl_FragColor = vec4(c, 1.0);
}`;function lt(e){let t=new m(2048,1024,{depthBuffer:!1,generateMipmaps:!1,minFilter:x,magFilter:x,wrapS:me}),n=new D({vertexShader:`varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`,fragmentShader:st,depthTest:!1,depthWrite:!1}),r=new S(new ie(2,2),n);r.frustumCulled=!1;let i=new te().add(r),a=new ne(-1,1,1,-1,0,1),o=0,s=s=>{if(o>=t.height)return!0;let c=Math.max(8,Math.min(t.height-o,Math.floor(s/t.width)));t.scissor.set(0,o,t.width,c),t.scissorTest=!0;let l=e.getRenderTarget(),u=e.autoClear;return e.autoClear=!1,e.setRenderTarget(t),e.render(i,a),e.setRenderTarget(l),e.autoClear=u,t.scissorTest=!1,o+=c,o>=t.height&&(n.dispose(),r.geometry.dispose(),!0)},c=new D({vertexShader:ot,fragmentShader:ct,side:1,depthWrite:!1,depthTest:!1,uniforms:{uAlt:{value:0},uSunDir:{value:new p(-.5,.06,-1).normalize()},uSunBoost:{value:1},uTime:{value:0},uFlash:{value:0},tNebula:{value:t.texture},uProj:at}}),l=new S(new _(10,48,24),c);return l.frustumCulled=!1,l.renderOrder=-100,{mesh:l,mat:c,bakeStrip:s,dispose:()=>(t.dispose(),c.dispose(),l.geometry.dispose())}}var G=`
attribute vec3 iPos;
attribute vec3 iData; // size, brightness, seed
uniform mat4 uProj;
uniform vec3 uOffset;
uniform vec3 uVel;
uniform float uStreak;
uniform vec2 uRes;
uniform float uPx;
uniform float uTime;
uniform float uBoost;
varying vec2 vUv;
varying float vB;
varying float vSeed;
varying float vLen;
void main() {
  vec3 p = mod(iPos + uOffset + 80.0, 160.0) - 80.0;
  float dist = length(p);
  vec3 wp = p + cameraPosition;
  mat4 vp = uProj * viewMatrix;
  vec4 h = vp * vec4(wp, 1.0);
  vec4 t = vp * vec4(wp - uVel * uStreak, 1.0);
  if (h.w <= 0.0) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  if (t.w <= 0.05) t = h;
  vec2 dir = (h.xy / h.w - t.xy / t.w) * uRes * 0.5;
  float len = length(dir);
  vLen = len;
  dir = len > 0.001 ? dir / len : vec2(0.0, 1.0);
  vec2 nrm = vec2(-dir.y, dir.x);
  float along = position.y + 0.5;
  vec4 q = mix(t, h, along);
  float w = uPx * iData.x;
  q.xy += (nrm * position.x * w + dir * position.y * w) / uRes * 2.0 * q.w;
  gl_Position = q;
  vUv = position.xy + 0.5;
  float tw = 0.7 + 0.3 * sin(uTime * (0.7 + iData.z * 2.3) + iData.z * 50.0);
  vB = iData.y * tw * smoothstep(14.0, 34.0, dist) * (1.0 / (1.0 + len * 0.004)) * (1.0 + uBoost);
  vSeed = iData.z;
}`,ut=`
uniform float uAlpha;
varying vec2 vUv;
varying float vB;
varying float vSeed;
varying float vLen;
void main() {
  vec2 c = vUv - 0.5;
  float across = 1.0 - smoothstep(0.0, 0.5, abs(c.x));
  float dot0 = 1.0 - smoothstep(0.0, 0.5, length(c));
  float a = mix(dot0, across * smoothstep(0.0, 0.3, vUv.y), smoothstep(0.5, 4.0, vLen));
  vec3 tint = vSeed < 0.2 ? vec3(0.75, 0.85, 1.25) : vSeed > 0.85 ? vec3(1.25, 0.95, 0.75) : vec3(1.0);
  gl_FragColor = vec4(tint * a * vB * uAlpha * 1.6, 1.0);
}`;function dt(e){let t=new u,n=new ie(1,1);t.index=n.index,t.setAttribute(`position`,n.attributes.position);let r=new Float32Array(e*3),i=new Float32Array(e*3);for(let t=0;t<e;t++){r[t*3]=(Math.random()-.5)*160,r[t*3+1]=(Math.random()-.5)*160,r[t*3+2]=(Math.random()-.5)*160;let e=Math.random();i[t*3]=1+e**6*2.4,i[t*3+1]=.25+Math.random()**2.2*1.3+(e>.97?1.2:0),i[t*3+2]=Math.random()}t.setAttribute(`iPos`,new b(r,3)),t.setAttribute(`iData`,new b(i,3)),t.instanceCount=e;let a=new D({vertexShader:G,fragmentShader:ut,transparent:!0,depthWrite:!1,blending:2,uniforms:{uOffset:{value:new p},uVel:{value:new p},uStreak:{value:.06},uRes:{value:new f(1,1)},uPx:{value:2},uTime:{value:0},uAlpha:{value:0},uBoost:{value:0},uProj:at}}),o=new S(t,a);return o.frustumCulled=!1,o.renderOrder=-50,{mesh:o,mat:a,dispose:()=>(t.dispose(),a.dispose())}}var ft=`
attribute vec3 iPos;
attribute vec2 iData; // size, seed
uniform mat4 uProj;
uniform vec3 uOffset;
uniform vec3 uBox;
uniform vec3 uCenter;
uniform float uFocus;
uniform float uTime;
varying vec2 vUv;
varying float vA;
varying float vBlur;
void main() {
  vec3 p = mod(iPos + uOffset + uBox * 0.5, uBox) - uBox * 0.5 + uCenter;
  p.x += sin(uTime * 0.3 + iData.y * 20.0) * 0.08;
  vec4 mv = viewMatrix * vec4(p, 1.0);
  float depth = -mv.z;
  float blur = clamp(abs(depth - uFocus) / max(depth, 0.5) * 2.4, 0.0, 3.0);
  float size = iData.x * (0.025 + blur * 0.08);
  mv.xy += position.xy * size;
  gl_Position = uProj * mv;
  vUv = position.xy + 0.5;
  vBlur = blur;
  vA = smoothstep(0.8, 2.5, depth) * (1.0 - smoothstep(uFocus * 1.2, uFocus * 1.9, depth)) / (1.0 + blur * blur * 6.0) * 0.55;
}`,pt=`
uniform float uAlpha;
varying vec2 vUv;
varying float vA;
varying float vBlur;
void main() {
  float d = length(vUv - 0.5) * 2.0;
  float disc = 1.0 - smoothstep(0.75 - vBlur * 0.15, 1.0, d);
  float rim = smoothstep(0.55, 0.9, d) * (1.0 - smoothstep(0.9, 1.0, d)) * min(vBlur, 1.0) * 0.5;
  float a = (disc * (0.6 + 0.4 * (1.0 - d)) + rim) * vA * uAlpha;
  gl_FragColor = vec4(vec3(1.0, 0.86, 0.92) * a, 1.0);
}`;function mt(e){let t=new u,n=new ie(1,1);t.index=n.index,t.setAttribute(`position`,n.attributes.position);let r=new Float32Array(e*3),i=new Float32Array(e*2);for(let t=0;t<e;t++)r[t*3]=Math.random()*16,r[t*3+1]=Math.random()*12,r[t*3+2]=Math.random()*11,i[t*2]=.5+Math.random(),i[t*2+1]=Math.random();t.setAttribute(`iPos`,new b(r,3)),t.setAttribute(`iData`,new b(i,2)),t.instanceCount=e;let a=new D({vertexShader:ft,fragmentShader:pt,transparent:!0,depthWrite:!1,blending:2,uniforms:{uOffset:{value:new p},uBox:{value:new p(16,12,11)},uCenter:{value:new p(0,0,5.5)},uFocus:{value:12},uTime:{value:0},uProj:at,uAlpha:{value:0}}}),o=new S(t,a);return o.frustumCulled=!1,o.renderOrder=20,{mesh:o,mat:a,dispose:()=>(t.dispose(),a.dispose())}}var ht=`
attribute vec3 iPos;
attribute vec4 iA; // life (1 -> 0), size, rotation, seed
attribute vec4 iB; // heat, tone, alpha, unused
uniform vec3 uFlamePos;
uniform float uFlamePow;
uniform vec2 uSunView;
uniform float uOpacity;
uniform float uMaxSize; // cap on a puff's height in NDC units (2 = full viewport); large = off
varying vec2 vUv;
varying vec4 vA;
varying vec4 vB;
varying vec2 vLight;
varying float vGlow;
varying float vFade;
void main() {
  vA = iA;
  vB = iB;
  if (iA.x <= 0.0) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  vec4 mv = viewMatrix * vec4(iPos, 1.0);
  vFade = smoothstep(0.15, 1.6 + iA.y * 0.25, -mv.z);
  // Skip puffs that would draw nothing (fully faded in / out, behind or at the lens):
  // saves the fill rate of large transparent quads.
  float life = iA.x;
  float fadeOut = smoothstep(0.0, 0.4, life) * vFade * uOpacity;
  float seen = max((1.0 - smoothstep(0.88, 1.0, life)) * iB.z, iB.x * life * life * life * 2.0) * fadeOut;
  if (seen < 0.002 || -mv.z < 0.05) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  float c = cos(iA.z);
  float s = sin(iA.z);
  vec2 k = position.xy;
  float size = iA.y * min(1.0, uMaxSize / max(iA.y * projectionMatrix[1][1] / -mv.z, 1e-4));
  mv.xy += vec2(c * k.x - s * k.y, s * k.x + c * k.y) * size;
  gl_Position = projectionMatrix * mv;
  vUv = uv;
  vLight = vec2(c * uSunView.x + s * uSunView.y, -s * uSunView.x + c * uSunView.y);
  float d = distance(iPos, uFlamePos);
  vGlow = uFlamePow / (1.0 + d * d * 0.35);
}`,gt=`
uniform sampler2D uTex;
uniform vec3 uSunCol;
uniform vec3 uAmbTop;
uniform vec3 uAmbBot;
uniform float uOpacity;
uniform float uBack;
uniform float uContrast;
uniform float uCrisp;
varying vec2 vUv;
varying vec4 vA;
varying vec4 vB;
varying vec2 vLight;
varying float vGlow;
varying float vFade;
void main() {
  float cell = floor(fract(vA.w) * 3.999);
  vec2 off = vec2(mod(cell, 2.0), floor(cell / 2.0)) * 0.5;
  float d = texture2D(uTex, vUv * 0.5 + off).r;
  float d2 = texture2D(uTex, clamp(vUv + vLight * 0.08, 0.0, 1.0) * 0.5 + off).r;
  d = mix(d, smoothstep(0.12, 0.55, d), uCrisp);
  d2 = mix(d2, smoothstep(0.12, 0.55, d2), uCrisp);
  if (d < 0.015) discard;
  float shade = clamp(0.5 + (d - d2) * uContrast, 0.0, 1.25);
  float life = vA.x;
  float heat = vB.x;
  float tone = vB.y;
  vec3 base = mix(vec3(0.3, 0.29, 0.31), vec3(0.96, 0.96, 0.98), tone);
  vec3 amb = mix(uAmbBot, uAmbTop, vUv.y) * (0.6 + 0.4 * (1.0 - d));
  vec3 col = base * (amb + uSunCol * shade);
  // Light leaking through the thin edges when the sun / floodlights are behind
  col += uSunCol * pow(1.0 - d, 3.0) * uBack * 0.9;
  col += vec3(1.0, 0.42, 0.1) * vGlow * (0.3 + 0.7 * (1.0 - vUv.y)) * (0.3 + d * 0.7);
  float h = heat * life * life * life;
  vec3 emit = mix(vec3(1.0, 0.3, 0.05), vec3(2.0, 1.3, 0.55), h) * h * 1.4;
  float fadeIn = 1.0 - smoothstep(0.88, 1.0, life);
  float fadeOut = smoothstep(0.0, 0.4, life);
  float a = clamp(d * vB.z * fadeIn * fadeOut * vFade * uOpacity, 0.0, 1.0);
  gl_FragColor = vec4(col * a + emit * d * fadeOut * vFade * uOpacity, a * (1.0 - h * 0.7));
}`,_t=class{mesh;mat;N;geo;pos;a;b;vel;age;max;s0;s1;rotV;drag;buoy;head=0;limit;hi=0;groundY=-1e9;alive=0;constructor(e,t){this.N=e,this.limit=e;let n=new u,r=new ie(1,1);n.index=r.index,n.setAttribute(`position`,r.attributes.position),n.setAttribute(`uv`,r.attributes.uv),this.pos=new Float32Array(e*3),this.a=new Float32Array(e*4),this.b=new Float32Array(e*4),n.setAttribute(`iPos`,new b(this.pos,3).setUsage(de)),n.setAttribute(`iA`,new b(this.a,4).setUsage(de)),n.setAttribute(`iB`,new b(this.b,4).setUsage(de)),n.instanceCount=0,this.geo=n,this.vel=new Float32Array(e*3),this.age=new Float32Array(e),this.max=new Float32Array(e),this.s0=new Float32Array(e),this.s1=new Float32Array(e),this.rotV=new Float32Array(e),this.drag=new Float32Array(e),this.buoy=new Float32Array(e),this.mat=new D({vertexShader:ht,fragmentShader:gt,transparent:!0,depthWrite:!1,blending:5,blendSrc:201,blendDst:205,uniforms:{uTex:{value:ke(t)},uFlamePos:{value:new p},uFlamePow:{value:0},uSunView:{value:new f(.5,.6)},uSunCol:{value:new O(.55,.36,.26)},uAmbTop:{value:new O(.2,.22,.32)},uAmbBot:{value:new O(.07,.06,.07)},uOpacity:{value:1},uMaxSize:{value:1e4},uBack:{value:.6},uContrast:{value:2.6},uCrisp:{value:0}}}),this.mesh=new S(n,this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=8,this.mesh.visible=!1}setBudget(e){this.limit=Math.max(8,Math.min(this.N,Math.round(this.N*e))),this.head>=this.limit&&(this.head=0)}emit(e){let t=e.n??1,n=e.spread??.3,r=e.jitter??.1;for(let i=0;i<t;i++){let t=this.head;this.head=(this.head+1)%this.limit,t>=this.hi&&(this.hi=t+1);let i=t*3,a=t*4;this.pos[i]=e.pos.x+(Math.random()-.5)*r,this.pos[i+1]=e.pos.y+(Math.random()-.5)*r,this.pos[i+2]=e.pos.z+(Math.random()-.5)*r,this.vel[i]=e.vel.x+(Math.random()-.5)*n,this.vel[i+1]=e.vel.y+(Math.random()-.5)*n,this.vel[i+2]=e.vel.z+(Math.random()-.5)*n;let o=(e.size??1)*(.7+Math.random()*.6);this.s0[t]=o,this.s1[t]=o*(e.grow??3),this.age[t]=0,this.max[t]=e.static?1/0:(e.life??3)*(.75+Math.random()*.5),this.rotV[t]=(Math.random()-.5)*.6,this.drag[t]=e.drag??1,this.buoy[t]=e.buoy??.2,this.a[a]=e.static?.9:1,this.a[a+1]=o,this.a[a+2]=Math.random()*Math.PI*2,this.a[a+3]=Math.random(),this.b[a]=e.heat??0,this.b[a+1]=e.tone??.4,this.b[a+2]=e.alpha??.6}}repel(e,t,n,r=5){for(let i=0;i<this.hi;i++){if(this.a[i*4]<=0)continue;let a=i*3,o=this.pos[a]-e.x,s=this.pos[a+2]-e.z,c=Math.abs(this.pos[a+1]-e.y);if(c>r)continue;let l=Math.hypot(o,s)||.001;if(l>t)continue;let u=(1-l/t)*n*(1-c/r);this.vel[a]+=o/l*u,this.vel[a+2]+=s/l*u,this.vel[a+1]+=u*.3,this.drag[i]=Math.max(this.drag[i],.8)}}shift(e,t,n=0){if(this.alive)for(let r=0;r<this.hi;r++)this.a[r*4]<=0||(this.pos[r*3]+=e,this.pos[r*3+1]+=t,this.pos[r*3+2]+=n)}clear(){for(let e=0;e<this.hi;e++)this.a[e*4]=0;this.alive=0,this.hi=0,this.head=0,this.geo.instanceCount=0,this.mesh.visible=!1}update(e,t=0){if(this.hi===0)return;let n=0,r=0;for(let i=0;i<this.hi;i++){let a=i*4;if(this.a[a]<=0)continue;let o=i*3;if(this.max[i]!==1/0){this.age[i]+=e;let t=1-this.age[i]/this.max[i];if(t<=0){this.a[a]=0;continue}this.a[a]=t;let n=1-t;this.a[a+1]=this.s0[i]+(this.s1[i]-this.s0[i])*n**.55}n++,r=i+1;let s=Math.exp(-this.drag[i]*e);this.vel[o]=this.vel[o]*s+t*e,this.vel[o+1]=this.vel[o+1]*s+this.buoy[i]*e,this.vel[o+2]*=s,this.pos[o]+=this.vel[o]*e,this.pos[o+1]+=this.vel[o+1]*e,this.pos[o+2]+=this.vel[o+2]*e;let c=this.groundY+this.a[a+1]*.22;if(this.pos[o+1]<c&&(this.pos[o+1]=c,this.vel[o+1]<0)){let e=-this.vel[o+1]*.6,t=this.vel[o],n=this.vel[o+2],r=Math.hypot(t,n)||1;this.vel[o]+=t/r*e,this.vel[o+2]+=n/r*e,this.vel[o+1]=0}this.a[a+2]+=this.rotV[i]*e}this.alive=n;let i=r;this.hi=r,this.geo.instanceCount=i,this.mesh.visible=n>0,n&&(vt(this.geo.attributes.iPos,i*3),vt(this.geo.attributes.iA,i*4),vt(this.geo.attributes.iB,i*4))}dispose(){this.geo.dispose(),this.mat.dispose()}};function vt(e,t){e.clearUpdateRanges(),e.addUpdateRange(0,t),e.needsUpdate=!0}var yt=`
attribute vec3 iPos;
attribute vec3 iVel;
attribute vec2 iL; // life (1 -> 0), seed
uniform vec2 uRes;
uniform float uStreak;
uniform float uWidth;
varying vec2 vUv;
varying float vLife;
varying float vSeed;
void main() {
  vLife = iL.x;
  vSeed = iL.y;
  if (iL.x <= 0.0) { gl_Position = vec4(2.0, 2.0, 2.0, 1.0); return; }
  mat4 vp = projectionMatrix * viewMatrix;
  vec4 h = vp * vec4(iPos, 1.0);
  vec4 t = vp * vec4(iPos - iVel * uStreak, 1.0);
  vec2 dir = (h.xy / h.w - t.xy / t.w) * uRes;
  float len = length(dir);
  dir = len > 0.0001 ? dir / len : vec2(0.0, 1.0);
  vec2 nrm = vec2(-dir.y, dir.x);
  float along = position.y + 0.5;
  vec4 p = mix(t, h, along);
  float w = uWidth * (0.6 + iL.x * 0.8);
  p.xy += (nrm * position.x * w + dir * position.y * w) / uRes * 2.0 * p.w;
  gl_Position = p;
  vUv = position.xy + 0.5;
}`,bt=`
uniform float uOpacity;
varying vec2 vUv;
varying float vLife;
varying float vSeed;
void main() {
  float across = 1.0 - abs(vUv.x - 0.5) * 2.0;
  float a = pow(across, 1.6) * smoothstep(0.0, 0.25, vUv.y);
  vec3 hot = mix(vec3(1.6, 0.35, 0.06), vec3(3.2, 2.4, 1.3), smoothstep(0.35, 1.0, vLife));
  gl_FragColor = vec4(hot * a * vLife * uOpacity * (0.7 + vSeed * 0.6), 1.0);
}`,xt=class{mesh;mat;N;groundY=-1e9;geo;pos;vel;l;max;head=0;limit;hi=0;alive=0;constructor(e){this.N=e,this.limit=e;let t=new u,n=new ie(1,1);t.index=n.index,t.setAttribute(`position`,n.attributes.position),this.pos=new Float32Array(e*3),this.vel=new Float32Array(e*3),this.l=new Float32Array(e*2),this.max=new Float32Array(e),t.setAttribute(`iPos`,new b(this.pos,3).setUsage(de)),t.setAttribute(`iVel`,new b(this.vel,3).setUsage(de)),t.setAttribute(`iL`,new b(this.l,2).setUsage(de)),t.instanceCount=0,this.geo=t,this.mat=new D({vertexShader:yt,fragmentShader:bt,transparent:!0,depthWrite:!1,blending:2,uniforms:{uRes:{value:new f(1,1)},uStreak:{value:.045},uWidth:{value:2.2},uOpacity:{value:1}}}),this.mesh=new S(t,this.mat),this.mesh.frustumCulled=!1,this.mesh.renderOrder=9,this.mesh.visible=!1}setBudget(e){this.limit=Math.max(8,Math.min(this.N,Math.round(this.N*e))),this.head>=this.limit&&(this.head=0)}emit(e,t,n,r,i=1.2){for(let a=0;a<n;a++){let n=this.head;this.head=(this.head+1)%this.limit,n>=this.hi&&(this.hi=n+1),this.pos[n*3]=e.x+(Math.random()-.5)*.15,this.pos[n*3+1]=e.y+(Math.random()-.5)*.1,this.pos[n*3+2]=e.z+(Math.random()-.5)*.15,this.vel[n*3]=t.x+(Math.random()-.5)*r,this.vel[n*3+1]=t.y+(Math.random()-.5)*r,this.vel[n*3+2]=t.z+(Math.random()-.5)*r,this.l[n*2]=1,this.l[n*2+1]=Math.random(),this.max[n]=i*(.4+Math.random()*.8)}}shift(e,t){if(this.alive)for(let n=0;n<this.hi;n++)this.l[n*2]<=0||(this.pos[n*3]+=e,this.pos[n*3+1]+=t)}update(e,t=-6){if(this.hi===0)return;let n=0,r=0,i=Math.exp(-.8*e);for(let a=0;a<this.hi;a++){if(this.l[a*2]<=0)continue;this.l[a*2]-=e/this.max[a],this.l[a*2]>0&&(n++,r=a+1);let o=a*3;this.vel[o+1]+=t*e,this.vel[o]*=i,this.vel[o+2]*=i,this.pos[o]+=this.vel[o]*e,this.pos[o+1]+=this.vel[o+1]*e,this.pos[o+2]+=this.vel[o+2]*e,this.pos[o+1]<this.groundY&&this.vel[o+1]<0&&(this.pos[o+1]=this.groundY,this.vel[o+1]*=-.35,this.vel[o]*=1.2,this.vel[o+2]*=1.2)}this.alive=n,this.hi=r,this.geo.instanceCount=r,this.mesh.visible=n>0,n&&(vt(this.geo.attributes.iPos,r*3),vt(this.geo.attributes.iVel,r*3),vt(this.geo.attributes.iL,r*2))}dispose(){this.geo.dispose(),this.mat.dispose()}},St=`
${Ce}
${Ee}
uniform float uTime;
uniform vec2 uHazeO;    // haze origin in uv
uniform vec2 uHazeDir;  // flame direction in pixels (normalised)
uniform float uHazeLen; // px
uniform float uHazeW;   // px
uniform float uHaze;    // strength
uniform float uWarp;    // 0..1 radial zoom blur
uniform float uAberr;   // chromatic fringe at the edges
uniform vec2 uSun;      // sun position in uv
uniform float uSunVis;  // 0..1
uniform float uFlash;
uniform vec3 uFlashCol;
uniform float uVignette;
uniform float uGrain;
float disc(vec2 p, vec2 c, float r, float soft) { return 1.0 - smoothstep(r * (1.0 - soft), r, length(p - c)); }
void main() {
  vec2 uv = vUv;
  if (uHaze > 0.001) {
    vec2 rel = uv * uRes - uHazeO * uRes;
    float along = dot(rel, uHazeDir);
    float across = dot(rel, vec2(-uHazeDir.y, uHazeDir.x));
    float L = max(uHazeLen, 1.0);
    float wid = uHazeW * (0.6 + 1.6 * clamp(along / L, 0.0, 1.0));
    float m = smoothstep(-0.05 * L, 0.12 * L, along) * (1.0 - smoothstep(0.55 * L, L, along)) * exp(-pow(across / max(wid, 1.0), 2.0));
    if (m * uHaze > 0.001) {
      vec2 q = rel / 38.0;
      float n1 = snoise(vec3(q.x, q.y - uTime * 4.0, uTime * 0.6));
      float n2 = snoise(vec3(q.x + 7.3, q.y - uTime * 3.2, uTime * 0.7));
      uv += vec2(n1, n2) * m * uHaze * 6.0 / uRes;
    }
  }
  vec2 c = uv - 0.5;
  float r2 = dot(c, c);
  vec3 col;
  if (uWarp > 0.001) {
    vec3 acc = vec3(0.0);
    float wsum = 0.0;
    for (int i = 0; i < 10; i++) {
      float k = float(i) / 9.0;
      vec2 suv = 0.5 + c * (1.0 - k * uWarp * 0.12 * (0.3 + r2 * 3.0));
      float w = 1.0 - k * 0.6;
      acc += hdr(suv) * w;
      wsum += w;
    }
    col = acc / wsum;
  } else {
    col = hdr(uv);
  }
  float ab = uAberr * r2;
  if (ab > 0.00005) {
    col.r = mix(col.r, hdr(uv + c * ab).r, 0.9);
    col.b = mix(col.b, hdr(uv - c * ab).b, 0.9);
  }
  float asp = uRes.x / uRes.y;
  if (uSunVis > 0.001) {
    vec2 p = vec2(vUv.x * asp, vUv.y);
    vec2 s = vec2(uSun.x * asp, uSun.y);
    vec2 ctr = vec2(0.5 * asp, 0.5);
    vec2 axis = ctr - s;
    vec3 fl = vec3(0.0);
    fl += vec3(0.35, 0.55, 1.0) * disc(p, s + axis * 0.55, 0.035, 0.6) * 0.18;
    fl += vec3(1.0, 0.45, 0.75) * disc(p, s + axis * 0.85, 0.07, 0.7) * 0.1;
    fl += vec3(0.6, 1.0, 0.7) * disc(p, s + axis * 1.25, 0.02, 0.5) * 0.25;
    fl += vec3(0.45, 0.6, 1.0) * disc(p, s + axis * 1.55, 0.12, 0.85) * 0.07;
    float ring = disc(p, s + axis * 1.9, 0.2, 0.15) - disc(p, s + axis * 1.9, 0.19, 0.3);
    fl += vec3(0.9, 0.6, 1.0) * max(ring, 0.0) * 0.06;
    // anamorphic streak through the sun
    vec2 d = p - s;
    fl += vec3(0.45, 0.6, 1.2) * exp(-abs(d.y) * 260.0) * exp(-abs(d.x) * 2.2) * 0.5;
    fl += vec3(1.3, 1.1, 0.9) * exp(-length(d) * 22.0) * 0.4;
    col += fl * uSunVis;
  }
  col = mix(col, uFlashCol, clamp(uFlash, 0.0, 1.0));
  vec2 cv = vUv - 0.5;
  float v = 1.0 - smoothstep(0.35, 0.95, length(cv * vec2(asp * 0.75, 1.0))) * uVignette;
  col *= v;
  if (uGrain > 0.0) col += (hash12(vUv * uRes + fract(uTime) * 100.0) - 0.5) * uGrain;
  gl_FragColor = vec4(display(col), 1.0);
}`;function Ct(e,t,n,r){let i=Oe(e,t,n,{bloom:{strength:.5,radius:.42,threshold:1,knee:.4},maxSamples:r?0:4,finalFrag:St,uniforms:{uTime:{value:0},uHazeO:{value:new f(.5,.5)},uHazeDir:{value:new f(0,-1)},uHazeLen:{value:200},uHazeW:{value:30},uHaze:{value:0},uWarp:{value:0},uAberr:{value:0},uSun:{value:new f(.9,.9)},uSunVis:{value:0},uFlash:{value:0},uFlashCol:{value:new O(1,1,1)},uVignette:{value:.55},uGrain:{value:.012}}});return{...i,u:i.uniforms}}var wt=.6,Tt=2.27,K=new p(0,1,0),Et=new se,Dt=new p,Ot=class{list=[];add(e,t,n,r=n){let i=Dt.subVectors(t,e),o=i.length();Et.setFromUnitVectors(K,i.normalize());let s=new a().compose(new p().addVectors(e,t).multiplyScalar(.5),Et,new p(n,o,r));this.list.push(s)}build(e,t){let n=new y(e,t,this.list.length);return this.list.forEach((e,t)=>n.setMatrixAt(t,e)),n.castShadow=!0,n.receiveShadow=!0,n}};function kt(e){let t=new d,n=[],r=e=>(n.push(e),e),i=xe(e),a=r(new ce(1,1,1)),s=i.map.clone();s.repeat.set(26,26),s.needsUpdate=!0;let u=i.rough.clone();u.repeat.set(26,26),u.needsUpdate=!0,r(s),r(u);let f=new S(r(new g(70,64)),r(new _e({map:s,roughnessMap:u,color:10130572,roughness:1,metalness:0,alphaMap:De(),transparent:!0,depthWrite:!0})));f.rotation.x=-Math.PI/2,f.renderOrder=-20,f.receiveShadow=!0,t.add(f);let m=r(new _e({map:i.map,roughnessMap:i.rough,color:12104362,roughness:1,metalness:0})),h=r(new _e({map:we(),color:9407108,roughness:.92,metalness:0})),y=r(new _e({color:5857387,roughness:.5,metalness:.75})),b=r(new _e({color:2764083,roughness:.6,metalness:.7})),x=r(new _e({color:7041404,roughness:.55,metalness:.65})),te=r(new _e({color:14196768,roughness:.5,metalness:.2})),ne=r(new _e({color:328965,roughness:1,metalness:0})),re=r(new _e({color:1381914,roughness:.55,metalness:.1})),ie=new S(r(new c(6.2,6.4,.12,8)),m);ie.position.y=.06,ie.rotation.y=Math.PI/8,ie.receiveShadow=!0,t.add(ie);let ae=new S(r(new c(3,3.35,wt,8)),[m,h,m]);ae.position.y=wt/2,ae.rotation.y=Math.PI/8,ae.receiveShadow=!0,ae.castShadow=!0,t.add(ae);let se=new S(r(new c(3.02,3.02,.05,8,1,!0)),te);se.position.y=.5599999999999999,se.rotation.y=Math.PI/8,t.add(se);let ue=new S(r(new le(.62,1.45,48)),y);ue.rotation.x=-Math.PI/2,ue.position.y=.606,ue.receiveShadow=!0,t.add(ue);let de=r(new T({color:131586})),fe=new S(r(new g(.62,48)),de);fe.rotation.x=-Math.PI/2,fe.position.y=.604,t.add(fe);let C=new S(a,ne);C.scale.set(6.9,.02,.9),C.position.y=.602,t.add(C);let pe=new Ot;for(let e=-3.3;e<=3.3;e+=.12)Math.abs(e)<.7||pe.add(new p(e,.61,-.45),new p(e,.61,.45),.025);t.add(pe.build(a,b));for(let e of[-1,1]){let n=new S(a,ne);n.scale.set(.3,.42,.95),n.position.set(e*3.05,.22,0),t.add(n);let r=new S(a,y);r.scale.set(.34,.08,1.15),r.position.set(e*3.06,.47,0),t.add(r)}let me=[];for(let e=0;e<3;e++){let n=e/3*Math.PI*2+Math.PI/2,r=Math.cos(n)*.87,i=-Math.sin(n)*.87,o=new S(a,y);o.scale.set(.26,.06,.26),o.position.set(r,.63,i),o.castShadow=!0,t.add(o);let s=new d;s.position.set(r*1.18,.6599999999999999,i*1.18),s.rotation.y=n;let c=new S(a,b);c.scale.set(.2,.08,.12),c.position.set(-.08,.05,0),s.add(c);let l=new S(a,te);l.scale.set(.08,.1,.16),s.add(l),t.add(s),me.push(s)}let w=new p(-2.45,wt,-.75),he=.42,ge=.58,ve=11*ge,Ce=[],HX=[],
HP=r(new T({color:new O(3.2,.5,1.6)})),HV=r(new T({color:new O(1.3,.6,3.4)})),HC=r(new T({color:new O(.4,2.6,3.2)})),
HR=r(new T({color:new O(2.2,.7,2.8),transparent:!0,opacity:.55,side:2,depthWrite:!1,blending:2})),
HG=r(new T({color:new O(.5,1.4,2.4),transparent:!0,opacity:.18,side:2,depthWrite:!1,blending:2}));
for(let e=0;e<4;e++){let n=new S(a,b);n.scale.set(1.05,1.15,1.05),n.position.set(w.x,w.y+.62+e*1.28,w.z),n.castShadow=!0,t.add(n);
let i=new S(a,x);i.scale.set(1.12,.08,1.12),i.position.set(w.x,w.y+.02+e*1.28,w.z),t.add(i);
for(let r=0;r<4;r++){let o=new S(a,(r+e)%3==0?HP:(r+e)%3==1?HV:HC);o.scale.set(.82,.035,.02),o.position.set(w.x,w.y+.25+e*1.28+r*.22,w.z+.53),t.add(o);
let c=new S(a,r%2?HC:HP);c.scale.set(.02,.035,.7),c.position.set(w.x+.53,w.y+.25+e*1.28+r*.22,w.z),t.add(c)}}
let Hy=w.y+5.15;{let e=new S(r(new c(.04,.06,2.2,8)),x);e.position.set(w.x,Hy+1.1,w.z),t.add(e);let n=new S(r(new _(.12,16,12)),HP);n.position.set(w.x,Hy+2.25,w.z),t.add(n);
for(let e=0;e<3;e++){let n=new S(r(new le(.35+e*.28,.39+e*.28,48)),HR.clone());n.rotation.x=-Math.PI/2,n.position.set(w.x,Hy+1.4+e*.3,w.z),t.add(n),HX.push({m:n,k:"sig",ph:e})}}
let Hs=new d;Hs.position.set(2.75,2.6,-1.1),Hs.rotation.y=-.55;{let e=new S(a,HG);e.scale.set(2.1,1.35,.01),Hs.add(e);let n=new S(a,HC);n.scale.set(2.16,.025,.02),n.position.y=.69,Hs.add(n);let i=n.clone();i.position.y=-.69,Hs.add(i);
[[.9,HP],[.6,HC],[1.2,HV],[.5,HP],[.8,HC]].forEach(([e,t],r)=>{let i=new S(a,t);i.scale.set(e,.06,.012),i.position.set(-.85+e/2+(r%2?.2:0),.45-r*.2,.01),Hs.add(i)});
let o=new S(r(new c(.02,.02,1.5,6)),x);o.position.set(0,-1.45,-.02),Hs.add(o)}t.add(Hs),HX.push({m:Hs,k:"scr"});
for(let e=0;e<7;e++){let n=new d,i=e/7*Math.PI*2,o=new S(a,[HP,HV,HC][e%3]);o.scale.set(.32,.32,.06),n.add(o);let s=new S(a,te);s.scale.set(.14,.14,.07),n.add(s);t.add(n),HX.push({m:n,k:"ico",a:i,h:1.6+e%3*.9,r:1.9+e%2*.35})}
let Oe=r(new T({color:new O(6,.35,.25)})),ke=r(new T({color:new O(5,2.4,.4)})),Ae=r(new _(.045,10,8)),j=[],M=[],je=(e,n,i=0,a=.6)=>{let o=new S(Ae,n===`amber`?ke:Oe);o.position.copy(e),t.add(o);let s=r(new l({map:A(),color:n===`amber`?16752688:16722458,blending:2,depthWrite:!1,transparent:!0}));j.push(s);let c=new v(s);c.position.copy(e),c.scale.setScalar(a),t.add(c),M.push({mesh:o,sprite:c,phase:i,kind:n})};je(new p(w.x,w.y+5.15+2.25,w.z),`red`,0,.7);for(let e=0;e<4;e++){let t=e/4*Math.PI*2+Math.PI/4;je(new p(Math.cos(t)*2.75,.6599999999999999,Math.sin(t)*2.75),`amber`,e*.25,.45)}let Me=r(new T({color:new O(2.6,2.45,2.2)}));[[-7.5,-8.5,6.5],[8.5,-11,7.5]].forEach(([e,n,i])=>{let o=new Ot;o.add(new p(e,0,n),new p(e,i,n),.12),t.add(o.build(a,b));let s=new d;s.position.set(e,i,n),s.lookAt(0,2,0);let c=new S(a,b);c.scale.set(1.3,.7,.18),s.add(c);for(let e=0;e<2;e++)for(let t=0;t<4;t++){let n=new S(a,Me);n.scale.set(.24,.22,.02),n.position.set(-.45+t*.3,-.15+e*.3,.1),s.add(n)}t.add(s);let u=r(new l({map:A(),color:16773592,blending:2,depthWrite:!1,transparent:!0,opacity:.32})),f=new v(u);f.position.set(e,i,n).add(new p(-e,2-i,-n).normalize().multiplyScalar(.3)),f.scale.setScalar(1.7),t.add(f)});let Ne=e?40:90,Pe=r(new ye),N=new Float32Array(Ne*3);for(let e=0;e<Ne;e++){let t=-Math.PI*.95+Math.random()*Math.PI*.9,n=26+Math.random()*34;N[e*3]=Math.cos(t)*n,N[e*3+1]=.05+Math.random()*(Math.random()<.15?2.5:.4),N[e*3+2]=Math.sin(t)*n}Pe.setAttribute(`position`,new ee(N,3));let Fe=r(new oe({color:new O(3.5,2.2,1.2),size:2.2,sizeAttenuation:!1,transparent:!0,depthWrite:!1,blending:2}));t.add(new E(Pe,Fe));let Ie=[{p:new p(-3.25,.25,0),d:new p(-1,.08,0)},{p:new p(3.25,.25,0),d:new p(1,.08,0)}],Le=[new p(-.42,2.9,-.2),new p(.38,.7,.5),new p(-.6,.7,-.4)],Re=e=>e<=0?0:e>=1?1:e*e*(3-2*e);return{group:t,trench:Ie,vents:Le,update(e,t){HX.forEach(n=>{if(n.k===`sig`){let r=(e*.6+n.ph/3)%1,i=1+r*1.6+t.swing*2;n.m.scale.set(i,i,i),n.m.material.opacity=.6*(1-r)}else if(n.k===`scr`)n.m.position.y=2.6+Math.sin(e*1.1)*.08;else{let r=n.a+e*(.25+t.swing*2.5),i=n.r+t.swing*1.5;n.m.position.set(Math.cos(r)*i,wt+n.h+Math.sin(e*1.3+n.a)*.15+t.swing*1.2,Math.sin(r)*i),n.m.rotation.y=-r+Math.PI/2}}),Ce.forEach(e=>{let n=Re((t.swing*1.6-e.delay)/1);e.pivot.rotation.y=e.base+n*1.45}),me.forEach(e=>e.children[0].rotation.z=Re(t.clamps)*1.2),M.forEach(n=>{let r=1;r=n.kind===`red`?.15+.85*(Math.sin(e*4+n.phase)>.2):n.kind===`amber`?t.alarm>0?Math.sin(e*12+n.phase*6)>0?1:.1:.35:.8,n.sprite.material.opacity=r,n.mesh.visible=r>.3}),de.color.setRGB(.01+t.burn*3.2,.005+t.burn*1.2,t.burn*.3)},dispose(){t.traverse(e=>{let t=e;t.isInstancedMesh&&t.dispose()}),n.forEach(e=>e.dispose()),j.forEach(e=>e.dispose())}}}var At=56,jt=38,Mt=2.6,Nt=3.6,PS=1.26,PSH=.507,Pt=e=>e*e*(3-2*e),Ft=e=>e<0?0:e>1?1:e,q=(e,t,n)=>Pt(Ft((n-e)/(t-e))),J=(e,t)=>1-Math.exp(-e*t);function It(e,t={}){let n=fe(),r=ve(e,{fov:35,z:12,env:!1,alpha:!1}),{scene:i,camera:a,renderer:o,onFrame:c}=r;o.setClearColor(0,1);let l=()=>window.innerWidth<760,u=new URLSearchParams(location.search),d=parseFloat(u.get(`hjdt`)||``)||.05,m=t.pad!==!1,g=[e,...t.shake??[]],_=m?it(o,`dusk`):null,v=it(o,`space`);i.environment=_??v;let y=new be(9085144,2759704,.35);i.add(y);let b=new s(16752736,2.6);i.add(b,b.target);let x=new s(14673663,1.3);i.add(x,x.target);let ee=new C(16723592,0,16,1.6);i.add(ee);let te=new C(16747056,0,30,1.4);i.add(te);let ne=new p(-.5,-.012,-1).normalize(),ie=new p(.62,.32,-1),oe=new p,S=ne.clone(),se=lt(o);i.add(se.mesh);let ce=!1,le=!1;if(m)(async()=>{for(;!ce;)ce=se.bakeStrip(await ge(0));le&&ue(le=!1)})();else for(;!ce;)ce=se.bakeStrip(1<<22);let de=n?1100:2600,pe=n?46:110,me=dt(de);i.add(me.mesh);let _e=mt(pe);i.add(_e.mesh);let T=Te({lite:n});T.group.rotation.order=`ZXY`,i.add(T.group),T.group.traverse(e=>{e.isMesh&&(e.castShadow=!0)});let E=new _t(n?420:1100,n),ye=new _t(n?380:1150,n),D=new _t(n?80:190,n),O=new xt(n?220:600);i.add(E.mesh,ye.mesh,O.mesh),ye.groundY=.05,E.groundY=wt,O.groundY=wt+.02;E.emit=ye.emit=O.emit=()=>{};let k=null;if(m){if(k=kt(n),i.add(k.group),!n&&re().tier<=2){o.shadowMap.enabled=!0,o.shadowMap.type=1,x.castShadow=!0,x.shadow.mapSize.set(1024,1024);let e=x.shadow.camera;e.left=-6,e.right=6,e.top=9,e.bottom=-3,e.near=1,e.far=40,x.shadow.bias=-8e-4,x.shadow.normalBias=.02}i.add(D.mesh);let e=D.mat.uniforms;e.uSunCol.value.setRGB(1.25,.74,.5),e.uAmbTop.value.setRGB(.36,.42,.66),e.uAmbBot.value.setRGB(.12,.13,.22),e.uContrast.value=3.8,e.uBack.value=.35,e.uCrisp.value=.3;let t=D.N;for(let e=0;e<t;e++){let n=e<t*.35,r=Math.random()*Math.PI*2,i=n?Math.random()*8:5+Math.random()**.8*42,a=n?new p(Math.cos(r)*i*.8,0,9+Math.sin(r)*i*.6):new p(Math.cos(r)*i,0,Math.sin(r)*i-8);a.y=jt+Math.random()*8,D.emit({pos:a,vel:new p,spread:0,jitter:0,size:n?7+Math.random()*5:11+Math.random()*12,tone:.92,alpha:.92,static:!0,drag:.6,buoy:0})}}let xe=Ct(o,i,a,n);r.setRender(xe.render);let Ce=xe.u,we=xe.u,A=1,Ee=1,De=!0,Oe=[E,ye,D];ae(e=>{A=e.particles,Ee=Math.min(1.5,1/Math.sqrt(A)),De=e.extras,E.setBudget(A),ye.setBudget(A),O.setBudget(A),me.mesh.geometry.instanceCount=Math.round(de*Math.max(.6,A)),_e.mesh.geometry.instanceCount=Math.round(pe*Math.max(.6,A));let t=e.tier>=4?1:e.tier>=3?1.4:1e4;for(let e of Oe)e.mat.uniforms.uMaxSize.value=t;we.uGrain.value=De?.012:0,xe.setQuality(e)});let ke=new f,Ae=null;window.addEventListener(`deviceorientation`,e=>{e.beta!=null&&e.gamma!=null&&(Ae||={b:e.beta,g:e.gamma},Ae.b+=(e.beta-Ae.b)*.004,Ae.g+=(e.gamma-Ae.g)*.004,ke.set(Ft((e.gamma-Ae.g)/50+.5)*2-1,Ft((e.beta-Ae.b)/50+.5)*2-1))},{passive:!0});let j=new f,M=new p(0,At,0),je=()=>{let e=Math.tan(h.degToRad(35/2))*12;return{h:e,w:e*a.aspect}},Me=new p,Ne=(e,t,n)=>{Me.set(e/window.innerWidth*2-1,-(t/window.innerHeight)*2+1,.5).unproject(a),Me.sub(a.position).normalize();let r=(M.z-a.position.z)/Me.z;return n.copy(a.position).addScaledVector(Me,r)},Pe=()=>window.innerHeight/(2*Math.tan(h.degToRad(a.fov/2))*Math.abs(a.position.z-M.z)),N=(e,t)=>(Me.copy(e).project(a),t.set((Me.x*.5+.5)*window.innerWidth,(-Me.y*.5+.5)*window.innerHeight),Me.z<1),Fe=[],Ie=()=>{let e=window.scrollY;for(let t of Fe){let n=t.el.getBoundingClientRect();t.top=n.top+e,t.h=n.height}},Le=()=>{let e=l(),t=(t,n,r)=>parseFloat(e&&t.dataset[`m`+n]||t.dataset[n]||r);Fe=[...document.querySelectorAll(`[data-fx]`)].map(e=>({el:e,x:t(e,`fx`,`0`),y:t(e,`fy`,`0`),s:t(e,`fs`,`1`),o:t(e,`fo`,`1`),top:0,h:0})),Ie()};Le();let Re=[],ze=()=>{let e=window.scrollY;Re=[...document.querySelectorAll(`[data-gl-cover]`)].map(t=>{let n=t.getBoundingClientRect();return{el:t,top:n.top+e,h:n.height}})};ze();let P=0,F=()=>{P||=requestAnimationFrame(()=>{P=0,Ie(),ze()})};window.addEventListener(`resize`,()=>{Le(),ze()}),window.addEventListener(`load`,F),window.addEventListener(`nuuke:gl-cover`,F),new ResizeObserver(F).observe(document.body);let I=-1,L=[],R={x:0,y:0,s:1,o:1,i:0,a:0},z=()=>{let e=window.innerHeight,t=window.scrollY,n=e*.5,r=e*.3;L.length=Fe.length*2;for(let e=0;e<Fe.length;e++){let n=Fe[e],i=Math.min(r,n.h/2);L[e*2]=n.top-t+i,L[e*2+1]=n.top-t+n.h-i}let i=0,a=0,o=0;if(!Fe.length)return Object.assign(R,{x:0,y:0,s:1,o:1,i:0,a:0});let s=Fe.length;if(n<=L[0])i=a=0;else{i=a=s-1;for(let e=0;e<s;e++){if(n>=L[e*2]&&n<=L[e*2+1]){i=a=e;break}if(e<s-1&&n>L[e*2+1]&&n<L[e*2+2]){i=e,a=e+1,o=Pt((n-L[e*2+1])/(L[e*2+2]-L[e*2+1]));break}}}let c=Fe[i],l=Fe[a];return R.x=c.x+(l.x-c.x)*o,R.y=c.y+(l.y-c.y)*o,R.s=c.s+(l.s-c.s)*o,R.o=c.o+(l.o-c.o)*o,R.i=o<.5?i:a,R.a=i,R},Be=()=>{let e=window.scrollY,t=window.innerHeight,n=0;for(let r of Re){if(e>=r.top-1&&e+t<=r.top+r.h+1)return 2;r.top<e+t&&r.top+r.h>e&&(n=1)}return n},B=m?`pad`:`arrive`,Ve=0,V=0,We=1,Ge=null,Ke=!1,qe=!1,Je=!1,Ye=0,Xe=0,H=null,U=0,rt=null,W=-1,ot=!1,st=null,ct=performance.now()/1e3+(m?1e9:0),G=new p(0,48,0),ut=G.clone(),ft=new p,pt=1,ht=1,gt=0,vt=0,yt=0,bt=window.scrollY,St=0,K=0,Et=0,Dt=0,Ot=0,It=35,Lt=new he(35,1,.1,100),Rt=u.has(`hjdebug`),zt=0,Bt=new f(2,2),Vt=new p,Ht=new p,Ut=new p,Wt=new p,Gt=+!m,Kt=0,qt=new p,Jt=new p,Y=new p,X=new p,Z=new p,Q=new p,Yt=new p,$=new f,Xt=new f,Zt=new p,Qt=new p(0,-1,0),$t={},en=(e,t,n)=>{$t[e]=($t[e]??0)+t*n;let r=Math.floor($t[e]);return $t[e]-=r,r},tn=0,nn=0,rn=!1,an=(e,t)=>{let n=Ft((a.aspect-.5)/1.1);e.set(h.lerp(-.85,-.35,n),h.lerp(1.7,1.35,n),h.lerp(16.5,10.2,n)),t.set(h.lerp(-.8,-.55,n),h.lerp(2.6,2.75,n),0)},on=(e,t,n)=>{e.set(M.x+j.x*.9*n,M.y+j.y*.55*n,M.z+12),t.set(M.x+j.x*.25*n,M.y+j.y*.15*n,M.z)};an(Y,X),m||on(Y,X,0),Vt.copy(Y),Ht.copy(X);let sn=e=>{if(i.environment=e||!_?v:_,e){y.color.set(8226504),y.groundColor.set(1707288),y.intensity=.28,b.color.set(16773341),b.intensity=1.9,x.color.set(9414911),x.intensity=1.5,x.castShadow=!1,ee.intensity=9,o.shadowMap.enabled=!1;let e=E.mat.uniforms;e.uBack.value=.15,e.uSunCol.value.setRGB(.55,.5,.52),e.uAmbTop.value.setRGB(.2,.18,.28),e.uAmbBot.value.setRGB(.07,.05,.09)}};sn(!m);let cn=()=>{k&&(i.remove(k.group),k.dispose(),k=null,i.remove(ye.mesh,D.mesh),ye.dispose(),D.dispose(),_?.dispose(),Se(),x.castShadow=!1,o.shadowMap.enabled=!1,x.shadow.map?.dispose(),x.shadow.map=null)},ln=()=>{if(!k||B!==`pad`)return;let e=i.environment,t=o.shadowMap.enabled,n=x.castShadow;i.environment=v,o.shadowMap.enabled=!1,x.castShadow=!1;let r=o.getRenderTarget();o.setRenderTarget(xe.target);try{o.compileAsync(i,a).catch(()=>{})}catch{}finally{o.setRenderTarget(r),i.environment=e,o.shadowMap.enabled=t,x.castShadow=n}};if(m){let e=window.requestIdleCallback;setTimeout(()=>e?e(ln,{timeout:2e3}):ln(),1500)}let un=60;return c((e,t)=>{let i=performance.now(),s=Math.min(t,d),c=s*(B===`launch`?We:1),{h:u,w:f}=je(),p=l()?.62:1.16,_=0,v=0,y=1,re=0,ae=1,ce=null,le=window.scrollY,ue=le-bt;St+=(ue/Math.max(s,.001)/60-St)*J(12,s),bt=le,j.lerp($.set(r.pointer.x+ke.x,r.pointer.y-ke.y),J(3,s));let de=Math.abs($.x-j.x)+Math.abs($.y-j.y);if(ut.copy(G),B===`pad`||B===`launch`){B===`launch`&&(V+=c);let t=B===`launch`?V:0,r=Math.max(0,t-Mt);ce=`Launch`,B===`launch`&&!Ke&&t>=Mt&&(Ke=!0,ct=i/1e3-r,Ue()),Ke&&(ce=`Ascent`),B===`launch`?(_=t<.35?.15+Math.random()*.2:Math.min(1.55,.3+Ft((t-.35)/2.25)**1.4*1.25),Ke&&(_=1.55),v=Ke?.35:.1):_=0;let a=Tt+.45*r*r+1.3*r*r*r;G.set(0,a-PSH,0),pt=PS,an(Z,Q);let o=q(0,1.4,r),s=Math.max(0,a-6)*.92;Y.set(Z.x*(1-o*.6),Z.y+s,Z.z+Math.min(3.5,Math.max(0,a-3)*.12)),X.set(Q.x*(1-o),h.lerp(Q.y,a+.4,o),0),B===`pad`&&(Y.x+=Math.sin(e*.13)*.25+j.x*.35,Y.y+=Math.sin(e*.17)*.08+j.y*.15),Gt=q(4,50,Y.y),k&&k.update(e,{swing:B===`launch`?Ft(t/1.6):0,clamps:Ft((t-Mt+.25)/.4),alarm:+(B===`launch`),burn:0}),T.group.updateMatrixWorld();let l=T.group.localToWorld(Z.copy(T.nozzle));if(Ve>.3&&!Ke&&k)for(let e=en(`vent`,7*A,c);e>0;e--){let e=k.vents[Math.floor(Math.random()*k.vents.length)];E.emit({pos:e,vel:Q.set((Math.random()-.6)*.5,-.12,.2),spread:.15,size:.22,grow:5,life:3.2,tone:1,alpha:.28*Ee,drag:1.4,buoy:-.05})}if(B===`launch`){t<.9&&O.emit(l,Q.set(0,-3,0),en(`ign`,(n?160:420)*A,c),7,1.1),_>.5&&O.emit(l,Q.set(0,-6,0),en(`emb`,(n?30:80)*_*A,c),9,.9);let e=Ft((t-.35)/2.25);if(k&&r<4){let t=1-q(1.5,4,r);for(let r of k.trench)for(let i=en(r.d.x<0?`trL`:`trR`,(n?22:62)*e*t*A,c);i>0;i--)ye.emit({pos:r.p,vel:Q.copy(r.d).multiplyScalar(6+Math.random()*5).add(Zt.set(0,.5+Math.random()*1.5,(Math.random()-.5)*3.5)),spread:1.4,jitter:.4,size:1.2,grow:8,life:6.5,heat:.3,tone:.5,alpha:.82*Ee,drag:.5,buoy:.5});for(let r=en(`ring`,(n?16:44)*Math.max(0,e-.12)*t*A,c);r>0;r--){let e=Math.random()*Math.PI*2,t=Math.random()<.35;ye.emit({pos:Zt.set(Math.cos(e)*1.1,wt+.3,Math.sin(e)*1.1),vel:Q.set(Math.cos(e)*(t?2:5.5),t?2.2:.5,Math.sin(e)*(t?2:5.5)),spread:1.2,jitter:.4,size:1.1,grow:t?5:6.5,life:6,heat:.15,tone:.55,alpha:.7*Ee,drag:.6,buoy:t?.45:.3})}}let i=(Ke?n?26:60:(n?12:26)*e)*A;for(let e=en(`col`,i,c);e>0;e--)E.emit({pos:l,vel:Q.set(0,Ke?-6-Math.random()*4:-5,0),spread:1.6,jitter:.25,size:Ke?.7:.5,grow:6,life:Ke?7:3,heat:.8,tone:.62,alpha:.5*Ee,drag:.9,buoy:.05});te.position.set(l.x,Math.max(wt+.6,l.y-1.2),l.z+.6),te.intensity=0*(1-q(6,20,G.y))*(.85+Math.random()*.3)}if(k&&Ke){if(!qe&&G.y>37){qe=!0,$e();let e=Math.max(8,Math.round((n?16:34)*A));for(let t=0;t<e;t++){let n=t/e*Math.PI*2;E.emit({pos:Z.set(Math.cos(n)*.6,G.y+.6,Math.sin(n)*.6),vel:Q.set(Math.cos(n)*7,-1.5,Math.sin(n)*7),spread:1,size:.6,grow:5,life:1.4,tone:1,alpha:.7,drag:2.2,buoy:0})}}qe&&D.repel(G,9,60*c*60*.016,7),D.update(c);let e=q(35,39,Y.y)*(1-q(45,52,Y.y));Et=Math.max(Et,e*.85),!Je&&Y.y>41&&(Je=!0,B=`arrive`,Ye=0,Et=1,sn(!0),E.clear(),O.update(10),on(Y,X,0),Vt.copy(Y),Ht.copy(X),G.set(M.x-f*.15,M.y-u-3.2,0),ut.copy(G),Kt=1,k&&(k.group.visible=!1),ye.mesh.visible=!1,D.shift(0,0,-20),setTimeout(()=>{Ge?.(),Ge=null},250/We))}}if(B===`arrive`||B===`fly`){Ye+=s;let t=z();B===`fly`&&t.i!==I&&I!==-1&&Qe(Ft(.3+Math.abs(St)/45)),I=t.i;let n=Z.set(M.x+t.x*f*.92,M.y+t.y*u*.85,M.z),r=p*t.s;y=t.o;let i=Math.abs(St);_=.45+Math.min(1.1,i/26),v=Math.min(.6,i/80),B===`arrive`&&(_=Math.max(_,1.4-Ye*.35),ce=Ye<1.6&&m?`Ascent`:null),Fe.length>1&&t.a>=Fe.length-2?gt+=(0-gt)*J(3,s):St<-2.5?gt+=(1-gt)*J(4,s):St>2.5&&(gt+=(0-gt)*J(4,s));let a=gt*Math.PI-Math.atan2(ft.x*.06,1.2+i*.04)*(gt>.5?-1:1),o=.5+Math.sin(vt)*.55-ft.x*.04,c=B===`arrive`?1.6+Math.min(2.6,Ye*1.8):4.2,d=U>0&&U<1?q(0,.3,U)*(1-q(.88,1,U)):0;if(d>0){a*=1-d,o*=1-d,_=h.lerp(_,.3,d);let e=q(.3,.45,U)*(1-q(.82,.92,U));y*=1-e,ae=1-d}if(Xe>0&&H){let e=Pt(Math.min(1,Xe/.75));Ne(H.x,H.y,Q);let t=H.h/(Nt*Pe());n.lerp(Q,e),r+=(t-r)*e,a+=(H.tilt-a)*e,o+=(.5-o)*Math.min(1,Xe/.4),y=Xe<.78?y:Math.max(0,1-(Xe-.78)/.12),_*=1-e*.6,c=12,ae=Math.min(ae,1-q(0,.3,Xe))}if(G.lerp(n,J(c,s)),B===`arrive`&&Ye>.6&&G.distanceTo(n)<.2&&(B=`fly`),pt+=(r-pt)*J(7,s),yt+=(a-yt)*J(6,s),vt+=s*(.35+i*.012),T.group.rotation.y+=(o-T.group.rotation.y)*J(d>0||Xe>.4?6:3,s),on(Ut,Wt,ae),B===`fly`&&Vt.distanceToSquared(Ut)<1e-6)Vt.copy(Ut),Ht.copy(Wt);else{let e=J(B===`arrive`?3:8,s);Vt.lerp(Ut,e),Ht.lerp(Wt,e)}if(Y.copy(Vt),X.copy(Ht),Y.x+=Math.sin(e*.21)*.06*ae,Y.y+=Math.sin(e*.17+1)*.05*ae,d>0){T.group.position.copy(G),T.group.scale.setScalar(pt),T.group.rotation.set(0,T.group.rotation.y,yt,`ZXY`),T.group.updateMatrixWorld();let e=T.porthole.getWorldPosition(Q),t=T.portholeRadius*pt,n=Math.min(window.innerWidth,window.innerHeight)*(l()?.26:.17),r=t*window.innerHeight/(2*Math.tan(h.degToRad(35/2))*n),i=1-.35*q(.3,.5,U)*(1-q(.82,.92,U)),a=Pt(d);Y.lerp(Z.set(e.x,e.y,e.z+r*i),a),X.lerp(e,a)}if(T.group.updateMatrixWorld(),ht>.3&&d<.5){let e=T.group.localToWorld(Z.copy(T.nozzle)),t=Q.set(0,-1,0).applyQuaternion(T.group.quaternion),n=en(`trail`,(14+i*4.5+(B===`arrive`?40:0))*A,s);n>0&&Zt.copy(t).multiplyScalar(2.2+i*.05);for(let t=0;t<n;t++)E.emit({pos:e,vel:Zt,spread:.35,jitter:.06,size:.3*pt,grow:5.5,life:1.8+Math.min(1.6,i/30),heat:.45,tone:.62,alpha:.34*Ee,drag:1.1,buoy:.05});i>18&&O.emit(e,t.multiplyScalar(5),en(`emb2`,i*.6*A,s),2,.6)}let g=-(ue/window.innerHeight)*2*u;E.shift(0,g),O.shift(0,g),Jt.y+=g*1.6,Gt+=(1-Gt)*J(2,s)}let fe=35,C=0,pe=0;if(W>=0){W+=s;let e=q(0,1.2,W);if(!ot)C=e,pe=q(0,.3,W),fe=35+40*e**1.6,re=Math.max(re,e*.3),_=Math.max(_,.9+e*.35),v=Math.max(v,e*.5),W>=1.25&&(ot=!0,Et=.7,tt(),st?.(),st=null);else{let e=W-1.25;C=Math.max(0,1-e*4),pe=1-q(.2,1.4,e),fe=35-6*Math.sin(Math.min(1,e*2.5)*Math.PI)*Math.max(0,1-e)}}Ot+=(pe-Ot)*J(6,s),It+=(fe-It)*J(ot&&W<1.6?18:6,s),a.fov!==35&&(a.fov=35,a.updateProjectionMatrix()),Lt.fov=It,Lt.aspect=a.aspect,Lt.near=a.near,Lt.far=a.far,Lt.updateProjectionMatrix(),at.value.copy(Lt.projectionMatrix),ft.subVectors(G,ut).divideScalar(Math.max(s,.001)),ht+=(y-ht)*J(7,s),T.group.position.copy(G);let he=K*.01;if(T.group.position.x+=(Math.random()-.5)*he,T.group.position.y+=(Math.random()-.5)*he,T.group.scale.setScalar(pt),B===`pad`||B===`launch`?T.group.rotation.set(0,B===`launch`?.35*(1-Pt(Ft(V/Mt)))+Pt(Ft((V-Mt*.4)/(Mt+1.2)))*Math.PI*2:.35+Math.sin(e*.8)*.12,0):T.group.rotation.z=yt,T.update(e,0,0),T.setOpacity(ht),nn=0,Ze(0),K+=(re-K)*J(re>K?10:3,s),a.position.copy(Y),a.lookAt(X),(B===`pad`||B===`launch`)&&(a.updateMatrixWorld(),N(Z.copy(a.position).addScaledVector(S,50),$)?Bt.set($.x/window.innerWidth,1-$.y/window.innerHeight):Bt.set(2,2)),K>.004){let t=Math.sin(e*47.3)*.6+Math.sin(e*91.7+1.3)*.4+(Math.random()-.5)*.5,n=Math.sin(e*53.1+2.1)*.6+Math.sin(e*77.9)*.4+(Math.random()-.5)*.5;a.translateX(t*K*.12),a.translateY(n*K*.12),a.rotateZ(Math.sin(e*29)*K*.012);let r=t*K*14,i=n*K*11;for(let e of g)e.style.transform=`translate3d(${r.toFixed(1)}px, ${i.toFixed(1)}px, 0) scale(${(1+K*.05).toFixed(3)})`}else if(g[0].style.transform)for(let e of g)e.style.transform=``;a.updateMatrixWorld(),oe.set(Math.max(ie.x,.3875*Math.min(a.aspect,4)),ie.y,ie.z).normalize(),S.lerpVectors(ne,oe,q(.5,1,Gt)),b.position.copy(X).addScaledVector(S,20),b.target.position.copy(X),B===`pad`||B===`launch`?(x.position.set(4,9,10),x.target.position.set(0,2,0),b.position.set(-10,4,-18),b.target.position.set(0,2,0)):(b.position.copy(G).add(Z.set(-6,7,6)),b.target.position.copy(G),x.position.copy(G).add(Z.set(6,2,-5)),x.target.position.copy(G),ee.position.copy(G).add(Z.set(2.5,-2,3.5)));let ge=se.mat.uniforms;ge.uAlt.value=Gt,ge.uSunDir.value.copy(S),ge.uTime.value=e,se.mesh.position.copy(a.position);let ve=q(.55,.95,Gt);Kt*=Math.exp(-s*1.4);let be=me.mat.uniforms,Se=C*C*900;Z.set(0,-(St*60/window.innerHeight)*2*je().h*.7-Kt*40,Se),qt.addScaledVector(Z,s),be.uOffset.value.copy(qt),be.uVel.value.copy(Z),be.uStreak.value=.05-C*.035,be.uBoost.value=C*4,ge.uSunBoost.value=1-Ot,be.uAlpha.value=ve,be.uTime.value=e,be.uPx.value=1.5*o.getPixelRatio(),be.uRes.value.set(window.innerWidth*o.getPixelRatio(),window.innerHeight*o.getPixelRatio()),O.mat.uniforms.uRes.value.copy(be.uRes.value),O.mat.uniforms.uWidth.value=1.6*o.getPixelRatio();let Te=_e.mat.uniforms;Jt.x+=s*.05,Jt.z+=s*(.15+C*40),Te.uOffset.value.copy(Jt),Te.uCenter.value.set(M.x,M.y,M.z+5.5),Te.uAlpha.value=(B===`fly`||B===`arrive`)*(n?.8:1),Te.uTime.value=e;let Ae=T.group.localToWorld(Z.copy(T.nozzle));for(let e=0;e<2;e++){let t=Oe[e];t.mat.uniforms.uFlamePos.value.copy(Ae),t.mat.uniforms.uFlamePow.value=_*ht*(B===`launch`?1.1:.32)}Q.copy(S).transformDirection(a.matrixWorldInverse),$.set(Q.x,Q.y).normalize();for(let e of Oe)e.mat.uniforms.uSunView.value.copy($);E.update(c,B===`pad`?.05:0),k&&ye.update(c,.04),O.update(c,B===`fly`||B===`arrive`?-1.5:-7),k&&!qe&&D.update(c),Je&&k&&(D.shift(0,-s*(6+Kt*26),0),D.mat.uniforms.uOpacity.value=1-q(.3,2.5,Ye),Ye>3&&cn()),Et*=Math.exp(-s*(Je&&Ye<.5?2.5:5));let Me=N(Ae,$),Ie=T.group.localToWorld(Q.copy(T.nozzle).addScaledVector(Qt,1.6+_));N(Ie,Xt);let Le=o.getPixelRatio();Ce.uTime.value=e,Ce.uHazeO.value.set($.x/window.innerWidth,1-$.y/window.innerHeight);let Re=Xt.x-$.x,ze=-(Xt.y-$.y),P=Math.hypot(Re,ze)||1;Ce.uHazeDir.value.set(Re/P,ze/P),Ce.uHazeLen.value=P*Le*1.4,Ce.uHazeW.value=Math.max(6,pt*Pe()*.32)*Le,Ce.uHaze.value=Me&&De?Math.min(1.2,_)*ht*(B===`launch`?1.5:.8)*Le:0,Ce.uWarp.value=C,Ce.uAberr.value=De?K*.012+C*.05:0,Z.copy(a.position).addScaledVector(S,50);let F=N(Z,$);if(we.uSun.value.set($.x/window.innerWidth,1-$.y/window.innerHeight),Rt){let e=we.uSun.value.x,t=we.uSun.value.y;zt=(F?q(-.15,.05,Math.min(e,t,1-e,1-t)):0)*(ve*.85+(1-ve)*.1)*(1-C)}let L=Bt.x,R=Bt.y;if(B===`fly`||B===`arrive`){let e=Math.tan(h.degToRad(a.fov/2)),t=Math.max(.001,-S.z);L=S.z<0?.5+.5*S.x/t/(e*a.aspect):2,R=S.z<0?.5+.5*S.y/t/e:2}let He=q(-.15,.05,Math.min(L,R,1-L,1-R))*(ve*.85+(1-ve)*.1)*(1-Ot);Dt+=(He-Dt)*J(Ot>.01?8:2,s),we.uSunVis.value=Dt,we.uFlash.value=Math.min(1,Et),we.uFlashCol.value.setRGB(.92,.95,1),we.uTime.value=e,we.uVignette.value=.5+C*.4,ge.uFlash.value=0,xe.bloom.strength=(B===`pad`||B===`launch`?.55:.48)+C*.15,(B===`launch`||B===`arrive`||C>0||Et>.05)&&w(400);let et=Be(),nt=(B===`fly`||B===`arrive`)&&Vt.distanceToSquared(Ut)<1e-4&&ht<.004&&y<.004&&Math.abs(St)<.35&&de<.01&&Et<.01&&K<.004&&C===0&&Kt<.01&&!E.alive,it=et===2?0:nt?15:60;if(it!==un&&(un=it,r.setFps(it)),tn+=s,tn>.1){tn=0;let e=0,t=0;if(B===`pad`||B===`launch`)e=Math.max(0,G.y-Tt)*.26,t=ft.y*.022;else{let n=document.documentElement.scrollHeight-window.innerHeight;e=100+(n>0?le/n:0)*380,B===`arrive`&&m&&(e=h.lerp(12,e,q(0,2.2,Ye))),t=7.6+Math.min(4,Math.abs(St)*.06)+nn*.15+C*C*29e4}let n=B!==`pad`&&ht>-1;window.dispatchEvent(new CustomEvent(`nuuke:hud`,{detail:{show:n,stage:ce,alt:e,vel:t,t:i/1e3-ct}}))}if(rt){if(U>0&&U<1){let e=T.porthole.getWorldPosition(Z),t=N(e,$);Q.setFromMatrixColumn(a.matrixWorld,0).multiplyScalar(T.portholeRadius*pt).add(e),N(Q,Xt);let n=q(.3,.45,U)*(1-q(.82,.92,U)),r=Q.set(0,0,1).transformDirection(T.porthole.matrixWorld),i=Yt.copy(a.position).sub(e).normalize();rt({x:$.x,y:$.y,r:Math.hypot(Xt.x-$.x,Xt.y-$.y),open:n,visible:t&&(ht>.02||n>.5),facing:r.dot(i),near:q(.12,.26,U)*(1-q(.9,.98,U))})}else rt({x:0,y:0,r:0,open:0,visible:!1,facing:0,near:0})}}),Rt&&(window.__hj=()=>({mode:B,film:U,curOpacity:ht,finale:Xe,warpT:W,seq:V,fov:a.fov,bfov:It,scr:(N(T.group.position,Xt),[Math.round(Xt.x),Math.round(Xt.y)]),px:Math.round(pt*Nt*Pe()),facing:gt,rotZ:yt,cam:a.position.toArray(),rocket:G.toArray(),scale:pt,sunVis:we.uSunVis.value,sunRaw:zt,sun:we.uSun.value.toArray(),fps:un,smoke:E.alive,look:j.toArray(),sv:St,flash:Et,shakeAmp:K,starFlow:Kt,rigErr:Vt.distanceTo(Ut),camLook:X.toArray(),dir:a.getWorldDirection(new p).toArray()})),{setLoad:e=>Ve=e,launch:()=>new Promise(e=>{if(B!==`pad`)return e();Ge=e,B=`launch`,!ce&&!le&&ue(le=!0),V=0,He(Mt),ct=performance.now()/1e3+Mt}),skip:()=>{B===`launch`&&(We=3.2)},skipLaunch:()=>{cn(),B=`arrive`,Ye=0,sn(!0),Gt=1;let{h:e}=je();G.set(M.x,M.y-e-3,0),on(Y,X,0),Vt.copy(Y),Ht.copy(X),ct=performance.now()/1e3-30},setFinale:(e,t)=>{Xe=e,H=t,e>.8&&!rn&&H?(rn=!0,nt()):e<.5&&(rn=!1)},setFilm:e=>U=e,onPorthole:e=>rt=e,warp:e=>{W>=0||(W=0,ot=!1,st=e,et())},resetWarp:()=>{W=-1,ot=!1,st=null}}}export{It as initJourney};