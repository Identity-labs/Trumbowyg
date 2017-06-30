(function ($) {
    'use strict';

    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                fontsize: 'S'
            },
            nl: {
                fontsize: 'Lettergrootte'
            }
        }
    });
    // jshint camelcase:true

    var sizeList = {1: 10, 2: 13, 3: 16, 4: 18, 5: 24, 6: 32, 7: 48};
    

    function tagHandler(element, trumbowyg) {
        var tags = [];

        if (element.style.fontSize !== '') {
            var fontSize = element.style.fontSize;
            if (trumbowyg.o.plugins.fontsize.sizeList.indexOf(fontSize) >= 0) {
                tags.push('fontsize_' + fontSize);
            }
        }

        return tags;
    }
    
    // Add dropdown with font sizes
    $.extend(true, $.trumbowyg, {
        plugins: {
            fontsize: {
                init: function (trumbowyg) {
                    trumbowyg.addBtnDef('fontsize', {
                        dropdown: buildDropdown(trumbowyg),
                        hasIcon: false,
                        text: trumbowyg.lang.fontsize
                    });
                },
                tagHandler: tagHandler
            }
        }
    });
    function buildDropdown(trumbowyg) {
        var dropdown = [];
        $.each(sizeList, function(index, size) {
            trumbowyg.addBtnDef('fontsize_' + index, {
                text: '<span size="' + index + '">' + size + 'px</span>',
                hasIcon: false,
                param: size,
                fn: 'fontSize'
            });
            dropdown.push('fontsize_' + index);
        });

        return dropdown;
    }
})(jQuery);
