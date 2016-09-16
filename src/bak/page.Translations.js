window['TFW::page.Translations'] = {
    superclass: 'wtag.Page',
    init: function() {
        $addClass(this._element, "page-Translations");
        this.registerSignal('show', this.onShow);
        this.registerSignal('go', this.onGo);
    },
    functions: {
        onShow: function(arg, signal, emitter) {
            var translations = $$.App.load().translations, i, item, a, btn;
            $clear(this.get("list"));
            if (translations.length == 0) {
                $show(this.get("empty"));
                $hide(this.get("list-div"));
            } else {
                $hide(this.get("empty"));
                $show(this.get("list-div"));
                for (i = 0 ; i < translations.length ; i++) {
                    item = translations[i];
                    btn = $$.App.createButton(
                        item.A + " / " + item.B,
                        "go",
                        i
                    );
                    $addClass(btn, "green");
                    $add(this.get("list"), btn);
                }
            }
        },

        /**
         * Go to the translation page.
         */
        onGo: function(arg) {
            $$.App.currentTranslation = $$.App.load().translations[parseInt(arg)];
            this.fire("page", "lists");
        }
    }
};
