/**
 * @created 12/08/2014
 *
 */
window["TFW::wtag.Book"] = {
    superclass: "wtag.Tag",
    attributes: {
        animDuration: .4
    },
    init: function() {
        this._anims = {
            fromRight: this.anim(
                {
                    from: {transform: "translateX(100%)"},
                    to: {transform: "translateX(0%)"}
                }
            ),
            toRight: this.anim(
                {
                    from: {transform: "translateX(0%)"},
                    to: {transform: "translateX(100%)"}
                }
            ),
            fromLeft: this.anim(
                {
                    from: {transform: "translateX(-100%)"},
                    to: {transform: "translateX(0%)"}
                }
            ),
            toLeft: this.anim(
                {
                    from: {transform: "translateX(0%)"},
                    to: {transform: "translateX(-100%)"}
                }
            )
        };

        this._currentPage = null;
        this._pages = {};
        var children = this._element.childNodes,
        i, item, name;
        for (i = 0 ; i < children.length ; i++) {
            item = children[i];
            $hide(item);
            name = "" + (1 + i);
            if (item.hasAttribute("data--name")) {
                name = item.getAttribute("data--name");
            }
            this._pages[name] = {element: item, index: i};
            if (i == 0) {
                this._currentPage = this._pages[name];
            }
        }
        $show(this._currentPage.element);

        var that = this;
        this.registerSignal(
            "page",
            function(arg, signal, emitter) {
                return that.go(arg);
            }
        );
    },

    functions: {
        /**
         * Return an instance of "tfw.CssAnim".
         */
        anim: function(keyframes) {
            return $$(
                "tfw.CssAnim",
                {keyframes: keyframes}
            );
        },

        go: function(name) {
            var src = this._currentPage,
            dst = this._pages[name],
            anim;
            if (!dst) {
                // This  page does  not exist  in this  book: let  the
                // event be propagated up to its parents.
                return false;
            }
            blur();
            if (src.element.$widget) {
                src.element.$widget.slot("hide");
            }
            if (dst.element.$widget) {
                dst.element.$widget.slot("show");
            }
            anim = src.index < dst.index ? this._anims.toLeft : this._anims.toRight;
            anim.apply(src.element, {duration: this._animDuration});
            /*
                if (src.hasAttribute("data-hide")) {
                    $$.App.signal(src.getAttribute("data-hide"), {target: src});
                }
             */
            /*
                if (dst.hasAttribute("data-show")) {
                    $$.App.signal(dst.getAttribute("data-show"), {target: dst});
                }
                $removeClass(dst, "hidden");
             */
            anim = src.index < dst.index ? this._anims.fromRight : this._anims.fromLeft;
            anim.apply(dst.element, {duration: this._animDuration});
            $show(dst.element);
            this._currentPage = dst;
        }
    }
};
