var $ = require("dom");
var Data = require("data");
var Button = require("wdg.button");


exports.onPage = function() {
    var container = document.getElementById('Translations');
    $.clear( container );
    Data.getListOfTranslations().forEach(function (item) {
        $.add( container, $.tag('li', [
            new Button({
                type: 'simple',
                text: item.A + " / " + item.B,
                href: "#Lists/" + JSON.stringify(item)
            })
        ]));
    });
};
