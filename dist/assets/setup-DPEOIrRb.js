import"./modulepreload-polyfill-B5Qt9EMX.js";import{S as c,P as d,W as m,B as w,M as p,a as l}from"./three.module-CmLSQrpk.js";import{W as t}from"./WebGL-ZRNCCUfb.js";if(t.isWebGL2Available())b();else{const e=t.getWebGL2ErrorMessage();document.body.appendChild(e)}function b(){const e=new c,i=new d(75,window.innerWidth/window.innerHeight,.1,1e3),n=new m;n.setSize(window.innerWidth,window.innerHeight),n.setAnimationLoop(s),document.body.appendChild(n.domElement);const r=new w(1,1,1),a=new p({color:10066329}),o=new l(r,a);e.add(o),i.position.z=5;function s(){o.rotation.x+=.01,o.rotation.y+=.01,n.render(e,i)}}