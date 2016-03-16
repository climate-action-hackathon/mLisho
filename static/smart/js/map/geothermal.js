        
        var json_Caldera ;

        var json_Infrastructure, json_Wells, json_Contours, json_Faults, json_Fumeroles, json_Roads;

        var highlightLayer;
        function highlightFeature(e) {
            highlightLayer = e.target;
            highlightLayer.openPopup();
        }
        var map = L.map('map', {
            measureControl:true,
            zoomControl:true, maxZoom:28, minZoom:1
        }).fitBounds([[-0.276054876787,35.9874639499],[-0.142315567282,36.1435419115]]);
        var hash = new L.Hash(map);
        var additional_attrib = '<a href="https://github.com/tomchadwin/qgis2web" target ="_blank">qgis2web</a>';
        var feature_group = new L.featureGroup([]);
        var bounds_group = new L.featureGroup([]);
        var raster_group = new L.LayerGroup([]);
        var basemap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: additional_attrib + ' &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors,<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
            maxZoom: 28
        });
        basemap.addTo(map);
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

        function doStyleCaldera(feature) {
            return {
                weight: 1.04,
                color: '#000000',
                fillColor: '#8595e6',
                dashArray: '10,5',
                opacity: 0.64,
                fillOpacity: 0.64
            };
        }
            var json_CalderaJSON = new L.geoJson(json_Caldera, {
                onEachFeature: pop_Caldera,
                style: doStyleCaldera
            });
            layerOrder[layerOrder.length] = json_CalderaJSON;
        layerOrder[layerOrder.length] = json_CalderaJSON;
        stackLayers();
        bounds_group.addLayer(json_CalderaJSON);
        feature_group.addLayer(json_CalderaJSON);
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
            var json_InfrastructureJSON = new L.geoJson(json_Infrastructure, {
                onEachFeature: pop_Infrastructure,
                style: doStyleInfrastructure
            });
            layerOrder[layerOrder.length] = json_InfrastructureJSON;
        layerOrder[layerOrder.length] = json_InfrastructureJSON;
        stackLayers();
        bounds_group.addLayer(json_InfrastructureJSON);
        feature_group.addLayer(json_InfrastructureJSON);
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
            var popupContent = '<table><tr><th scope="row">well_type</th><td>' + Autolinker.link(String(feature.properties['well_type'])) + '</td></tr><tr><th scope="row">spud_date</th><td>' + Autolinker.link(String(feature.properties['spud_date'])) + '</td></tr><tr><th scope="row">compl_date</th><td>' + Autolinker.link(String(feature.properties['compl_date'])) + '</td></tr><tr><th scope="row">est_days</th><td>' + Autolinker.link(String(feature.properties['est_days'])) + '</td></tr><tr><th scope="row">actl_days</th><td>' + Autolinker.link(String(feature.properties['actl_days'])) + '</td></tr></table>';
            layer.bindPopup(popupContent);
        }

        function doStyleWells(feature) {
            return {
                weight: 1.04,
                color: '#000000',
                fillColor: '#1f2bb4',
                dashArray: '',
                opacity: 1.0,
                fillOpacity: 1.0
            };
        }
            var json_WellsJSON = new L.geoJson(json_Wells, {
                onEachFeature: pop_Wells,
                style: doStyleWells
            });
            layerOrder[layerOrder.length] = json_WellsJSON;
        layerOrder[layerOrder.length] = json_WellsJSON;
        stackLayers();
        bounds_group.addLayer(json_WellsJSON);
        feature_group.addLayer(json_WellsJSON);
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
        }

        function doStyleContours(feature) {
        if (feature.properties.Elevation >= 1710.0 &&
                feature.properties.Elevation <= 1896.66666667) {

            return {
                color: '#1a9641',
                weight: '2.0',
                dashArray: '',
                opacity: '0.290196',
            }
        }
        if (feature.properties.Elevation >= 1896.66666667 &&
                feature.properties.Elevation <= 2083.33333333) {

            return {
                color: '#ffff4d',
                weight: '2.0',
                dashArray: '',
                opacity: '0.290196',
            }
        }
        if (feature.properties.Elevation >= 2083.33333333 &&
                feature.properties.Elevation <= 2270.0) {

            return {
                color: '#d7191c',
                weight: '2.0',
                dashArray: '',
                opacity: '0.290196',
            }
        }
        }
            var json_ContoursJSON = new L.geoJson(json_Contours, {
                onEachFeature: pop_Contours,
                style: doStyleContours
            });
            layerOrder[layerOrder.length] = json_ContoursJSON;
        bounds_group.addLayer(json_ContoursJSON);
        feature_group.addLayer(json_ContoursJSON);
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
                color: '#4909ca',
                dashArray: '',
                opacity: 1.0
            };
        }
            var json_FaultsJSON = new L.geoJson(json_Faults, {
                onEachFeature: pop_Faults,
                style: doStyleFaults
            });
            layerOrder[layerOrder.length] = json_FaultsJSON;
        layerOrder[layerOrder.length] = json_FaultsJSON;
        stackLayers();
        bounds_group.addLayer(json_FaultsJSON);
        feature_group.addLayer(json_FaultsJSON);
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
            var json_RoadsJSON = new L.geoJson(json_Roads, {
                onEachFeature: pop_Roads,
                style: doStyleRoads
            });
            layerOrder[layerOrder.length] = json_RoadsJSON;
        layerOrder[layerOrder.length] = json_RoadsJSON;
        stackLayers();
        bounds_group.addLayer(json_RoadsJSON);
        feature_group.addLayer(json_RoadsJSON);
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
            var popupContent = '<table><tr><th scope="row">FUMAROLE_N</th><td>' + Autolinker.link(String(feature.properties['FUMAROLE_N'])) + '</td></tr><tr><th scope="row">EASTINGS</th><td>' + Autolinker.link(String(feature.properties['EASTINGS'])) + '</td></tr><tr><th scope="row">NORTHINGS</th><td>' + Autolinker.link(String(feature.properties['NORTHINGS'])) + '</td></tr></table>';
            layer.bindPopup(popupContent);
        }

        function doStyleFumeroles() {
            return {
                radius: 4.0,
                fillColor: '#4dff6e',
                color: '#000000',
                weight: 0.0,
                opacity: 0.83137254902,
                dashArray: '',
                fillOpacity: 0.83137254902
            }
        }
        function doPointToLayerFumeroles(feature, latlng) {
            return L.circleMarker(latlng, doStyleFumeroles())
        }
        var json_FumerolesJSON = new L.geoJson(json_Fumeroles, {
            onEachFeature: pop_Fumeroles, 
            pointToLayer: doPointToLayerFumeroles
            });
        layerOrder[layerOrder.length] = json_FumerolesJSON;

        var cluster_groupFumerolesJSON = new L.MarkerClusterGroup({showCoverageOnHover: false});
        cluster_groupFumerolesJSON.addLayer(json_FumerolesJSON);

        bounds_group.addLayer(json_FumerolesJSON);
        cluster_groupFumerolesJSON.addTo(map);
        raster_group.addTo(map);
        feature_group.addTo(map);
        var osmGeocoder = new L.Control.OSMGeocoder({
            collapsed: false,
            position: 'topright',
            text: 'Search',
        });
        osmGeocoder.addTo(map);
        var baseMaps = {
            'OSM Standard': basemap
        };
            L.control.layers(baseMaps,{
                '<img src="../static/smart/legend/Roads.png" /> Roads': json_RoadsJSON,
                '<img src="../static/smart/legend/Faults.png" /> Faults': json_FaultsJSON,
                'Contours<br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="../static/smart/legend/Contours_Low.png" /> Low<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="../static/smart/legend/Contours_Medium.png" /> Medium<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="../static/smart/legend/Contours_High.png" /> High<br />': json_ContoursJSON,
                '<img src="../static/smart/legend/Wells.png" /> Wells': json_WellsJSON,
                '<img src="../static/smart/legend/Infrastructure.png" /> Infrastructure': json_InfrastructureJSON,
                '<img src="../static/smart/legend/Caldera.png" /> Caldera': json_CalderaJSON
            },{collapsed:false}).addTo(map);
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
 