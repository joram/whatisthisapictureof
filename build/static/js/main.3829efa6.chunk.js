(this.webpackJsonpweb=this.webpackJsonpweb||[]).push([[0],{10:function(e,t,a){e.exports=a(30)},15:function(e,t,a){},16:function(e,t,a){},30:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),o=a(1),s=a.n(o),r=(a(15),a(3)),c=a(4),l=a(9),g=a(8),u=(a(16),a(5)),h=a.n(u),m=a(7),d=a.n(m),p=function(e){Object(l.a)(a,e);var t=Object(g.a)(a);function a(){var e;Object(r.a)(this,a);for(var n=arguments.length,i=new Array(n),o=0;o<n;o++)i[o]=arguments[o];return(e=t.call.apply(t,[this].concat(i))).state={images:[],tags:[],waiting:!1},e}return Object(c.a)(a,[{key:"updateTags",value:function(e){var t=this;fetch("/api/v0/image/".concat(e),{method:"GET"}).then((function(e){return e.json()})).then((function(a){if(""===a.tags)setTimeout(t.updateTags.bind(t),1e3,e);else{var n=t.state;n.tags=a.tags,n.waiting=!1,t.setState(n)}}))}},{key:"onDrop",value:function(e){var t=this,a=new FormData,n=this.state;n.images=[],n.tags=[],n.waiting=!0,this.setState(n),e.forEach((function(e){a.append("file",e),a.append("filename",e.name)})),fetch("/api/v0/image",{method:"POST",body:a}).then((function(e){return e.json()})).then((function(a){console.log(a);var n=t.state;n.images=e,t.setState(n),t.updateTags(a.id)}))}},{key:"render",value:function(){var e="";this.state.tags.length>0&&(e=this.state.tags.join(", ")),console.log(e);var t="";return this.state.waiting&&(t=i.a.createElement(h.a,{size:50,color:"#123abc",loading:this.state.loading})),i.a.createElement("div",{className:"App"},i.a.createElement("br",null),i.a.createElement("b",null,"all images given to this site are saved and publicly available. Please use discretion"),i.a.createElement("h1",null,e),t,i.a.createElement(d.a,{withIcon:!0,buttonText:"Choose image",onChange:this.onDrop.bind(this),imgExtension:[".jpg",".gif",".png",".gif",".jpeg"],maxFileSize:5242880,withPreview:!0,singleImage:!0}))}}]),a}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(i.a.StrictMode,null,i.a.createElement(p,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[10,1,2]]]);
//# sourceMappingURL=main.3829efa6.chunk.js.map