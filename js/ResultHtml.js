function ResultHtml() {
    var self = this;
    
    //функция глубокого копирования объектов
    var deepCopy = function (original) {
        let clone;
        if (Array.isArray(original)) {
          let cloneLength = original.length;
          clone = new Array(cloneLength);
          for (let i = 0; i < original.length; i++) clone[i] = deepCopy(original[i]);
          return clone;
        }
        if (original instanceof Object) {
          clone = {};
          for (let value in original) clone[value] = deepCopy(original[value]);
          return clone;
        }
        //если примитивы
        clone = original;
        return clone;
    };
    
    //родительский элемент, к нему будет append данного модуля
    var parentElem = document.getElementById('page');
    
    //состояние модуля
    var state = [
        //для отладки
        // {type:'header', text: ['Введите заголовок..','Введите подзаголовок..','Введите текст..']},
        // {type:'img-col-1', text: ['https://i.pinimg.com/564x/e2/ce/04/e2ce04f710f510f69485060d08008fc1.jpg']},
        // {type:'text-col-1', text: ['Введите заголовок..','Введите подзаголовок..']},
        // {type:'text-col-2', text: ['Левая колонка..','Текст..','Правая колонка..','Текст..']},
        // {type:'text-img-col-2', text: ['Введите заголовок..','Введите текст..','https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png']},
        
    ];
    
    //шаблоны блоков с переменными для текста
    var htmlTemplates = {
        
        header : function (text1, text2, text3) {
            return (
                '<tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="color:#FFFFFF;" bgcolor="#3498db"><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"><tr><td align="center" valign="top" width="500" class="flexibleContainerCell"><table border="0" cellpadding="30" cellspacing="0" width="100%"><tr><td align="center" valign="top" class="textContent"><h1 style="color:#FFFFFF;line-height:100%;font-family:Helvetica,Arial,sans-serif;font-size:35px;font-weight:normal;margin-bottom:5px;text-align:center;">' 
                + text1
                + '</h1><h2 style="text-align:center;font-weight:normal;font-family:Helvetica,Arial,sans-serif;font-size:23px;margin-bottom:10px;color:#205478;line-height:135%;">' 
                + text2 
                + '</h2><div style="text-align:center;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#FFFFFF;line-height:135%;">' 
                + text3
                + '</div></td></tr></table></td></tr></table></td></tr></table></td></tr>'
            );
        },
        
        
        textCol1: function (text1, text2) {
            return (
                '<tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"><tr><td align="center" valign="top" width="500" class="flexibleContainerCell"><table border="0" cellpadding="30" cellspacing="0" width="100%"><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td valign="top" class="textContent"><h3 style="color:#5F5F5F;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;margin-top:0;margin-bottom:3px;text-align:left;">'
                + text1
                + '</h3><div mc:edit="body" style="text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#5F5F5F;line-height:135%;">'
                + text2
                +'</div></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr>'
            );
        },
        
        textCol2: function (text1, text2, text3, text4) {
            return (
                '<tr mc:hideable><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top"><table border="0" cellpadding="30" cellspacing="0" width="500" class="flexibleContainer"><tr><td valign="top" width="500" class="flexibleContainerCell"><table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="left" valign="top" class="flexibleContainerBox"><table border="0" cellpadding="0" cellspacing="0" width="210" style="max-width: 100%;"><tr><td align="left" class="textContent"><h3 style="color:#5F5F5F;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;margin-top:0;margin-bottom:3px;text-align:left;">'
                + text1
                + '</h3><div style="text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#5F5F5F;line-height:135%;">'
                + text2
                + '</div></td></tr></table></td><td align="right" valign="middle" class="flexibleContainerBox"><table class="flexibleContainerBoxNext" border="0" cellpadding="0" cellspacing="0" width="210" style="max-width: 100%;"><tr><td align="left" class="textContent"><h3 style="color:#5F5F5F;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;margin-top:0;margin-bottom:3px;text-align:left;">'
                + text3
                + '</h3><div style="text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#5F5F5F;line-height:135%;">'
                + text4
                + '</div></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr>'
            );
        },
        
        textImgCol2: function (text1, text2, text3, text4) {
            return (
                '<tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top"><table border="0" cellpadding="30" cellspacing="0" width="500" class="flexibleContainer"><tr><td valign="top" width="500" class="flexibleContainerCell"><table align="left" border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="left" valign="top" class="flexibleContainerBox"><table border="0" cellpadding="0" cellspacing="0" width="210" style="max-width:100%;"><tr><td align="left" class="textContent"><h3 style="color:#5F5F5F;line-height:125%;font-family:Helvetica,Arial,sans-serif;font-size:20px;font-weight:normal;margin-top:0;margin-bottom:3px;text-align:left;">'
                + text1
                + '</h3><div style="text-align:left;font-family:Helvetica,Arial,sans-serif;font-size:15px;margin-bottom:0;color:#5F5F5F;line-height:135%;">'
                + text2
                + '</div></td></tr></table></td><td align="right" valign="top" class="flexibleContainerBox"><table class="flexibleContainerBoxNext" border="0" cellpadding="0" cellspacing="0" width="210" style="max-width:100%;"><tr><td align="left" class="textContent"><img src="'
                + text3
                + '" width="210" class="flexibleImage" style="max-width:60%;" alt="Text" title="Text"/></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr>'
            );
        },
        
        imgCol1: function (text1) {
            return (
                '<tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="500" class="flexibleContainer"><tr><td align="center" valign="top" width="500" class="flexibleContainerCell"><table border="0" cellpadding="0" cellspacing="0" width="100%"><tr><td valign="top" class="imageContent"><img src="'
                + text1
                + '" width="500" class="flexibleImage" style="max-width:500px;width:100%;display:block;" alt="Text" title="Text"/></td></tr></table></td></tr></table></td></tr></table></td></tr>'
            );
        },
    };
   
    //создание html элементов
    var createContainer = function (_parentElem) {
        var container = document.createElement('div');
        container.className = 'col-md-8 col-sm-8 col-xs-12';
        container.id = 'htmlprev-container'; // будет очищать innerhtml
        _parentElem.appendChild(container);
        
        var h3Elem = document.createElement('h3');
        h3Elem.className = 'block-heading';
        h3Elem.innerText = 'HTML превью';
        
        var divElem = document.createElement('div');
        divElem.className = 'htmlprev';
        divElem.id = 'htmlprev';
        
        var iframeWrapElem = document.createElement('div');
        iframeWrapElem.classList.add('responsive-iframe-container');
        
        var iframeElem = document.createElement('iframe');
        iframeElem.setAttribute('src', 'frame.html?random='+ (new Date()).getTime() + Math.floor(Math.random() * 1000000)); //решение проблемы кеширования фрейма
        iframeElem.setAttribute('id', 'htmlprev-iframe');
        iframeElem.setAttribute('frameborder', '0');
        iframeElem.classList.add('responsive-iframe-frame');
        
        container.appendChild(h3Elem);
        container.appendChild(divElem);
        
        divElem.appendChild(iframeWrapElem);
        iframeWrapElem.appendChild(iframeElem);
    };

    //рендер контента из state
    var createBlocks = function() {
        
        var str = '';
        
        for (let i=0; i < state.length; i++) {
            
            switch(state[i].type) {
                case 'header': 
                    str += htmlTemplates.header(state[i].text[0], state[i].text[1], state[i].text[2]);
                break;
                
                case 'text-col-1':
                    str += htmlTemplates.textCol1(state[i].text[0], state[i].text[1]);
                break;
                
                case 'text-col-2':
                    str += htmlTemplates.textCol2(state[i].text[0], state[i].text[1], state[i].text[2], state[i].text[3]);
                break;
                
                case 'text-img-col-2':
                    str += htmlTemplates.textImgCol2(state[i].text[0], state[i].text[1], state[i].text[2]);
                break;
                
                case 'img-col-1':
                    str += htmlTemplates.imgCol1(state[i].text[0]);
                break;
            }
        }
        
        var iframeElem = document.getElementById('htmlprev-iframe');
        
        iframeElem.onload = function () { //ждем загрузки iframe и после вставляем внутрянку
            var rootElem = iframeElem.contentWindow.document.getElementById('emailBody');
            rootElem.innerHTML = str;

            if (str){
                iframeElem.style.height = iframeElem.contentWindow.document.body.offsetHeight + 'px';
                iframeElem.parentElement.style.height = iframeElem.contentWindow.document.body.offsetHeight + 'px';
            }
            
        };
    };
    
    //установка состояния данного модуля
    self.setState = function(hash) {
        state = deepCopy(hash);
        self.update();
    };

    //удаление (скрытие) модуля на странице
    self.clear = function() {
        var htmlPrevContainerElem = document.getElementById('htmlprev-container');
        if(htmlPrevContainerElem) { 
            htmlPrevContainerElem.outerHTML = '';
        }
    };

    //отображение модуля на странице
    self.update = function() {
        self.clear();
        createContainer(parentElem);
        createBlocks();
    };
}
// var resultHtml = new ResultHtml();