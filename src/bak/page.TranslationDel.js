window['TFW::page.TranslationDel'] = {
    superclass: 'wtag.Page',
    init: function() {
        this.registerSignal('show', this.onShow);
        this.registerSignal('del', this.onDel);
    },
    functions: {
        onShow: function(arg, signal, emitter) {
            var t = $$.App.currentTranslation;
            this.get("name").textContent = t.A + " / " + t.B;
        },

        /**
         * Confirm the deletion of the translation.
         */
        onDel: function() {
            var i, translations = $$.App.load().translations,
            translation = $$.App.currentTranslation;
            for (i = 0 ; i < translations.length ; i++) {
                if (translation === translations[i]) {
                    translations.splice(i, 1);
                    break;
                }
            }
            this.fire("page", "translations");
        }
    }
};