window['TFW::page.PlayWrong'] = {
    superclass: 'wtag.Page',
    init: function() {
        this.registerSignal('show', this.onShow);
        this.registerSignal('valid', this.onValid);
    },
    functions: {
        onShow: function() {
            var tr = $$.App.currentTranslation,
                lst = $$.App.currentList;
            var item = lst.items[$$.App.currentItemIndex];
            this.get("lblA").textContent = tr.A;
            this.get("lblB").textContent = tr.B;
            this.get("A").textContent = item.A;
            this.get("B").textContent = item.B;
            this.widget("repeat").focus().val("");
        },

        /**
         * Check the answer.
         */
        onValid: function() {
            var answer = this.widget("repeat").val().trim(),
            item = $$.App.currentList.items[$$.App.currentItemIndex];
            if (item.B == answer) {
                this.fire("page", "play");
            } else {
                this.onShow();
            }
        }
    }
};
