/**
 * @created 15/05/2014
 *
 * Les listes de vocabulaire sont stoquées sous ce format :
 * [
 *   {
 *     lngA: "Français",
 *     lngB: "Anglais",
 *     lists: [
 *       {
 *         name: "Vocabulaire maritime",
 *         list: [
 *           A: "bâteau",
 *           B: "boat",
 *           s: 0   // Score : +1 pour une réponse juste et -2 pour une fausse.
 *         ]
 *       },
 *       ...
 *     ]
 *   },
 *   ...
 * ]
 */
window["TFW::Main"] = {
    superclass: "wtag.Tag",

    init: function() {
        var that = this;
        that._data = this.load();
        this.registerSignal("lang", this.lang);
    },

    functions: {
        /**
         * Sauvegarder les listes dans le localStorage.
         */
        save: function() {
            localStorage.setItem("Linguist", JSON.stringify(this._data));
        },

        /**
         * Load the data from localstorage.
         */
        load: function() {
            if (this._data) {
                return this._data;
            }
            var data = localStorage.getItem("Linguist");
            if (data) {
                data = JSON.parse(data);
            } else {
                data = {"translations":[{"A":"FR (test)","B":"EN (test)","lists":[{"name":"Liste de Test","items":[{"ok":0,"ko":0,"A":"arbre","B":"tree"},{"ok":0,"ko":0,"A":"chaise","B":"chair"},{"ok":0,"ko":0,"A":"chat","B":"cat"},{"ok":0,"ko":0,"A":"chien","B":"dog"},{"ok":0,"ko":0,"A":"coude","B":"elbow"},{"ok":0,"ko":0,"A":"fleur","B":"flower"},{"ok":0,"ko":0,"A":"genou","B":"knee"},{"ok":0,"ko":0,"A":"main","B":"hand"},{"ok":0,"ko":0,"A":"oiseau","B":"bird"},{"ok":0,"ko":0,"A":"pied","B":"foot"},{"ok":0,"ko":0,"A":"poire","B":"pear"},{"ok":0,"ko":0,"A":"pomme","B":"apple"},{"ok":0,"ko":0,"A":"serpent","B":"snake"},{"ok":0,"ko":0,"A":"table","B":"table"},{"ok":0,"ko":0,"A":"vache","B":"cow"},{"ok":0,"ko":0,"A":"tête","B":"head"}]}]}],"ko":0,"ok":10};
            }

            if (typeof data !== 'object' || !data.translations) {
                data = {translations:[]};
            }
            this._data = data;
            return data;
        },

        /**
         * Create a widget button.
         * @param caption : button's caption.
         * @param signal : signal's name.
         * @param arg : argument mapped with this signal.
         */
        createButton: function(caption, signal, arg) {
            var btn = $tag(
                "a",
                {
                    href: "#",
                    fire: signal,
                    "fire-arg": arg
                }
            );
            $addClass(btn, "wtag-button");
            btn.textContent = caption;
            btn.$widget = $$("wtag.Button", {id: btn});
            return btn;
        }
    }
};
