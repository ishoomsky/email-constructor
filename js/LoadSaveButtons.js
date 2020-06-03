function SaveLoadButtons() {
    var self = this;
    var parentElem = document.getElementById('navigate');

    var state = [
        {action:'saveToAjax', text: 'Сохранить на сервер', },
        {action:'loadFromAjax', text: 'Загрузить с сервера'},
    ];


    var createContent = function(){
        var buttonsSaveLoad = function(parentElem) {

            var btnGroupContainerElem = document.createElement('DIV');
            btnGroupContainerElem.classList.add('col-xs-12', 'col-sm-6', 'col-md-6');
            btnGroupContainerElem.id = 'btn-saveload-root';

            var btnGroupNavElem = document.createElement('div');
            btnGroupNavElem.classList.add('btn-group');
            
    
            for (let i=0; i < state.length; i++) {
                var buttonElem = document.createElement('button');
                        buttonElem.classList.add('btn', 'btn-default');
                        buttonElem.setAttribute('data-type-btn', state[i].action);

                        buttonElem.textContent = state[i].text;
                        btnGroupNavElem.append(buttonElem);
            }
            btnGroupContainerElem.append(btnGroupNavElem);
            parentElem.append(btnGroupContainerElem);
        };

        buttonsSaveLoad(parentElem);

    };

    self.clear = function() {
        var btnGroupNavElem = document.getElementById('btn-saveload-root');
        if (btnGroupNavElem) {
            btnGroupNavElem.outerHTML = '';
        }
    };
    self.update = function(){
        self.clear();
        createContent();
    };
};