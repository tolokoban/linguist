window['TFW::page.Play'] = {
    superclass: 'wtag.Page',
    init: function() {
        this.registerSignal('show', this.onShow);
        this.registerSignal('valid', this.onValid);
    },
    functions: {
        onShow: function() {
            var data = $$.App.load(),
                count = data.ok + data.ko,
                percent = 100,
                tr = $$.App.currentTranslation,
                lst = $$.App.currentList,
                i, k, tmp, item;
            if (typeof this._index === 'undefined') {
                this._index = 0;
                this._shuffle = [];
                for (i = 0 ; i < lst.items.length ; i++) {
                    this._shuffle.push(i);
                    item = lst.items[i];
                    if (item.ok == 0) {
                        this._shuffle.push(i);
                    }
                    if (item.ko > item.ok) {
                        this._shuffle.push(i);
                    }
                }
                for (i = 0 ; i < this._shuffle.length ; i++) {
                    k = Math.floor(Math.random() * lst.items.length);
                    tmp = this._shuffle[i];
                    this._shuffle[i] = this._shuffle[k];
                    this._shuffle[k] = tmp;
                }
                console.log(this._shuffle);
            }
            $$.App.currentItemIndex = this._shuffle[this._index % this._shuffle.length];
            this._index++;
            item = lst.items[$$.App.currentItemIndex];
            if (count > 0) {
                percent = Math.floor(100 * data.ok / count);
            }
            this.get("ok").textContent = data.ok;
            this.get("ko").textContent = data.ko;
            this.get("percent").textContent = percent;
            this.get("lblA").textContent = tr.A;
            this.get("lblB").textContent = tr.B;
            this.get("A").textContent = item.A;
            this.widget("B").focus().val("");
        },

        /**
         * Check the answer.
         */
        onValid: function() {
            var answer = this.widget("B").val().trim(),
            item = $$.App.currentList.items[$$.App.currentItemIndex];
            var data = $$.App.load();
            if (item.B == answer) {
                item.ok++;
                data.ok++;
                if (data.ok >= 10) {
                    delete this._index;
                    this.fire("page", "victory");
                } else {
                    this.onShow();
                }
            } else {
                item.ko++;
                data.ko++;
                this.fire("page", "play-wrong");
            }
            $$.App.save();
        }
    }
};
