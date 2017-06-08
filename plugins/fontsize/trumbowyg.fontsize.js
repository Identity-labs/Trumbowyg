(function ($) {
    'use strict';

    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                fontsize: 'S',
                fontsizes: {
                    'x-small': 'Extra Small',
                    'small': 'Small',
                    'medium': 'Regular',
                    'large': 'Large',
                    'x-large': 'Extra Large'
                }
            },
            nl: {
                fontsize: 'Lettergrootte',
                fontsizes: {
                    'x-small': 'Extra Klein',
                    'small': 'Klein',
                    'medium': 'Normaal',
                    'large': 'Groot',
                    'x-large': 'Extra Groot'
                }
            }
        }
    });
    // jshint camelcase:true

    var defaultOptions = {
        sizeList: ['x-small', 'small', 'medium', 'large', 'x-large']
    };
    
    // Add dropdown with font sizes
    $.extend(true, $.trumbowyg, {
        plugins: {
            fontsize: {
                init: function (trumbowyg) {
                	trumbowyg.o.plugins.fontsize = $.extend(true, {}, defaultOptions, trumbowyg.o.plugins.fontsize || {});
                    trumbowyg.addBtnDef('fontsize', {
                        dropdown: buildDropdown(trumbowyg),
                        hasIcon: false,
                        text: trumbowyg.lang.fontsize
                    });
                }
            }
        }
    });
    function buildDropdown(trumbowyg) {
        var dropdown = [];

        $.each(trumbowyg.o.plugins.fontsize.sizesList, function(index, size) {
            trumbowyg.addBtnDef('fontsize_' + size, {
                text: '<span style="font-size: ' + size + ';">' + (trumbowyg.lang.fontsizes[size]?trumbowyg.lang.fontsizes[size]:size) + '</span>',
                hasIcon: false,
                fn: function(){
                    trumbowyg.expandRange();
                    trumbowyg.execCmd('fontSize', index+1, true);
                }
            });
            dropdown.push('fontsize_' + size);
        });

        return dropdown;
    }
})(jQuery);
