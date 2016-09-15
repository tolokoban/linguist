window['TFW::page.WordEdit'] = {
    superclass: 'wtag.Page',
    init: function() {
        this.registerSignal('show', this.onShow);
        this.registerSignal('ok', this.onOK);
        this.registerSignal('valid', this.onValid);
    },
    functions: {
        onShow: function(arg, signal, emitter) {
            this.get("title").textContent = $$.App.currentList.name;
            var t = $$.App.currentTranslation;
            this.get("lblA").textContent = t.A;
            this.get("lblB").textContent = t.B;
            var idx = $$.App.currentItemIndex,
                inpA = "", inpB = "";
            if (idx > -1) {
                var item = $$.App.currentList.items[idx];
                inpA = item.A;
                inpB = item.B;
            }
            this.widget("A").focus().val(inpA);
            this.widget("B").val(inpB);
        },

        /**
         * Add the current item to the current list.
         */
        onOK: function() {
            var idx = $$.App.currentItemIndex;
            if (idx > -1) {
                // Modification.
                var item = $$.App.currentList.items[idx];
                item.ok = item.ko = 0;
                item.A = this.widget("A").val().trim();
                item.B = this.widget("B").val().trim();
                this.fire("page", "words");                
            } else {
                // Ajout.
                $$.App.currentList.items.push(
                    {
                        ok: 0,
                        ko: 0,
                        A: this.widget("A").val().trim(),
                        B: this.widget("B").val().trim()
                    }
                );
                this.onShow();
            }
            $$.App.save();
        },

        /**
         * Change focus or validate the page when [Enter] has been hit.
         */
        onValid: function(name) {
            if (name == "A") {
                this.widget("B").focus();
            }
            if (name == "B") {
                this.onOK();
            }
        }
    }
};
