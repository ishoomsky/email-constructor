function SPA() {
    var self = this;

    self.showMainPage = function() {
        nav.setState('main-page');
        saveLoadButtons.clear();

        header.update();
        nav.update();
        main.update();
    };

    self.showConstructorPage = function() {
        nav.setState('constructor-page');

        header.update();
        nav.update();
        saveLoadButtons.update();
        templates.update();
        constructor.update();
        dragNDrop.update();
        
    };

    self.showResultPage = function() {
        nav.setState('result-page');

        header.update();
        nav.update();
        saveLoadButtons.clear(); 
        resultHtml.update();
        resultCode.update();
    };

    var SPAState = {};

    var onHashChange = function() {
        window.onhashchange = switchToStateFromURLHash;
    };

    var switchToStateFromURLHash = function() {

        var URLHash = window.location.hash;

        var stateStr=URLHash.substr(1);

        if ( stateStr!="" ) { // если закладка непустая, читаем из неё состояние и отображаем
        //   var parts=stateStr.split("_")
            SPAState={ pagename: stateStr };
        }
        else
        SPAState={pagename:'main-page'}; // иначе показываем главную страницу
        // обновляем вариабельную часть страницы под текущее состояние
        // это реализация View из MVC - отображение состояния модели в HTML-код

        switch ( SPAState.pagename ) {
        case 'main-page':
            self.clear();
            self.showMainPage();
            break;

        case 'constructor-page':
            self.clear();
            self.showConstructorPage();
            break;

        case 'result-page':
            self.clear();
            self.showResultPage();
            break;
        }
    };

    var switchToState = function(newState) {
        // устанавливаем закладку УРЛа
        // нужно для правильной работы кнопок навигации браузера
        // (т.к. записывается новый элемент истории просмотренных страниц)
        // и для возможности передачи УРЛа другим лицам
        var stateStr = newState.pagename;
        location.hash = stateStr;
    
        // АВТОМАТИЧЕСКИ вызовется switchToStateFromURLHash()
        // т.к. закладка УРЛа изменилась (ЕСЛИ она действительно изменилась)
    };
    
    self.switchToMain = function() {
        switchToState( { pagename:'main-page' } );
    };

    self.switchToConstructor = function() {
        switchToState( { pagename:'constructor-page' } );
        
    };

    self.switchToResult = function() {
        switchToState( { pagename:'result-page' } );

    };


    self.clear = function() {
        var pageElem = document.getElementById('page');
        pageElem.innerHTML = '';
    };

    self.update = function(){
        onHashChange();
        switchToStateFromURLHash();
    };
}
