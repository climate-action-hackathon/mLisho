var osmLink = '<a href="http://openstreetmap.org">OpenStreetMap</a>',
	thunLink = '<a href="http://thunderforest.com/">Thunderforest</a>';

var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
	osmAttrib = '&copy; ' + osmLink + ' Contributors',
	landUrl = 'http://{s}.tile.thunderforest.com/landscape/{z}/{x}/{y}.png',
	thunAttrib = '&copy; '+osmLink+' Contributors & '+thunLink;

var mapUrl = 'http://otile4.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.png',
	mapAttrib = '&copy; ' + osmLink + ' Contributors';

var osmMap = L.tileLayer(osmUrl, {attribution: osmAttrib}),
	landMap = L.tileLayer(landUrl, {attribution: thunAttrib});

var aerial= L.tileLayer(mapUrl, {attribution: mapAttrib});

var wellsurl = '/well_data/'
var calderaurl = '/caldera_data/'
var roadsurl = '/roads_data/'
var fumerolesurl = '/fumeroles_data/'
var featureurl = '/features_data/'
var contoursurl = '/contours_data/'
var faultsurl = '/faults_data/'
var dssurl = '/d3_data/'
var json_weightedarea ;//= '<script src="{% static '../../wells/data/json_weightedarea.js' %}"></script>'

var wells= L.geoJson();
var caldera = L.geoJson();
var roads= L.geoJson();
var fumeroles= L.geoJson();
var contours= L.geoJson();
var faults= L.geoJson();
var feature= L.geoJson();
var dss= L.geoJson();


        var highlightLayer;
        function highlightFeature(e) {
            highlightLayer = e.target;
            highlightLayer.setStyle({
                fillColor: 'blue',
                fillOpacity: 1
            });

            if (!L.Browser.ie && !L.Browser.opera) {
                highlightLayer.bringToFront();
            }
            highlightLayer.openPopup();
        }

var hash = new L.Hash(map);
var additional_attrib = '<a href="https://github.com/tomchadwin/qgis2web" target ="_blank">qgis2web</a>';
var feature_group = new L.featureGroup([]);
var bounds_group = new L.featureGroup([]);
var raster_group = new L.LayerGroup([]);

		

/* create new layer group */
//var wells = new L.LayerGroup();
var array_markers = new Array();

/* create custom marker which will represent business in layer 'wells' */
//customMarker = L.Marker.extend({
//   options: { 
//      title: 'Geothermal',
//   }
//});

/* define function which adds markers from array to layer group */
function AddPointsToLayer() {
    for (var i=0; i<array_markers.length; i++) {
        array_markers[i].addTo(wells);
    }
} 

var map = L.map('map',{
	layers: [osmMap],
	keyboard: true,
	boxZoom: true,
	zoomControl: false,
	//measureControl: true,
	doubleClickZoom: true,
	scrollWheelZoom: true,
	fullscreenControl: true,
	fullscreenControlOptions: {
		position: 'topleft'
	} 
	}).fitBounds([[-0.276054876787,35.9874639499],[-0.142315567282,36.1435419115]]);
	
	mapLink ='<a href="http://openstreetmap.org">OpenStreetMap</a>';
	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				attribution: 'Map data &copy; ' + mapLink,
			    maxZoom:32,
			    }).addTo(map);
		
		var layerOrder = new Array();
        function stackLayers() {
            for (index = 0; index < layerOrder.length; index++) {
                map.removeLayer(layerOrder[index]);
                map.addLayer(layerOrder[index]);
            }
        }
        function restackLayers() {
            for (index = 0; index < layerOrder.length; index++) {
                layerOrder[index].bringToFront();
            }
        }
        map.on('overlayadd', restackLayers);
        layerControl = L.control.layers({},{},{collapsed:false});	

// add the new control to the map

map.addControl(new L.Control.ZoomMin())

var measureControl = L.control.measure({
	position: 'topleft',
	completedColor: '#C8F2BE'
});
measureControl.addTo(map);

L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);


// control that shows state info on hover

 		function pop_Fumeroles(feature, layer) {
            layer.on({
                mouseout: function(e) {
                    if (typeof layer.closePopup == 'function') {
                        layer.closePopup();
                    } else {
                        layer.eachLayer(function(feature){
                            feature.closePopup()
                        });
                    }
                },
                mouseover: highlightFeature,
            });
            var popupContent = '<table><tr><th scope="row">FUMAROLE_N</th><td>' + Autolinker.link(String(feature.properties['FUMAROLE_N'])) + '</td></tr><tr><th scope="row">EASTINGS</th><td>' + Autolinker.link(String(feature.properties['EASTINGS'])) + '</td></tr><tr><th scope="row">NORTHINGS</th><td>' + Autolinker.link(String(feature.properties['NORTHINGS'])) + '</td></tr><tr><th scope="row">id</th><td>' + Autolinker.link(String(feature.properties['id'])) + '</td></tr></table>';
            layer.bindPopup(popupContent);
        }

        function doStyleFumeroles() {
            return {
                radius: 4.0,
                fillColor: '#1ded50',
                color: '#000000',
                weight: 0.0,
                opacity: 1.0,
                dashArray: '',
                fillOpacity: 1.0
            }
        }
        function doPointToLayerFumeroles(feature, latlng) {
            return L.circleMarker(latlng, doStyleFumeroles())
        }
     
		$.getJSON(fumerolesurl, function (data) {
		    fumeroles.addData(data).setStyle(doStyleFumeroles);
			fumeroles.eachLayer(function (layer) { 
		    layer.on('click', function (e) {
				var popup = "<strong>" + "Fumerole Name: " + e.target.feature.properties.fumarole_n +  "<br>" +  "</strong>";
				layer.bindPopup(popup).openPopup(e.latlng);
				//map.fitBounds(e.target.getBounds());
			});	
			//locations.bindLabel(feature.properties['location_b'], { 'noHide': true });

			});	
		});
		var cluster_fumeroles= new L.MarkerClusterGroup({showCoverageOnHover: false});
		cluster_fumeroles.addLayer(fumeroles);
		map.addLayer(cluster_fumeroles)

 		function pop_Wells(feature, layer) {
            layer.on({
                mouseout: function(e) {
                    if (typeof layer.closePopup == 'function') {
                        layer.closePopup();
                    } else {
                        layer.eachLayer(function(feature){
                            feature.closePopup()
                        });
                    }
                },
                mouseover: highlightFeature,
            });
            var popupContent = '<table><tr><th scope="row">id</th><td>' + Autolinker.link(String(feature.properties['id'])) + '</td></tr><tr><th scope="row">well_name</th><td>' + Autolinker.link(String(feature.properties['well_name'])) + '</td></tr><tr><th scope="row">well_owner</th><td>' + Autolinker.link(String(feature.properties['well_owner'])) + '</td></tr><tr><th scope="row">depth</th><td>' + Autolinker.link(String(feature.properties['depth'])) + '</td></tr><tr><th scope="row">well_state</th><td>' + Autolinker.link(String(feature.properties['well_state'])) + '</td></tr><tr><th scope="row">geo_type</th><td>' + Autolinker.link(String(feature.properties['geo_type'])) + '</td></tr><tr><th scope="row">capacity</th><td>' + Autolinker.link(String(feature.properties['capacity'])) + '</td></tr><tr><th scope="row">spud_date</th><td>' + Autolinker.link(String(feature.properties['spud_date'])) + '</td></tr><tr><th scope="row">compl_date</th><td>' + Autolinker.link(String(feature.properties['compl_date'])) + '</td></tr><tr><th scope="row">est_days</th><td>' + Autolinker.link(String(feature.properties['est_days'])) + '</td></tr><tr><th scope="row">actl_days</th><td>' + Autolinker.link(String(feature.properties['actl_days'])) + '</td></tr><tr><th scope="row">last_updat</th><td>' + Autolinker.link(String(feature.properties['last_updat'])) + '</td></tr><tr><th scope="row">comments</th><td>' + Autolinker.link(String(feature.properties['comments'])) + '</td></tr></table>';
            layer.bindPopup(popupContent);
        }

        function doStyleWells() {
            return {
                radius: 4.0,
                fillColor: '#002aff',
                color: '#000000',
                weight: 0.0,
                opacity: 1.0,
                dashArray: '',
                fillOpacity: 1.0
            }
        }
        function doPointToLayerWells(feature, latlng) {
            return L.circleMarker(latlng, doStyleWells())
        }
       
		$.getJSON(wellsurl, function (data) {
		    wells.addData(data).setStyle(doStyleWells);
		    wells.eachLayer(function (layer) { 
		    layer.on('click', function (e) {
				var popup = "<strong>" + "Id : " + e.target.feature.properties.id + "<br>" + "Name: " + e.target.feature.properties.well_name + "<br>" + " Owner: " + e.target.feature.properties.well_owner + "<br>" +  "</strong>";
				layer.bindPopup(popup).openPopup(e.latlng);
				//map.fitBounds(e.target.getBounds());
			});	
			//locations.bindLabel(feature.properties['location_b'], { 'noHide': true });

			});	
		});


 		var cluster_wells = new L.MarkerClusterGroup({showCoverageOnHover: false});
        cluster_wells.addLayer(wells);
		map.addLayer(cluster_wells)

		function pop_Roads(feature, layer) {
            layer.on({
                mouseout: function(e) {
                    if (typeof layer.closePopup == 'function') {
                        layer.closePopup();
                    } else {
                        layer.eachLayer(function(feature){
                            feature.closePopup()
                        });
                    }
                },
                mouseover: highlightFeature,
            });
            var popupContent = '<table><tr><th scope="row">id</th><td>' + Autolinker.link(String(feature.properties['id'])) + '</td></tr><tr><th scope="row">rds_to_wls</th><td>' + Autolinker.link(String(feature.properties['rds_to_wls'])) + '</td></tr></table>';
            layer.bindPopup(popupContent);
        }

        function doStyleRoads(feature) {
            return {
                weight: 2.0,
                color: '#e31a1c',
                dashArray: '',
                opacity: 1.0
            };
        }
       
		$.getJSON(roadsurl, function (data) {
		    roads.addData(data).setStyle(doStyleRoads);
		    roads.eachLayer(function (layer) { 
		    layer.on('click', function (e) {
				var popup = "<strong>" + "Id : " + e.target.feature.properties.id + "<br>" + "Road Name: " + e.target.feature.properties.rds_to_wls + "<br>" +  "</strong>";
				layer.bindPopup(popup).openPopup(e.latlng);
				//map.fitBounds(e.target.getBounds());
			});	
			//locations.bindLabel(feature.properties['location_b'], { 'noHide': true });

			});	
		});
		map.addLayer(roads)

		function pop_Faults(feature, layer) {
            layer.on({
                mouseout: function(e) {
                    if (typeof layer.closePopup == 'function') {
                        layer.closePopup();
                    } else {
                        layer.eachLayer(function(feature){
                            feature.closePopup()
                        });
                    }
                },
                mouseover: highlightFeature,
            });
            var popupContent = '<table><tr><th scope="row">Id</th><td>' + Autolinker.link(String(feature.properties['Id'])) + '</td></tr></table>';
            layer.bindPopup(popupContent);
        }

        function doStyleFaults(feature) {
            return {
                weight: 2.0,
                color: '#0040ff',
                dashArray: '5,5,5',
                opacity: 1.0,
                stroke: true 
            };
        }

		$.getJSON(faultsurl, function (data) {
		    faults.addData(data).setStyle(doStyleFaults);			    
		});
		map.addLayer(faults)


        function pop_Infrastructure(feature, layer) {
            layer.on({
                mouseout: function(e) {
                    if (typeof layer.closePopup == 'function') {
                        layer.closePopup();
                    } else {
                        layer.eachLayer(function(feature){
                            feature.closePopup()
                        });
                    }
                },
                mouseover: highlightFeature,
            });
            var popupContent = '<table><tr><th scope="row">id</th><td>' + Autolinker.link(String(feature.properties['id'])) + '</td></tr><tr><th scope="row">infrastrct</th><td>' + Autolinker.link(String(feature.properties['infrastrct'])) + '</td></tr></table>';
            layer.bindPopup(popupContent);
        }

        function doStyleInfrastructure(feature) {
            return {
                weight: 1.04,
                color: '#000000',
                fillColor: '#ff7f00',
                dashArray: '',
                opacity: 1.0,
                fillOpacity: 1.0
            };
        }
          
        $.getJSON(featureurl, function (data) {
            feature.addData(data).setStyle(doStyleInfrastructure);
            feature.eachLayer(function (layer) { 
            layer.on('click', function (e) {
                var popup = "<strong>" + "Id : " + e.target.feature.properties.id + "<br>" + "Infrastructure: " + e.target.feature.properties.infrastrct + "<br>" +  "</strong>";
                layer.bindPopup(popup).openPopup(e.latlng);
                //map.fitBounds(e.target.getBounds());
            }); 
            //locations.bindLabel(feature.properties['location_b'], { 'noHide': true });

            });     
        });
        map.addLayer(feature)

		function pop_Contours(feature, layer) {
            layer.on({
                mouseout: function(e) {
                    if (typeof layer.closePopup == 'function') {
                        layer.closePopup();
                    } else {
                        layer.eachLayer(function(feature){
                            feature.closePopup()
                        });
                    }
                },
                mouseover: highlightFeature,
            });
            var popupContent = '<table><tr><th scope="row">ID</th><td>' + Autolinker.link(String(feature.properties['ID'])) + '</td></tr><tr><th scope="row">CONTOUR</th><td>' + Autolinker.link(String(feature.properties['CONTOUR'])) + '</td></tr><tr><th scope="row">Category</th><td>' + Autolinker.link(String(feature.properties['Category'])) + '</td></tr><tr><th scope="row">Elevation</th><td>' + Autolinker.link(String(feature.properties['Elevation'])) + '</td></tr><tr><th scope="row">ExxValue</th><td>' + Autolinker.link(String(feature.properties['ExxValue'])) + '</td></tr></table>';
            layer.bindPopup(popupContent);
        }

        function doStyleContours(feature) {
        if (feature.properties.elevation >= 1710.0 &&
                feature.properties.elevation <= 1896.66666667) {

            return {
                color: '#1a9641',
                weight: '1.04',
                dashArray: '',
                opacity: '0.5',
                fillOpacity: '0.5'
            }
        }
        if (feature.properties.elevation >= 1896.66666667 &&
                feature.properties.elevation <= 2083.33333333) {

            return {
                color: '#f5d013',
                weight: '1.04',
                dashArray: '',
                opacity: '0.5',
                fillOpacity: '0.5'
            }
        }
        if (feature.properties.elevation >= 2083.33333333 &&
                feature.properties.elevation <= 2270.0) {

            return {
                color: '#d7191c',
                weight: '1.04',
                dashArray: '',
                opacity: '0.5',
                fillOpacity: '0.5'
            }
        }
        }
       
		$.getJSON(contoursurl, function (data) {
		    contours.addData(data).setStyle(doStyleContours);
		    contours.eachLayer(function (layer) { 
		    layer.on('click', function (e) {
				var popup = "<strong>" + "Id : " + e.target.feature.properties.id + "<br>" + "Contour: " + e.target.feature.properties.contour + "<br>" + "Elevation: " + e.target.feature.properties.elevation +  "<br>" + "</strong>";
				layer.bindPopup(popup).openPopup(e.latlng);
				//map.fitBounds(e.target.getBounds());
			});	
			//locations.bindLabel(feature.properties['location_b'], { 'noHide': true });

			});	
		});
		map.addLayer(contours)


 		function pop_Caldera(feature, layer) {
            layer.on({
                mouseout: function(e) {
                    if (typeof layer.closePopup == 'function') {
                        layer.closePopup();
                    } else {
                        layer.eachLayer(function(feature){
                            feature.closePopup()
                        });
                    }
                },
                mouseover: highlightFeature,
            });
            var popupContent = '<table><tr><th scope="row">Id</th><td>' + Autolinker.link(String(feature.properties['Id'])) + '</td></tr></table>';
            layer.bindPopup(popupContent);
        }

        function doStyleweightedarea(feature) {
                    return {
                    weight: '1.04',
                    fillColor: '#d7191c',
                    color: '#000000',
                    dashArray: '',
                    opacity: '1.0',
                    fillOpacity: '1.0',
                };               
        }
           
       $.getJSON(dssurl, function (data) {
            dss.addData(data).setStyle(doStyleweightedarea);
            dss.eachLayer(function (layer) { 
            layer.on('click', function (e) {
                var popup = "<strong>" + "Id : " + e.target.feature.properties.id + "<br>" +  "</strong>";
                layer.bindPopup(popup).openPopup(e.latlng);
                //map.fitBounds(e.target.getBounds());
            }); 
            //locations.bindLabel(feature.properties['location_b'], { 'noHide': true });

            }); 
        });
        map.addLayer(dss)

        function doStyleCaldera(feature) {
            return {
                weight: 1.04,
                color: '#000000',
                fillColor: '#9ca46f',
                dashArray: '',
                opacity: 1.0,
                fillOpacity: 1.0
            };
        }
           
		$.getJSON(calderaurl, function (data) {
		    caldera.addData(data).setStyle(doStyleCaldera);
		    caldera.eachLayer(function (layer) { 
		    layer.on('click', function (e) {
				var popup = "<strong>" + "Id : " + e.target.feature.properties.id +  "<br>" +  "</strong>";
				layer.bindPopup(popup).openPopup(e.latlng);
				//map.fitBounds(e.target.getBounds());
			});	
			//locations.bindLabel(feature.properties['location_b'], { 'noHide': true });

			});	
		});
		map.addLayer(caldera)

var osmGeocoder = new L.Control.OSMGeocoder({
	collapsed: false,
	position: 'topright',
	text: 'Search',
});
osmGeocoder.addTo(map);

var baseLayers = {
	"OSM Mapnik": osmMap,
	"Landscape": landMap,
	"Aerial":aerial
};

var overlays = {
	'<img src="../static/smart/legend/Fumeroles.png" />Fumeroles': fumeroles,
	'<img src="../static/smart/legend/Roads.png" /> Roads': roads,
	'<img src="../static/smart/legend/Faults.png" /> Faults': faults,
	'Contours<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="../static/smart/legend/Contours_Low.png" /> Low<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="../static/smart/legend/Contours_Medium.png" /> Medium<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="../static/smart/legend/Contours_High.png" /> High<br />': contours,
	'<img src="../static/smart/legend/Wells.png" /> Wells': wells,
	'<img src="../static/smart/legend/Infrastructure.png" /> Infrastructure': feature,
	'<img src="../static/smart/legend/Caldera.png" /> Caldera': caldera,
    'Potential Well Sites<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="../static/smart/legend/weightedarea_HighProbability.png" /> High Probability<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="../static/smart/legend/weightedarea_MediumProbability.png" /> Medium Probability<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="../static/smart/legend/weightedarea_LowProbability.png" /> Low Probability<br />': dss
	
};
L.control.layers(baseLayers,overlays,{collapsed:false}).addTo(map);
map.locate({setView: true, maxZoom: 16});
    
function onLocationFound(e) {
	var radius = e.accuracy / 2;
	L.marker(e.latlng).addTo(map)
	.bindPopup("You are within " + radius + " meters from this point")
	.openPopup();
	L.circle(e.latlng, radius).addTo(map);
}
map.on('locationfound', onLocationFound);

L.control.scale({options: {position: 'bottomleft', maxWidth: 100, metric: true, imperial: false, updateWhenIdle: false}}).addTo(map);
stackLayers();

var routing = L.Routing.control({
	waypoints: [
	L.latLng(4015139.47400, -20198.62704),
	L.latLng(4015239.47400, -20191.62704)
	],
	routeWhileDragging: true,
	geocoder: L.Control.Geocoder.nominatim()
});

L.easyButton('fa-compass',
  function (){
    $('.leaflet-routing-container').is(':visible') ? routing.removeFrom(map) : routing.addTo(map)
  },
  'Routing'
).addTo(map);


function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}
