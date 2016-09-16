window['TFW::page.TranslationAdd'] = {
    superclass: 'wtag.Page',
    init: function() {
        this.registerSignal('show', this.onShow);
        this.registerSignal('valid', this.onValid);
        this.registerSignal('ok', this.onOK);
    },
    functions: {
        onShow: function(arg, signal, emitter) {
            this.widget("A").focus().val("");
            this.widget("B").val("");
        },

        /**
         * When the Return key has been hit in an input text box.
         */
        onValid: function(arg) {
            if (arg == "A") {
                this.widget("B").focus();
            } else {
                this.onOK();
            }                
        },

        /**
         * Add this new translation
         */
        onOK: function() {
            $$.App.load().translations.push(
                {
                    A: this.widget("A").val(),
                    B: this.widget("B").val(),
                    lists: []
                }
            );
            $$.App.save();
            this.fire("page", "translations");
        }
    }
};