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


exports.start = function() {
    document.getElementById('VERSION').textContent = "(" + Build.config.version + ")";
};


exports.onLang = function(lang) {
    Build.lang( lang );
    location.reload();
};
