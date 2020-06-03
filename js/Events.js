function Events() {

    var self = this;
    var vibrationEvent = function(){
        if ( navigator.vibrate ) { // есть поддержка Vibration API?
                window.navigator.vibrate(100); // вибрация 100мс
        }
    };
    
    var createMouseDownEvents = function(){
        document.body.addEventListener('click', function(EO){
            EO = EO||window.event;

            //buttons (и вложенные спаны) + в модуле templates
            if(EO.target.tagName == 'BUTTON' || EO.target.tagName == 'SPAN') {
                if(EO.target.getAttribute('data-type')) {
                    constructor.addBlock( EO.target.getAttribute('data-type') );
                    return;
                }
            }

            if(EO.target.tagName == 'BUTTON') {

                if(EO.target.getAttribute('data-type-btn') == 'main-page') {
                    spa.switchToMain();
                    return;
                }

                if(EO.target.getAttribute('data-type-btn') == 'constructor-page') {
                    spa.switchToConstructor();
                    
                    return;
                }

                if(EO.target.getAttribute('data-type-btn') == 'result-page') {
                    spa.switchToResult();
                    
                    resultHtml.setState( constructor.getState() );
                    resultCode.setState( constructor.getState() );
                    nav.setState('result-page');
                    return;
                }

                if(EO.target.getAttribute('data-type-btn') == 'saveToAjax') {
                    vibrationEvent();
                    setTimeout(function(){
                        var safety = confirm('Будут перезаписаны данные на сервере. Вы уверены?');
                        if (safety) {
                            ajax.save();
                            return;
                        } else {
                            return;
                        }
                    }, 0)

                }

                if(EO.target.getAttribute('data-type-btn') == 'loadFromAjax') {
                    vibrationEvent();
                    setTimeout(function(){
                        var safety = confirm('При загрузке будут потеряны текущие данные. Вы уверены?')
                        if (safety) {
                            ajax.load();
                            return;
                        } else {
                            return;
                        }
                    }, 0);
                }

            }
        });
    };

    self.update = function() {
        createMouseDownEvents();     
    };
}


