var container = document.getElementById('map')!;
var map = new AMap.Map(container);
var mapCenter = map.getCenter();
var bounds = map.getBounds();
var mapStatus = map.getStatus();
var mapZoom = map.getZoom();
var mapCenterTuple: [number, number] = [mapCenter.getLng(), mapCenter.getLat()];
var mapCenterPixelPixel = map.lnglatToPixel(mapCenter);
var mapStyle = map.getMapStyle();
var mapPitch = map.getPitch();
var tileLayer = new AMap.TileLayer();

test('Map#getZoom', mapZoom);
test('Map#getCenter', mapCenter);
test('Map#getContainer', map.getContainer());
map.getCity(result => {
    test('Map#getCity', result);
})
test('Map#getBounds', bounds);
test('Map#getLabelzIndex', map.getLabelzIndex());
test('Map#getLang', map.getLang());
test('Map#getSize', map.getSize());
test('Map#getRotation', map.getRotation());
test('Map#getStatus', mapStatus);
test('Map#getDefaultCursor', map.getDefaultCursor());

test('Map#getResolution', map.getResolution());
test('Map#getResolution(LngLat)', map.getResolution(mapCenter));
test('Map#getResolution([number, number])', map.getResolution(mapCenterTuple));

test('Map#getScale', map.getScale());
test('Map#getScale(number)', map.getScale(96));

test('Map#setZoom(level)', map.setZoom(1));
test('Map#setlabelzIndex(number)', map.setLabelzIndex(9));
test('Map#setlabelzIndex(number)', map.setLabelzIndex(9));

test('Map#setLayers', map.setLayers([tileLayer]));

test('Map#setCenter', map.setCenter(mapCenter));
test('Map#setCenter', map.setCenter(mapCenterTuple));
test('Map#setZoomAndCenter', map.setZoomAndCenter(13, mapCenter));
test('Map#setCity', map.setCity('深圳', (coord, zoom) => {
    test('Map#setCity$coord', coord);
    test('Map#setCity$zoom', zoom);
}));
test('Map#setBounds', map.setBounds(bounds));
test('Map#setLimitBounds', map.setLimitBounds(bounds));
test('Map#clearLimitBounds', map.clearLimitBounds());
test('Map#setLang', map.setLang('zh_en'));
test('Map#setRotation', map.setRotation(2));
test('Map#setStatus', map.setStatus(mapStatus));
test('Map#setDefaultCursor', map.setDefaultCursor('default'));
test('Map#zoomIn', map.zoomIn());
test('Map#zoomOut', map.zoomOut());
test('Map#panTo', map.panTo(mapCenter));
test('Map#panTo', map.panTo(mapCenterTuple));
test('Map#panBy', map.panBy(1, 1));
// test('Map#setFitView', map.setFitView());
test('Map#clearMap', map.clearMap());

setTimeout(() => {
    // test('Map#destroy', map.destroy());
}, 2000);

test('Map#plugin', map.plugin('AMap.Heatmap', () => { }));
test('Map#plugin', map.plugin(['AMap.Heatmap'], () => { }));

// test('Map#addControl', map.addControl()); // TODO
// test('Map#removeControl', map.removeControl()); // TODO
test('Map#clearInfoWindow', map.clearInfoWindow());

test('Map#pixelToLngLat', map.pixelToLngLat(mapCenterPixelPixel));
test('Map#pixelToLngLat', map.pixelToLngLat(mapCenterPixelPixel, mapZoom));

test('Map#lnglatToPixel', mapCenterPixelPixel);
test('Map#lnglatToPixel', map.lnglatToPixel(mapCenter, mapZoom));
test('Map#lnglatToPixel', map.lnglatToPixel(mapCenterTuple));

test('Map#containerToLngLat', map.containerToLngLat(mapCenterPixelPixel));
test('Map#lngLatToContainer', map.lngLatToContainer(mapCenterTuple));
test('Map#lnglatToContainer', map.lnglatTocontainer(mapCenterTuple));

test('Map#setMapStyle', map.setMapStyle(mapStyle));
test('Map#getMapStyle', map.getMapStyle());

test('Map#setFeatures', map.setFeatures('all'));
test('Map#setFeatures', map.setFeatures('bg'));
test('Map#setFeatures', map.setFeatures(['bg', 'building']));

test('Map#getFeatures', map.getFeatures());

test('Map#setPitch', map.setPitch(mapPitch));
test('Map#getPitch', mapPitch);
// setFitView

test('Map@complete', map.on('complete', event => {
    test('Map@complete$event', event);
}));

test('Map@click', map.on('click', event => {
    test('Map@click$event', event);
}));

test('Map@hotspotclick', map.on('hotspotclick', event => {
    test('Map@click$hotspotclick', event);
}));
