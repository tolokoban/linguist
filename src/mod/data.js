/**
 * @module data
 *
 * @description
 * tout ce qui concerne les données.
 *
 * @example
 * var mod = require('data');
 */
var Storage = require("tfw.storage").local;

var data = Storage.get('Linguist', null);
if (!data || !Array.isArray(data.translations)) {
    data = {
        translations:[
            {
                A:"FR (test)",
                B:"EN (test)",
                lists:[
                    {
                        name:"Liste de Test",
                        items:[
                            {ok:0,ko:0,A:"arbre",B:"tree"},
                            {ok:0,ko:0,A:"chaise",B:"chair"},
                            {ok:0,ko:0,A:"chat",B:"cat"},
                            {ok:0,ko:0,A:"chien",B:"dog"},
                            {ok:0,ko:0,A:"coude",B:"elbow"},
                            {ok:0,ko:0,A:"fleur",B:"flower"},
                            {ok:0,ko:0,A:"genou",B:"knee"},
                            {ok:0,ko:0,A:"main",B:"hand"},
                            {ok:0,ko:0,A:"oiseau",B:"bird"},
                            {ok:0,ko:0,A:"pied",B:"foot"},
                            {ok:0,ko:0,A:"poire",B:"pear"},
                            {ok:0,ko:0,A:"pomme",B:"apple"},
                            {ok:0,ko:0,A:"serpent",B:"snake"},
                            {ok:0,ko:0,A:"table",B:"table"},
                            {ok:0,ko:0,A:"vache",B:"cow"},
                            {ok:0,ko:0,A:"tête",B:"head"}
                        ]
                    }
                ]
            }
        ],
        ko:0,
        ok:10
    };
}


exports.getListOfTranslations = function() {
    return data.translations.map(function(itm) {
        return {A: itm.A, B: itm.B};
    });
};
