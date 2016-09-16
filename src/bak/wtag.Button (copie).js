/**
 * @created 15/05/2014
 *
 */
window["TFW::wtag.Button"] = {
    superclass: "wtag.Tag",

    init: function() {
        var that = this,
        signal = this.attr("fire"),
        arg = this.attr("fire-arg");
        if (signal) {
            $events(
                this._element,
                {
                    tap: function() {
                        that.fire(signal, arg);
                    }
                }
            );
        }
    },

    functions: {
    }
};
