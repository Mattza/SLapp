webpackJsonp([2,0],{0:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}var i=n(115),o=r(i),s=n(114),a=r(s),u=n(110),l=r(u),c=n(44),d=r(c),f=n(45),p=r(f),m=new a.default({routes:[{path:"/search",component:d.default},{path:"/search-result",component:p.default},{path:"/",component:d.default}]});o.default.use(a.default),o.default.prototype.$routz=m,new o.default({el:"#app",router:m,template:"<App/>",components:{App:l.default}})},30:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}function i(t){_.from.unshift(t.originId),_.from.length=_.from.length>3?3:_.from.length,_.to.unshift(t.destId),_.to.length=_.to.length>3?3:_.to.length,console.log(_,t)}Object.defineProperty(e,"__esModule",{value:!0});var o=n(68),s=r(o),a=n(69),u=r(a),l=n(67),c=r(l),d=n(46),f=r(d),p=[],m="quickresult",_=JSON.parse(localStorage.getItem(m));_||(_={from:[],to:[]});var v={fetch:function(t){return i(t),localStorage.setItem(m,(0,c.default)(_)),new u.default(function(e,n){f.default.post("api/search",t).then(function(t){p=t.data,e(p.map(function(t){return(0,s.default)(t,{detailed:!1})}))})})},get:function(){return p},quickResult:function(){return _}};e.default=v},44:function(t,e,n){n(108);var r=n(24)(n(65),n(113),"data-v-7ec8f895",null);t.exports=r.exports},45:function(t,e,n){n(106);var r=n(24)(n(66),n(111),"data-v-11d5752e",null);t.exports=r.exports},64:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(44),o=r(i),s=n(45),a=r(s);e.default={name:"app",components:{SearchForm:o.default,SearchResult:a.default}}},65:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(30),o=r(i);e.default={name:"searchForm",data:function(){return{model:{from:"",to:""},quickResult:o.default.quickResult(),searching:!1}},methods:{selectQuick:function(t,e){this.model[t]=e},search:function(){var t=this;this.searching=!0,o.default.fetch({destId:this.model.to,originId:this.model.from}).then(function(){t.searching=!1,t.$routz.replace("/search-result")})}}}},66:function(t,e,n){"use strict";function r(t){return t&&t.__esModule?t:{default:t}}Object.defineProperty(e,"__esModule",{value:!0});var i=n(30),o=r(i);e.default={name:"searchResult",data:function(){return{result:o.default.get()}},filters:{origin:function(t){return t.LegList.Leg[0].Origin.name},destination:function(t){return t.LegList.Leg[t.LegList.Leg.length-1].Destination.name},time:function(t){return t.Leg[0].Origin.time+" ⇒ "+t.Leg[t.Leg.length-1].Destination.time},typeImg:function(t){return"static/"+t+"-icon.svg"}},created:function(){0===this.result.length&&this.$routz.push("search")}}},106:function(t,e){},107:function(t,e){},108:function(t,e){},110:function(t,e,n){n(107);var r=n(24)(n(64),n(112),null,null);t.exports=r.exports},111:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ul",t._l(t.result,function(e){return n("li",{on:{click:function(t){e.detailed=!e.detailed}}},[n("div",{staticClass:"header"},[n("h3",[t._v("\n        "+t._s(t._f("time")(e.LegList))+" "+t._s(e.dur)+" min\n      ")]),t._v(" "),n("h5",[n("span",[t._v(t._s(t._f("origin")(e)))]),t._v(" "),n("span",[t._v("-")]),t._v(" "),n("span",[t._v(t._s(t._f("destination")(e)))])]),t._v(" "),n("button",{staticClass:"expander"},[t._v("+")])]),t._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.detailed,expression:"res.detailed"}],staticClass:"legList"},[t._l(e.LegList.Leg,function(r){return"WALK"!==r.type?[n("div",{attrs:{alt:r.name}},[n("img",{attrs:{src:t._f("typeImg")(r.type),width:"50"}}),t._v(" "),n("p",{staticClass:"time"},[t._v(t._s(r.Origin.time))]),t._v(" "),n("span",{staticClass:"line"},[t._v(t._s(r.line))])]),t._v(" "),r!==e.LegList.Leg[e.LegList.Leg.length-1]?n("p",{staticClass:"middle-station"},[t._v(t._s(r.Destination.name))]):t._e()]:t._e()})],2)])}))},staticRenderFns:[]}},112:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"app"}},[n("header",[n("h1",[n("router-link",{attrs:{to:"/"}},[t._v("\n        SLapp\n      ")])],1)]),t._v(" "),n("router-view")],1)},staticRenderFns:[]}},113:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("form",{on:{submit:function(e){e.preventDefault(),t.search()}}},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.model.from,expression:"model.from"}],attrs:{type:"text",placeholder:"Från"},domProps:{value:t.model.from},on:{input:function(e){e.target.composing||(t.model.from=e.target.value)}}}),t._v(" "),n("div",{staticClass:"quick-wrapper"},t._l(t.quickResult.from,function(e){return n("button",{staticClass:"btn btn-default",attrs:{type:"button"},on:{click:function(n){t.selectQuick("from",e)}}},[t._v(t._s(e))])})),t._v(" "),n("input",{directives:[{name:"model",rawName:"v-model",value:t.model.to,expression:"model.to"}],attrs:{type:"text",placeholder:"Till"},domProps:{value:t.model.to},on:{input:function(e){e.target.composing||(t.model.to=e.target.value)}}}),t._v(" "),n("div",{staticClass:"quick-wrapper"},t._l(t.quickResult.to,function(e){return n("button",{staticClass:"btn btn-default",attrs:{type:"button"},on:{click:function(n){t.selectQuick("to",e)}}},[t._v(t._s(e))])})),t._v(" "),n("button",{staticClass:"btn btn-primary",attrs:{disabled:t.searching}},[t._v("Sök")])])])},staticRenderFns:[]}}});
//# sourceMappingURL=app.js.map