$(document).ready(function(){

/* <========== Header =========> */
    $(".nav_bar_toggler_button.open").on('click', function(e){
        e.preventDefault();
        $(".nav_bar_collapse").addClass('show');

        $(this).hide(200);
        $(".nav_bar_toggler_button.close").show(300);
        $(".full_screen").addClass('active');

    })

    $(".nav_bar_toggler_button.close").on('click', function(e){
        e.preventDefault();
        $(".nav_bar_collapse").removeClass('show');

        $(this).hide(200);
        $(".nav_bar_toggler_button.open").show(300);
        $(".full_screen").removeClass('active');
    })


/* <==========Section Skill =========> */
    var screenW = 0; 

    actionSkill();

    $(window).resize(function(){
        actionSkill();
    });

    

    function actionSkill(){

            var content = $(".skill_detail_wrapper");
            screenW = $(window).width();

                    
            if(screenW < 768){
                
                content.css({"max-height": 0 + "px"});
               

                $(".skill_info").on("click",".skill_chervon" ,function(){


                    var info = $(this).parent().next();
                    if(!$(this).hasClass('rotate')){
                        $(this).addClass('rotate');
                    }else{
                        $(this).removeClass('rotate');
                    }

                        if(info.css("max-height") == 0 + "px"){
                            info.css({"max-height": info[0].scrollHeight + "px"});
                        }else{
                            info.css({"max-height": 0 + "px"});
                        }   
                });

            }else{
                content.css({"max-height": (content[0].scrollHeight) + "px"});
                
            }

            $('.skill_chervon').each(function(){
                if($(this).hasClass('rotate')){
                    $(this).removeClass('rotate');
                }
            });

    };
/* <=============== Section Qualification =============>  */

        $(".qua-nav-btn").on("click", function(){
            $data = $(this).data('type');
            $('.qua-info-').not(`#${$data}`).hide(400);
            $('.qua-info-').filter(`#${$data}`).show(600);
        });

/* <=============== Section Services =============>  */

       $(".service_info").on("click", "#service_btn" ,function(){
            let service = $(this).parent().data("service");
            $(".service_info_detail").not(`#${service}`).fadeOut(200);
            $(".service_info_detail").filter(`#${service}`).fadeIn(600);
            $(".service-content-modal").addClass('active');
       });

       $(".service_info_detail").on("click", ".service_info_close", function(){
            $(this).parent().fadeOut(200);
            $(".service-content-modal").removeClass('active');
       });

/* <=============== Section Porfolio =============> */

       let itemW = $(".portfolio_project").outerWidth();

       $(window).resize(function(){
            itemW =  $(".portfolio_project").outerWidth();
            updateItemWidth(itemW);
        })

        updateItemWidth(itemW);
    
      
       $(".move_left").on("click", function(){
            
            $(".portfolio_slider").animate({
                left: `-=${itemW + 16}px`
            },1000, function(){
                $(".portfolio_project").first().appendTo($(".portfolio_slider"));
                $(this).css({left: `-${itemW + 16}px`});
            });

            let curPro = $(".portfolio_project.active");
            let nextPro = curPro.next();
            if(nextPro.length > 0){
                curPro.removeClass('active');
                nextPro.addClass('active');
            }
                   
            trackerDown(nextPro);
            
       });

       $(".move_right").on("click", function(){

            $(".portfolio_slider").animate({
                left: `+=${itemW + 16}px`
            },1000, function(){
                $(".portfolio_project").last().prependTo($(this));
                $(this).css({left:  `-${itemW + 16}px`});
            });

            let curPro = $(".portfolio_project.active");
            let prevPro = curPro.prev();
            if(prevPro.length > 0){
                curPro.removeClass('active');
                prevPro.addClass('active');
            }
                   
            trackerDown(prevPro);
            
        });

       function updateItemWidth(itemW){
            $(".portfolio_slider").css({left: `-${itemW + 16}px`});
       }


       function trackerDown(Pro){
            var project = Pro.data("project");
            $(".portfolio_mark").not(`#${project}`).removeClass("marked");
            $(".portfolio_mark").filter(`#${project}`).addClass("marked");
       }

       $(".portfolio_mark").on("click", function(){
            
            let id = $(this).attr("id");

            $(this).addClass('marked');
            $(this).siblings().removeClass('marked');

            let marginNum = (itemW + 16)*(1 - id);
           
            $(".portfolio_slider").animate({
                left: `${marginNum}px`
            },1000);

       });


/* <=============== Section Testimonial =============> */

        let testimonialW  = $(".testimonial_item").outerWidth();
        initSliderPos(testimonialW);

        $(window).resize(function(){
            testimonialW =  $(".testimonial_item").outerWidth();
            initSliderPos(testimonialW);
        })


       var mousePress = false;
       var mouseRelease = true;
       let mouseStart = 0;
       let mouseUpdate = 0;
       let isDrag = false;
       let initPos = 0;

       $(".testimonial_slider_screen").mousedown(function(e){
            e.preventDefault();
            mousePress = true;
            mouseRelease = false;
           
            $(this).css({cursor: "grabbing"});
            mouseStart = e.pageX;

            let curSliderPos = $(".testimonial_slider").css("left");
            let index = curSliderPos.indexOf("px");
            initPos = parseInt(curSliderPos.substr(0, index));
       });

       $(".testimonial_slider_screen").mouseup(function(){
            mousePress = false;
            mouseRelease = true;
            $(this).css({cursor: "grab"});
            
       });

       
        $(".testimonial_slider_screen").on('mousemove', function(e){

            if(mousePress){

                let curSliderPos = $(".testimonial_slider").css("left");
                let Index = curSliderPos.indexOf("px");
                let curSliderPos_val = parseInt(curSliderPos.substr(0, Index));

                mouseUpdate = e.pageX - mouseStart;
                $(".testimonial_slider").css({left: `${curSliderPos_val + mouseUpdate}px`});
                $(this).on("mouseup", function(){
                    isDrag = true;
                });

                mouseStart = e.pageX;

            }

            if(mouseRelease && isDrag){

                let curSliderPos = $(".testimonial_slider").css("left");
                let Index = curSliderPos.indexOf("px");
                let curSliderPos_val = parseInt(curSliderPos.substr(0, Index));

                let differ = Math.abs(curSliderPos_val - initPos);
              
                slideUpdate(mouseUpdate, differ);

                updateActiveItem(mouseUpdate);
                updateMarker();
            }

        });

       
        function slideUpdate(mouseUpdate, differ){

            
            if(mouseUpdate > 0){
                $(".testimonial_slider").animate({
                    left: `+=${(testimonialW - differ) + 16}px`
                },800, function(){
                    $(".testimonial_item").last().prependTo($(this));
                    initSliderPos(testimonialW);

                });
                
            }

            if(mouseUpdate < 0){
                $(".testimonial_slider").animate({
                    left: `-=${(testimonialW - differ) + 16}px`
                },800, function(){
                    $(".testimonial_item").first().appendTo($(this));
                    initSliderPos(testimonialW);

                });
            }

           
           

            return isDrag = false;

        }


        function initSliderPos(W){
            $(".testimonial_slider").css({left: `-${W + 16}px`});
        }

        function updateActiveItem(dir){

            let activeItem = $(".testimonial_item.active");
            let nextItem = activeItem.next();
            let prevItem = activeItem.prev();

            if(dir < 0){     

                if(nextItem.length > 0){
                    nextItem.addClass('active');
                    activeItem.removeClass('active');
                }  

            }
            
            if(dir > 0){

               if(prevItem.length > 0){
                    prevItem.addClass('active');
                    activeItem.removeClass('active');
               }
               
            }

        }

    
        function updateMarker(){
            let activeItem = $(".testimonial_item.active");
            let id = activeItem.data("testi");
            $(".testimonial_mark").not(`#${id}`).removeClass("marked");
            $(".testimonial_mark").filter(`#${id}`).addClass("marked");
        }

        
        $(".testimonial_mark").on("click", function(){

            $(this).addClass("marked");
            $(this).siblings().removeClass("marked");

            let id = $(this).attr("id");
            $(".testimonial_slider").animate({
                left: `${(1 - parseInt(id)) * (testimonialW + 16)}px`
            }, 800);

        });


       /*  <=============== Scroll Top  =============> */

      
       $(window).scroll(function(){

        let scrollPos = $(window).scrollTop();
        let homePos = $(".sec_home").offset().top;
       
            if(scrollPos > homePos){
                $(".scroll_top_btn").fadeIn(500); 
                $("header").addClass("sticky");
            }else{
                $(".scroll_top_btn").fadeOut(500);
                $("header").removeClass("sticky");
            }



       });

       $(".scroll_top_btn").on("click", function(){
            $("html, body").animate({
                scrollTop: "0"
            }, 1000)
       });


     /*  <=============== Scroll Specify Location  =============> */  

        $(".nav_menu").on("click", ".nav_item a" ,function(){

            let hash = this.hash;

            $(this).addClass("active");
            $(this).parent().siblings().find(".nav_link").removeClass("active"); 
           
            if(hash.length > 0){
                let sectionPos = $(`${hash}`).offset().top;
                $("html, body").animate({
                    scrollTop: `${sectionPos - 80}`
                },1000)
            }

        }) 
        
        $(".nav_bar_logo").on("click",function(){

            let hash = this.hash;

            if(hash.length > 0){
                let sectionPos = $(`${hash}`).offset().top;
                $("html, body").animate({
                    scrollTop: `${sectionPos}`
                },1000)
            }

        })   
           
});