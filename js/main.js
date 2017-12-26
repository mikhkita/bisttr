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

    function showDots(){
        var delayCoef = 1,
            delayYellow = 75,
            delay = 0;
        $(".dot-white, .dot-white-small, .dot-yellow").each(function(){
            var el = this;
            if(!$(el).hasClass("dot-yellow")){
                delay = 25 * delayCoef;
            }else{
                delay = 25 * delayCoef + delayYellow;
                delayYellow += 75;
            }
            setTimeout(function(){
                $(el).addClass('dot-show');
            }, delay);
            delayCoef++;
        });
        $('.b-geography-map').addClass("dots-loaded")
    }

    var currentSlide = 1;

    $(window).bind('mousewheel', function(event) {
        if (event.originalEvent.wheelDelta >= 0) {
             console.log("up");

            var currentID = parseInt($('.current-slide').attr("data-id"));
            var prevID = currentID > 1 ? currentID - 1 : $('.b-screen').length;
            var prevprevID = prevID > 1 ? prevID - 1 : $('.b-screen').length;

            console.log(prevID, prevprevID, currentID);
            $('.move-top').addClass("move-slide").removeClass("move-top");
            $('.b-screen[data-id="'+prevprevID+'"]').addClass("move-top move-slide");
            $('.b-screen[data-id="'+prevID+'"]').addClass("current-slide").removeClass("move-slide");
            $('.b-screen[data-id="'+currentID+'"]').removeClass("current-slide");
            $('#slider-nav a.active').removeClass("active");
            $('#slider-nav a[data-id="'+prevID+'"]').addClass("active");
        }else{
            console.log("down");

            var currentID = parseInt($('.current-slide').attr("data-id"));
            var nextID = currentID < $('.b-screen').length ? currentID + 1 : 1;
            var prevID = currentID > 1 ? currentID - 1 : $('.b-screen').length;

            console.log(prevID, currentID, nextID);
            $('.b-screen[data-id="'+prevID+'"]').removeClass("move-slide");
            $('.b-screen[data-id="'+currentID+'"]').removeClass("current-slide").addClass("move-slide");
            $('.b-screen[data-id="'+nextID+'"]').addClass("current-slide");
            $('#slider-nav a.active').removeClass("active");
            $('#slider-nav a[data-id="'+nextID+'"]').addClass("active");
        }
    });

    $('#slider-nav a').on('click', function(){
        $('.current-slide').removeClass("current-slide");
        $('#slider-nav a.active').removeClass("active");
        $('.b-screen[data-id="'+$(this).attr("data-id")+'"]').addClass("current-slide");
        $(this).addClass("active");
    });
    

    /*var mapView = false;

    $('#fullpage').fullpage({
        sectionSelector: '.b-screen',
        navigation: true,
        navigationPosition: 'right',
        afterLoad: function(anchorLink, index){
            if(index === 4 && !$('.b-geography-map').hasClass("dots-loaded")){
                showDots();
            }
            if(index === 5 && !mapView){
                maps[0].marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function() {
                    maps[0].marker.setAnimation(null)
                }, 725);
                mapView = true;
            }
        },


        parallax: true,
                parallaxKey: 'YWx2YXJvdHJpZ28uY29tXzlNZGNHRnlZV3hzWVhnPTFyRQ==',
                parallaxOptions: {
                    type: 'reveal',
                    percentage: 62,
                    property: 'translate'
                },
    });*/

    //$('.b-screen-about').prepend( $('.fp-tableCell .b-tube'));

    $('#fp-nav ul li').each(function(){
        $(this).append($('.screen-bubbles .screen-bubbles-item:first-child'));
    });

    $('.b-mouse').on('click', function(){
        $.fn.fullpage.moveSectionDown();
        return false;
    });

    if($('.main-page').length){
        $('.b-logo').on('click', function(){
            $.fn.fullpage.moveTo(1);
            return false;
        });

        $("*[data-back-full]").each(function(){
            var $this = $(this),
                img = new Image(),
                src = $this.attr("data-back-full");
            img.onload = function(){
                $this.css("background-image", 'url(' + $this.attr("data-back-full") + ')');
            };
            img.src = src;
        });
        
    }

    $(".b-popup[data-back]").each(function(){
        var $this = $(this),
            img = new Image(),
            src = $this.attr("data-back");
        img.onload = function(){
            $this.css("background-image", 'url(' + $this.attr("data-back") + ')');
        };
        img.src = src;
    });

    $(window).on('load', function(){
        $('.init-hide').each(function(){
            $(this).removeClass("init-hide");
        });
    });

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
        //this.marker.setAnimation(google.maps.Animation.BOUNCE);
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
        mapObj.marker.setAnimation(google.maps.Animation.BOUNCE);
        setTimeout(function() {
            mapObj.marker.setAnimation(null)
        }, 750);
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