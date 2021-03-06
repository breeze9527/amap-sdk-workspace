declare function test(name: string, value?: any): void;
declare function testLayer(layer: AMap.Layer): void;
declare function testWrapper(test: () => any): void;
declare function testPluginWrapper(plugin: string | string[], test: () => any): void;
declare function testOverlay(overlay: AMap.Overlay, options: { map: AMap.Map }): void;
declare function toTuple(lnglat: AMap.LngLat): [number, number];
declare function toTuple(lnglat: AMap.LngLat[]): Array<[number, number]>;
