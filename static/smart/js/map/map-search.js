
//Categories of well
var categories = {
    'Alcohol Sales' : {desc: "Alcohol Sales", icon:"alcohol.png"},
    'Cyber' : {desc: "Cyber", icon:"cybers.png"},
    'Retail Shops' : {desc: "Retail Shops", icon:"retail_shops.png"},
    'Hotels' : {desc: "Hotels", icon:"hotels.png"},
    'Supermarkets' : {desc: "Supermarkets", icon:"supermarkets.png"},
    'Butcheries' : {desc: "Butcheries", icon:"butcheries.png"},
    'Banks' : {desc: "Banks", icon:"banks.png"}
};

var setupIcons = function() {

    var icons = {};
    for (var cat in categories) {
        var icon = categories[cat].icon;
        var url = "../../img/" + icon;
 
        var icon = L.icon({
            iconUrl: url,
            iconSize: [32, 32],
            iconAnchor: [16, 37],
            popupAnchor: [0, -28]
        });
        icons[cat] = icon;
    }
    
    return icons;
};

var dataurl = '/well_data/';
var map;

$(function() {

// Create a Leaflet map with OSM background
    var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
    //var osmLayer = L.tileLayer('http://b.tile.cloudmade.com/9d991d739a924642a9664d59abf90002/1/256/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });

    map = L.map('map', {
        center: new L.LatLng(-0.418715, 36.950451),
        zoom: 13,
        maxZoom: 18,
        layers: [osmLayer]
    });

// Layer control, setting up 1 layer per category
    var layers = {},
        cultureLayer = L.layerGroup(),
        layerCtrl = L.control.layers();
    for (var icat in categories) {
        var layer = L.featureGroup();
        layers[icat] = layer;
        cultureLayer.addLayer(layer);
        
        var cat = categories[icat],
            desc = '<img class="layer-control-img" src="{{STATIC_URL}}ladm/img/'+ cat.icon + '">' + cat.desc;           
        layerCtrl.addOverlay(layer, desc);        
    }
    cultureLayer.addTo(map);

// Add fuse search control
var options = {
        position: 'topright',
        title: 'Geothermal',
        placeholder: 'Search: well',
        maxResultLength: 15,
        threshold: 0.5,
        showInvisibleFeatures: true,
        showResultFct: function(feature, container) {
            props = feature.properties;
            var name = L.DomUtil.create('b', null, container);
            name.innerHTML = props.well_name;
            container.appendChild(L.DomUtil.create('p', null, container));
            var cat = props.id ? props.id : well_owner
            var info = '' + cat + props.id + ', ' + props.geom;
            container.appendChild(document.createTextNode(info));           
            
        }
    };
    var fuseSearchCtrl = L.control.fuseSearch(options);
    map.addControl(fuseSearchCtrl);

       layerCtrl.addTo(map);

    var icons = setupIcons();

    // Load the data
    jQuery.getJSON(dataurl, function(data) {
        displayFeatures(data.features, layers, icons);
        var props = ['id', 'well_owner', 'geom'];
        fuseSearchCtrl.indexFeatures(data.features, props);
    });
    
});    

function displayFeatures(features, layers, icons) {

    var popup = L.DomUtil.create('div', 'tiny-popup', map.getContainer());
                    
    for (var id in features) {
        var feat = features[id];
        var cat = feat.properties.well_owner;
        var site = L.geoJson(feat, {
            pointToLayer: function(feature, latLng) {
                var icon = icons[cat];
                var marker = L.marker(latLng, {
                    icon: icon,
                    keyboard: false,
                    riseOnHover: true
                });
                if (! L.touch) {
                    marker.on('mouseover', function(e) {
                        var nom = e.target.feature.properties.id;
                        var pos = map.latLngToContainerPoint(e.latlng);
                        popup.innerHTML = nom;
                        L.DomUtil.setPosition(popup, pos);
                        L.DomUtil.addClass(popup, 'visible');

                    }).on('mouseout', function(e) {
                        L.DomUtil.removeClass(popup, 'visible');
                    });
                }
                return marker;
            },
            onEachFeature: bindPopup
        });
        var layer = layers[cat];
        if (layer !== undefined) {
            layer.addLayer(site);
        }
    }
    return layers;
}
 
function bindPopup(feature, layer) {
    // Keep track of the layer(marker)
    feature.layer = layer;
    
    var props = feature.properties;
    if (props) {
        var desc = '<span id="feature-popup">';
        desc += '<strong>' + props.well_name + '</strong><br/>';

        var cat = props.well_owner ? props.well_owner : props.id;
        if (cat !== null) {
            desc += '<em>' + cat + '</em></br>';
        }
        
        desc += '</span>';

        layer.bindPopup(desc);
    }
}