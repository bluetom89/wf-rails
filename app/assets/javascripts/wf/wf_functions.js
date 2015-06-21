
function clearBoard() {
             var confirm = window.confirm("This will delete all items and connections");
         if(confirm) {
            $('#board').empty();
            items_arr = [];item_count = 0; 
            conn_arr = [];conn_count = 0;
            selected_item = [];selected_id = 0;     
                   
            
            instance.reset(); 
            
            
         } 
}
function addConn(id, pid, label, source, target, style, style_settings) {
// "solid|dot|dash|dashdot|longdash|longdashdot|longdashdotdot".
    var conn = {
        "id" : id,
        "pid" : pid,
        "label": label,
        "label_visible": true,
        "source": source,
        "target": target,
        "fill": "#5c96bc",
        "connector_style": style,
        "connector_style_prop": style_settings
    };
    return conn;
}

function addItem(id,id2,label,shape,left,top,fields_set) { 
    var auto = "auto";
    var item = [];
    var field = [];
    var board = $('#board');
    var color = "#fff";
    var list = $('#left_panel #list_item');
    var connection_src = $('#connection_src');
    var connection_target = $('#connection_target');
    
    left = left - 350; // cuz of left panel
    top = top - 35; // cuz of left panel
    
    $(board).append("<div style='left:"+left+"px; top:"+top+"px;' id='item_"+id+"' data-id='"+id2+"' data-label='"+label+"' data-fields='"+fields_set+"' data-shape='"+shape+"' class='item ui-widget-content "+shape+"'><span>"+label+"</span><div class='ep'></div></div>");
    //$(list).append("<div id='item_list_"+id+"' class='item "+type+"'><span class='id'>"+id+"</span> | <span class='name'> "+name+" </span> <br />")
    
    item = {"id":id, 
             "item_id": id2,
             "label":label, 
             "shape":shape, 
             "fill":color, 
             "top":top, 
             "left":left,
             "height":auto,
             "width":auto, 
             "comment":"" ,
             "fieldFlag":false,
             "field": field,
             "field_defined": fields_set
           };
    
    $('#add_item_label').val("name_"+id);
    $('#total_item_number').text(id+1);
    
   return item; // return the array of new item
}

function loadItem (id,id2,label,shape,fill,top,left,height,width,comment,fieldFlag,fields_set,field) {
    if (field === undefined) {field = [];}
    var item = {"id":id, 
             "item_id": id2,
             "label":label, 
             "shape":shape, 
             "fill":fill, 
             "top":top, 
             "left":left,
             "height":height,
             "width":width, 
             "comment":comment,
             "fieldFlag":fieldFlag,
             "field": field,
             "field_defined": fields_set
           };
    $('#board').append("<div style='left:"+left+"px; top:"+top+"px; height:"+height+"px; width:"+width+"px; background-color:"+fill+";' id='item_"+id+"' \n\
                        data-id='"+id2+"' data-label='"+label+"' data-fields='"+fields_set+"' data-shape='"+shape+"' \n\
                        class='item ui-widget-content "+shape+"'><span>"+label+"</span><div class='ep'></div></div>");
    //$(list).append("<div id='item_list_"+id+"' class='item "+type+"'><span class='id'>"+id+"</span> | <span class='name'> "+name+" </span> <br />")
    return item;           

}
function loadFile(name) {
var xhr = $.ajax({
                type: "GET",
                url: "workflows/"+name,
                cache : false,
                dataType : 'html',
                beforeSend: function() {clearBoard();},
                success : function(data) {
                    jsLoadBoard(data);
                }
            }); 
}

function jsLoadBoard($html_data) {
    $('#board').append($html_data);
    // initating items and drawing them on board
    for (var i = 0; i < saved_item_arr.length; i++) {
        var item_object = loadItem(i,saved_item_arr[i].item_id,saved_item_arr[i].label,saved_item_arr[i].shape,saved_item_arr[i].fill, saved_item_arr[i].top, saved_item_arr[i].left, saved_item_arr[i].height, saved_item_arr[i].width, saved_item_arr[i].comment, saved_item_arr[i].fieldFlag, saved_item_arr[i].field_defined,saved_item_arr[i].field );
        items_arr.push(item_object);
        instance.makeSource($('#board #item_'+i), sourceOptions );   
        instance.makeTarget($('#board #item_'+i), sourceOptions );  
        instance.draggable($("#board #item_"+i), {cursor: "move", 
            cursorAt: {top: 5, left: 5}, grid: [20,20], 
            stop: function(event,ui) {
                var new_position = $(this).position();
                item_arr[i].left = new_position.left;
                item_arr[i].top = new_position.top;
            }
        });
        $('#board #item_'+i).resizable({grid: [20,20], aspectRatio:true, minWidth:75, resize: function(event, ui) {instance.repaint($("#board #item_"+i));}});
        $('#board #item_'+i).on('dblclick', generate_editItem_handler(i));    

    }
    // initating connections and drawing them on board
    for (var j = 0; j < saved_conn_arr.length; j++) {
        var conn_object = addConn(j,saved_conn_arr[j].pid,saved_conn_arr[j].label,saved_conn_arr[j].source,saved_conn_arr[j].target,saved_conn_arr[j].fill);
        conn_arr.push(conn_object);

        var connection = instance.connect({source:saved_conn_arr[j].source, target: saved_conn_arr[j].target});
        connection.getOverlay("label").setLabel(saved_conn_arr[j].label);
        connection.setParameter("id",saved_conn_arr[j].pid);
        connection.setPaintStyle( {strokeStyle: saved_conn_arr[j].fill} );
    }
    instance.bind("connection", function(info) {
            info.connection.getOverlay("label").setLabel(info.connection.id);
            var new_conn_object = addConn(conn_count,info.connection.id,info.connection.id,info.connection.sourceId, info.connection.targetId);
            conn_arr.push(new_conn_object);
            conn_count++;
    });
    instance.bind("dblclick", function(c) { 
        editConn(c);
    });
    item_count = saved_item_arr.length;
    conn_count = saved_conn_arr.length;
}
function generate_editItem_handler( x ) {
    return function(event) { 
        editItem(x);
    };
} 
function generate_editConn_handler( y ) {
    return function(event) { 
        editConn2(j);
    };
} 
function delField(e) {
    e.parentNode.parentNode.removeChild(e.parentNode);
}
function percent_to_pixel($value) {
    var current_width = $(window).width();
    var pixel = current_width*($value/100);
    return pixel;
}
function pixel_to_percent($value) {
    var current_width = $(window).width();
    var percent = $value/current_width * 100;
}

function jsSaveBoard(name, items_arr, conn_arr) {
        var xhr = $.ajax({
                    type: "POST",
                    url: "module/save.php",
                    data: {name: file_name,items: items_arr, conns: conn_arr},
                    dataType: "json"
        });
}
function editConn(c) {
                var xhr = $.ajax({
                type: "GET",
                url: "boards/edit-conn.html",
                cache : false,
                dataType : 'html',
                beforeSend: function() {$('#pop_up').show("fast");},
                success : function(data) {
                    selected_id = c.id;
      
                    conn_arr.filter(function(e){if (e.source == c.source.id && e.target == c.target.id ) {selected_item.push(e);}});
                    
                    if (selected_item[0].label_visible == true) {$('#pop_up #show_label').prop('checked', true);} // if connection has label_visible flag (on arrow label) 
                    
                    console.log(selected_item);
                    $('#pop_up').append(data);
                    $('#pop_up #name').val(selected_item[0].label);
                    $('#pop_up #bg').val(selected_item[0].fill);
                    $('#pop_up #bg').ColorPicker({
                        flat:false,
                            onSubmit: function(hsb, hex, rgb, el) {
                                    $('#pop_up #bg').val("#"+hex);
                                    $(el).ColorPickerHide();
                            },
                            onBeforeShow: function () {
                                    $(this).ColorPickerSetColor(this.value);
                            }
                    });
                    
                    var style = $('#pop_up #line_style').val(selected_item[0].style);

                    if (style == 0) {
                        var edited_connector =       [ "Flowchart", { stub: $('#pop_up #stub').val(), gap : $('#pop_up #gap').val(), cornerRadius : $('#pop_up #corner').val() } ];
                        var edited_connector_style = { strokeStyle:$('#pop_up #bg').val(), outlineColor:"transparent", outlineWidth:2 };

                    } else if (style == 1) {
                        var edited_connector =       [ "StateMachine", { margin: $('#pop_up #margin').val(), curviness:$('#pop_up #curviness_val').val() } ];
                        var edited_connector_style = { strokeStyle:$('#pop_up #bg').val(), outlineColor:"transparent", outlineWidth:2 };
                    }
                    
                    $('#pop_up #source').val(selected_item[0].source);
                    $('#pop_up #target').val(selected_item[0].target);
                                             
                    $('#pop_up #submit'). click(function () { 
                        c.getOverlay("label").setLabel($('#pop_up #name').val());
                        //c.setPaintStyle( edited_connector_style );
                        
                        
                        conn_arr[selected_item[0].id].label = $('#pop_up #name').val();
                        
                        if ($('#pop_up #show_label').prop('checked') == true ) {
                            c.getOverlay("label").setVisible(true);
                            conn_arr[selected_item[0].id].label_visible = true;
                        } else {
                            c.getOverlay("label").setVisible(false);
                            conn_arr[selected_item[0].id].label_visible = false;
                        }                        
                        
                        conn_arr[selected_item[0].id].connector_style = edited_connector;
                        conn_arr[selected_item[0].id].connector_style_prop = edited_connector_style;
                        conn_arr[selected_item[0].id].fill = $('#pop_up #bg').val();
                        
                        selected_item = [];
                        $('#pop_up').hide();$('#pop_up').empty();
                    });
                    $('#pop_up #del'). click(function () { 
                        var confirm_del = window.confirm("This will delete this connection.");
                        delete conn_arr[selected_item[0].id];
                        instance.detach(c); 
                        $('#pop_up').hide();$('#pop_up').empty();
                        selected_item = [];
                    });                                                                
                    $('#pop_up #close').click(function () {$('#pop_up').hide();$('#pop_up').empty();selected_item = [];});
                    $('.ui-state-default').mouseenter(function() {jQuery(this).addClass('ui-state-hover');})
                                          .mouseleave(function() {jQuery(this).removeClass('ui-state-hover');});                     
                }
            });   
}

function editItem(id) {
var xhr = $.ajax({
        type: "GET",
        url: "boards/edit-item.html",
        cache : false,
        dataType : 'html',
        beforeSend: function() {$('#pop_up').show("fast");},
        success : function(data) {
            $('#pop_up').append(data);
            selected_id = id;
            items_arr.filter(function(e){if (e.id === selected_id) {selected_item.push(e);}});
            
            if (selected_item[0].item_id != 0) {$('#pop_up #name').prop('disabled', true);} // if item has predefined [disable label change]
            if (selected_item[0].fieldFlag == true) {$('#pop_up #show_fields').prop('checked', true);} // if item has fieldFlag (in body field show) 
            if (selected_item[0].field_defined != "") { 
                var defined_field_set = selected_item[0].field_defined.split(','); // if item is has predefined field_set [field that item can take]
            } else {var defined_field_set = false;} // item is special so use custom field creator
            var item_fields_length = selected_item[0].field.length; // number of user_defined_fields
            

            $('#pop_up #name').val(selected_item[0].label);
            $('#pop_up #comment').val(selected_item[0].comment);
            $('#pop_up #bg').val(selected_item[0].fill);
            $('#pop_up #bg').ColorPicker({flat:false,
                onSubmit: function(hsb, hex, rgb, el) {$('#pop_up #bg').val("#"+hex);$(el).ColorPickerHide();},
                onBeforeShow: function () {$(this).ColorPickerSetColor(this.value);}
            });

            if (selected_item[0].item_id != 0) 
            { // if item is system_defined
                
                $('#pop_up #fields').append('<div class="field_set"/> </div>'); // create parent div for system_fields
                for(var i = 0; i < defined_field_set.length; i++) 
                { // append item' system_defined_fields
                    $('#pop_up #add_field_btn').hide(); // hide add field button
                    var field = defined_field_set[i].split(':');
                    $('#pop_up #fields .field_set').append("<span>\n\
                            <input name='"+field[1]+"' id='field_checkbox_"+i+"' type='checkbox' value='"+field[0]+"' />\n\
                            <label for='field_checkbox_"+i+"'>"+field[1]+"</label>\n\
                    </span>");  // fill div with checkboxes and its labels

                } 

                for (var w = 0; w < item_fields_length; w++) 
                { // select all checkboxes that user checked before
                    $('#pop_up #fields .field_set').find("input[value='"+selected_item[0].field[w].value+"']").attr('checked','checked');
                }
            }
            else 
            { // if item is special
                for (var w = 0; w < item_fields_length; w++)                 
                { // append text input for special fields 
                    $('#pop_up #fields').append('\
                        <div id="field_'+f+'">\n\
                            <input class="float_r field" type="text" value="'+selected_item[0].field[w].name+'" style="width: 90%;" disabled/>\n\
                            <span class="float_r ui-state-default ui-icon ui-icon-minus" role="button" onClick="window.delField(this)"></span>\n\
                        <br /></div>');
                }
            }

            var f=0;  //  for new item & values (new field)
            $('#pop_up #add_field_btn').click(function() 
            {
                f=f+1;
                if (defined_field_set != false && selected_item[0].item_id != 0) 
                { // if item is predefined
                        $('#pop_up #fields').append('<div class="field_set"/> </div>');
                        for(var i = 0; i < defined_field_set.length; i++) 
                        {
                            var field = defined_field_set[i].split(':');
                            $('#pop_up #fields .field_set').append("<span><input id='field_checkbox_"+i+"' type='checkbox' name='"+field[1]+"' value='"+field[0]+"' /><label for='field_checkbox_"+i+"'>"+field[1]+"</label></span>"); 
                        } 
                        $('#pop_up #add_field_btn').hide();
                } 
                else 
                { // if item is NOT predefined [special]
                    $('#pop_up #fields').append('\
                                 <div id="field_'+f+'">\n\
                                    <input class="float_r field" type="text" value="" style="width: 90%;"/>\n\
                                    <span class="float_r ui-state-default ui-icon ui-icon-minus" role="button" onClick="window.delField(this)"></span>\n\
                                <br /></div>');
                }
            });

            $('#pop_up #submit').click(function () { 
                console.log('Object ['+selected_id+']['+selected_item[0].label+'] has been saved');
                $("#item_"+selected_id).find('span').text($('#pop_up #name').val() ); 
                $("#item_"+selected_id).css('background-color', $('#pop_up #bg').val() );
                var field_arr = [];
                var field_obj = $('#pop_up #fields');

                
                if (defined_field_set != false && selected_item[0].item_id != 0) 
                {
                        var field_checked = field_obj.find("input[type='checkbox']:checked");
                        var field_count = field_checked.length;   
                        
                        for (var j = 0; j < field_count; j++) 
                        {
                            
                             var field = {"id": field_checked[j].value,
                                        "name": field_checked[j].name,
                                        "compare": "==",
                                        "value": field_checked[j].value};

                             field_arr.push(field);   
                        }
                        
                }
                else 
                {
                    var field_count = field_obj.children('div').length;
                    for (var j = 1; j <= field_count; j++) 
                    {
                        var field_obj = $('#pop_up #fields').children('div:nth-child('+j+')');

                        var field = {"id": 0,
                                     "name": field_obj.children('.field').val(),
                                     "compare": "==",
                                     "value": field_obj.children('.field').val()};
                                 
                        field_arr.push(field);             
                    }
                }

                
                

                items_arr[selected_id].label = $('#pop_up #name').val();
                items_arr[selected_id].fill = $('#pop_up #bg').val();
                items_arr[selected_id].comment = $('#pop_up #comment').val();
                items_arr[selected_id].field = field_arr;

                if ($('#pop_up #show_fields').prop('checked') == true ) {
                    var varables_string = "";
                    for (var i=0; i < items_arr[selected_id].field.length; i++){
                        varables_string += "<h4>"+items_arr[selected_id].field[i].name+"</h4>";
                    }
                    $("#item_"+selected_id+" .variables").empty();
                    $("#item_"+selected_id).append('<span class="variables">'+varables_string+'</span>');
                    items_arr[selected_id].fieldFlag = true;
                } else {
                    $("#item_"+selected_id+" .variables").empty();
                    items_arr[selected_id].fieldFlag = false;
                }

                selected_item = [];
                $('#pop_up').hide();$('#pop_up').empty();
            });
            $('#pop_up #del').click(function () { 
                var confirm_del = window.confirm("This will delete this item properties and it's connections");
                delete items_arr[selected_id-1];

                instance.unmakeTarget($('#board #item_'+selected_id ));
                instance.unmakeSource($('#board #item_'+selected_id ));

                instance.detachAllConnections($('#board #item_'+selected_id ));

                $('#board #item_'+selected_id ).remove();

                $('#pop_up').hide();$('#pop_up').empty();
                selected_item = [];
                console.log('Object ['+selected_id+']['+selected_item[0].label+'] has been deleted.');
            });                                                                
            $('#pop_up #close').click(function () {$('#pop_up').hide();$('#pop_up').empty();selected_item = [];});
            $('.ui-state-default').mouseenter(function() {jQuery(this).addClass('ui-state-hover');})
                                  .mouseleave(function() {jQuery(this).removeClass('ui-state-hover');});      

        }
    });                   
}