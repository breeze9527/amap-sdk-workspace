interface ExtraData {
    test: number;
}

declare const map: AMap.Map;
declare const lnglat: AMap.LngLat;
declare const lnglatTuple: [number, number];
declare const div: HTMLDivElement;

// $ExpectType AdvancedInfoWindow<any>
new AMap.AdvancedInfoWindow();
// $ExpectType AdvancedInfoWindow<any>
new AMap.AdvancedInfoWindow({});
// $ExpectType AdvancedInfoWindow<ExtraData>
const advancedInfoWindow = new AMap.AdvancedInfoWindow<ExtraData>({
    autoMove: true,
    closeWhenClickMap: true,
    content: '123',
    offset: new AMap.Pixel(1, 2),
    anchor: 'bottom-center',
    panel: div,
    searchRadius: 4000,
    placeSearch: true,
    driving: true,
    walking: true,
    transit: true,
    asOrigin: true,
    asDestination: true
});

// $ExpectType void
advancedInfoWindow.open(map);
// $ExpectType void
advancedInfoWindow.open(map, lnglat);
// $ExpectType void
advancedInfoWindow.open(map, lnglatTuple);

// $ExpectType void
advancedInfoWindow.close();

// $ExpectType boolean
advancedInfoWindow.getIsOpen();

// $ExpectType void
advancedInfoWindow.setContent('123');
// $ExpectType void
advancedInfoWindow.setContent(div);

// $ExpectType string | HTMLElement | undefined
advancedInfoWindow.getContent();

// $ExpectType void
advancedInfoWindow.setPosition(lnglat);
// $ExpectType void
advancedInfoWindow.setPosition(lnglatTuple);

// $ExpectType LngLat | undefined
advancedInfoWindow.getPosition();

const testAdvancedInfoWindowAnchor = advancedInfoWindow.getAnchor();
if (testAdvancedInfoWindowAnchor !== undefined) {
    // $ExpectType Anchor
    testAdvancedInfoWindowAnchor;
} else {
    // $ExpectType undefined
    testAdvancedInfoWindowAnchor;
}

// $ExpectType void
advancedInfoWindow.setAnchor();
// $ExpectType void
advancedInfoWindow.setAnchor(testAdvancedInfoWindowAnchor);

// $ExpectType void
advancedInfoWindow.clear();

advancedInfoWindow.on('error', (event: AMap.AdvancedInfoWindow.EventMap<typeof advancedInfoWindow>['error']) => {
    // $ExpectType "error"
    event.type;
});

advancedInfoWindow.on('complete', (event: AMap.AdvancedInfoWindow.EventMap<typeof advancedInfoWindow>['complete']) => {
    // $ExpectType "placesearch" | "driving" | "walking" | "transit"
    event.type;
    // $ExpectType string
    event.info;
});
