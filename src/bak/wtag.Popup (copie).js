/**
 * @created 01/09/2014
 *
 */
window["TFW::wtag.Popup"] = {
    superclass: "wtag.Tag",
    
    init: function() {
        var that = this;
        window.WTag.popup = function(name, attribs) {
            that.show(name, attribs);
        };
        window.WTag.popup.$widget = this;
        $events(
            this,
            {
                tap: function() {that.hide();}
            }
        );
    },

    functions: {
        /**
         * 
         */
        show: function(name, attribs) {
            var i, child, n, 
                key, val, e,
                that = this;
            for (i = 0 ; i < this._element.childNodes.length ; i++) {
                child = this._element.childNodes[i];
                n = child.getAttribute("name").trim();
                if (n == name) {
                    $removeClass(child, "hide");
                    if (typeof attribs === 'object') {
                        // Replace dynamically parts of the message.
                        for (key in attribs) {
                            val = attribs[key];
                            e = child.querySelector("[name='" + key + "']");
                            if (e) {
                                e.textContent = val;
                            } else {
                                console.error(
                                    "[wtag.Popup] Missing item \"" + key + "\" in popup \""
                                        + name + "\"!"
                                );
                            }
                        }
                    }
                } else {
                    $addClass(child, "hide");
                }
            }
            $addClass(this, "show");
            if (this._timer) {
                clearTimeout(this._timer);
            }
            this._timer = setTimeout(
                function() {
                    delete that._timer;
                    that.hide();
                },
                5000
            );
        },

        /**
         * hide the popup message.
         */
        hide: function() {
            if (this._timer) {
                clearTimeout(this._timer);
                delete this._timer;
            }
            $removeClass(this, "show");
        }
    }
};
