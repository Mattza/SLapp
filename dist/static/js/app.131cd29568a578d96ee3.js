webpackJsonp([2,0],{0:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var o=n(108),u=r(o),i=n(107),a=r(i),s=n(103),c=r(s),l=n(40),f=r(l),d=n(41),p=r(d),m=new a.default({routes:[{path:"/search",component:f.default},{path:"/search-result",component:p.default},{path:"/",component:f.default}]});u.default.use(a.default),u.default.prototype.$routz=m,new u.default({el:"#app",router:m,template:"<App/>",components:{App:c.default}})},27:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function o(t){p.from.unshift(t.originId),p.from.length=p.from.length>3?3:p.from.length,p.to.unshift(t.destId),p.to.length=p.to.length>3?3:p.to.length,console.log(p,t)}Object.defineProperty(e,"__esModule",{value:!0});var u=n(64),i=r(u),a=n(63),s=r(a),c=n(42),l=r(c),f=[],d="quickresult",p=JSON.parse(localStorage.getItem(d));p||(p={from:[],to:[]});var m={fetch:function(t){return o(t),localStorage.setItem(d,(0,s.default)(p)),new i.default(function(e,n){l.default.post("api/search",t).then(function(t){f=t.data,e(f)})})},get:function(){return f},quickResult:function(){return p}};e.default=m},40:function(t,e,n){var r,o;n(99),r=n(61);var u=n(104);o=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(o=r=r.default),"function"==typeof o&&(o=o.options),o.render=u.render,o.staticRenderFns=u.staticRenderFns,o._scopeId="data-v-394b0774",t.exports=r},41:function(t,e,n){var r,o;n(100),r=n(62);var u=n(105);o=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(o=r=r.default),"function"==typeof o&&(o=o.options),o.render=u.render,o.staticRenderFns=u.staticRenderFns,o._scopeId="data-v-cfd65ec2",t.exports=r},60:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(40),u=r(o),i=n(41),a=r(i);e.default={name:"app",components:{SearchForm:u.default,SearchResult:a.default}}},61:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(27),u=r(o);e.default={name:"searchForm",data:function(){return{model:{from:"",to:""},quickResult:u.default.quickResult(),searching:!1}},methods:{selectQuick:function(t,e){this.model[t]=e},search:function(){var t=this;this.searching=!0,u.default.fetch({destId:this.model.to,originId:this.model.from}).then(function(){t.searching=!1,t.$routz.replace("/search-result")})}}}},62:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var o=n(27),u=r(o);e.default={name:"searchResult",data:function(){return{result:u.default.get()}},filters:{origin:function(t){return t.LegList.Leg[0].Origin.name},destination:function(t){return t.LegList.Leg[t.LegList.Leg.length-1].Destination.name},time:function(t){return t.Leg[0].Origin.time+" ⇒ "+t.Leg[t.Leg.length-1].Destination.time},typeImg:function(t){return"static/"+t+"-icon.svg"}},created:function(){0===this.result.length&&this.$routz.push("search")}}},99:function(t,e){},100:function(t,e){},101:function(t,e){},103:function(t,e,n){var r,o;n(101),r=n(60);var u=n(106);o=r=r||{},"object"!=typeof r.default&&"function"!=typeof r.default||(o=r=r.default),"function"==typeof o&&(o=o.options),o.render=u.render,o.staticRenderFns=u.staticRenderFns,t.exports=r},104:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return e("div",[e("form",{on:{submit:function(e){e.preventDefault(),t.search()}}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.model.from,expression:"model.from"}],attrs:{type:"text",placeholder:"Från"},domProps:{value:t._s(t.model.from)},on:{input:function(e){e.target.composing||(t.model.from=e.target.value)}}})," ",e("div",{staticClass:"quick-wrapper"},[t._l(t.quickResult.from,function(n){return e("button",{staticClass:"btn btn-default",attrs:{type:"button"},on:{click:function(e){t.selectQuick("from",n)}}},[t._s(n)])})])," ",e("input",{directives:[{name:"model",rawName:"v-model",value:t.model.to,expression:"model.to"}],attrs:{type:"text",placeholder:"Till"},domProps:{value:t._s(t.model.to)},on:{input:function(e){e.target.composing||(t.model.to=e.target.value)}}})," ",e("div",{staticClass:"quick-wrapper"},[t._l(t.quickResult.to,function(n){return e("button",{staticClass:"btn btn-default",attrs:{type:"button"},on:{click:function(e){t.selectQuick("to",n)}}},[t._s(n)])})])," ",e("button",{staticClass:"btn btn-primary",attrs:{disabled:t.searching}},["Sök"])])])},staticRenderFns:[]}},105:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return e("ul",[t._l(t.result,function(n){return e("li",[e("h3",["\n      "+t._s(t._f("time")(n.LegList))+" "+t._s(n.dur)+" min\n    "])," ",e("h5",[e("span",[t._s(t._f("origin")(n))])," ",e("span",["-"])," ",e("span",[t._s(t._f("destination")(n))])])," ",e("div",{staticClass:"legList"},[t._l(n.LegList.Leg,function(n){return"WALK"!==n.type?e("div",{attrs:{alt:n.name}},[e("img",{attrs:{src:t._f("typeImg")(n.type),width:"50"}})," ",e("p",{staticClass:"time"},[t._s(n.Origin.time)])," ",e("span",{staticClass:"line"},[t._s(n.line)])]):t._e()})])])})])},staticRenderFns:[]}},106:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement;return e("div",{attrs:{id:"app"}},[e("header",[e("h1",[e("router-link",{attrs:{to:"/"}},["\n        SLapp\n      "])])])," ",e("router-view")])},staticRenderFns:[]}}});
//# sourceMappingURL=app.131cd29568a578d96ee3.js.map