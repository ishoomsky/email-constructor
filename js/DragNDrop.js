'use strict';

function DragNDrop() {
    var self = this;
    var currentDroppable = null;

    self.onMouseDown = function(EO) {
        EO = EO||Window.event;

        var shiftX = event.clientX - EO.currentTarget.getBoundingClientRect().left;
        var shiftY = event.clientY - EO.currentTarget.getBoundingClientRect().top;
        var cloneElem = EO.currentTarget.cloneNode(true);
        cloneElem.style.width = EO.currentTarget.offsetWidth + 'px';
        cloneElem.style.height = EO.currentTarget.offsetHeight + 'px';
        
        cloneElem.style.position = 'absolute';
        cloneElem.style.zIndex = '999';
        cloneElem.style.boxShadow = '4px 4px 7px 0px rgba(150,150,150,1)';

        cloneElem.classList.remove('templates-effect');
        cloneElem.style.cursor = 'grabbing';
        document.body.append(cloneElem);

        constructor.onDragStart('start');

        moveAt(EO.pageX, EO.pageY);

        function moveAt(pageX, pageY) {
            cloneElem.style.left = pageX - shiftX + 'px';
            cloneElem.style.top = pageY - shiftY + 'px';
        }
        
        function onMouseMove(EO) {
            EO = EO||Window.event;

            moveAt(EO.pageX, EO.pageY);
            cloneElem.hidden = true;
            var elemBelow = document.elementFromPoint(event.clientX, event.clientY);
            cloneElem.hidden = false;

            if (!elemBelow) return;

            var droppableBelow = elemBelow.closest('.droppable');
            if (currentDroppable != droppableBelow) {
            
                if (currentDroppable) {
                //   console.log('Вылетели из droppable')

                  constructor.onDragStart('start');
                  constructor.onDragOver('end');

                }
                currentDroppable = droppableBelow;

                if (currentDroppable) {
                //   console.log('Влетели в droppable')
                  constructor.onDragStart('end');
                  
                  constructor.onDragOver('start');

                }
            }

        };

        document.addEventListener('mousemove', onMouseMove);

        cloneElem.onmouseup = function() {
            if (!currentDroppable) {
                // console.log('отпустили вне  droppable');

                constructor.onDragStart('end');

                cloneElem.remove();
            }

            if (currentDroppable) {
                // console.log('отпустили в droppable');

                setTimeout(function(){
                    constructor.onDrop('start');

                    setTimeout(function(){
                    constructor.onDrop('end');

                    },200);

                },0);

                var elemType = cloneElem.getAttribute('data-type');

                constructor.addBlock( elemType ); //добавляем в storage конструктора данные о соответствующий блок

                cloneElem.remove();
                currentDroppable = null;
                
            }
            cloneElem.style.cursor = 'auto';
            document.removeEventListener('mousemove', onMouseMove);
            cloneElem.onmouseup = null;
          };
    };

    self.onDragStart = function() {
        return false;
    };

    self.addEvents = function() {

        var templatesElem = document.getElementById('templates');
        for (let i=0; i<templatesElem.children.length; i++) {
            if(templatesElem.children[i].classList.contains('draggable'))
                templatesElem.children[i].addEventListener('mousedown', self.onMouseDown);
        }

        var images = document.querySelectorAll('.wrapper-img img');
        for (let i=0;i<images.length;i++) {
            images[i].ondragstart = function() {
                return false;
            }
        }

    };

    self.clear = function() {

        var templatesElem = document.getElementById('templates');
        for (let i=0; i<templatesElem.children.length; i++) {

            if(templatesElem.children[i].classList.contains('draggable'))
                templatesElem.children[i].removeEventListener('mousedown', self.onMouseDown);
        }
        var images = document.querySelectorAll('.wrapper-img img');

    };

    self.update = function() {
        self.addEvents();
    };
}