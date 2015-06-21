var $instance = null

jsPlumb.ready(function() {

	$instance = jsPlumb.getInstance({
		Endpoint : ["Dot", {radius:3}],
		HoverPaintStyle : {strokeStyle:"#2C3E50", lineWidth:3 },
		ConnectionOverlays : [
			[ "Arrow", {  location:1,id:"arrow",length:15,foldback:0.75 } ],
                        [ "Label", { label:"drop on item", id:"label", cssClass:"aLabel" }]
		],
		Container:"board"
	});


	$instance.bind("dblclick", function(c) {
        editConn(c);
	});

    $instance.bind("connection", function(info) {
        info.connection.getOverlay("label").setLabel(info.connection.id);
        var new_conn_object = addConn(conn_count,info.connection.id,info.connection.id,info.connection.sourceId, info.connection.targetId, info.connection.connector.type, default_connector_style );
        conn_arr.push(new_conn_object);
        conn_count++;
    });

	$instance.doWhileSuspended(function() {
		var isFilterSupported = $instance.isDragFilterSupported();
		if (isFilterSupported) {
                    $("#add_item .items_set div").draggable({
                        helper:'clone',
                        start: function() {
                            dragging_id = $(this).attr('data-id');
                            if (dragging_id == undefined) { dragging_id = 0; }
                            dragging_shape = $(this).attr('data-shape');
                            dragging_name = $(this).attr('data-label');
                            dragging_fields = $(this).attr('data-fields');
                            console.log(dragging_name);
                            if (dragging_name == "") { dragging_name = "name"; }
                        }
                    });
                    $("#board").droppable({
                        accept: "#add_item .items_set div",
                        drop: function(event,ui){
                                    var new_item_id = item_count;
                                    var new_item_object = addItem(new_item_id,dragging_id,dragging_name,dragging_shape,event.clientX, event.clientY, dragging_fields);
                                    items_arr.push(new_item_object);

                                    $instance.makeSource($('#board #item_'+new_item_id), sourceOptions );

                                    $instance.makeTarget($('#board #item_'+new_item_id), sourceOptions );

                                    $instance.draggable($("#board #item_"+new_item_id), {cursor: "move",
                                        cursorAt: {top: 5, left: 5}, grid: [20,20],
                                        stop: function(event,ui) {
                                            var new_position = $(this).position();
                                            items_arr[new_item_id].left = new_position.left;
                                            items_arr[new_item_id].top = new_position.top;
                                        }
                                    });
                                    $("#item_"+new_item_id).resizable({grid: [20,20], aspectRatio:true, minWidth:75, ghost:true ,
                                        resize: function(event, ui) {  },     stop: function(event, ui) {
                                            items_arr[new_item_id].width = ui.size.width;
                                            items_arr[new_item_id].height = ui.size.height;
                                            $instance.repaint($("#board #item_"+new_item_id));
                                        }});

                                    item_count++;

                                    $("#item_"+new_item_id).on('dblclick', function(e) {
                                            editItem(new_item_id);
                                    });

                                    console.log("#item_"+new_item_id)

                        }
                    });
		}


            }, true);


	jsPlumb.fire("WF Designer Loaded", $instance);


});
