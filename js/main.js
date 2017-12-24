$(document).ready(function(){

    var isRetina = retina();

    function resize(){
       if( typeof( window.innerWidth ) == 'number' ) {
            myWidth = window.innerWidth;
            myHeight = window.innerHeight;
        } else if( document.documentElement && ( document.documentElement.clientWidth || 
        document.documentElement.clientHeight ) ) {
            myWidth = document.documentElement.clientWidth;
            myHeight = document.documentElement.clientHeight;
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myWidth = document.body.clientWidth;
            myHeight = document.body.clientHeight;
        }
    }

    function retina(){
        var mediaQuery = "(-webkit-min-device-pixel-ratio: 1.5),\
            (min--moz-device-pixel-ratio: 1.5),\
            (-o-min-device-pixel-ratio: 3/2),\
            (min-resolution: 1.5dppx)";
        if (window.devicePixelRatio > 1)
            return true;
        if (window.matchMedia && window.matchMedia(mediaQuery).matches)
            return true;
        return false;
    }

    $(window).resize(resize);
    resize();

    $.fn.placeholder = function() {
        if(typeof document.createElement("input").placeholder == 'undefined') {
            $('[placeholder]').focus(function() {
                var input = $(this);
                if (input.val() == input.attr('placeholder')) {
                    input.val('');
                    input.removeClass('placeholder');
                }
            }).blur(function() {
                var input = $(this);
                if (input.val() == '' || input.val() == input.attr('placeholder')) {
                    input.addClass('placeholder');
                    input.val(input.attr('placeholder'));
                }
            }).blur().parents('form').submit(function() {
                $(this).find('[placeholder]').each(function() {
                    var input = $(this);
                    if (input.val() == input.attr('placeholder')) {
                        input.val('');
                    }
                });
            });
        }
    }
    $.fn.placeholder();

    if(isRetina){
        $("*[data-retina]").each(function(){
            var $this = $(this),
                img = new Image(),
                src = $this.attr("data-retina");

            img.onload = function(){
                $this.attr("src", $this.attr("data-retina"));
            };
            img.src = src;
        });
    }

    $('#fullpage').fullpage({
        sectionSelector: '.b-screen',
        navigation: true,
        navigationPosition: 'right',
        /*onLeave: function(index, nextIndex, direction){console.log("++");},
        afterLoad: function(anchorLink, index){console.log("++");},
        afterRender: function(){console.log("++");},
        afterResize: function(){console.log("++");},
        afterResponsive: function(isResponsive){console.log("++");},
        afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){console.log("++");},
        onSlideLeave: function(anchorLink, index, slideIndex, direction, nextSlideIndex){console.log("++");}*/
    });

    $('.b-screen-about').prepend( $('.fp-tableCell .b-tube'));

    if($('.main-page').length){
        $('.b-logo').on('click', function(){
            $.fn.fullpage.moveTo(1);
            return false;
        });
    }

    var styles = [
        {
            "featureType": "all",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "gamma": 1
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "geometry.fill",
            "stylers": [
                {
                    "saturation": "-99"
                },
                {
                    "lightness": "38"
                },
                {
                    "gamma": "3.11"
                },
                {
                    "color": "#aaaaaa"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry",
            "stylers": [
                { "color": "#fece0b" },
                { "visibility": "simplified" }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#000000"
                }
            ]
        }
    ];

    function mapInfo($btn)
    {
        this.name = $btn.attr("data-map");
        this.x = parseFloat($btn.attr("data-coord-x"));
        this.y = parseFloat($btn.attr("data-coord-y"));
        this.myPlace = new google.maps.LatLng(this.x, this.y);
        var myOptions = {
            zoom: 16,
            center: this.myPlace,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true,
            scrollwheel: false,
            zoomControl: true
        }
        this.map = new google.maps.Map(document.getElementById(this.name), myOptions);

        this.styledMap = new google.maps.StyledMapType(styles,{name: "Styled Map"});
        this.map.mapTypes.set('map_style', this.styledMap);
        this.map.setMapTypeId('map_style');

        this.marker = new google.maps.Marker({
            position: this.myPlace,
            map: this.map,
            icon: {
                url: "i/pin.svg",
                scaledSize: new google.maps.Size(40, 58), // scaled size
                origin: new google.maps.Point(0,0), // origin
                anchor: new google.maps.Point(23,50), // anchor
            },
            title: "Офис"
        });
        this.marker.setAnimation(google.maps.Animation.BOUNCE);
    }

    //массив со всеми картами
    var maps = [];

    $('.b-btn-city').each(function(){
        maps.push(new mapInfo($(this)));
    });

    $('.b-map-city a').on('click', function(){
        $this = $(this);
        $this.siblings("a").each(function(){
            var block = $(this).attr("data-map");
            $('#'+block).addClass("hide");
            $(this).removeClass("active");
        });
        var block = $this.attr("data-map");
        $('#'+block).removeClass("hide");
        $this.addClass("active");

        //Обновить карту
        var mapObj = maps[$this.index()];
        google.maps.event.trigger(mapObj.map, 'resize');
        mapObj.map.setCenter(mapObj.myPlace);
    });

    /*var options = {
        $AutoPlay: true,                                
        $SlideDuration: 500,                            

        $BulletNavigatorOptions: {                      
            $Class: $JssorBulletNavigator$,             
            $ChanceToShow: 2,                           
            $AutoCenter: 1,                            
            $Steps: 1,                                  
            $Lanes: 1,                                  
            $SpacingX: 10,                              
            $SpacingY: 10,                              
            $Orientation: 1                             
        }
    };

    var jssor_slider1 = new $JssorSlider$("slider1_container", options);*/

});