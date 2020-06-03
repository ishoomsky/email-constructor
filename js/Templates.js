function Templates() {
    var self = this;

    var parentElem = document.getElementById('page');

    var createContainer = function (_parentElem) {
            var container = document.createElement('div');
            container.className = 'col-md-4 col-sm-4 col-xs-4';
            container.id = 'templates-container';
            _parentElem.append(container);

            var h3Elem = document.createElement('h3');
            h3Elem.className = 'block-heading';
            h3Elem.innerText = 'Шаблоны';

            var divElem = document.createElement('div');
            divElem.className = 'templates';
            divElem.id = 'templates';
            container.append(h3Elem);
            container.append(divElem);
    };

    var storageTemplates = {
        header:     '<h4 class="unselectable">Заголовок-приветствие</h4><div data-type="header" id="templates-block-header" class="templates-block-header templates-effect unselectable draggable"> <div class="templates-block-header-heading child-type-heading">Introduction header</div><div class="templates-block-header-subheading child-type-subheading">Subheader introduction</div><div class="templates-block-header-text child-type-text">Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tort</div></div>',
        textCol1:   '<h4 class="unselectable">Текст + заголовок</h4> <div data-type="text-col-1" id="templates-block-text-col1" class="templates-block-text templates-effect unselectable draggable"> <div class="row"> <div class="col-xs-12"> <div class="templates-block-text-heading"> Message Title </div><div class="templates-block-text-text"> Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. </div></div></div></div>',
        textCol2:   '<h4 class="unselectable">Текст + заголовок (2 кол.)</h4> <div data-type="text-col-2" id="templates-block-text-col2" class="templates-block-text templates-effect unselectable draggable"> <div class="row"> <div class="col-xs-6"> <div class="templates-block-text-heading"> Left column </div><div class="templates-block-text-text"> Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis. </div></div><div class="col-xs-6"> <div class="templates-block-text-heading"> Right column </div><div class="templates-block-text-text"> Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis. </div></div></div></div>',
        textImgCol2: '<h4 class="unselectable">Текст + изображение</h4> <div data-type="text-img-col-2" id="templates-block-text-image-col2" id="templates-block-text-img" class="templates-block-text templates-effect unselectable draggable"> <div class="row"> <div class="col-xs-6"> <div class="templates-block-text-heading"> Left column </div><div class="templates-block-text-text"> Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis. </div></div><div class="col-xs-6"><div class="wrapper-img"> <img src="img/img.jpg" alt="img"> </div></div></div></div>',
        imgCol1:    '<h4 class="unselectable">Изображение</h4><div data-type="img-col-1" id="templates-block-img-col1" class="templates-block-text templates-effect unselectable draggable"> <div class="row"> <div class="col-xs-12"> <div class="wrapper-img"> <img src="img/img.jpg" alt="img"> </div></div></div></div>',
    };
    
    var createButtons = function() {
        var blocks = document.getElementsByClassName('draggable');
        for (let i=0; i < blocks.length; i++) {
            var btn = document.createElement('button');
            btn.className = 'btn btn-default';
            btn.setAttribute('data-type', blocks[i].getAttribute('data-type'));

            var span = document.createElement('span');
            span.className = 'glyphicon glyphicon-plus template-btn';
            span.setAttribute('data-type', blocks[i].getAttribute('data-type'));

            btn.append(span);
            blocks[i].after(btn);
        }
    };

    var createBlock = function (html) {
        var parentBlockElem = document.getElementById('templates');
        parentBlockElem.innerHTML += html;
    };


    self.clear = function() {
        var templatesContainerElem = document.getElementById('templates-container');
        templatesContainerElem.outerHTML = '';
    };

    self.update = function() {
        createContainer(parentElem);
        createBlock(storageTemplates.header);
        createBlock(storageTemplates.textCol1);
        createBlock(storageTemplates.textCol2);
        createBlock(storageTemplates.textImgCol2);
        createBlock(storageTemplates.imgCol1);
        createButtons();
    };
}