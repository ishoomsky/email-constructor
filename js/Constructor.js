function Constructor() {
    try {
        var self = this;
        var parentElem = document.getElementById('page');

        var textChanged = false;

        self.getTexChangedStatus = function(){
            return textChanged;
        }

        var state = [
            //для отладки
            // {type:'header', text: ['Введите заголовок..','Введите подзаголовок..','Введите текст..']},
            // {type:'text-col-1', text: ['Введите заголовок..','Введите подзаголовок..','Введите текст']},
            // {type:'text-col-2', text: ['Введите заголовок..','Введите текст..','Введите заголовок..','Введите текст..']},
            // {type:'text-img-col-2', text: ['Введите заголовок..','Введите текст..','Введите URL изображения..']},
        ];

        // признак, что информация на странице была изменена
        var textChangedF = function (EO) {
            EO=EO||window.event;
            textChanged=true; // текст изменён
        };

        //событие beforeunload
        var addWindowBeforeUnloadEvent = function() {
            window.addEventListener('beforeunload', function(EO) {
                EO=EO||window.event;
                // если текст изменён, попросим браузер задать вопрос пользователю
                if ( textChanged )
                EO.returnValue='А у вас есть несохранённые изменения!';
            });
        };

        //функция поиска номера позиции html элемента (блока) в массиве state (для удаления, перемещения)
        var findPosition = function(elem) {
            var findBlockElem = elem;
            while( !findBlockElem.classList.contains('constructor-block-wrapper') ) {
                findBlockElem = findBlockElem.parentElement;
            }
            var findContainerElem = elem;
            // while( !findContainerElem.classList.contains('constructor') ) {
            while( findContainerElem.id !== 'constructor') {  //ie classList.contains нормально не срабатывал
                findContainerElem = findContainerElem.parentElement;
            }

            containerElemArr = Array.from(findContainerElem.children);

            return containerElemArr.indexOf(findBlockElem);

        };

        //перемещение блока вверх
        var moveUpBlock = function(EO) {
            EO=EO||window.event;
            var id = findPosition(EO.target);

            if(!state[id-1]) return;
            var temp = state[id];            
            state[id] = state[id-1];
            state[id-1] = temp;
            self.update();
        };

        //перемещение блока вниз
        var moveDownBlock = function(EO) {
            EO=EO||window.event;
            var id = findPosition(EO.target);

            if(!state[id+1]) return;
            var temp = state[id];            
            state[id] = state[id+1];
            state[id+1] = temp;
            self.update();
        };

        //удаление блока
        var deleteBlock = function(EO) {
            EO=EO||window.event;
            var id = findPosition(EO.target);
            state.splice( id, 1 );
            self.update();
        };

        //создание html элементов и рендер контента из state
        var createContent = function(parentElem) {

            addWindowBeforeUnloadEvent(); //спрашиваем пользователя перед выходом

            var container = document.createElement('div');
            container.classList.add ('col-md-8', 'col-sm-8', 'col-xs-8', 'constructor-container');
            container.setAttribute('id', 'constructor-container');
            var h3Elem = document.createElement('h3');
            h3Elem.innerText = 'Конструктор';

            var divElem = document.createElement('div');
            divElem.className = ('constructor droppable');
            divElem.id = 'constructor';
            divElem.style.minHeight = document.getElementById('templates').offsetHeight + 'px';

            container.append(h3Elem);
            container.append(divElem);

            parentElem.append(container);

            var componentContainerElem = document.getElementById('constructor');

            for (let i=0; i < state.length; i++) {

                switch(state[i].type) {
                    // header
                    case 'header':
                        //обертка блока
                        var conainerWrapperDivElem = document.createElement('div');
                        conainerWrapperDivElem.classList.add('constructor-block-wrapper');
                        //события появления контролов на блоках
                        conainerWrapperDivElem.addEventListener('mouseenter', function(EO){
                            showControlButtons(EO);
                        });
                        //события появления контролов на блоках
                        conainerWrapperDivElem.addEventListener('mouseleave', function(EO){
                            hideControlButtons(EO);
                        });
                            
                        //блок
                        var containerDivElem = document.createElement('div');
                        containerDivElem.classList.add('constructor-block', 'blue-theme-0','text-center');
                        
                        //кнопка вверх
                        var btnUp = document.createElement('span');
                        btnUp.classList.add('glyphicon', 'glyphicon-triangle-top','constructor-btn-up', 'constructor-btn');
                        btnUp.addEventListener('click', moveUpBlock);
                        
                        //кнопка вниз  
                        var btnDown = document.createElement('span');
                        btnDown.classList.add('glyphicon', 'glyphicon-triangle-bottom','constructor-btn-down', 'constructor-btn');
                        btnDown.addEventListener('click', moveDownBlock)
                        
                        //кнопка удалить 
                        var btnDel = document.createElement('span');
                        btnDel.classList.add('glyphicon', 'glyphicon-remove','constructor-btn-del', 'constructor-btn');
                        btnDel.addEventListener('click', deleteBlock);
                            
                        //заголовок блока
                        var headingElem = document.createElement('div');
                        headingElem.setAttribute('contenteditable', 'true');
                        headingElem.classList.add('constructor-block-introdusing');
                        if (!state[i].text[0]) {state[i].text[0] = 'Введите заголовок..'};
                        headingElem.innerText = state[i].text[0];

                        headingElem.addEventListener('focus', function(EO){
                            onFocus(EO, 'Введите заголовок..');
                        });


                        headingElem.addEventListener('blur', function(EO){
                            onBlur(EO, 'Введите заголовок..', 0);
                        });

                        //подзаголовок блока
                        var subHeadingElem = document.createElement('div');
                        subHeadingElem.setAttribute('contenteditable', 'true');
                        if (!state[i].text[1]) {state[i].text[1] = 'Введите подзаголовок..'};
                        subHeadingElem.classList.add('constructor-block-heading');
                        subHeadingElem.innerText = state[i].text[1];

                        subHeadingElem.addEventListener('focus', function(EO){
                            onFocus(EO, 'Введите подзаголовок..');
                        });
                        subHeadingElem.addEventListener('blur', function(EO){
                            onBlur(EO, 'Введите подзаголовок..', 1);
                        });
                        
                        //текст блока
                        var textElem = document.createElement('div');
                        textElem.setAttribute('contenteditable', 'true');
                        if (!state[i].text[2]) {state[i].text[2] = 'Введите текст..'};
                        textElem.classList.add('constructor-block-text');
                        textElem.innerText = state[i].text[2];
                        textElem.addEventListener('focus', function(EO){
                            onFocus(EO, 'Введите текст..');
                        });
                        textElem.addEventListener('blur', function(EO){
                            onBlur(EO, 'Введите текст..', 2);
                        });

                        containerDivElem.appendChild(headingElem);
                        containerDivElem.appendChild(subHeadingElem);
                        containerDivElem.appendChild(textElem);

                        conainerWrapperDivElem.appendChild(btnDel);
                        
                        conainerWrapperDivElem.appendChild(btnUp);
                        conainerWrapperDivElem.appendChild(btnDown);
                        conainerWrapperDivElem.appendChild(containerDivElem);
                        
                        componentContainerElem.appendChild(conainerWrapperDivElem);

                        break;

                    // textCol1
                    case 'text-col-1':
                        
                        var conainerWrapperDivElem = document.createElement('div');
                            conainerWrapperDivElem.classList.add('constructor-block-wrapper');

                        conainerWrapperDivElem.addEventListener('mouseenter', function(EO){
                            showControlButtons(EO);
                        });
                        conainerWrapperDivElem.addEventListener('mouseleave', function(EO){
                            hideControlButtons(EO);
                        });

                        var containerDivElem = document.createElement('div');
                        containerDivElem.classList.add('constructor-block', 'white-theme-0');
                            
                        var btnUp = document.createElement('span');
                        btnUp.classList.add('glyphicon', 'glyphicon-triangle-top','constructor-btn-up', 'constructor-btn');
                        btnUp.addEventListener('click', moveUpBlock);
                            
                        var btnDown = document.createElement('span');
                        btnDown.classList.add('glyphicon', 'glyphicon-triangle-bottom','constructor-btn-down', 'constructor-btn');
                        btnDown.addEventListener('click', moveDownBlock)
                            
                        var btnDel = document.createElement('span');
                        btnDel.classList.add('glyphicon', 'glyphicon-remove','constructor-btn-del', 'constructor-btn');
                        btnDel.addEventListener('click', deleteBlock);
                            
                        //div row
                        var divRowElem = document.createElement('div');
                        divRowElem.classList.add('row');
                        //div col-xs-12
                        var divColElem = document.createElement('div');
                        divColElem.classList.add('col-xs-12');
                        
                        var headingElem = document.createElement('div');
                        
                        headingElem.classList.add('constructor-block-heading');
                        headingElem.setAttribute('contenteditable', 'true');
                        if (!state[i].text[0]) {
                            state[i].text[0] = 'Введите заголовок..';
                        };
                        
                        headingElem.addEventListener('focus', function(EO){
                            onFocus(EO, 'Введите заголовок..');
                        });

                        headingElem.addEventListener('blur', function(EO){
                            onBlur(EO, 'Введите заголовок..', 0);
                        });
                        headingElem.innerText = state[i].text[0];

                        var textElem = document.createElement('div');
                        textElem.setAttribute('contenteditable', 'true');
                        if (!state[i].text[1]) {
                            state[i].text[1] = 'Введите текст..';
                        };
                        //фокус на поле "заголовок"
                        textElem.addEventListener('focus', function(EO){
                            onFocus(EO, 'Введите текст..');
                        });

                        //блюр из поля "заголовок"
                        textElem.addEventListener('blur', function(EO){
                            onBlur(EO, 'Введите текст..', 1);
                        });
                        textElem.innerText = state[i].text[1];

                        textElem.classList.add('constructor-block-text');

                        containerDivElem.appendChild(divRowElem);
                        containerDivElem.appendChild(divColElem);
                        containerDivElem.appendChild(btnUp);
                        containerDivElem.appendChild(btnDown);
                        containerDivElem.appendChild(btnDel);  
                        containerDivElem.appendChild(headingElem);
                        containerDivElem.appendChild(textElem);

                        
                        conainerWrapperDivElem.appendChild(btnDel);
                        conainerWrapperDivElem.appendChild(btnUp);
                        conainerWrapperDivElem.appendChild(btnDown);
                        conainerWrapperDivElem.appendChild(containerDivElem);
                        
                        componentContainerElem.appendChild(conainerWrapperDivElem);
                        
                        break;


                        
                    case 'text-col-2':
                        var conainerWrapperDivElem = document.createElement('div');
                        conainerWrapperDivElem.classList.add('constructor-block-wrapper');

                        conainerWrapperDivElem.addEventListener('mouseenter', function(EO){
                            showControlButtons(EO);
                        });
                        conainerWrapperDivElem.addEventListener('mouseleave', function(EO){
                            hideControlButtons(EO);
                        });

                        var containerDivElem = document.createElement('div');
                        containerDivElem.classList.add('constructor-block', 'white-theme-0');
                        
                        var btnUp = document.createElement('span');
                        btnUp.classList.add('glyphicon', 'glyphicon-triangle-top','constructor-btn-up', 'constructor-btn');
                        btnUp.addEventListener('click', moveUpBlock);
                            
                        var btnDown = document.createElement('span');
                        btnDown.classList.add('glyphicon', 'glyphicon-triangle-bottom','constructor-btn-down', 'constructor-btn');
                        btnDown.addEventListener('click', moveDownBlock)
                            
                        var btnDel = document.createElement('span');
                        btnDel.classList.add('glyphicon', 'glyphicon-remove','constructor-btn-del', 'constructor-btn');
                        btnDel.addEventListener('click', deleteBlock);

                        var divRowElem = document.createElement('div');
                        divRowElem.classList.add('row');

                        var divCol1Elem = document.createElement('div');
                            divCol1Elem.classList.add('col-xs-6');
                        var divCol2Elem = document.createElement('div');
                            divCol2Elem.classList.add('col-xs-6');

                        var headingElem1 = document.createElement('div');
                        headingElem1.classList.add('constructor-block-heading', 'constructor-block-heading-2cols');
                        headingElem1.setAttribute('contenteditable', 'true');
                        if (!state[i].text[0]) {
                            state[i].text[0] = 'Введите заголовок..';
                        }
                        headingElem1.addEventListener('focus', function(EO){
                            onFocus(EO, 'Введите заголовок..');
                        });
                        headingElem1.addEventListener('blur', function(EO){
                            onBlur(EO, 'Введите заголовок..', 0);
                        });
                        headingElem1.innerText = state[i].text[0];

                        var textElem1 = document.createElement('div');
                        textElem1.setAttribute('contenteditable', 'true');
                        textElem1.classList.add('constructor-block-text');
                        if (!state[i].text[1]) {state[i].text[1] = 'Введите текст..'};
                        textElem1.innerText = state[i].text[1];
                        
                        textElem1.addEventListener('focus', function(EO){
                            onFocus(EO, 'Введите текст..');
                        });
                        textElem1.addEventListener('blur', function(EO){
                            onBlur(EO, 'Введите текст..', 1);
                        });


                        var headingElem2 = document.createElement('div');
                        headingElem2.classList.add('constructor-block-heading', 'constructor-block-heading-2cols');
                        headingElem2.setAttribute('contenteditable', 'true');
                        if (!state[i].text[2]) {state[i].text[2] = 'Введите заголовок..'};
                        headingElem2.innerText = state[i].text[2];

                        headingElem2.addEventListener('focus', function(EO){
                            onFocus(EO, 'Введите заголовок..');
                        });
                        headingElem2.addEventListener('blur', function(EO){
                            onBlur(EO, 'Введите заголовок..', 2);
                        });

                        var textElem2 = document.createElement('div');
                        textElem2.setAttribute('contenteditable', 'true');
                        textElem2.classList.add('constructor-block-text');
                        if (!state[i].text[3]) {state[i].text[3] = 'Введите текст..'};
                        textElem2.innerText = state[i].text[3];
                        

                        textElem2.addEventListener('focus', function(EO){
                            onFocus(EO, 'Введите текст..');
                        });
                        textElem2.addEventListener('blur', function(EO){
                            onBlur(EO, 'Введите текст..', 3);
                        });

                        divCol1Elem.appendChild(headingElem1);
                        divCol1Elem.appendChild(textElem1);
                        divCol2Elem.appendChild(headingElem2);
                        divCol2Elem.appendChild(textElem2);
                        divRowElem.appendChild(divCol1Elem);
                        divRowElem.appendChild(divCol2Elem);
                        containerDivElem.appendChild(divRowElem);

                        conainerWrapperDivElem.appendChild(btnDel);
                        conainerWrapperDivElem.appendChild(btnUp);
                        conainerWrapperDivElem.appendChild(btnDown);
                        conainerWrapperDivElem.appendChild(containerDivElem);

                        componentContainerElem.appendChild(conainerWrapperDivElem);
                        
                        break;





                    // textImgCol2
                    case 'text-img-col-2':
                        var conainerWrapperDivElem = document.createElement('div');
                        conainerWrapperDivElem.classList.add('constructor-block-wrapper');

                        conainerWrapperDivElem.addEventListener('mouseenter', function(EO){
                            showControlButtons(EO);
                        });
                        conainerWrapperDivElem.addEventListener('mouseleave', function(EO){
                            hideControlButtons(EO);
                        });

                        var containerDivElem = document.createElement('div');
                        containerDivElem.classList.add('constructor-block', 'white-theme-0');
                        
                        var btnUp = document.createElement('span');
                        btnUp.classList.add('glyphicon', 'glyphicon-triangle-top','constructor-btn-up', 'constructor-btn');
                        btnUp.addEventListener('click', moveUpBlock);
                            
                        var btnDown = document.createElement('span');
                        btnDown.classList.add('glyphicon', 'glyphicon-triangle-bottom','constructor-btn-down', 'constructor-btn');
                        btnDown.addEventListener('click', moveDownBlock)
                            
                        var btnDel = document.createElement('span');
                        btnDel.classList.add('glyphicon', 'glyphicon-remove','constructor-btn-del', 'constructor-btn');
                        btnDel.addEventListener('click', deleteBlock);

                        var divRowElem = document.createElement('div');
                        divRowElem.classList.add('row');

                        var divCol1Elem = document.createElement('div');
                            divCol1Elem.classList.add('col-xs-6');
                        var divCol2Elem = document.createElement('div');
                            divCol2Elem.classList.add('col-xs-6');

                        var headingElem1 = document.createElement('div');
                        headingElem1.classList.add('constructor-block-heading', 'constructor-block-heading-2cols');
                        headingElem1.setAttribute('contenteditable', 'true');
                        if (!state[i].text[0]) {
                            state[i].text[0] = 'Введите заголовок..';
                        }
                        headingElem1.addEventListener('focus', function(EO){
                            onFocus(EO, 'Введите заголовок..');
                        });
                        headingElem1.addEventListener('blur', function(EO){
                            onBlur(EO, 'Введите заголовок..', 0);
                        });
                        headingElem1.innerText = state[i].text[0];

                        var textElem1 = document.createElement('div');
                        textElem1.setAttribute('contenteditable', 'true');
                        textElem1.classList.add('constructor-block-text');
                        if (!state[i].text[1]) {state[i].text[1] = 'Введите текст..'};
                        textElem1.innerText = state[i].text[1];
                        
                        textElem1.addEventListener('focus', function(EO){
                            onFocus(EO, 'Введите текст..');
                        });
                        textElem1.addEventListener('blur', function(EO){
                            onBlur(EO, 'Введите текст..', 1);
                        });

                        var textElem2 = document.createElement('div');
                        textElem2.setAttribute('contenteditable', 'true');
                        textElem2.classList.add('constructor-block-text', 'constructor-block-text-img');
                        if (!state[i].text[2]) {state[i].text[2] = 'Введите URL изображения..'};
                        textElem2.innerText = state[i].text[2];
                        

                        textElem2.addEventListener('focus', function(EO){
                            onFocus(EO, 'Введите URL изображения..');
                        });
                        textElem2.addEventListener('blur', function(EO){
                            onBlur(EO, 'Введите URL изображения..', 2);
                        });

                        divCol1Elem.appendChild(headingElem1);
                        divCol1Elem.appendChild(textElem1);
                        divCol2Elem.appendChild(textElem2);
                        divRowElem.appendChild(divCol1Elem);
                        divRowElem.appendChild(divCol2Elem);
                        containerDivElem.appendChild(divRowElem);

                        conainerWrapperDivElem.appendChild(btnDel);
                        conainerWrapperDivElem.appendChild(btnUp);
                        conainerWrapperDivElem.appendChild(btnDown);
                        conainerWrapperDivElem.appendChild(containerDivElem);

                        componentContainerElem.appendChild(conainerWrapperDivElem);

                        
                        
                        
                        break;

                    case 'img-col-1':
                        
                        var conainerWrapperDivElem = document.createElement('div');
                            conainerWrapperDivElem.classList.add('constructor-block-wrapper');

                        conainerWrapperDivElem.addEventListener('mouseenter', function(EO){
                            showControlButtons(EO);
                        });
                        conainerWrapperDivElem.addEventListener('mouseleave', function(EO){
                            hideControlButtons(EO);
                        });

                        var containerDivElem = document.createElement('div');
                        containerDivElem.classList.add('constructor-block', 'white-theme-0');
                            
                        var btnUp = document.createElement('span');
                        btnUp.classList.add('glyphicon', 'glyphicon-triangle-top','constructor-btn-up', 'constructor-btn');
                        btnUp.addEventListener('click', moveUpBlock);
                            
                        var btnDown = document.createElement('span');
                        btnDown.classList.add('glyphicon', 'glyphicon-triangle-bottom','constructor-btn-down', 'constructor-btn');
                        btnDown.addEventListener('click', moveDownBlock)
                            
                        var btnDel = document.createElement('span');
                        btnDel.classList.add('glyphicon', 'glyphicon-remove','constructor-btn-del', 'constructor-btn');
                        btnDel.addEventListener('click', deleteBlock);
                            
                        //div row
                        var divRowElem = document.createElement('div');
                        divRowElem.classList.add('row');
                        //div col-xs-12
                        var divColElem = document.createElement('div');
                        divColElem.classList.add('col-xs-12');

                        var textElem = document.createElement('div');
                        textElem.setAttribute('contenteditable', 'true');
                        if (!state[i].text[0]) {
                            state[i].text[0] = 'Введите URL изображения..';
                        };
                        //фокус на поле "заголовок"
                        textElem.addEventListener('focus', function(EO){
                            onFocus(EO, 'Введите URL изображения..');
                        });

                        //блюр из поля "заголовок"
                        textElem.addEventListener('blur', function(EO){
                            onBlur(EO, 'Введите URL изображения..', 0);
                        });
                        textElem.innerText = state[i].text[0];

                        textElem.classList.add('constructor-block-text');

                        containerDivElem.appendChild(divRowElem);
                        containerDivElem.appendChild(divColElem);
                        containerDivElem.appendChild(btnUp);
                        containerDivElem.appendChild(btnDown);
                        containerDivElem.appendChild(btnDel);  
                        containerDivElem.appendChild(textElem);

                        
                        conainerWrapperDivElem.appendChild(btnDel);
                        conainerWrapperDivElem.appendChild(btnUp);
                        conainerWrapperDivElem.appendChild(btnDown);
                        conainerWrapperDivElem.appendChild(containerDivElem);
                        
                        componentContainerElem.appendChild(conainerWrapperDivElem);

                        break;



                        function onFocus(EO, text) {
                            EO=EO||window.event;
                            if (EO.target.innerText == text) {
                                EO.target.innerText = '';
                            }

                        }
                        function onBlur(EO, text, storageTextNum){
                            EO=EO||window.event;
                            var textElem = EO.target;
                            if (!textElem.innerText) {
                                textElem.innerText = text;
                            } else {
                                var id = findPosition(EO.target);
                                state[id].text[storageTextNum] = EO.target.innerText;
                                textChangedF();
                            }
                        }

                        function showControlButtons(EO) {
                            EO=EO||window.event;
                            for (let i=0; i<EO.target.children.length; i++) {
                                var curEl = EO.target.children[i];
                                if( curEl.classList.contains('constructor-btn') ) {
                                    curEl.classList.add('constructor-btn-show');
                                }
                            }
                        }

                        function hideControlButtons(EO) {
                            EO=EO||window.event;
                            for (let i=0; i<EO.target.children.length; i++) {
                                var curEl = EO.target.children[i];
                                if( curEl.classList.contains('constructor-btn') ) {
                                    curEl.classList.remove('constructor-btn-show');
                                }
                            }
                        }
                }
            }
        };

        var createButton = function (parentElem) {
            var rowElem = document.createElement('div');
            rowElem.className = 'row';
            rowElem.setAttribute('id', 'button-container');
            var colElem = document.createElement('div');
            colElem.className = 'col-xs-offset-5 col-xs-6 text-center';
            
            var buttonElem = document.createElement('button');
            buttonElem.setAttribute('data-type-btn', 'result-page');
            buttonElem.className = 'btn btn-primary btn-lg btn-block  btn-result';
            buttonElem.innerText = 'Создать';
    
    
            colElem.appendChild(buttonElem);
            rowElem.appendChild(colElem);
            parentElem.append(rowElem);
        };

        //функция чтения состояния конструктора
        self.getState = function(){
            return state;
        };

        self.setState = function(newState){
            state = newState;
            textChangedF();
        };

        //добавление нового блока
        self.addBlock = function(_type, _text1, _text2, _text3, _text4){
            state.push( { type:_type, text:[_text1,_text2,_text3,_text4] } );
            textChangedF();
            self.update();
        };

        //нужно сделать такое
        self.onDragStart = function(state) {
            if(state == 'start') {
                var containerElem = document.getElementById('constructor');
                containerElem.classList.add('constructor-ondragstart');
            }
            if(state == 'end') {
                var containerElem = document.getElementById('constructor');
                containerElem.classList.remove('constructor-ondragstart');
            }
        };

        self.onDragOver = function(state){
            if(state == 'start') {
                var containerElem = document.getElementById('constructor');
                containerElem.classList.add('constructor-ondragover');
            }
            if(state == 'end') {
                var containerElem = document.getElementById('constructor');
                containerElem.classList.remove('constructor-ondragover');
            }
        };

        self.onDrop = function (state) {
            if(state == 'start') {
                var containerElem = document.getElementById('constructor');
                containerElem.classList.add('constructor-ondrop');
            }
            if(state == 'end') {
                var containerElem = document.getElementById('constructor');
                containerElem.classList.remove('constructor-ondrop');
            }
        };

        //удаление (скрытие) модуля на странице
        self.clear = function() {
            var constructorContainerElem = document.getElementById('constructor-container');
            if(constructorContainerElem) { 
                constructorContainerElem.outerHTML = '';
            }

            var buttonContainerElem = document.getElementById('button-container');
            if(buttonContainerElem) { 
                buttonContainerElem.outerHTML = '';
            }


        };

        //отображение модуля на странице
        self.update = function () {
            self.clear();
            createContent(parentElem);
            createButton(parentElem);
        };
    } catch (err) {
        window.location.href = 'https://stackoverflow.com/search?=' + err; //))
    }
}