
/***
/* S I D E B A R   F I L T E R */
var sidebar = L.control.sidebar('sidebar', {
    position: 'left'
});
map.addControl(sidebar);

setTimeout(function () {
    sidebar.show();
}, 300);

$('#filter_control').click(function() {
    sidebar.show();
});


/* getResult function is called every time when user filters map objects using sidebar filter */
function getResult() {
	// fetch value of all filter fields
	var selected_owner = $("#select_owner").val();
	var selected_state = $("#select_state").val();

	// get fields where value is not 'all' so that you later filter only those fields
	var fields = new Array();

	if (selected_owner !== 'all') {
		fields.push("owner");
	}

	if (selected_state !== 'all') {
		fields.push("state");
	}

	/* ajax call to get all well with defined filter values */
	$.ajax({
		url: '/map/well/filter/',
		type: 'GET',
		data: "owner=" + selected_owner + "state=" + selected_state + "&fields=" + fields,
		success: function(response) {
			// first delete all markers from layer well
			array_markers.length=0;
	        wells.clearLayers();

	        $.each(eval(response), function(key, val) {	  
	        	//fields in JSON that was returned      	
	        	var fields = val.fields; 

	        	// parse point field to get values of latitude and longitude
	        	var regExp = /\(([^)]+)\)/;
				var matches = regExp.exec(fields.geom);
				var point = matches[1];
				var lon=point.split(' ')[0];
				var lat=point.split(' ')[1];

	        	//function which creates and adds new markers based on filtered values
	        	marker = new customMarker([lat, lon], {
				    title: fields.well_name,
				    opacity: 1.0  
				}); 
	        	marker.addTo(map);
	        	marker.bindPopup("<strong>owner:</strong><br>" + fields.well_owner + "<br><strong>State:</strong>"
				+ fields.well_state);
	        	array_markers.push(marker);
	        });

	        // add markers to layer and add it to map
	        AddPointsToLayer();
	    }
	});
}

// Add fuse search control
var options = {
        position: 'topright',
        title: 'Geothermal',
        placeholder: 'Search: Wells',
        maxResultLength: 15,
        threshold: 0.5,
        showInvisibleFeatures: true,
        showResultFct: function(feature, container) {
            props = feature.properties;
            var name = L.DomUtil.create('b', null, container);
            name.innerHTML = props.well_name;
            container.appendChild(L.DomUtil.create('p', null, container));
            var cat = props.well_owner ? props.well_owner : well_state
            var info = '' + cat + props.well_owner + ', ' + props.well_name;
        	container.appendChild(document.createTextNode(info));       	
            
        }
    };
    var fuseSearchCtrl = L.control.fuseSearch(options);
    map.addControl(fuseSearchCtrl);

       layerCtrl.addTo(map);

    var icons = setupIcons();

    // Load the data
    jQuery.getJSON(wellsurl, function(data) {
        displayFeatures(data.features, layers, icons);
        var props = ['well_owner', 'well_state', 'well_name'];
        fuseSearchCtrl.indexFeatures(data.features, props);
    });
    
function displayFeatures(features, layers, icons) {

    var popup = L.DomUtil.create('div', 'tiny-popup', map.getContainer());
                    
    for (var id in features) {
        var feat = features[id];
        var cat = feat.properties.well_state;
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
                        var nom = e.target.feature.properties.well_owner;
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

        var cat = props.well_state ? props.well_state : props.well_owner;
        if (cat !== null) {
            desc += '<em>' + cat + '</em></br>';
        }
        
        desc += '</span>';

        layer.bindPopup(desc);
    }
}

********/