window['TFW::page.Victory'] = {
    superclass: 'wtag.Page',
    init: function() {
        this.registerSignal('show', this.onShow);
    },
    functions: {
        onShow: function(arg, signal, emitter) {
            var data = $$.App.load(),
                count = data.ok + data.ko,
                percent = 100,
                tr = $$.App.currentTranslation,
                lst = $$.App.currentList,
                i, li;
            if (count > 0) {
                percent = Math.floor(100 * data.ok / count);
            }
            this.get("percent").textContent = percent;
            if (typeof lst.stats === 'undefined') lst.stats = [];
            lst.stats.push(percent);
            if (lst.stats.length > 10) {
                lst.stats.splice(0, lst.stats.length - 10);
            }
            $$.App.save();

            if (lst.stats.length > 1) {
                $show(this.get("history"));
                $clear(this.get("history-list"));
                for (i = lst.stats.length - 2 ; i > -1 ; i--) {
                    li = document.createElement("li");
                    li.textContent = lst.stats[i] + " %";
                    this.get("history-list").appendChild(li);
                }
            } else {
                $hide(this.get("history"));
            }
        }
    }
};
