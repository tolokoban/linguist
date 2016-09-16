/**
 * @created 15/05/2014
 *
 */
window["TFW::wtag.Input"] = {
    superclass: "wtag.Tag",
    init: function() {
        var that = this;
        this._element.addEventListener(
            "keydown",
            function (evt) {
                if (evt.keyCode == 13) {
                    that.fire("valid", that._element.getAttribute("name"));
                    evt.preventDefault();
                }
            }
        );
    },
    functions: {
        /**
         * Get/Set input text.
         */
        val: function(v) {
            if (typeof v === 'undefined') {
                return this._element.value;
            }
            this._element.value = v;
            return this;
        },

        /**
         * Set focus to the input text box.
         */
        focus: function() {
            var e = this._element;
            setTimeout(
                function() {
                    e.focus();
                },
                1
            );
            return this;
        }
    }
};
