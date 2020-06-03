function Header() {

    var self = this;
    var parentElem = document.getElementById('head');

    var createContent = function(parentElem){

        var containerElem = document.createElement('DIV');
        containerElem.classList.add('logo');
        containerElem.setAttribute('id', 'header-root')

        var h1Elem = document.createElement('H1');
        h1Elem.innerText = ' Respmail constructor';

        var spanElem = document.createElement('SPAN');
        spanElem.classList.add('glyphicon', 'glyphicon-envelope');

        var h4Elem = document.createElement('H4');
        h4Elem.innerText = 'Конструктор email-писем';

        h1Elem.prepend(spanElem);
        containerElem.append(h1Elem);
        containerElem.append(h4Elem);
        parentElem.append(containerElem);

    };

    self.clear = function() {
        var rootElem = document.getElementById('header-root');
        if (rootElem) {
            rootElem.outerHTML = '';
        }
    };
    self.update = function(){
        self.clear();
        createContent(parentElem);
    };
}