define(function(require) {
    'use strict';

    requirejs.config({
        enforceDefine: true,
        inlineText: true,
        urlArgs: "bust=" + (new Date()).getTime()
    });

    function rand() {
        return (Math.random() - 0.5) * 500;
    }

    function makeDivs()
    {
        // console.log(event.clientX, event.clientY);
        for(var i = 0; i < 50; i++) {
            var $div = $('<div></div>');
            $('body').append($div);
            $div.css({
                left: event.clientX,
                top: event.clientY
            });
            $div.animate({
                left: '+=' + rand(),
                top: '+=' + rand(),
                opacity: 0
            }, 200, function(){
              $(this).remove();
            });
        }
    }

    $(document).click(makeDivs);
});
