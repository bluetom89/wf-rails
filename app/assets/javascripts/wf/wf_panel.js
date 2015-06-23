$( document ).ready(function() {

    $.fn.animateRotate = function(angle, duration, easing, complete) {
      var args = $.speed(duration, easing, complete);
      var step = args.step;
      return this.each(function(i, e) {
        args.complete = $.proxy(args.complete, e);
        args.step = function(now) {
          $.style(e, 'transform', 'rotate(' + now + 'deg)');
          if (step) return step.apply(e, arguments);
        };

        $({deg: 0}).animate({deg: angle}, args);
      });
    };

    $('#panel #title .logo').animateRotate(360, {
      duration: 1000,
      easing: 'linear'
    })


    $('#save_board').click(function () {
        var xhr = $.ajax({
                    type: "GET",
                    url: "popups/save_workflow",
                    cache : false,
                    dataType : 'html',
                    beforeSend: function() { $('#pop_up').show("fast"); },
                    success : function(data) {
                        $('#pop_up').append(data);
                        $('#pop_up #save').click( function () {
                            var file_name = $('#pop_up #file_name').val();
                            if (file_name != "" ) {
                                if (items_arr.length >= 1 && conn_arr.length >= 1 ) {
                                    var xhr = $.ajax({
                                                    type: "POST",
                                                    url: "module/save.php",
                                                    data: { name: file_name,items: items_arr, connections: conn_arr },
                                                    dataType: "json",
                                                    success: function() {}
                                    });
                                } else { alert ("Make sure workflow has at least one item and one connection"); }

                            } else { alert ("Type file name before saving."); }
                            $('#pop_up').hide(); $('#pop_up').empty();
                        })
                        $('#pop_up #close').click(function () { $('#pop_up').hide(); $('#pop_up').empty(); });
                        $('.ui-state-default').mouseenter(function() {jQuery(this).addClass('ui-state-hover');})
                                              .mouseleave(function() {jQuery(this).removeClass('ui-state-hover');});
                    }
        });
    });

    $('#load_board').click(function () {
        var xhr = $.ajax({
                    type: "GET",
                    url: "popups/load_workflow",
                    cache : false,
                    dataType : 'html',
                    beforeSend: function() { $('#pop_up').show("fast"); },
                    success : function(data) {
                        $('#pop_up').append(data);
                        var xhr2 = $.ajax({
                            type: "GET",
                            url: "module/load.php",
                            cache : false,
                            dataType : 'html',
                            success : function(data2) {
                                $('#pop_up #load_list').append(data2);
                                $('#pop_up #load_list').selectable({
                                    stop: function() {
                                        var result = $( "#select-result" ).empty();
                                        var file_name = $( "#pop_up #load_list .ui-selected" ).text();
                                        result.append( file_name );
                                        }
                                });
                            }
                        });
                        $('#pop_up #close').click(function () { $('#pop_up').hide(); $('#pop_up').empty(); });
                        $('.ui-state-default').mouseenter(function() {jQuery(this).addClass('ui-state-hover');})
                                              .mouseleave(function() {jQuery(this).removeClass('ui-state-hover');});
                        $('#pop_up #load').click(function() {
                            loadFile($( "#select-result" ).text());
                            $('#pop_up').hide(); $('#pop_up').empty();
                        });
                    }
        });
    });

    $('#clear_board').on('click', function () {
         var confirm = window.confirm("This will delete all items and connections");
         if(confirm) {
            $('#board').empty();
            item_count = 0;
            items_arr = [];
            instance.reset();
            console.log(items_arr);
         }
    });

    $('#endpoints_btn').on('click', function() {
            if($(this).hasClass('show')){
                      $( "#board .ep" ).animate({
                        opacity: "0"
                        }, 200, function() {$('#endpoints_btn span:last-child').addClass('bgRed').removeClass('bgGreen');});
                        isEndpointEnabled = false;
                        $(this).removeClass('show').addClass('hide');
                      } else {
                      $( "#board .ep" ).animate({
                        opacity: "1"
                        }, 200, function() {$('#endpoints_btn span:last-child').addClass('bgGreen').removeClass('bgRed');});
                        isEndpointEnabled = true;
                        $(this).removeClass('hide').addClass('show');
                      }
    });
    $('#resizing_btn').on('click', function() {
            if($(this).hasClass('show')){
                        for (var i=0; i < item_count; i++) {
                            $("#item_"+i).resizable( "disable" );
                        }
                        isResizingEnabled = false;
                        $('#resizing_btn span:last-child').addClass('bgRed').removeClass('bgGreen');;
                        $(this).removeClass('show').addClass('hide');
                      } else {
                        for (var i=0; i < item_count; i++) {
                            $("#item_"+i).resizable( "enable" );
                        }
                        isResizingEnabled = true;
                        $('#resizing_btn span:last-child').addClass('bgGreen').removeClass('bgRed');;
                        $(this).removeClass('hide').addClass('show');
                      }
    });
    $('#dragging_btn').on('click', function() {
            if($(this).hasClass('show')){
                        for (var i=0; i < item_count; i++) {
                            $("#item_"+i).draggable( "disable" );
                        }
                        isDraggingEnabled = false;
                        $('#dragging_btn span:last-child').addClass('bgRed').removeClass('bgGreen');;
                        $(this).removeClass('show').addClass('hide');

                      } else {
                        for (var i=0; i < item_count; i++) {
                            $("#item_"+i).draggable("enable");
                        }
                        isDraggingEnabled = true
                        $('#dragging_btn span:last-child').addClass('bgGreen').removeClass('bgRed');;
                        $(this).removeClass('hide').addClass('show');
                      }
    });

    $('.ui-state-default').mouseenter(function() {jQuery(this).addClass('ui-state-hover');})
                          .mouseleave(function() {jQuery(this).removeClass('ui-state-hover');});

});




