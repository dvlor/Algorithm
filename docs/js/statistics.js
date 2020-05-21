function statisticTool(data) {
    var dom = document.createElement('div');
    dom.className = 'statistic';
    for(var key in data) {
        if (data.hasOwnProperty(key)) {
            var el = (function(){
                var nkey = key;
                var el = document.createElement('div');
                var value = data[nkey];
                el.innerHTML = nkey + ' : ' + value;
                Object.defineProperty(data, nkey, {
                    get(){
                        return value;
                    },
                    set(v){
                        value = v;
                        el.innerHTML = nkey + ' : ' + value;
                    }
                })
                return el;
            })();
            dom.appendChild(el);
        }
    }
    return dom;
}