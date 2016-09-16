window['TFW::page.ListDel'] = {
    superclass: 'wtag.Page',
    init: function() {
        this.registerSignal('show', this.onShow);
        this.registerSignal('del', this.onDel);
    },
    functions: {
        onShow: function(arg, signal, emitter) {
            var lst = $$.App.currentList;
            this.get("name").textContent = lst.name;
        },

        /**
         * Confirm the deletion of the translation.
         */
        onDel: function() {
            var i, translations = $$.App.load().translations,
            translation = $$.App.currentTranslation,
            lists = translation.lists,
            list = $$.App.currentList;
            for (i = 0 ; i < lists.length ; i++) {
                if (list === lists[i]) {
                    lists.splice(i, 1);
                    break;
                }
            }
            this.fire("page", "lists");
        }
    }
};