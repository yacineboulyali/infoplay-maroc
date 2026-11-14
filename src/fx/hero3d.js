// Fond animé de la page d'accueil : nappes de couleurs floues (shader) + formes 3D flottantes.
// Bundle séparé (dist/hero3d.js), chargé uniquement sur l'accueil. Aucun appel réseau.
import {
  WebGLRenderer, Scene, OrthographicCamera, PerspectiveCamera, Mesh, PlaneGeometry, ShaderMaterial,
  Vector2, Color, IcosahedronGeometry, TorusGeometry, BoxGeometry, SphereGeometry, OctahedronGeometry,
  MeshPhysicalMaterial, HemisphereLight, DirectionalLight, Group, SRGBColorSpace,
} from 'three';

const VERT = /* glsl */`varying vec2 vUv; void main(){ vUv = uv; gl_Position = vec4(position.xy, 0.0, 1.0); }`;

const FRAG = /* glsl */`
precision highp float;
uniform float uTime; uniform vec2 uRes; uniform vec2 uMouse; uniform float uDark;
varying vec2 vUv;
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec2 mod289(vec2 x){return x-floor(x*(1.0/289.0))*289.0;}
vec3 permute(vec3 x){return mod289(((x*34.0)+1.0)*x);}
float snoise(vec2 v){
  const vec4 C=vec4(0.211324865405187,0.366025403784439,-0.577350269189626,0.024390243902439);
  vec2 i=floor(v+dot(v,C.yy)); vec2 x0=v-i+dot(i,C.xx);
  vec2 i1=(x0.x>x0.y)?vec2(1.0,0.0):vec2(0.0,1.0);
  vec4 x12=x0.xyxy+C.xxzz; x12.xy-=i1; i=mod289(i);
  vec3 p=permute(permute(i.y+vec3(0.0,i1.y,1.0))+i.x+vec3(0.0,i1.x,1.0));
  vec3 m=max(0.5-vec3(dot(x0,x0),dot(x12.xy,x12.xy),dot(x12.zw,x12.zw)),0.0); m=m*m; m=m*m;
  vec3 x=2.0*fract(p*C.www)-1.0; vec3 h=abs(x)-0.5; vec3 ox=floor(x+0.5); vec3 a0=x-ox;
  m*=1.79284291400159-0.85373472095314*(a0*a0+h*h);
  vec3 g; g.x=a0.x*x0.x+h.x*x0.y; g.yz=a0.yz*x12.xz+h.yz*x12.yw; return 130.0*dot(m,g);
}
float fbm(vec2 p){ float f=0.0, a=0.5; for(int i=0;i<4;i++){ f+=a*snoise(p); p*=2.02; a*=0.5; } return f; }
float hash(vec2 p){ return fract(sin(dot(p,vec2(12.9898,78.233)))*43758.5453); }
vec3 blob(vec3 col, vec2 w, vec2 c, float r, vec3 tint, float k){
  float d = length(w-c); float a = exp(-(d*d)/(r*r)); return mix(col, tint, a*k);
}
void main(){
  float asp = uRes.x/uRes.y;
  vec2 p = (vUv-0.5)*vec2(asp,1.0);
  float t = uTime*0.07;
  vec2 q = vec2(fbm(p*1.1+vec2(t,-t*0.6)), fbm(p*1.1+vec2(-t*0.8,t)+3.7));
  vec2 w = p + 0.42*q;
  vec3 base = mix(vec3(0.969,0.949,0.910), vec3(0.075,0.09,0.17), uDark);
  vec3 col = base;
  float k = mix(0.62, 0.55, uDark);
  col = blob(col, w, vec2( 0.45*asp+0.10*sin(t*2.1), 0.18+0.12*cos(t*1.7)), 0.42, vec3(0.949,0.706,0.094), k);
  col = blob(col, w, vec2( 0.28*asp+0.14*cos(t*1.3), -0.30+0.10*sin(t*2.3)), 0.40, vec3(0.42,0.49,0.95), k);
  col = blob(col, w, vec2(-0.48*asp+0.08*sin(t*1.1), 0.42+0.06*cos(t*1.9)), 0.30, vec3(1.0,0.56,0.42), k*0.75);
  col = blob(col, w, vec2(-0.30*asp+0.10*cos(t*1.6), -0.45+0.08*sin(t*1.2)), 0.34, vec3(0.50,0.85,0.77), k*0.7);
  col = blob(col, w, vec2( 0.05*asp+0.20*sin(t*0.9), 0.55+0.05*cos(t*1.4)), 0.26, vec3(0.73,0.66,1.0), k*0.6);
  vec2 m = (uMouse-0.5)*vec2(asp,1.0);
  col = blob(col, w, m, 0.22, vec3(0.17,0.25,0.77), 0.28);
  // Voile clair à gauche : le texte reste lisible.
  float veil = smoothstep(0.15, -0.55*asp, p.x) * 0.55;
  col = mix(col, base, veil);
  col += (hash(vUv*uRes+fract(uTime))-0.5)*0.03;
  gl_FragColor = vec4(col, 1.0);
}`;

function mount(canvas) {
  if (!canvas || canvas.__hero) return () => {};
  let renderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'low-power' });
  } catch { canvas.classList.add('lp-nogl'); return () => {}; }
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.autoClear = false;

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const dark = document.documentElement.classList.contains('dark') || document.body.classList.contains('dark');

  // Couche 1 : nappes floues plein écran.
  const bgScene = new Scene();
  const bgCam = new OrthographicCamera(-1, 1, 1, -1, 0, 1);
  const uniforms = { uTime: { value: 0 }, uRes: { value: new Vector2(1, 1) }, uMouse: { value: new Vector2(0.75, 0.5) }, uDark: { value: dark ? 1 : 0 } };
  bgScene.add(new Mesh(new PlaneGeometry(2, 2), new ShaderMaterial({ vertexShader: VERT, fragmentShader: FRAG, uniforms, depthWrite: false, depthTest: false })));

  // Couche 2 : formes 3D flottantes (clavier, pixels, réseau…), légères et brillantes.
  const scene = new Scene();
  const cam = new PerspectiveCamera(40, 1, 0.1, 100); cam.position.set(0, 0, 12);
  scene.add(new HemisphereLight(0xffffff, 0xf2b418, 1.4));
  const sun = new DirectionalLight(0xffffff, 2.2); sun.position.set(4, 6, 8); scene.add(sun);
  const mat = (c, extra = {}) => new MeshPhysicalMaterial({ color: new Color(c), roughness: 0.25, metalness: 0.05, clearcoat: 1, clearcoatRoughness: 0.15, ...extra });
  const shapes = [
    { g: new IcosahedronGeometry(0.75, 0), m: mat('#f2b418'), p: [5.6, 2.7, -1] },
    { g: new TorusGeometry(0.62, 0.22, 24, 64), m: mat('#2b3fc4'), p: [6.6, -2.2, 0] },
    { g: new BoxGeometry(0.9, 0.9, 0.9, 1, 1, 1), m: mat('#ff8a6b'), p: [-7.6, 4.3, 0] },
    { g: new OctahedronGeometry(0.55, 0), m: mat('#7fd8c4'), p: [-7.2, -4.3, -2] },
    { g: new SphereGeometry(0.38, 32, 32), m: mat('#b9a8ff', { transmission: 0.4, thickness: 0.5 }), p: [2.4, 3.6, -3] },
    { g: new BoxGeometry(0.5, 0.5, 0.5), m: mat('#2b3fc4'), p: [3.4, -3.8, -2.5] },
    { g: new IcosahedronGeometry(0.32, 1), m: mat('#f2b418'), p: [0.6, -4.9, -3] },
  ];
  const group = new Group(); scene.add(group);
  const meshes = shapes.map((s, i) => {
    const me = new Mesh(s.g, s.m); me.position.set(...s.p); me.userData = { base: s.p.slice(), ph: i * 1.7, sp: 0.5 + (i % 3) * 0.18 };
    me.rotation.set(i, i * 0.6, 0); group.add(me); return me;
  });

  const target = new Vector2(0.75, 0.5); const look = new Vector2(0, 0);
  const onMove = (e) => {
    const r = canvas.getBoundingClientRect();
    target.set((e.clientX - r.left) / r.width, 1 - (e.clientY - r.top) / r.height);
  };
  window.addEventListener('pointermove', onMove, { passive: true });

  const resize = () => {
    const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false); uniforms.uRes.value.set(w, h);
    cam.aspect = w / h; cam.updateProjectionMatrix();
    // Sur écran étroit (texte sur toute la largeur), seul le fond flou reste : les formes gêneraient la lecture.
    group.visible = w >= 860;
    const sx = Math.min(1, (w / h) / 1.6);
    meshes.forEach((me) => { me.position.x = me.userData.base[0] * sx; });
  };
  const ro = new ResizeObserver(resize); ro.observe(canvas); resize();

  let visible = true;
  const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }); io.observe(canvas);

  const start = performance.now(); let raf = 0; let disposed = false;
  const draw = (now) => {
    const t = reduce ? 8 : (now - start) / 1000;
    uniforms.uTime.value = t;
    uniforms.uMouse.value.lerp(target, 0.04);
    look.lerp(new Vector2((target.x - 0.5) * 1.2, (target.y - 0.5) * 0.8), 0.05);
    cam.position.x = look.x; cam.position.y = look.y; cam.lookAt(0, 0, 0);
    meshes.forEach((me) => {
      const u = me.userData;
      me.position.y = u.base[1] + Math.sin(t * u.sp + u.ph) * 0.35;
      me.rotation.x += reduce ? 0 : 0.003 * u.sp; me.rotation.y += reduce ? 0 : 0.004 * u.sp;
    });
    renderer.clear(); renderer.render(bgScene, bgCam); renderer.clearDepth(); renderer.render(scene, cam);
  };
  const loop = (now) => {
    if (disposed) return;
    if (!canvas.isConnected) { dispose(); return; }
    if (visible && !document.hidden) draw(now);
    raf = requestAnimationFrame(loop);
  };
  function dispose() {
    disposed = true; cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
    window.removeEventListener('pointermove', onMove);
    meshes.forEach((me) => { me.geometry.dispose(); me.material.dispose(); });
    renderer.dispose(); canvas.__hero = null;
  }
  canvas.__hero = dispose;
  if (reduce) { draw(start); const iv = setInterval(() => { if (!canvas.isConnected) { clearInterval(iv); dispose(); } }, 2000); }
  else raf = requestAnimationFrame(loop);
  canvas.classList.add('lp-gl-on');
  return dispose;
}

window.InfoPlayHero3D = { mount };
