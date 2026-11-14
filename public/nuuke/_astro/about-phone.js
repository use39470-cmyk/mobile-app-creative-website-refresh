import {
  f as createScreenTexture,
  h as AmbientLight,
  D as DirectionalLight,
  s as createRenderer,
  u as createPhone,
} from "./core.DZalETXP.js";

const screenArtwork = `
<svg xmlns="http://www.w3.org/2000/svg" width="620" height="1270" viewBox="0 0 620 1270">
  <defs>
    <linearGradient id="glass" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#171725"/><stop offset="1" stop-color="#090b12"/>
    </linearGradient>
    <linearGradient id="pink" x1="0" x2="1" y2="1">
      <stop stop-color="#ff2e88"/><stop offset="1" stop-color="#a33dff"/>
    </linearGradient>
    <linearGradient id="mint" x1="0" x2="1" y2="1">
      <stop stop-color="#52efd0"/><stop offset="1" stop-color="#779aff"/>
    </linearGradient>
  </defs>
  <rect width="620" height="1270" rx="58" fill="url(#glass)"/>
  <text x="46" y="77" fill="#f8f5fa" font-family="Arial,sans-serif" font-size="24" font-weight="700">9:41</text>
  <g fill="none" stroke="#f8f5fa" stroke-width="8" stroke-linecap="round">
    <path d="M481 67h34M490 53h25M499 39h16"/>
    <rect x="541" y="41" width="36" height="28" rx="6"/>
  </g>
  <path d="M82 187h456" stroke="#fff" stroke-opacity=".09" stroke-width="2"/>
  <g transform="translate(80 250)">
    <rect width="76" height="76" rx="19" fill="url(#pink)"/>
    <rect x="88" width="76" height="76" rx="19" fill="#e59aff"/>
    <rect y="88" width="76" height="76" rx="19" fill="#f8a0d0"/>
    <rect x="88" y="88" width="76" height="76" rx="19" fill="#ca76ff"/>
    <rect x="132" y="132" width="24" height="24" rx="7" fill="#fae5ff"/>
    <path d="M139 151v-7a5 5 0 0 1 10 0v7m-12-4h14v9h-14z" fill="none" stroke="#8c35bd" stroke-width="2.5"/>
    <text x="192" y="43" fill="#fff" font-family="Arial,sans-serif" font-size="26" font-weight="700">MOBILE APP</text>
    <text x="192" y="79" fill="#fff" font-family="Arial,sans-serif" font-size="26" font-weight="700">CREATIVE</text>
    <text x="194" y="110" fill="#aaa7b9" font-family="Arial,sans-serif" font-size="15" letter-spacing="2">BY SAINESTACK</text>
  </g>
  <text x="80" y="555" fill="#ff76b4" font-family="Arial,sans-serif" font-size="18" font-weight="700" letter-spacing="5">MAKE IT MATTER</text>
  <text x="80" y="635" fill="#fff" font-family="Arial,sans-serif" font-size="50" font-weight="700">Big ideas.</text>
  <text x="80" y="697" fill="#fff" font-family="Arial,sans-serif" font-size="50" font-weight="700">Built to move.</text>
  <text x="80" y="748" fill="#aaa7b9" font-family="Arial,sans-serif" font-size="21">Digital experiences with a human pulse.</text>
  <rect x="80" y="805" width="460" height="155" rx="25" fill="#ffffff" fill-opacity=".055" stroke="#ffffff" stroke-opacity=".1"/>
  <rect x="103" y="828" width="106" height="108" rx="18" fill="url(#mint)" fill-opacity=".9"/>
  <path d="M131 904l21-34 18 24 12-14 16 24z" fill="#07121b" fill-opacity=".85"/>
  <circle cx="178" cy="851" r="8" fill="#fff"/>
  <text x="234" y="858" fill="#fff" font-family="Arial,sans-serif" font-size="20" font-weight="700">DESIGN THAT</text>
  <text x="234" y="891" fill="#fff" font-family="Arial,sans-serif" font-size="20" font-weight="700">GOES PLACES</text>
  <rect x="234" y="912" width="170" height="7" rx="4" fill="#a5a2b4" fill-opacity=".7"/>
  <rect x="80" y="1005" width="460" height="66" rx="33" fill="url(#pink)"/>
  <text x="310" y="1048" text-anchor="middle" fill="#fff" font-family="Arial,sans-serif" font-size="19" font-weight="700">LET’S MAKE SOMETHING GREAT</text>
  <path d="M80 1140h460" stroke="#fff" stroke-opacity=".1" stroke-width="2"/>
  <circle cx="148" cy="1195" r="17" fill="#ff2e88"/>
  <circle cx="310" cy="1195" r="17" fill="#fff" fill-opacity=".22"/>
  <circle cx="472" cy="1195" r="17" fill="#fff" fill-opacity=".22"/>
</svg>`;

export async function initPhone(canvas, anchor, onReady) {
  const texture = await createScreenTexture(screenArtwork, 620, 1270);
  const view = createRenderer(canvas, { fov: 30, z: 12, env: true });
  const { scene, camera, pointer } = view;
  const phone = createPhone(texture, { w: 1.55, h: 3.2, color: 0x171820 });
  const body = phone.group;
  body.rotation.set(-0.07, -0.1, -0.075);
  body.position.z = 0;
  scene.add(body);

  const fill = new AmbientLight(0xffffff, 1.45);
  scene.add(fill);
  const key = new DirectionalLight(0xffe8f2, 3.1);
  key.position.set(-3, 5, 7);
  scene.add(key);
  const edge = new DirectionalLight(0xff2e88, 2.0);
  edge.position.set(4, 0, -4);
  scene.add(edge);
  const cool = new DirectionalLight(0x888cff, 1.2);
  cool.position.set(-4, -2, -2);
  scene.add(cool);

  const viewport = canvas.getBoundingClientRect();
  if (viewport.width && viewport.height) {
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 1.5);
    if (view.renderer.getPixelRatio() > pixelRatio) {
      view.renderer.setPixelRatio(pixelRatio);
      view.invalidate();
    }
  }

  let launchProgress = 0;
  let hasShown = false;
  let centerX = 0;
  let centerY = 0;

  const fitToOpening = () => {
    const opening = anchor.getBoundingClientRect();
    const rendererBox = canvas.getBoundingClientRect();
    const { width, height } = rendererBox;
    if (!opening.width || !opening.height || !width || !height) return;

    const viewHeight =
      2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    const viewWidth = viewHeight * camera.aspect;
    const x = (opening.left + opening.width / 2 - rendererBox.left) / width;
    const y = (opening.top + opening.height / 2 - rendererBox.top) / height;
    centerX = (x * 2 - 1) * viewWidth * 0.5;
    centerY = (1 - y * 2) * viewHeight * 0.5;
    const screenHeight = opening.height * 0.82;
    body.scale.setScalar((screenHeight / height) * (viewHeight / 3.2));
  };

  fitToOpening();
  const resizeObserver = new ResizeObserver(fitToOpening);
  resizeObserver.observe(anchor);
  resizeObserver.observe(canvas);

  view.onFrame((time) => {
    fitToOpening();
    body.position.set(
      centerX,
      centerY + Math.sin(time * 0.75) * 0.08 + launchProgress * 3.1,
      0,
    );
    body.rotation.x = -0.07 - pointer.y * 0.12 + Math.sin(time * 0.55) * 0.025;
    body.rotation.y = -0.1 + pointer.x * 0.2 + Math.sin(time * 0.42) * 0.14;
    body.rotation.z = -0.075 + Math.sin(time * 0.58) * 0.035;

    if (!hasShown) {
      hasShown = true;
      onReady();
      anchor.setAttribute("data-phone-ready", "true");
    }
  });

  const dispose = () => {
    resizeObserver.disconnect();
    view.dispose();
    texture.dispose();
  };
  window.addEventListener("pagehide", dispose, { once: true });

  return {
    setLaunch(progress) {
      launchProgress = Math.max(0, Math.min(1, progress));
      view.invalidate();
    },
    dispose,
  };
}