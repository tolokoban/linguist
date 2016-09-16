/**
 * @module linguist/app
 *
 * @description
 * 
 *
 * @example
 * var mod = require('linguist/app');
 */
var $ = require("dom");
var Build = require("$");
var Pages = {
    Translations: require("page.Translations")
};

exports.start = function() {
    document.getElementById('VERSION').textContent = "(" + Build.config.version + ")";
};


exports.onLang = function(lang) {
    Build.lang( lang );
    location.reload();
};


/**
 * Traitement de l'événement d'affichage d'une nouvelle page.
 * @param {string} id - identifiant de la page qui s'affiche.
 */
exports.onPage = function(id) {
    var page = Pages[id];
    if (page && typeof page.onPage === 'function') page.onPage();
};
