import"./modulepreload-polyfill-B5Qt9EMX.js";import{S as p,W as w,P as g,q as u,r as b,o as L,V as v,p as x}from"./three.module-DxaTYix-.js";import{S,O as y}from"./OrbitControls-DoAQgh4R.js";import{G as C}from"./GLTFLoader-B-krw6he.js";function D(){const e=document.querySelector("#canvas");if(!e){console.error("Canvas element not found.");return}const a=new p,s=new w({antialias:!0,canvas:e}),i=new g(55,e.clientWidth/e.clientHeight,.1,100);i.position.set(0,0,2);const d=new u(16777215,1);d.position.set(1,1,1),a.add(d);const m=new b(16777215,.06);a.add(m);let r;r=new S,document.body.appendChild(r.dom),new C().load("../../models/bunny/10_textures.glb",t=>{const n=t.scene;n.position.y=new L().setFromObject(n).getSize(new v).y/-2,a.add(n),console.log("Model loaded:",n)},t=>{console.log(t.loaded/t.total*100+"% loaded")},t=>{console.error("An error happened",t)});const o=new y(i,s.domElement);o.listenToKeyEvents(window),o.enableDamping=!0,o.enablePan=!1,o.maxDistance=10,o.minDistance=.5;const f=new x;s.setAnimationLoop(h);function h(){f.getDelta(),o.update(),r.update(),s.render(a,i)}window.addEventListener("resize",c,!1),c();function c(){const t=Math.min(window.devicePixelRatio,2),n=Math.round(e.clientWidth*t),l=Math.round(e.clientHeight*t);s.setSize(n,l,!1),e.width=n,e.height=l,i.aspect=e.clientWidth/e.clientHeight,i.updateProjectionMatrix()}}D();