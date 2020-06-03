function Ajax() {
    var self = this;

    var ajaxHandlerScript="https://fe.it-academy.by/AjaxStringStorage2.php";
    var updatePassword;
    var stringName='SHUMSKI_RESPMAIL_CONSTRUCTOR';

    function storeInfo() {
        updatePassword=Math.random();
        $.ajax( {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'LOCKGET', n : stringName, p : updatePassword },
                success : lockGetReady, error : errorHandler
            }
        );
    }

    function lockGetReady(callresult) {
        if ( callresult.error!=undefined )
            alert(callresult.error);
        else {
            // нам всё равно, что было прочитано -
            // всё равно перезаписываем

            constructor.getState();

            var info= constructor.getState();
            alert('Сохранено на сервер');
            $.ajax( {
                    url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                    data : { f : 'UPDATE', n : stringName, v : JSON.stringify(info), p : updatePassword },
                    success : updateReady, error : errorHandler
                }
            );
        }
    }

    function updateReady(callresult) {
        if ( callresult.error!=undefined )
            alert(callresult.error);
    }

    function restoreInfo() {
        $.ajax(
            {
                url : ajaxHandlerScript, type : 'POST', cache : false, dataType:'json',
                data : { f : 'READ', n : stringName },
                success : readReady, error : errorHandler
            }
        );
    }

    function readReady(callresult) {
        if ( callresult.error!=undefined )
            alert(callresult.error);
        else if ( callresult.result!="" ) {
            var info=JSON.parse(callresult.result);
            alert('Загружено с сервера');

            constructor.setState(info);
            spa.update();
            // document.getElementById('IName').value=info.name;
            // document.getElementById('IAge').value=info.age;
        }
    }

    function errorHandler(jqXHR,statusStr,errorStr) {
        alert(statusStr+' '+errorStr);
    }

    self.save = function() {
        storeInfo();
    }

    self.load = function() {
        restoreInfo();
    }

}