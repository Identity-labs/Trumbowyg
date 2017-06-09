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

    var defaultOptions = {
        sizeList: ['x-small', 'small', 'medium', 'large', 'x-large']
    };
    

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
                	trumbowyg.o.plugins.fontsize = $.extend(true, {}, defaultOptions, trumbowyg.o.plugins.fontsize || {});
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

        $.each(trumbowyg.o.plugins.fontsize.sizesList, function(index, size) {
            trumbowyg.addBtnDef('fontsize_' + size, {
                text: '<span style="font-size: ' + size + ';">' + size + '</span>',
                hasIcon: false,
                fn: function(){
                	try{
	                    trumbowyg.saveRange();
	                    var text = trumbowyg.getRangeText();
	                    if (text.replace(/\s/g, '') !== '') {
                            var curtag = getSelectionParentElement().tagName.toLowerCase();
                            if(curtag != 'span'){
                            	trumbowyg.execCmd('insertHTML', '<span style="font-size: ' + size + '">' + text + '</span>');
                            }else{
    	                        try {
    	                            $(curtag).css('fontSize', size);
    	                        } catch (e) { }
                            }
	                    }
                	}catch(e){}
                }
            });
            dropdown.push('fontsize_' + size);
        });

        return dropdown;
    }

    /*
     * GetSelectionParentElement
     */
    function getSelectionParentElement() {
        var parentEl = null,
            selection;
        if (window.getSelection) {
            selection = window.getSelection();
            if (selection.rangeCount) {
                parentEl = selection.getRangeAt(0).commonAncestorContainer;
                if (parentEl.nodeType !== 1) {
                    parentEl = parentEl.parentNode;
                }
            }
        } else if ((selection = document.selection) && selection.type !== 'Control') {
            parentEl = selection.createRange().parentElement();
        }
        return parentEl;
    }
})(jQuery);
