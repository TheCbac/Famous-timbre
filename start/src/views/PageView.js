define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var HeaderFooter  = require('famous/views/HeaderFooterLayout');

    var ImageSurface  = require('famous/surfaces/ImageSurface');

    function PageView() {
        View.apply(this, arguments);

        _createLayout.call(this);
        _createHeader.call(this);

    }

    PageView.prototype = Object.create(View.prototype);
    PageView.prototype.constructor = PageView;

    PageView.DEFAULT_OPTIONS = {
        headerSize:44
    };

    function _createLayout() {
        this.layout = new HeaderFooter({
            headerSize: this.options.headerSize
        });

        var layoutModifier = new StateModifier({
            Transform: Transform.translate(0,0,0.1)
        });

        this.add(layoutModifier).add(this.layout);
    }

  function _createHeader() {
        var backgroundSurface = new Surface({
            properties: {
                backgroundColor: 'black'
            }
        });

        var backgroundModifier = new StateModifier({
            transform: Transform.behind
        });

        this.hamburgerSurface = new ImageSurface({
            size:[44,44],
            content: 'img/hamburger.png'
        });

        var searchSurface = new ImageSurface({
            size:[232, 44],
            content: 'img/search.png'
        });

        var iconSurface = new ImageSurface({
            size: [44,44],
            content: 'img/icon.png'
        });

        var hamburgerModifier = new StateModifier({
            origin: [0, 0.5],
            align : [0, 0.5]
        });

        var searchModifier = new StateModifier({
            origin: [0.5, 0.5],
            align : [0.5, 0.5]
        });

        var iconModifier = new StateModifier({
            origin: [1, 0.5],
            align : [1, 0.5]
        });


        this.layout.header.add(hamburgerModifier).add(this.hamburgerSurface);
        this.layout.header.add(searchModifier).add(searchSurface);
        this.layout.header.add(iconModifier).add(iconSurface);
    }


    module.exports = PageView;
});
