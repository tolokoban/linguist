window['TFW::page.Lists'] = {
    superclass: 'wtag.Page',
    init: function() {
        this.registerSignal('show', this.onShow);
        this.registerSignal('go', this.onGo);
    },
    functions: {
        onShow: function(arg, signal, emitter) {
            var t = $$.App.currentTranslation,
            lists = t.lists,
            i, btn, item;
            this.get("title").textContent = t.A + " / " + t.B;
            $clear(this.get("list"));
            if (lists.length == 0) {
                $show(this.get("empty"));
                $hide(this.get("list-div"));
            } else {
                $hide(this.get("empty"));
                $show(this.get("list-div"));
                for (i = 0 ; i < lists.length ; i++) {
                    item = lists[i];
                    btn = $$.App.createButton(
                        item.name,
                        "go",
                        i
                    );
                    $addClass(btn, "green");
                    $add(this.get("list"), btn);
                }
            }
        },

        /**
         * 
         */
        onGo: function(index) {
            $$.App.currentListIndex = index;
            $$.App.currentList = $$.App.currentTranslation.lists[index];
            this.fire("page", "list-menu");
        }
    }
};