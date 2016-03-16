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

var pastureurl = '/pasture_data/'
var rainfall2014url = '/rainfall2014_data/'

var pasture = L.geoJson();
var rainfall2014= L.geoJson();

var highlightLayer;
function highlightFeature(e) {
    highlightLayer = e.target;
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

        function doStylePasture(feature) {
        if (feature.properties.elevation >= 1710.0 &&
                feature.properties.elevation <= 1896.66666667) {

            return {
                color: '#1a9641',
                weight: '1.04',
                dashArray: '',
                opacity: '1.0',
            }
        }
        if (feature.properties.elevation >= 1896.66666667 &&
                feature.properties.elevation <= 2083.33333333) {

            return {
                color: '#f5d013',
                weight: '1.04',
                dashArray: '',
                opacity: '1.0',
            }
        }
        if (feature.properties.elevation >= 2083.33333333 &&
                feature.properties.elevation <= 2270.0) {

            return {
                color: '#d7191c',
                weight: '1.04',
                dashArray: '',
                opacity: '1.0',
            }
        }
        }
       
        $.getJSON(pastureurl, function (data) {
            pasture.addData(data).setStyle(doStylepasture);
            pasture.eachLayer(function (layer) { 
            layer.on('click', function (e) {
                var popup = "<strong>" + "Id : " + e.target.feature.properties.id + "<br>" + "Contour: " + e.target.feature.properties.contour + "<br>" + "Elevation: " + e.target.feature.properties.elevation +  "<br>" + "</strong>";
                layer.bindPopup(popup).openPopup(e.latlng);
                //map.fitBounds(e.target.getBounds());
            }); 
            //locations.bindLabel(feature.properties['location_b'], { 'noHide': true });

            }); 
        });
        map.addLayer(pasture)

 
        function doStyleRainfall2014(feature) {
        if (feature.properties.elevation >= 1710.0 &&
                feature.properties.elevation <= 1896.66666667) {

            return {
                color: '#1a9641',
                weight: '1.04',
                dashArray: '',
                opacity: '1.0',
            }
        }
        if (feature.properties.elevation >= 1896.66666667 &&
                feature.properties.elevation <= 2083.33333333) {

            return {
                color: '#f5d013',
                weight: '1.04',
                dashArray: '',
                opacity: '1.0',
            }
        }
        if (feature.properties.elevation >= 2083.33333333 &&
                feature.properties.elevation <= 2270.0) {

            return {
                color: '#d7191c',
                weight: '1.04',
                dashArray: '',
                opacity: '1.0',
            }
        }
        }
       
        $.getJSON(rainfall2014url, function (data) {
            rainfall2014.addData(data).setStyle(doStylerainfall2014);
            rainfall2014.eachLayer(function (layer) { 
            layer.on('click', function (e) {
                var popup = "<strong>" + "Id : " + e.target.feature.properties.id + "<br>" + "Contour: " + e.target.feature.properties.contour + "<br>" + "Elevation: " + e.target.feature.properties.elevation +  "<br>" + "</strong>";
                layer.bindPopup(popup).openPopup(e.latlng);
                //map.fitBounds(e.target.getBounds());
            }); 
            //locations.bindLabel(feature.properties['location_b'], { 'noHide': true });

            }); 
        });
        map.addLayer(rainfall2014)

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
    '<img src="../static/smart/legend/Caldera.png" /> Caldera': caldera
    
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
