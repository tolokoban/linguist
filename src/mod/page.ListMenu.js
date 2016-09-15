window['TFW::page.ListMenu'] = {
    superclass: 'wtag.Page',
    init: function() {
        this.registerSignal('show', this.onShow);
        this.registerSignal('play', this.onPlay);
    },
    functions: {
        onShow: function(arg, signal, emitter) {
            this.get("title").textContent = $$.App.currentList.name;
        },

        /**
         * Initialise a knowledge test.
         */
        onPlay: function() {
            var data = $$.App.load();
            data.ok = data.ko = 0;
            this.fire("page", "play");
        }
    }
};
