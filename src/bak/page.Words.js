window['TFW::page.Words'] = {
    superclass: 'wtag.Page',
    init: function() {
        this.registerSignal('show', this.onShow);
        this.registerSignal('add', this.onAdd);        
        this.registerSignal('del', this.onDel);
        this.registerSignal('edit', this.onEdit);
    },
    functions: {
        onShow: function(arg, signal, emitter) {
            this.get("title").textContent = $$.App.currentList.name;
            var items = $$.App.currentList.items;
            if (items.length == 0) {
                $show(this.get("empty"));
                $hide(this.get("not-empty"));
            } else {
                $hide(this.get("empty"));
                $show(this.get("not-empty"));
                $clear(this.get("list"));
                items.sort(
                    function(a,b) {
                        if (a.A < b.A) return -1;
                        if (a.A > b.A) return 1;
                        return 0;
                    }
                );
                for (var i = 0 ; i < items.length ; i++) {
                    var item = items[i];
                    this.addItem(i, item.A, item.B, item);
                }
            }
        },

        /**
         * Add an item with interaction for edit and delete.
         * @param i : index of the item in the current list.
         * @param A : word in the language A.
         * @param B : word in the language B.
         */
        addItem: function(i, A, B, item) {
            var div = document.createElement("div"),
                cell0  = document.createElement("div"),
                cell1  = document.createElement("div"),
                cell2  = document.createElement("div"),
                txtA  = document.createElement("div"),
                txtB  = document.createElement("div"),
                btnEdit = $$.App.createButton("+", "edit", i);
                btnDel = $$.App.createButton("X", "del", i);
            $addClass(div, "page-words-item");
            if (item.ok > item.ko) {
                $addClass(div, "ok");
            }
            if (item.ok < item.ko) {
                $addClass(div, "ko");
            }
            $addClass(btnEdit, "green");
            $addClass(btnDel, "red");
            txtA.textContent = A;
            txtB.textContent = B;
            div.appendChild(cell0);
            cell0.appendChild(btnEdit);
            div.appendChild(cell1);
            cell1.appendChild(txtA);
            cell1.appendChild(txtB);
            div.appendChild(cell2);
            cell2.appendChild(btnDel);
            this.get("list").appendChild(div);
        },

        /**
         * Add a new item in the current list.
         */
        onAdd: function() {
            $$.App.currentItemIndex = -1;
            this.fire("page", "word-edit");
        },

        /**
         * Edit an item of the current list.
         * @param index : index of the item to edit.
         */
        onEdit: function(index) {
            $$.App.currentItemIndex = parseInt(index);
            this.fire("page", "word-edit");
        },

        /**
         * Delete an item of the current list.
         * @param index : index of the item to delete.
         */
        onDel: function(index) {
            $$.App.currentItemIndex = index;
            this.fire("page", "word-del");
        }
    }
};
