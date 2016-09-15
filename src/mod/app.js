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
var Cfg = require("$").config;


exports.start = function() {
    document.getElementById('VERSION').textContent = "(" + Cfg.version + ")";
};
