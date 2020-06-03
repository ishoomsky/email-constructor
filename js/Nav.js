function Nav() {
    var self = this;
    var parentElem = document.getElementById('navigate');

    var state = [
        {pageName:'main-page', text: 'Главная', active: false},
        {pageName:'constructor-page', text: 'Конструктор', active: false},
        {pageName:'result-page', text: 'Результат', active: false}
    ];

    self.setState = function(__pageName) {

        for (let i=0; i < state.length; i++) {

            if(state[i].pageName == __pageName){
                state[i].active = true;
            } else {
                state[i].active = false;
            }
        }
    };

    var createContent = function(){
        var buttonsNav = function(parentElem) {

            var btnGroupNavContainerElem = document.createElement('DIV');
            btnGroupNavContainerElem.classList.add('col-xs-12', 'col-sm-6', 'col-md-6');
            btnGroupNavContainerElem.id = 'btn-nav-root';

            var btnGroupNavElem = document.createElement('div');
            btnGroupNavElem.classList.add('btn-group');
            
    
            for (let i=0; i < state.length; i++) {
                switch(state[i].active) { //создаем кнопки навигации
    
                    case true: //если да, то с css классом active
                        var buttonElem = document.createElement('button');
                        buttonElem.classList.add('btn', 'btn-default', 'active');
                        buttonElem.setAttribute('data-type-btn', state[i].pageName);
                        buttonElem.textContent = state[i].text;
                        
                        btnGroupNavElem.append(buttonElem);
                        break;
    
                    case false: //если нет, то без css класса active
                        var buttonElem = document.createElement('button');
                        buttonElem.classList.add('btn', 'btn-default');
                        buttonElem.setAttribute('data-type-btn', state[i].pageName);
                        buttonElem.textContent = state[i].text;
    
                        btnGroupNavElem.append(buttonElem);
                        break;
                }
            }
            btnGroupNavContainerElem.append(btnGroupNavElem)
            parentElem.append(btnGroupNavContainerElem);
        };

    buttonsNav(parentElem);

    };

    self.clear = function() {
        var btnGroupNavElem = document.getElementById('btn-nav-root');
        if (btnGroupNavElem) {
            btnGroupNavElem.outerHTML = '';
        }
    };
    self.update = function(){
        self.clear();
        
        createContent();
    };
}