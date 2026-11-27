import "./support-widget.js";
import{t as e}from"./motion.BXpYRfU6.js";import{o as t,t as n}from"./audio.BVyMN1l2.js";var r=`
attribute vec3 a_pos;      // x,y in [-1,1], z = depth 0..1
attribute float a_seed;
uniform float u_time;
uniform float u_scroll;
uniform vec2 u_res;
uniform float u_dpr;
varying float v_alpha;
void main() {
  float depth = a_pos.z;
  float y = a_pos.y + u_scroll * (0.05 + depth * 0.35);
  y = mod(y + 1.0, 2.0) - 1.0;
  float x = a_pos.x + sin(u_time * 0.02 + a_seed * 6.28) * 0.004 * depth;
  gl_Position = vec4(x, y, 0.0, 1.0);
  float tw = 0.55 + 0.45 * sin(u_time * (0.6 + a_seed * 1.8) + a_seed * 40.0);
  v_alpha = (0.25 + depth * 0.75) * tw;
  gl_PointSize = (0.6 + depth * depth * 2.2) * u_dpr;
}`,i=`
precision mediump float;
varying float v_alpha;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c);
  float a = smoothstep(0.5, 0.0, d) * v_alpha;
  gl_FragColor = vec4(vec3(1.0), a);
}`;function a(e){if(!e)return;let t=e.getContext(`webgl`,{alpha:!0,antialias:!1,premultipliedAlpha:!1,powerPreference:`low-power`});if(!t)return;let n=t.getExtension(`WEBGL_debug_renderer_info`),a=n?/swiftshader|llvmpipe|softpipe|software|basic render/i.test(String(t.getParameter(n.UNMASKED_RENDERER_WEBGL))):!1,o=window.matchMedia(`(prefers-reduced-motion: reduce)`).matches||a,s=(e,n)=>{let r=t.createShader(e);return t.shaderSource(r,n),t.compileShader(r),r},c=t.createProgram();if(t.attachShader(c,s(t.VERTEX_SHADER,r)),t.attachShader(c,s(t.FRAGMENT_SHADER,i)),t.linkProgram(c),!t.getProgramParameter(c,t.LINK_STATUS))return;t.useProgram(c);let l=window.innerWidth<700?650:1400,u=new Float32Array(l*4);for(let e=0;e<l;e++)u[e*4]=Math.random()*2-1,u[e*4+1]=Math.random()*2-1,u[e*4+2]=Math.random()**2.2,u[e*4+3]=Math.random();let d=t.createBuffer();t.bindBuffer(t.ARRAY_BUFFER,d),t.bufferData(t.ARRAY_BUFFER,u,t.STATIC_DRAW);let f=t.getAttribLocation(c,`a_pos`),p=t.getAttribLocation(c,`a_seed`);t.enableVertexAttribArray(f),t.vertexAttribPointer(f,3,t.FLOAT,!1,16,0),t.enableVertexAttribArray(p),t.vertexAttribPointer(p,1,t.FLOAT,!1,16,12);let m=t.getUniformLocation(c,`u_time`),h=t.getUniformLocation(c,`u_scroll`),g=t.getUniformLocation(c,`u_res`),_=t.getUniformLocation(c,`u_dpr`);t.enable(t.BLEND),t.blendFunc(t.SRC_ALPHA,t.ONE);let v=Math.min(window.devicePixelRatio||1,1.5),y=()=>{e.width=Math.round(window.innerWidth*v),e.height=Math.round(window.innerHeight*v),t.viewport(0,0,e.width,e.height),t.uniform2f(g,e.width,e.height),t.uniform1f(_,v)};y(),window.addEventListener(`resize`,y);let b=0,x=!0,S=performance.now(),C=()=>{let e=window.scrollY/window.innerHeight;b+=(e-b)*.08,t.clearColor(0,0,0,0),t.clear(t.COLOR_BUFFER_BIT),t.uniform1f(m,(performance.now()-S)/1e3),t.uniform1f(h,b),t.drawArrays(t.POINTS,0,l)},w=0,T=!1,E=(e=performance.now())=>{if(x&&!T){if(document.documentElement.classList.contains(`hj-gl`)){T=!0,t.getExtension(`WEBGL_lose_context`)?.loseContext();return}e-w>=15&&(w=e,C()),requestAnimationFrame(E)}};if(o){C();let e=0;window.addEventListener(`scroll`,()=>{if(document.documentElement.classList.contains(`hj-gl`))return;let t=performance.now();t-e>250&&(e=t,requestAnimationFrame(C))},{passive:!0})}else E(),document.addEventListener(`visibilitychange`,()=>{let e=x;x=!document.hidden,x&&!e&&E()})}a(document.getElementById(`starfield`)),e(),document.body.dataset.score!==`custom`&&(n(),t(.22,.8));