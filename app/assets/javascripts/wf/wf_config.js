var items_arr = [];
var item_count = 0;

var dragging_id = null;
var dragging_shape =  null;
var dragging_name = null;
var dragging_fields = null;

var defined_fields = [];

var selected_item = [];
var selected_id = 0;

var conn_arr = [];
var conn_count = 0;

var selected_item = [];

var isDraggingEnabled = true;
var isResizingEnabled = true;
var isEndpointEnabled = true;

var maximumConnections = 12;

var default_connector = [ "Flowchart", { stub:[40, 60], gap:10, cornerRadius:4, alwaysRespectStubs:true } ];
var default_connector_style = { strokeStyle:"#617487", lineWidth:3, outlineColor:"transparent", outlineWidth:4 };

var connector_flowchart = [ "Flowchart", { stub:[40, 60], gap:10, cornerRadius:5, alwaysRespectStubs:true } ];
var connector_flowchart_style = { strokeStyle:"#617487", lineWidth:3, outlineColor:"transparent", outlineWidth:4 };

var connector_state = [ "StateMachine", { curviness:20 } ];
var connector_state_style = { strokeStyle:"#5c96bc", lineWidth:3, outlineColor:"transparent", outlineWidth:4 };

var sourceOptions = {
    filter: ".ep",
    anchor: "Continuous",
    isSource: true,
    isTarget: true,
    connector: default_connector,
    connectorStyle: default_connector_style,
    maxConnections: maximumConnections,
    onMaxConnections:function(info, e) { alert("Maximum connections (" + info.maxConnections + ") reached") }
};
