function ResultCode() {
    var self = this;
    var state = [];

    var parentElem = document.getElementById('page');

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

    var storageTemplates = {

        startHTML: function() {
            return(
                '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd"><html xmlns="http://www.w3.org/1999/xhtml"><head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8; no-cache"/><meta name="viewport" content="width=device-width, initial-scale=1.0"><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"><meta name="format-detection" content="telephone=no"/> <title></title><style type="text/css">html{background-color:#FFFFFF; margin:0; padding:0;}body, #bodyTable, #bodyCell, #bodyCell{height:100% !important; margin:0; padding:0; width:100% !important;font-family:Helvetica, Arial, "Lucida Grande", sans-serif;}table{border-collapse:collapse;}table[id=bodyTable]{width:100%!important;margin:auto;max-width:500px!important;color:#7A7A7A;font-weight:normal;}img, a img{border:0; outline:none; text-decoration:none;height:auto; line-height:100%;}a{text-decoration:none !important;border-bottom: 1px solid;}h1, h2, h3, h4, h5, h6{color:#5F5F5F; font-weight:normal; font-family:Helvetica; font-size:20px; line-height:125%; text-align:Left; letter-spacing:normal;margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;padding-top:0;padding-bottom:0;padding-left:0;padding-right:0;}.ReadMsgBody{width:100%;}.ExternalClass{width:100%;}.ExternalClass, .ExternalClass p, .ExternalClass span, .ExternalClass font, .ExternalClass td, .ExternalClass div{line-height:100%;}/* Force Hotmail/Outlook.com to display line heights normally. */table, td{mso-table-lspace:0pt; mso-table-rspace:0pt;}#outlook a{padding:0;}img{-ms-interpolation-mode: bicubic;display:block;outline:none; text-decoration:none;}/* Force IE to smoothly render resized images. */body, table, td, p, a, li, blockquote{-ms-text-size-adjust:100%; -webkit-text-size-adjust:100%; font-weight:normal!important;}/* Prevent Windows- and Webkit-based mobile platforms from changing declared text sizes. */.ExternalClass td[class="ecxflexibleContainerBox"] h3{padding-top: 10px !important;}/* Force hotmail to push 2-grid sub headers down */h1{display:block;font-size:26px;font-style:normal;font-weight:normal;line-height:100%;}h2{display:block;font-size:20px;font-style:normal;font-weight:normal;line-height:120%;}h3{display:block;font-size:17px;font-style:normal;font-weight:normal;line-height:110%;}h4{display:block;font-size:18px;font-style:italic;font-weight:normal;line-height:100%;}.flexibleImage{height:auto;}.linkRemoveBorder{border-bottom:0 !important;}table[class=flexibleContainerCellDivider]{padding-bottom:0 !important;padding-top:0 !important;}body, #bodyTable{background-color:#FFFFFF;}#emailHeader{background-color:#FFFFFF;}#emailBody{background-color:#FFFFFF;}#emailFooter{background-color:#E1E1E1;}.nestedContainer{background-color:#F8F8F8; border:1px solid #CCCCCC;}.emailButton{background-color:#205478; border-collapse:separate;}.buttonContent{color:#FFFFFF; font-family:Helvetica; font-size:18px; font-weight:bold; line-height:100%; padding:15px; text-align:center;}.buttonContent a{color:#FFFFFF; display:block; text-decoration:none!important; border:0!important;}.emailCalendar{background-color:#FFFFFF; border:1px solid #CCCCCC;}.emailCalendarMonth{background-color:#205478; color:#FFFFFF; font-family:Helvetica, Arial, sans-serif; font-size:16px; font-weight:bold; padding-top:10px; padding-bottom:10px; text-align:center;}.emailCalendarDay{color:#205478; font-family:Helvetica, Arial, sans-serif; font-size:60px; font-weight:bold; line-height:100%; padding-top:20px; padding-bottom:20px; text-align:center;}.imageContentText{margin-top: 10px;line-height:0;}.imageContentText a{line-height:0;}#invisibleIntroduction{display:none !important;}span[class=ios-color-hack] a{color:#275100!important;text-decoration:none!important;}/* Remove all link colors in IOS (below are duplicates based on the color preference) */span[class=ios-color-hack2] a{color:#205478!important;text-decoration:none!important;}span[class=ios-color-hack3] a{color:#8B8B8B!important;text-decoration:none!important;}.a[href^="tel"], a[href^="sms"]{text-decoration:none!important;color:#606060!important;pointer-events:none!important;cursor:default!important;}.mobile_link a[href^="tel"], .mobile_link a[href^="sms"]{text-decoration:none!important;color:#606060!important;pointer-events:auto!important;cursor:default!important;}@media only screen and (max-width: 480px){body{width:100% !important; min-width:100% !important;}table[id="emailHeader"],table[id="emailBody"],table[id="emailFooter"],table[class="flexibleContainer"],td[class="flexibleContainerCell"]{width:100% !important;}td[class="flexibleContainerBox"], td[class="flexibleContainerBox"] table{display: block;width: 100%;text-align: left;}td[class="imageContent"] img{height:auto !important; width:100% !important; max-width:100% !important;}img[class="flexibleImage"]{height:auto !important; width:100% !important;max-width:100% !important;}img[class="flexibleImageSmall"]{height:auto !important; width:auto !important;}table[class="flexibleContainerBoxNext"]{padding-top: 10px !important;}table[class="emailButton"]{width:100% !important;}td[class="buttonContent"]{padding:0 !important;}td[class="buttonContent"] a{padding:15px !important;}}/* end IOS targeting */</style><!--[if mso 12]><style type="text/css">.flexibleContainer{display:block !important; width:100% !important;}</style><![endif]--><!--[if mso 14]><style type="text/css">.flexibleContainer{display:block !important; width:100% !important;}</style><![endif]--></head><body bgcolor="#E1E1E1" leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0"><center style="background-color:#FFFFFF;"><table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable" style="table-layout: fixed;max-width:100% !important;width: 100% !important;min-width: 100% !important;"><tr><td align="center" valign="top" id="bodyCell"><table bgcolor="#FFFFFF" border="0" cellpadding="0" cellspacing="0" width="500" id="emailBody">'
            );
        },
        endHTML : function() {
            return(
                '</table></td></tr></table></center></body></html>'
            );
        },

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
                + '" width="210" class="flexibleImage" style="max-width:100%;" alt="Text" title="Text"/></td></tr></table></td></tr></table></td></tr></table></td></tr></table></td></tr>'
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

    var createContainer = function(parentElem) {
        var container = document.createElement('div');
        container.className = 'col-md-4 col-sm-4 col-xs-12';
        container.id = 'resultcode-container'; // будет очищать innerhtml
        
        var h3Elem = document.createElement('h3');
        h3Elem.className = 'block-heading';
        h3Elem.innerText = 'Код для скачивания';

        var divElem = document.createElement('div');
        divElem.className = 'resultcode';
        divElem.id = 'resultcode';

        var textareaElem = document.createElement('textarea');
        textareaElem.id = 'resultcode-textarea';
        textareaElem.style.width = '100%';
        textareaElem.setAttribute('disabled', '');

        container.appendChild(h3Elem);
        container.appendChild(divElem);
        divElem.appendChild(textareaElem);
        parentElem.appendChild(container);
        // iframeElem.contentWindow.document.documentElement.innerHTML
    };

    var createContent = function() {

        var str = '';

        str += storageTemplates.startHTML(); 

        for (let i=0; i < state.length; i++) {

            switch(state[i].type) {
                case 'header': 
                    str += storageTemplates.header(state[i].text[0], state[i].text[1], state[i].text[2]);
                break;

                case 'text-col-1':
                    str += storageTemplates.textCol1(state[i].text[0], state[i].text[1]);
                break;

                case 'text-col-2':
                    str += storageTemplates.textCol2(state[i].text[0], state[i].text[1], state[i].text[2], state[i].text[3]);
                break;

                case 'text-img-col-2':
                    str += storageTemplates.textImgCol2(state[i].text[0], state[i].text[1], state[i].text[2]);
                break;

                case 'img-col-1':
                    str += storageTemplates.imgCol1(state[i].text[0]);
                break;

            }
        }
        str += storageTemplates.endHTML(); 

        var textareaElem = document.getElementById('resultcode-textarea');
        if (state.length !== 0) {
            textareaElem.innerHTML = str;
        }
    };

    self.setState = function(hash) {
        state = deepCopy(hash);
        self.update();
    };

    self.clear = function() {
        var resultcodeContainerElem = document.getElementById('resultcode-container');
        if (resultcodeContainerElem) {
            resultcodeContainerElem.outerHTML = '';
        }
    };

    self.update = function() {
        self.clear();
        createContainer(parentElem);
        createContent();
    };
}
