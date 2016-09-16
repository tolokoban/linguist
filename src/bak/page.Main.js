window['TFW::page.Main'] = {
    superclass: 'wtag.Page',
    init: function() {
        this.registerSignal('export', this.onExport);
    },
    functions: {
        onExport: function() {
            var sdcard = navigator.getDeviceStorage("sdcard");
            console.info("[page.Main] sdcard=...", sdcard);
            var file   = new Blob(
                [JSON.stringify($$.App.load())],
                {type: "text/plain"}
            );
            var request = sdcard.addNamed(file, "linguist.txt");
            request.onsuccess = function () {
                var name = this.result;
                console.log('File "' + name + '" successfully wrote on the sdcard storage area.');
            };
            // An error typically occur if a file with the same name already exist
            request.onerror = function () {
                console.warn(this);
                console.warn('Unable to write the file: ' + this.error);
            };
        }
    }
};