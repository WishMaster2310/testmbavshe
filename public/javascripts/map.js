ymaps.ready(function() {

  var gmc_baloon_img = $('#yamap-gmc-image').attr('src');
  var ms_baloon_img = $('#yamap-ms-image').attr('src');

  var myMap = new ymaps.Map('map', {
    center: [55.769850, 37.596300],
    zoom: 13,
    controls: ['zoomControl']
  }, {
    searchControlProvider: 'yandex#search'
  });

  myMap.behaviors.disable(['scrollZoom'])


  var MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
    '<div class="b-map-popover">' +
    '<a class="b-map-popover__close" href="#">&times;</a>' +
    '<div class="b-map-popover__arrow"></div>' +
    '<div class="b-map-popover__inner">' +
    '$[[options.contentLayout observeSize minWidth=235 maxWidth=235 maxHeight=350]]' +
    '</div>' +
    '</div>', {
      build: function() {
        this.constructor.superclass.build.call(this);
        this._$element = $('.b-map-popover', this.getParentElement());
        this.applyElementOffset();
        this._$element.find('.b-map-popover__close')
          .on('click', $.proxy(this.onCloseClick, this));
      },
      clear: function() {
        this._$element.find('.b-map-popover__close')
          .off('click');

        this.constructor.superclass.clear.call(this);
      },
      onSublayoutSizeChange: function() {
        MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

        if (!this._isElement(this._$element)) {
          return;
        }

        this.applyElementOffset();

        this.events.fire('shapechange');
      },
      applyElementOffset: function() {
        this._$element.css({
          left: -(this._$element[0].offsetWidth / 2),
          top: -(this._$element[0].offsetHeight + this._$element.find('.b-map-popover__arrow')[0].offsetHeight)
        });
      },
      onCloseClick: function(e) {
        e.preventDefault();

        this.events.fire('userclose');
      },
      getShape: function() {
        if (!this._isElement(this._$element)) {
          return MyBalloonLayout.superclass.getShape.call(this);
        }

        var position = this._$element.position();

        return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
          [position.left, position.top],
          [
            position.left + this._$element[0].offsetWidth,
            position.top + this._$element[0].offsetHeight + this._$element.find('.b-map-popover__arrow')[0].offsetHeight
          ]
        ]));
      },
      _isElement: function(element) {
        return element && element[0] && element.find('.b-map-popover__arrow')[0];
      }
    })

  var vshefffice = new ymaps.Placemark([55.76169, 37.60611], {
    balloonContent: $('#yamaps-gmc-address').html()
  }, {

    balloonLayout: MyBalloonLayout,
    iconLayout: 'default#image',
    iconImageHref: gmc_baloon_img,
    iconImageSize: [56, 69],
    iconImageOffset: [-28, -79]
  });

  var msofffice = new ymaps.Placemark([55.779103, 37.588473], {
    balloonContent: $('#yamaps-ms-address').html()
  }, {
    iconLayout: 'default#image',
    balloonLayout: MyBalloonLayout,
    iconImageHref: ms_baloon_img,
    iconImageSize: [56, 69],
    iconImageOffset: [-28, -79]
  });

  myMap.geoObjects.add(msofffice);
  myMap.geoObjects.add(vshefffice);
})