require("page.Translations",function(n,t,e){var a=function(){function t(){return a(e,arguments)}var e={en:{},fr:{}},a=n("$").intl;return t.all=e,t}(),r=n("dom"),i=n("data"),o=n("wdg.button");e.onPage=function(){var n=document.getElementById("Translations");r.clear(n),i.getListOfTranslations().forEach(function(t){r.add(n,r.tag("li",[new o({type:"simple",text:t.A+" / "+t.B,href:"#Lists/"+JSON.stringify(t)})]))})},t.exports._=a});
//# sourceMappingURL=page.Translations.js.map