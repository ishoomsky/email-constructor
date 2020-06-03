function Main() {
    var self = this;
    var parentElem = document.getElementById('page');

    var createContent = function(){

        var containerMainElem = document.createElement('DIV');
        containerMainElem.setAttribute('id', 'main-page-container');

        var aboutSection = function(rootElem) {
            var rowElem = document.createElement('DIV');
            rowElem.classList.add('row');
            
            var colElem = document.createElement('DIV');
            colElem.classList.add('col-xs-12', 'col-sm-6', 'col-md-6');

            var h2Elem = document.createElement('H2');
            h2Elem.innerText = 'О проекте';
            
            var p1Elem = document.createElement('P');
            p1Elem.innerText = 'Respmail constructor - приложение, позволяющее оперативно сконструировать страницу в HTML формате для почтовых рассылок.';
            
            var p2Elem = document.createElement('P');
            p2Elem.innerText = 'В основе лежит шаблон Respmail от Charlesmudy (форк BluePrint от MailChimp). В настящее время доступно 5 блоков (частей). Приложение позволяет добавить заголовки, текст и изображения в различных вариациях.';

            colElem.append(h2Elem);
            colElem.append(p1Elem);
            colElem.append(p2Elem);

            rowElem.append(colElem);

            rootElem.append(rowElem);
        };

        var buttonSection = function(rootElem) {
            var rowElem = document.createElement('DIV');
            rowElem.classList.add('row');
            
            var colElem = document.createElement('DIV');
            colElem.classList.add('col-xs-12', 'col-sm-6', 'col-md-6');

            var buttonElem = document.createElement('BUTTON');
            buttonElem.setAttribute('data-type-btn', 'constructor-page');
            buttonElem.classList.add('btn', 'btn-primary', 'btn-lg', 'btn-main-page');
            if ( constructor.getTexChangedStatus() ) {
                buttonElem.innerText = 'Продолжить работу';
            } else {
                buttonElem.innerText = 'Приступить к работе';
            }
            

            colElem.append(buttonElem);

            rowElem.append(colElem);
            
            rootElem.append(rowElem)
        };

        var advantagesSection = function(rootElem) {

            var rowHeadingElem = document.createElement('DIV');
            rowHeadingElem.classList.add('row');

            var colHeadingElem = document.createElement('DIV');
            colHeadingElem.classList.add('col-xs-12', 'col-sm-12', 'col-md-12');
            
            var h2HeadingElem = document.createElement('H2');
            h2HeadingElem.innerText = 'Respmail constructor это:';

            colHeadingElem.append(h2HeadingElem);
            rowHeadingElem.append(colHeadingElem);
            rootElem.append(rowHeadingElem);




            var rowTextElem = document.createElement('DIV');    //тут блоки преимуществ 4 шт.
            rowTextElem.classList.add('row', 'advantages');

            var advantage1 = function(rootAdvantageSectionElem) {
                var colTextElem = document.createElement('DIV');
                colTextElem.classList.add('col-xs-12', 'col-sm-3', 'col-md-3');
    
                var wrapIconElem = document.createElement('H1');
                wrapIconElem.classList.add('text-center');
                
                var iconElem = document.createElement('SPAN');
                iconElem.classList.add('glyphicon', 'glyphicon-flash');
    
                var h4TextElem = document.createElement('H4');
                h4TextElem.classList.add('text-center');
                h4TextElem.innerText = 'Быстрый результат';

                var pTextElem = document.createElement('P');
                pTextElem.classList.add('text-center');
                pTextElem.innerText = 'Не нужно разбираться в коде и покупать второй монитор для таких нетривиальных задач, как верстка email писем.';

                wrapIconElem.append(iconElem);
                colTextElem.append(wrapIconElem);

                colTextElem.append(h4TextElem)

                colTextElem.append(pTextElem)

                rootAdvantageSectionElem.append(colTextElem);
            };

            var advantage2 = function(rootAdvantageSectionElem) {
                var colTextElem = document.createElement('DIV');
                colTextElem.classList.add('col-xs-12', 'col-sm-3', 'col-md-3');
    
                var wrapIconElem = document.createElement('H1');
                wrapIconElem.classList.add('text-center');
                
                var iconElem = document.createElement('SPAN');
                iconElem.classList.add('glyphicon', 'glyphicon-time');
    
                var h4TextElem = document.createElement('H4');
                h4TextElem.classList.add('text-center');
                h4TextElem.innerText = 'Экономия времени';

                var pTextElem = document.createElement('P');
                pTextElem.classList.add('text-center');
                pTextElem.innerText = 'Позволяет быстро составить письмо с текстом и изображениями для ваших почтовых мероприятий.';

                wrapIconElem.append(iconElem);
                colTextElem.append(wrapIconElem);

                colTextElem.append(h4TextElem)

                colTextElem.append(pTextElem)

                rootAdvantageSectionElem.append(colTextElem);
            };

            var advantage3 = function(rootAdvantageSectionElem) {
                var colTextElem = document.createElement('DIV');
                colTextElem.classList.add('col-xs-12', 'col-sm-3', 'col-md-3');
    
                var wrapIconElem = document.createElement('H1');
                wrapIconElem.classList.add('text-center');
                
                var iconElem = document.createElement('SPAN');
                iconElem.classList.add('glyphicon', 'glyphicon-object-align-bottom');
    
                var h4TextElem = document.createElement('H4');
                h4TextElem.classList.add('text-center');
                h4TextElem.innerText = 'Доступность';

                var pTextElem = document.createElement('P');
                pTextElem.classList.add('text-center');
                pTextElem.innerText = 'Шаблон обладает высокой кроссплатформенностью и работает в Mail.ru, Outlook, Yahoo, Hotmail, Gmail, и др.';

                wrapIconElem.append(iconElem);
                colTextElem.append(wrapIconElem);

                colTextElem.append(h4TextElem)

                colTextElem.append(pTextElem)

                rootAdvantageSectionElem.append(colTextElem);
            };

            var advantage4 = function(rootAdvantageSectionElem) {
                var colTextElem = document.createElement('DIV');
                colTextElem.classList.add('col-xs-12', 'col-sm-3', 'col-md-3');
    
                var wrapIconElem = document.createElement('H1');
                wrapIconElem.classList.add('text-center');
                
                var iconElem = document.createElement('SPAN');
                iconElem.classList.add('glyphicon', 'glyphicon-ok');
    
                var h4TextElem = document.createElement('H4');
                h4TextElem.classList.add('text-center');
                h4TextElem.innerText = 'Удобство';

                var pTextElem = document.createElement('P');
                pTextElem.classList.add('text-center');
                pTextElem.innerText = 'Вы можете "на лету" увидеть полученный результат и добавить готовый код себе в проект.';

                wrapIconElem.append(iconElem);
                colTextElem.append(wrapIconElem);

                colTextElem.append(h4TextElem)

                colTextElem.append(pTextElem)

                rootAdvantageSectionElem.append(colTextElem);
            };

            advantage1(rowTextElem);
            advantage2(rowTextElem);
            advantage3(rowTextElem);
            advantage4(rowTextElem);
            rootElem.append(rowTextElem);
        };



        var howToUseSection = function(rootElem) {
            var rowElem = document.createElement('DIV');
            rowElem.classList.add('row');
            
            var colElem = document.createElement('DIV');
            colElem.classList.add('col-xs-12', 'col-sm-12', 'col-md-12');

            var h2Elem = document.createElement('H2');
            h2Elem.innerText = 'Как пользоваться?';
            
            var p1Elem = document.createElement('P');
            p1Elem.innerText = 'На странице "Конструктор" в левой части располагаются шаблоны, в правой - область конструктора. Для создания письма необходимо "перетащить" нужный шаблон в область конструктора. Также для добавления можно нажать кнопку "+". ';
            
            var p2Elem = document.createElement('P');
            p2Elem.innerText = 'На странице "Результат" в правой части в области "HTML превью" можно увидеть то, как будет выглядеть ваше письмо. В левой части находится исходный код, который можно скопировать и использовать в вашем проекте.';

            colElem.append(h2Elem);
            colElem.append(p1Elem);
            colElem.append(p2Elem);

            rowElem.append(colElem);

            rootElem.append(rowElem);
        };




        aboutSection( containerMainElem ); //добавить секцию "о проекте"
        howToUseSection( containerMainElem );
        buttonSection(  containerMainElem  );
        advantagesSection( containerMainElem );
        

        parentElem.append(containerMainElem);
    };

    self.clear = function() {
        var mainPageContainerElem = document.getElementById('main-page-container');
        if (mainPageContainerElem) {
            mainPageContainerElem.outerHTML = '';
        }
    };
    self.update = function(){
        self.clear();
        createContent();
    };
}

