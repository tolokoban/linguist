window['TFW::page.ListAdd'] = {
    superclass: 'wtag.Page',
    init: function() {
        this.registerSignal('show', this.onShow);
        this.registerSignal('ok', this.onOK);
        this.registerSignal('valid', this.onOK);
    },
    functions: {
        onShow: function(arg, signal, emitter) {
            this.widget("name").focus().val("");
        },

        /**
         * Add a list in the current translation.
         */
        onOK: function() {
            var t = $$.App.currentTranslation,
            name = this.widget("name").val().trim();
            if (name.length == 0) {
                this.widget("name").focus().val("");
                return;
            }
            t.lists.push(
                {
                    name: name,
                    items: []
                }
            );
            $$.App.save();
            this.fire("page", "lists");
        }
    }
};
