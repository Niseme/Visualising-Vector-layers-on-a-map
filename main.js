
// Define a view
var view = new ol.View({
    projection: 'EPSG:4326',
    center: [-73.99241933642752, 40.71473962899501],
    zoom: 14,
})

//Define map
let OSMBaseMap = new ol.layer.Tile({
    source: new ol.source.OSM({
        wrapX: false,
    })
})

//Define array of layers
let layerArray = [OSMBaseMap];

//Define map
let map = new ol.Map({
    target: 'map',
    layers: layerArray,
    view: view,
});

let inputJSON =
{
    "type": "FeatureCollection",
    "features": [
        {
            "type": "Feature",
            "properties": {},
            "geometry": {
                "type": "LineString",
                "coordinates": [
                    [
                        -74.01120185852051,
                        40.71037756449118
                    ],
                    [
                        -74.00545120239258,
                        40.73321007823572
                    ],
                    [
                        -73.98038864135742,
                        40.73242960878483
                    ],
                    [
                        -73.9859676361084,
                        40.721957424936726
                    ]
                ]
            }
        }
    ]
}

//Vector source
let vectorSource = new ol.source.Vector({
    features: (new ol.format.GeoJSON().readFeatures(inputJSON))
})
//Vector layer
let vectorLayer = new ol.layer.Vector({
    source: vectorSource,
    style: new ol.style.Style({
        stroke: new ol.style.Stroke({
            color: '#FF0000',
            lineJoin: 'bevel',
            width: 5,
            lineDash: [5, 15],
        })
    })
})
//Add vector layer to map
map.addLayer(vectorLayer)

//adding Vector layer as external json file
let extSource = new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'geom.geojson'
})

let extLayer = new ol.layer.Vector({
    source: extSource,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: ' rgba(142,226,136,0.6)'
        }),
        stroke: new ol.style.Stroke({
            color: 'rgba(256,226,136)',
            width: 5
        })
    })
})

map.addLayer(extLayer)

//adding vector layer from url

let urlSource = new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'http://localhost:8080/geoserver/tiger/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=tiger%3Apoi&maxFeatures=50&outputFormat=application%2Fjson'
})

let urlLayer = new ol.layer.Vector({
    source: urlSource,
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: 'rgba(255,255,255,0.4)'
        }),
    })
})

map.addLayer(urlLayer)

//Heatmap
let heatSource = new ol.source.Vector({
    format: new ol.format.GeoJSON(),
    url: 'http://localhost:8080/geoserver/tiger/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=tiger%3Apoi&maxFeatures=50&outputFormat=application%2Fjson',
})

let heatLayer = new ol.layer.Heatmap({
    source: heatSource,
    radius: 50,
    gradient: ['#ff1422', '#ad1125', '#ee0000', '#cd0111', '#aa2244']
})
map.addLayer(heatLayer)