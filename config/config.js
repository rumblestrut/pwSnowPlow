/***** Map Layers / Service Information *****/
// REQUIRED:  basemap and/or dynamic
if (document.location.host == "localhost") {
	var server = "172.16.219.133";
}
else {
	var server = document.location.host;
}
var mapLayers = {
		"aerial": {
			serviceBaseURL: "http://" + server + "/arcgis/rest/services/",
			serviceName: "ags_ortho_cache",
			serviceOpacity: 1,
			serviceType: "tiled"
		},
		"basemap": {
			serviceBaseURL: "http://" + server + "/arcgis/rest/services/",
			serviceName: "ags_basemap_cache",
			serviceOpacity: .5,
			serviceType: "tiled"
		},
		"dynamic": {
			serviceBaseURL: "http://" + server + "/arcgis/rest/services/",
			serviceName: "pwSnowGPS",
			serviceOpacity: .7,
			serviceType: "dynamic"
		},
		"annotation": {
			serviceBaseURL: "",
			serviceName: "",
			serviceOpacity: .5,
			serviceType: ""
		},
		"overview": {
			serviceBaseURL: "",
			serviceName: "",
			serviceOpacity: 1,
			serviceType: ""
		}
};
/******The snow plow GSP locations need a timer to update their location every one minute, the code below is intended to do that refresh with on interaction from the user *********/
RefreshTimer();
function RefreshTimer()
{
	var Timer = setInterval("GPS_refresh()",300000);
}
function GPS_refresh()
{
	//alert("Update map extent");
	//map.resize(map.bounds.width,map.bounds.height); 
	//map.setExtent(map.extent);
	//mapLyrObj.setVisibleLayers(visibleLyrs);
	//lde2arcserver.setDefaultVisibleLayers();
	
	//alert(i);
	//if (i%2 === 0){
		//alert("even");
	var customExtent = new esri.geometry.Extent(map.extent.xmin.toString()-10,map.extent.ymin,map.extent.xmax.toString()-10,map.extent.ymax, new esri.SpatialReference({wkid: 3419}));	
	//} else {
		//alert("odd");
		//var customExtent = new esri.geometry.Extent(map.extent.xmin.toString()+10,map.extent.ymin,map.extent.xmax.toString()+10,map.extent.ymax, new esri.SpatialReference({wkid: 3419}));
	//}
	//i++;
	
	//map.resize(map.bounds.width,map.bounds.height); 
	map.setExtent(customExtent);
	
}


/***** Disclaimer ***********/
//This will add a disclaimer window to your site.  If you want to add custom text you may do so below
function DisclaimerText() {
	//if you do not want a disclaimer, comment out the line below, if you want a disclaimer, take out the comment marks and place the text in the "Disclaimer Text" area.
	//alert("Disclaimer text." + '\n' + '\n' +  "More text." + '\n' + '\n');
}

/***** Custom Initial Extent *****/
//This is the default initial extent.  This is the extent the map is set to when it is first loaded in the browser.
//DO NOT CHANGE this unless you want to set a custom initial extent for your map
//IF you want a custom initial extent, comment out the line below and set the new extent in the line below it.  This way,
//you can always go back to the default by just uncommenting your code.

var initialExtent = new esri.geometry.Extent(2170000, 185000, 2260000, 250000, new esri.SpatialReference({wkid: 3419}));

//This is the custom initial extent line - you must supply your own X and Y coordinates for this line AND comment out the line
//above with the default initial extent.  The suplied values are just an example.
//var initialExtent = new esri.geometry.Extent(2200000, 200000, 2220000, 250000, new esri.SpatialReference({wkid: 3419}));

/***** Site Information *****/
// REQUIRED:  values - devserv_01, generic_01, muniserv_01 (water/sewer), muniserv_02 (solid waste/recycle), parksrec_01, pubworks_01 (streetlight), pubworks_02 (street maintenance), pubworks_03
var siteHeader = "pubworks_03";
var siteHeaderCaption = "Snow Plow GPS Information";


/***** Identify Functionality *****/
// True/False - Indicate if one or both services will be available for the identify tool
var idBasemap = false;
var idDynamic = true;  // If not dynamic layer is specified (i.e. no service provide in mapLayers) this should be set to FALSE

// Identify tolerance - click radius
var idTolerance = 3;


/***** Map Layer Display *****/
// Basemap layer display information
var basemapLayerDisplay = {
		"0": {
			displayFieldName: "ADDR",
			fcAlias: "Addresses",
			fcDesc: "",
			uniqueField: "OBJECTID",
			fieldAliases: {
				"ADDR": "Address",
				"PID": "Parcel ID",
				"SUBDIV": "Subdivision",
				"PLAT": "Plat",
				"ZONING": "Zoning",
				"STREETNAME": "Street Name"}
		},
		"2": {
			displayFieldName: "ROAD_NAME",
			fcAlias: "Major Streets",
			fcDesc: "",
			uniqueField: "OBJECTID",
			fieldAliases: {
				"ROAD_NAME": "Road Name",
				"SPEED": "Speed Limit",
				"SHAPE.len": "Length (FT)"}
		},
		"3": {
			displayFieldName: "ROAD_NAME",
			fcAlias: "Streets",
			fcDesc: "",
			uniqueField: "OBJECTID",
			fieldAliases: {
				"ROAD_NAME": "Road Name",
				"SPEED": "Speed Limit",
				"SHAPE.len": "Length (FT)"}
		},
		"4": {
			displayFieldName: "TRL_NAME",
			fcAlias: "Trails",
			fcDesc: "",
			uniqueField: "OBJECTID",
			fieldAliases: {
				"AGENCY": "Agency",
				"TRL_NAME": "Trail Name",
				"LENGTH_MI": "Miles",
				"TRL_SURFACE": "Surface",
				"TRL_WIDTH_FT": "Width"}
		},
		"8": {
			displayFieldName: "NAME",
			fcAlias: "Water",
			fcDesc: "Small-scale water features",
			uniqueField: "OBJECTID",
			fieldAliases: {
				"NAME": "Name"}
		},
		"9": {
			displayFieldName: "NAME",
			fcAlias: "Water",
			fcDesc: "Large-scale water features",
			uniqueField: "OBJECTID",
			fieldAliases: {
				"NAME": "Name"}
		},
		"10": {
			displayFieldName: "NAME",
			fcAlias: "Parks",
			fcDesc: "",
			uniqueField: "OBJECTID",
			fieldAliases: {
				"NAME": "Name",
				"Web_Link": "Link"}
		}
};

// Dynamic layer display information
var dynamicLayerDisplay = {
		"1": {
			displayFieldName: "TRUCK_ID",
			fcAlias: "Current Vehicle Locations",
			fcDesc: "",
			uniqueField: "TRUCK_ID",
			fieldAliases: {			
				"TRUCK_ID": "Truck ID",
				"LATITUDE": "Latitude",
				"LONGITUDE": "Longitude",
				"SPEED": "Speed",
				"DIRECTION": "Heading",
				"TIMESTAMP": "Time Reported"}
		},
		"2": {
			displayFieldName: "TRUCK_ID",
			fcAlias: "All Vehicle Locations Last 13 Hours",
			fcDesc: "",
			uniqueField: "TRUCK_ID",
			fieldAliases: {			
				"TRUCK_ID": "Truck ID",
				"LATITUDE": "Latitude",
				"LONGITUDE": "Longitude",
				"SPEED": "Speed",
				"DIRECTION": "Heading",
				"TIMESTAMP": "Time Reported"}
		},
		"3": {
			displayFieldName: "TRUCK_ID",
			fcAlias: "All Vehicle Locations Last 24 Hours",
			fcDesc: "",
			uniqueField: "TRUCK_ID",
			fieldAliases: {			
				"TRUCK_ID": "Truck ID",
				"LATITUDE": "Latitude",
				"LONGITUDE": "Longitude",
				"SPEED": "Speed",
				"DIRECTION": "Heading",
				"TIMESTAMP": "Time Reported"}
		},
		"16": {
			displayFieldName: "Subgroup",
			fcAlias: "Cul-De-Sacs",
			fcDesc: "",
			uniqueField: "OBJECTID",
			fieldAliases: {			
				"AIMSFID": "AIMSFID",
				"Layer": "Zone"}
		},
		"17": {
			displayFieldName: "LAYER",
			fcAlias: "Private streets",
			fcDesc: "",
			uniqueField: "OBJECTID",
			fieldAliases: {			
				"ROAD_NAME": "Road Name"}
		},
		"18": {
			displayFieldName: "LAYER",
			fcAlias: "Zone Streets",
			fcDesc: "",
			uniqueField: "OBJECTID",
			fieldAliases: {			
				"ROAD_NAME": "Road Name",
				"STCLASSDSC": "Street Class"}
		},
		"19": {
			displayFieldName: "Subgroup",
			fcAlias: "Primary Routes",
			fcDesc: "",
			uniqueField: "OBJECTID",
			fieldAliases: {			
				"SnowRoute": "Snow Route",
				"ROAD_NAME": "Road Name"}
		},
		"20": {
			displayFieldName: "CO_OP",
			fcAlias: "CO-OP Snow Removal",
			fcDesc: "",
			uniqueField: "OBJECTID",
			fieldAliases: {			
				"CO_OP": "CO-OP",
				"ROAD_NAME": "Road Name"}
		},
		"21": {
			displayFieldName: "LAYER",
			fcAlias: "Sub Zones",
			fcDesc: "",
			uniqueField: "OBJECTID",
			fieldAliases: {			
				"LAYER": "Area",
				"SubZoneID": "Sub Zone",
				"Status": "Status"}
		},
		"22": {
			displayFieldName: "LAYER",
			fcAlias: "Primary Zones",
			fcDesc: "",
			uniqueField: "OBJECTID",
			fieldAliases: {			
				"LAYER": "Area"}
		}
};

/***** Feature Class List *****/
// Dynamic layer list information (whether or not to list)
var dynamicLayerFCList = {
		"0": {
			listFC: false,
			legendSymbol: null,
			startVisible: true
		},
		"1": {
			listFC: true,
			legendSymbol: "images/legend/snowplow_truck.jpg",
			startVisible: true
		},
		"2": {
			listFC: true,
			legendSymbol:  "images/legend/last13hours.jpg",
			startVisible: false
		},
		"3": {
			listFC: true,
			legendSymbol:  "images/legend/last24hours.jpg",
			startVisible: false
		},
		"4": {
			listFC: false,
			legendSymbol: null,
			startVisible: true
		},
		"5": {
			listFC: false,
			legendSymbol: null,
			startVisible: true
		},
		"6": {
			listFC: false,
			legendSymbol: null,
			startVisible: true
		},
		"7": {
			listFC: false,
			legendSymbol: null,
			startVisible: true
		},
		"8": {
			listFC: false,
			legendSymbol: null,
			startVisible: true
		},
		"9": {
			listFC: false,
			legendSymbol: null,
			startVisible: true
		},
		"10": {
			listFC: false,
			legendSymbol: null,
			startVisible: true
		},
		"11": {
			listFC: false,
			legendSymbol: null,
			startVisible: true
		},
		"12": {
			listFC: false,
			legendSymbol: null,
			startVisible: true
		},
		"13": {
			listFC: false,
			legendSymbol: null,
			startVisible: true
		},
		"14": {
			listFC: false,
			legendSymbol: null,
			startVisible: true
		},
		"15": {
			listFC: false,
			legendSymbol: null,
			startVisible: true
		},
		"16": {
			listFC: true,
			legendSymbol: null,
			startVisible: false
		},
		"17": {
			listFC: true,
			legendSymbol: null,
			startVisible: true
		},
		"18": {
			listFC: true,
			legendSymbol: null,
			startVisible: true
		},
		"19": {
			listFC: true,
			legendSymbol: "images/legend/PrimaryRoute.jpg",
			startVisible: true
		},
		"20": {
			listFC: true,
			legendSymbol: "images/legend/CO-OP.jpg",
			startVisible: true
		},
		"21": {
			listFC: true,
			legendSymbol: "images/legend/Snow Status.jpg",
			startVisible: true
		},
		"22": {
			listFC: true,
			legendSymbol: null,
			startVisible: true
		}
};

/***** Feature Class List *****/
// Annotation layer list information (whether or not to list)
var annotationLayerFCList = {
		// Sample code - same as dynamicLayerFCList
		/*
		"0": {
			listFC: true,
			startVisible: true
		},
		"1": {
			listFC: false,
			startVisible: true
		}
		 */
};


/***** Stored Query / Search *****/
// Stored query and search tool definitions
var queryDefs = [ 
		{
			inputType: "list",
			searchAlias: "Find a Primary Zone",
			serviceBaseURL: "http://" + server + "/arcgis/rest/services/",
			serviceName: "pwSnowGPS",
			searchFCIndex: 22,
			displayFieldName: "LAYER",
			fcAlias: "Primary Zones",
			attributes: ["OBJECTID", "LAYER"],
			uniqueField: "OBJECTID",
			fieldAliases: {
				"LAYER": "Area"
			},
			whereFields: [],
			whereOperator: [],
			whereValues: [],
			whereConnector: [],
			whereUser: "LAYER = '#value#'",
			sortField: "LAYER",
			valueField: "LAYER",
			listField: "",
			allowDuplicates: false
		}
];
