/**
 * Tous les générateurs  de wtags héritent de cette  classe qui contient
 * des fonctions utiles communes.
 */
window["TFW::wtag.Tag"] = {
    classInit: function(vars) {
        /**
         * Remplace un élément par un autre dans le DOM.
         */
        $replace = function(oldElem, newElem) {
            oldElem = $(oldElem);
            if (typeof newElem === 'string') {
                newElem = document.createTextNode(newElem);
            }
            var parent = oldElem.parentNode;
            parent.replaceChild(newElem, oldElem);
            return newElem;
        };

        /**
         * Créer  un  élément  du  DOM  avec le  nom  et  les  éventuels
         * attributs donnés.
         */
        $tag = function(name, attribs) {
            if (attribs === undefined) attribs = {};
            if (name === undefined) name = "div";
            var e = document.createElement(name),
            key, val;
            for (key in attribs) {
                val = attribs[key];
                e.setAttribute(key, val);
            }
            return e;
        };

        /**
         * Créer un élément DIV.
         */
        $div = function(attribs) {
           return $tag("div", attribs);
        };

        /**
         * Add a child to en element.
         */
        /**
         * 
         */
        $add = function(root, child) {
            $(root).appendChild($(child));
        };

        /**
         * Déplacer le contenu d'un élément vers un autre.
         */
        $moveContent = function(src, dst) {
            var i, child, children = [];
            if (!src) return null;
            src = $(src);
            dst = $(dst);
            for (i = 0 ; i < src.childNodes.length ; i++) {
                children.push(src.childNodes[i]);
            }
            children.forEach(
                function(child) {
                    src.removeChild(child);
                    dst.appendChild(child);
                }
            );
            return dst;
        };

        /**
         *  Copier tous les attributs "data-*"  ainsi que "id" et "lang"
         *  d'un élément vers un autre.
         */
        $copyAttribs = function(src, dst) {
            var i, att;
            src = $(src);
            dst = $(dst);
            for (i = 0 ; i < src.attributes.length ; i++) {
                att = src.attributes[i];
                dst.setAttribute(att.name, att.value);
            }
            return dst;
        },

        /**
         * Ajouter des slots pour les événements mouse/touch.
         */
        $events = function(element, slots) {
            element = $(element);
            var onTouchstart = function(evt) {
                if (slots.touchstart) {
                    slots.touchstart({target: element});
                    evt.stopPropagation();
                    evt.preventDefault();
                }
            },
            onTouchend = function(evt) {
                evt.preventDefault();
                if (slots.touchend) {
                    slots.touchend({target: element});
                    evt.stopPropagation();
                    evt.preventDefault();
                }
                if (slots.tap && evt.button == 0) {
                    slots.tap({target: element});
                    evt.stopPropagation();
                    evt.preventDefault();
                }
                if (slots.press && evt.button == 2) {
                    slots.press({target: element});
                    evt.stopPropagation();
                    evt.preventDefault();
                }
            };
            slots._type = null;
            element.addEventListener(
                "touchstart",
                function(evt) {
                    if (slots._type) return;
                    slots._type = "T";
                    onTouchstart(evt);
                },
                false
            );
            element.addEventListener(
                "mousedown",
                function(evt) {
                    if (slots._type) return;
                    slots._type = "M";
                    onTouchstart(evt);
                },
                false
            );
            element.addEventListener(
                "touchend",
                function(evt) {
                    if (slots._type == "T") {
                        onTouchend(evt);
                    }
                    delete slots._type;
                },
                false
            );
            element.addEventListener(
                "mouseup",
                function(evt) {
                    if (slots._type == "M") {
                        onTouchend(evt);
                    }
                    delete slots._type;
                },
                false
            );
            return element;
        };

        /**
         * Si une classe existe, l'enlever, sinon l'ajouter.
         * On peut passer un nombre variable de noms de classes en arguments.
         */
        $toggleClass = function(e) {
            var i, classname;
            e = $(e);
            for (i = 0 ; i < arguments.length ; i++) {
                classname = arguments[i];
                if ($hasClass(classname)) {
                    $removeClass(classname);
                } else {
                    $addClass(classname);
                }
            }
        };

        /**
         * Détermine si l'élément sous-jacent possède la classe CSS passée en argument.
         */
        $hasClass = function(e, cls) {
            var cn, rx;
            if (!e) return false;
            e = $(e);
            cn = e.className;
            if (!cn) return false;
            rx = new RegExp('(\\s|^)' + cls + '(\\s|$)');
            if (!cn.match(rx)) return false;
            return true;
        };

        /**
         * Chaque élément du DOM peut possèder une liste de classes CSS.
         * Avec cette méthode, on peut en ajouter une.
         */
        $addClass = function(e) {
            var i, cls;
            if (!e) return;
            e = $(e);
            for (i = 1 ; i < arguments.length ; i++) {
                cls = arguments[i];
                if (!e.className) {
                    e.className = cls;
                } else {
                    if (!$hasClass(e, cls)) e.className += " "+cls;
                }
            }
        };

        /**
         * Retire la classe passée en argument de la liste des classes CSS de l'élément sous-jacent.
         */
        $removeClass = function(e) {
            var reg, i, cls;
            if (!e) return this;
            e = $(e);
            for (i = 1 ; i < arguments.length ; i++) {
                cls = arguments[i];
                if ($hasClass(e, cls)) {
                    reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
                    e.className = e.className.replace(reg,' ');
                }
            }
        };

        $show = function(e) {
            $removeClass(e, "wtag-hidden", "wtag-hidden2", "wtag-hidden3");
        };
        
        $hide = function(e) {
            $addClass(e, "wtag-hidden", "wtag-hidden2", "wtag-hidden3");
        };

        $clear = function(e) {
            $(e).innerHTML = "";
        };

        $focus = function(e) {
            e = $(e);
            setTimeout(
                function() {
                    if (typeof e.focus === 'function') {
                        e.focus();
                    }
                },
                100
            );
        };

        $css = function(e, attribs) {
            e = $(e);
            var key, val;
            for (key in attribs) {
                val = attribs[key];
                e.style[key] = val;
            }
        };

        /**
         * Effectuer un document.querySelector().
         */
        $ = function(selector) {
            var elem = typeof selector === 'string' ? document.querySelector(selector) : selector;
            if (!elem) {
                throw new Error("Bad selector: \"" + selector + "\"!");
            }
            if (typeof elem === 'object') {
                if (!elem.nodeName && elem._element) {
                    // This is a widget.
                    return elem._element;
                }
            }
            return elem;
        };
    },
    
    init: function() {
        var element;
        if (typeof this._id === 'object') {
            element = this._id;
        } else {
            element = document.getElementById(this._id);
        }
        if (!element) {
            throw new Error("There is no element with id \"" + this._id + "\"!");
        }
        element.$widget = this;
        this._element = element;
        this._slots = {};
    },

    functions: {
        /**
         * Fire a "signal" up to the parents widgets.
         * If a slot returns false, the event is fired up to the parents.
         */
        fire: function(signal, arg, emitter) {
            var widget = this,
            slot;
            if (typeof emitter === 'undefined') emitter = this;
console.log("fire(" + signal + ")", arg);
            while (widget) {
                slot = widget._slots[signal];
                if (typeof slot === 'function') {
                    if (false !== slot.call(widget, arg, signal, emitter)) {
                        return;
                    }
                }
                widget = widget.parent();
            }
            console.warning("Signal lost: " + signal + "!");
        },

        /**
         * Register a  listener (the  function "slot") for  the signal
         * "signal". If  this slot  returns true, the  signal continue
         * its ascension towards parent widgets.
         */
        registerSignal: function(signal, slot) {
            this._slots[signal] = slot;
        },

        /**
         * Stop listening for the "signal".
         */
        unregisterSignal: function(signal) {
            delete this._slots[signal];
        },

        /**
         * Call the slot mapped to the "signal".
         * @param signal : name of the signal on which this object may be registred.
         * @param arg : argument to pass to the registred slot.
         */
        slot: function(signal, arg) {
            var slot = this._slots[signal];
            if (slot) {
                slot.call(this, arg, signal);
                return true;
            }
            return false;
        },

        /**
         * Get the parent widget.
         */
        parent: function() {
            var element = this._element;
            while (element.parentNode) {
                element = element.parentNode;
                if (element.$widget) {
                    return element.$widget;
                }
            }
            return null;
        },

        /**
         * Return or set the current language.
         */
        lang: function(id) {
            if (!$$.App) $$.App = this;
            if (!$$.App._languages) {
                // Initialise localization.
                var languages = [],
                langStyle = document.createElement("style"),
                children = document.querySelectorAll("[lang]");
                document.head.appendChild(langStyle);
                $$.App._langStyle = langStyle;
                for (var i = 0 ; i < children.length ; i++) {
                    var child = children[i];
                    lang = child.getAttribute("lang");
                    found = false;
                    for (k = 0 ; k < languages.length ; k++) {
                        if (languages[k] == lang) {
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        languages.push(lang);
                    }
                }
                $$.App._languages = languages;                
            }

            var that = this, lang, k, languages = $$.App._languages, found, first, txt;
            if (id === undefined) {
                // Return current language.
                lang = localStorage.getItem("wtag-language");
                if (!lang) {
                    lang = navigator.language || navigator.browserLanguage || "fr";
                    lang = lang.substr(0, 2);
                }
                localStorage.setItem("wtag-language", lang);
                return lang;
            } else {
                // Set current language and display localized elements.
                found = false;
                for (k = 0 ; k < languages.length ; k++) {
                    if (languages[k] == id) {
                        found = true;
                        break;
                    }
                }
                if (!found) {
                    id = languages[0];
                }
                txt = "";
                first = true;
                for (k = 0 ; k < languages.length ; k++) {
                    lang = languages[k];
                    if (lang != id) {
                        if (first) {
                            first = false;
                        } else {
                            txt += ",";
                        }
                        txt += "[lang=" + lang + "]";
                    }
                }
                $$.App._langStyle.textContent = txt + "{display: none}";
                localStorage.setItem("wtag-language", id);
            }
        },

        attr: function(key, val, ele) {
            if (typeof key !== 'string') {
                throw new Error("Call to \"attr\" method with bad arguments!");
            }
            if (typeof val === 'undefined') {
                return this._element.getAttribute(key);
            }
            if (typeof val !== 'string' && typeof val !== 'number' && typeof val !== 'boolean') {
                return val.getAttribute(key);
            }
            if (typeof ele === 'undefined') ele = this._element;
            ele.setAttribute(key, val);
            return ele;
        },

        /**
         * Créer  un  WTAG à  partir  d'attributs  et non  d'un  élément
         * existant.
         */
        appendTo: function(parent, attribs, html) {
            if (typeof attribs === 'undefined') attribs = {};
            if (typeof parent === 'undefined') parent = document.body;
            parent = $(parent);

            var div = document.createElement("div"),
            attKey, attVal;
            parent.appendChild(div);
            for (attKey in attribs) {
                attVal = attribs[attKey];
                if (attKey.charAt(0) == '_') {
                    div.setAttribute(attKey.substr(1), attVal);
                } else {
                    div.setAttribute("data-" + attKey, attVal);
                }
            }
            if (typeof html !== 'undefined') {
                div.innerHTML = html;
            }
            return this.build(div);
        },

        /**
         * Get an element with this id among this element's children.
         */
        get: function(id) {
            return this._element.querySelector("[name='" + id + "']");
        },

        /**
         * Get the  widget mapped  to the element  with this  id among
         * this element's children.
         */
        widget: function(id) {
            var element = this.get(id);
            if (element) {
                return element.$widget;
            }
            return null;
        }
    }
};
