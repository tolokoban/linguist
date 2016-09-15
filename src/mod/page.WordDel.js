window['TFW::page.WordDel'] = {
    superclass: 'wtag.Page',
    init: function() {
        this.registerSignal('show', this.onShow);
        this.registerSignal('del', this.onDel);
    },
    functions: {
        onShow: function(arg, signal, emitter) {
            var t = $$.App.currentTranslation,
                item = $$.App.currentList.items[$$.App.currentItemIndex];
            this.get("lblA").textContent = t.A;
            this.get("lblB").textContent = t.B;
            this.get("A").textContent = item.A;
            this.get("B").textContent = item.B;
        },

        /**
         * Delete the current item.
         */
        onDel: function() {
            $$.App.currentList.items.splice($$.App.currentItemIndex, 1);
            $$.App.save();
            this.fire("page", "words");
        }
    }
};
