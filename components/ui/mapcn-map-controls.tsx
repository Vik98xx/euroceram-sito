"use client";

import MapLibreGL, { type PopupOptions, type MarkerOptions } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import {
  createContext,
  forwardRef,
  useCallback,
  useContext,
  useEffect,
  useId,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { X, Minus, Plus, Locate, Maximize, Loader2 } from "lucide-react";

function cn(...inputs: Array<string | false | null | undefined>) {
  return inputs.filter(Boolean).join(" ");
}

const defaultStyles = {
  dark: "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
  light: "https://basemaps.cartocdn.com/gl/positron-gl-style/style.json",
};

type Theme = "light" | "dark";

function getDocumentTheme(): Theme | null {
  if (typeof document === "undefined") return null;
  if (document.documentElement.classList.contains("dark")) return "dark";
  if (document.documentElement.classList.contains("light")) return "light";
  return null;
}

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "light";
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function useResolvedTheme(themeProp?: "light" | "dark"): Theme {
  const [detectedTheme, setDetectedTheme] = useState<Theme>(
    () => getDocumentTheme() ?? getSystemTheme(),
  );

  useEffect(() => {
    if (themeProp) return;
    const observer = new MutationObserver(() => {
      const docTheme = getDocumentTheme();
      if (docTheme) setDetectedTheme(docTheme);
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleSystemChange = (e: MediaQueryListEvent) => {
      if (!getDocumentTheme()) setDetectedTheme(e.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handleSystemChange);
    return () => { observer.disconnect(); mediaQuery.removeEventListener("change", handleSystemChange); };
  }, [themeProp]);

  return themeProp ?? detectedTheme;
}

type MapContextValue = { map: MapLibreGL.Map | null; isLoaded: boolean };
const MapContext = createContext<MapContextValue | null>(null);

function useMap() {
  const context = useContext(MapContext);
  if (!context) throw new Error("useMap must be used within a Map component");
  return context;
}

type MapViewport = {
  center: [number, number];
  zoom: number;
  bearing: number;
  pitch: number;
};

type MapStyleOption = string | MapLibreGL.StyleSpecification;
type MapRef = MapLibreGL.Map;

type MapProps = {
  children?: ReactNode;
  className?: string;
  theme?: Theme;
  styles?: { light?: MapStyleOption; dark?: MapStyleOption };
  projection?: MapLibreGL.ProjectionSpecification;
  viewport?: Partial<MapViewport>;
  onViewportChange?: (viewport: MapViewport) => void;
  loading?: boolean;
} & Omit<MapLibreGL.MapOptions, "container" | "style">;

function DefaultLoader() {
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(16,19,15,0.7)', backdropFilter: 'blur(4px)' }}>
      <div style={{ display: 'flex', gap: 6 }}>
        {[0, 150, 300].map((delay) => (
          <span key={delay} style={{ width: 6, height: 6, borderRadius: '50%', background: 'rgba(111,168,144,0.6)', animation: `pulse 1.2s ease-in-out ${delay}ms infinite` }} />
        ))}
      </div>
    </div>
  );
}

function getViewport(map: MapLibreGL.Map): MapViewport {
  const center = map.getCenter();
  return { center: [center.lng, center.lat], zoom: map.getZoom(), bearing: map.getBearing(), pitch: map.getPitch() };
}

const Map = forwardRef<MapRef, MapProps>(function Map(
  { children, className, theme: themeProp, styles, projection, viewport, onViewportChange, loading = false, ...props },
  ref,
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapInstance, setMapInstance] = useState<MapLibreGL.Map | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isStyleLoaded, setIsStyleLoaded] = useState(false);
  const currentStyleRef = useRef<MapStyleOption | null>(null);
  const styleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const internalUpdateRef = useRef(false);
  const resolvedTheme = useResolvedTheme(themeProp);
  const isControlled = viewport !== undefined && onViewportChange !== undefined;
  const onViewportChangeRef = useRef(onViewportChange);
  onViewportChangeRef.current = onViewportChange;

  const mapStyles = useMemo(() => ({
    dark: styles?.dark ?? defaultStyles.dark,
    light: styles?.light ?? defaultStyles.light,
  }), [styles]);

  useImperativeHandle(ref, () => mapInstance as MapLibreGL.Map, [mapInstance]);

  const clearStyleTimeout = useCallback(() => {
    if (styleTimeoutRef.current) { clearTimeout(styleTimeoutRef.current); styleTimeoutRef.current = null; }
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const initialStyle = resolvedTheme === "dark" ? mapStyles.dark : mapStyles.light;
    currentStyleRef.current = initialStyle;
    const map = new MapLibreGL.Map({
      container: containerRef.current,
      style: initialStyle,
      renderWorldCopies: false,
      attributionControl: { compact: true },
      ...props,
      ...viewport,
    });
    const styleDataHandler = () => {
      clearStyleTimeout();
      styleTimeoutRef.current = setTimeout(() => {
        setIsStyleLoaded(true);
        if (projection) map.setProjection(projection);
      }, 100);
    };
    const loadHandler = () => setIsLoaded(true);
    const handleMove = () => { if (internalUpdateRef.current) return; onViewportChangeRef.current?.(getViewport(map)); };
    map.on("load", loadHandler);
    map.on("styledata", styleDataHandler);
    map.on("move", handleMove);
    setMapInstance(map);
    return () => {
      clearStyleTimeout();
      map.off("load", loadHandler);
      map.off("styledata", styleDataHandler);
      map.off("move", handleMove);
      map.remove();
      setIsLoaded(false);
      setIsStyleLoaded(false);
      setMapInstance(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!mapInstance || !isControlled || !viewport) return;
    if (mapInstance.isMoving()) return;
    const current = getViewport(mapInstance);
    const next = { center: viewport.center ?? current.center, zoom: viewport.zoom ?? current.zoom, bearing: viewport.bearing ?? current.bearing, pitch: viewport.pitch ?? current.pitch };
    if (next.center[0] === current.center[0] && next.center[1] === current.center[1] && next.zoom === current.zoom && next.bearing === current.bearing && next.pitch === current.pitch) return;
    internalUpdateRef.current = true;
    mapInstance.jumpTo(next);
    internalUpdateRef.current = false;
  }, [mapInstance, isControlled, viewport]);

  useEffect(() => {
    if (!mapInstance || !resolvedTheme) return;
    const newStyle = resolvedTheme === "dark" ? mapStyles.dark : mapStyles.light;
    if (currentStyleRef.current === newStyle) return;
    clearStyleTimeout();
    currentStyleRef.current = newStyle;
    setIsStyleLoaded(false);
    mapInstance.setStyle(newStyle, { diff: true });
  }, [mapInstance, resolvedTheme, mapStyles, clearStyleTimeout]);

  const contextValue = useMemo(() => ({ map: mapInstance, isLoaded: isLoaded && isStyleLoaded }), [mapInstance, isLoaded, isStyleLoaded]);

  return (
    <MapContext.Provider value={contextValue}>
      <div ref={containerRef} className={cn("relative h-full w-full", className)}>
        {(!isLoaded || loading) && <DefaultLoader />}
        {mapInstance && children}
      </div>
    </MapContext.Provider>
  );
});

type MarkerContextValue = { marker: MapLibreGL.Marker; map: MapLibreGL.Map | null };
const MarkerContext = createContext<MarkerContextValue | null>(null);
function useMarkerContext() {
  const context = useContext(MarkerContext);
  if (!context) throw new Error("Marker components must be used within MapMarker");
  return context;
}

type MapMarkerProps = {
  longitude: number;
  latitude: number;
  children: ReactNode;
  onClick?: (e: MouseEvent) => void;
  onMouseEnter?: (e: MouseEvent) => void;
  onMouseLeave?: (e: MouseEvent) => void;
  onDragStart?: (lngLat: { lng: number; lat: number }) => void;
  onDrag?: (lngLat: { lng: number; lat: number }) => void;
  onDragEnd?: (lngLat: { lng: number; lat: number }) => void;
} & Omit<MarkerOptions, "element">;

function MapMarker({ longitude, latitude, children, onClick, onMouseEnter, onMouseLeave, onDragStart, onDrag, onDragEnd, draggable = false, ...markerOptions }: MapMarkerProps) {
  const { map } = useMap();
  const callbacksRef = useRef({ onClick, onMouseEnter, onMouseLeave, onDragStart, onDrag, onDragEnd });
  callbacksRef.current = { onClick, onMouseEnter, onMouseLeave, onDragStart, onDrag, onDragEnd };

  const marker = useMemo(() => {
    const markerInstance = new MapLibreGL.Marker({ ...markerOptions, element: document.createElement("div"), draggable }).setLngLat([longitude, latitude]);
    const handleClick = (e: MouseEvent) => callbacksRef.current.onClick?.(e);
    const handleMouseEnter = (e: MouseEvent) => callbacksRef.current.onMouseEnter?.(e);
    const handleMouseLeave = (e: MouseEvent) => callbacksRef.current.onMouseLeave?.(e);
    markerInstance.getElement()?.addEventListener("click", handleClick);
    markerInstance.getElement()?.addEventListener("mouseenter", handleMouseEnter);
    markerInstance.getElement()?.addEventListener("mouseleave", handleMouseLeave);
    markerInstance.on("dragstart", () => { const l = markerInstance.getLngLat(); callbacksRef.current.onDragStart?.({ lng: l.lng, lat: l.lat }); });
    markerInstance.on("drag", () => { const l = markerInstance.getLngLat(); callbacksRef.current.onDrag?.({ lng: l.lng, lat: l.lat }); });
    markerInstance.on("dragend", () => { const l = markerInstance.getLngLat(); callbacksRef.current.onDragEnd?.({ lng: l.lng, lat: l.lat }); });
    return markerInstance;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!map) return;
    marker.addTo(map);
    return () => { marker.remove(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);

  if (marker.getLngLat().lng !== longitude || marker.getLngLat().lat !== latitude) marker.setLngLat([longitude, latitude]);
  if (marker.isDraggable() !== draggable) marker.setDraggable(draggable);

  return <MarkerContext.Provider value={{ marker, map }}>{children}</MarkerContext.Provider>;
}

type MarkerContentProps = { children?: ReactNode; className?: string };
function MarkerContent({ children, className }: MarkerContentProps) {
  const { marker } = useMarkerContext();
  return createPortal(<div className={cn("relative cursor-pointer", className)}>{children || <DefaultMarkerIcon />}</div>, marker.getElement());
}

function DefaultMarkerIcon() {
  return <div className="relative h-4 w-4 rounded-full border-2 border-white bg-blue-500 shadow-lg" />;
}

function PopupCloseButton({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" onClick={onClick} aria-label="Close popup" style={{ position: 'absolute', top: 2, right: 2, zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20, cursor: 'pointer', background: 'none', border: 'none' }}>
      <X style={{ width: 14, height: 14 }} />
    </button>
  );
}

type MarkerPopupProps = { children: ReactNode; className?: string; closeButton?: boolean } & Omit<PopupOptions, "className" | "closeButton">;
function MarkerPopup({ children, className, closeButton = false, ...popupOptions }: MarkerPopupProps) {
  const { marker, map } = useMarkerContext();
  const container = useMemo(() => document.createElement("div"), []);
  const popup = useMemo(() => new MapLibreGL.Popup({ offset: 16, ...popupOptions, closeButton: false }).setMaxWidth("none").setDOMContent(container), []);
  useEffect(() => {
    if (!map) return;
    popup.setDOMContent(container);
    marker.setPopup(popup);
    return () => { marker.setPopup(null); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);
  return createPortal(<div className={cn("relative", className)}>{closeButton && <PopupCloseButton onClick={() => popup.remove()} />}{children}</div>, container);
}

type MarkerTooltipProps = { children: ReactNode; className?: string } & Omit<PopupOptions, "className" | "closeButton" | "closeOnClick">;
function MarkerTooltip({ children, className, ...popupOptions }: MarkerTooltipProps) {
  const { marker, map } = useMarkerContext();
  const container = useMemo(() => document.createElement("div"), []);
  const tooltip = useMemo(() => new MapLibreGL.Popup({ offset: 16, ...popupOptions, closeOnClick: true, closeButton: false }).setMaxWidth("none"), []);
  useEffect(() => {
    if (!map) return;
    tooltip.setDOMContent(container);
    const handleMouseEnter = () => tooltip.setLngLat(marker.getLngLat()).addTo(map);
    const handleMouseLeave = () => tooltip.remove();
    marker.getElement()?.addEventListener("mouseenter", handleMouseEnter);
    marker.getElement()?.addEventListener("mouseleave", handleMouseLeave);
    return () => {
      marker.getElement()?.removeEventListener("mouseenter", handleMouseEnter);
      marker.getElement()?.removeEventListener("mouseleave", handleMouseLeave);
      tooltip.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);
  return createPortal(<div className={cn("pointer-events-none rounded-md px-2 py-1 text-xs shadow-md", className)}>{children}</div>, container);
}

type MarkerLabelProps = { children: ReactNode; className?: string; position?: "top" | "bottom" };
function MarkerLabel({ children, className, position = "top" }: MarkerLabelProps) {
  const positionClasses = { top: "bottom-full mb-1", bottom: "top-full mt-1" };
  return <div className={cn("absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] font-medium", positionClasses[position], className)}>{children}</div>;
}

type MapControlsProps = {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  showZoom?: boolean;
  showCompass?: boolean;
  showLocate?: boolean;
  showFullscreen?: boolean;
  className?: string;
  onLocate?: (coords: { longitude: number; latitude: number }) => void;
};

const positionClasses = {
  "top-left": "top-2 left-2",
  "top-right": "top-2 right-2",
  "bottom-left": "bottom-2 left-2",
  "bottom-right": "bottom-10 right-2",
};

function ControlGroup({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 6, border: '1px solid rgba(111,168,144,0.25)', background: 'rgba(16,19,15,0.85)', backdropFilter: 'blur(12px)', boxShadow: '0 2px 12px rgba(0,0,0,0.4)' }}>
      {children}
    </div>
  );
}

function ControlButton({ onClick, label, children, disabled = false }: { onClick: () => void; label: string; children: React.ReactNode; disabled?: boolean }) {
  return (
    <button onClick={onClick} aria-label={label} type="button" disabled={disabled}
      style={{ display: 'flex', width: 32, height: 32, alignItems: 'center', justifyContent: 'center', background: 'none', border: 'none', cursor: disabled ? 'not-allowed' : 'pointer', color: 'rgba(255,255,255,0.7)', transition: 'background 0.2s, color 0.2s' }}
      onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'rgba(111,168,144,0.2)'; (e.currentTarget as HTMLButtonElement).style.color = '#6FA890'; }}
      onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = 'none'; (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.7)'; }}
    >
      {children}
    </button>
  );
}

function MapControls({ position = "bottom-right", showZoom = true, showCompass = false, showLocate = false, showFullscreen = false, className, onLocate }: MapControlsProps) {
  const { map } = useMap();
  const [waitingForLocation, setWaitingForLocation] = useState(false);
  const handleZoomIn = useCallback(() => map?.zoomTo(map.getZoom() + 1, { duration: 300 }), [map]);
  const handleZoomOut = useCallback(() => map?.zoomTo(map.getZoom() - 1, { duration: 300 }), [map]);
  const handleResetBearing = useCallback(() => map?.resetNorthPitch({ duration: 300 }), [map]);
  const handleLocate = useCallback(() => {
    setWaitingForLocation(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const coords = { longitude: pos.coords.longitude, latitude: pos.coords.latitude };
        map?.flyTo({ center: [coords.longitude, coords.latitude], zoom: 14, duration: 1500 });
        onLocate?.(coords);
        setWaitingForLocation(false);
      }, (error) => { console.error("Error getting location:", error); setWaitingForLocation(false); });
    }
  }, [map, onLocate]);
  const handleFullscreen = useCallback(() => {
    const container = map?.getContainer();
    if (!container) return;
    if (document.fullscreenElement) document.exitFullscreen();
    else container.requestFullscreen();
  }, [map]);

  return (
    <div className={cn("absolute z-10 flex flex-col gap-1.5", positionClasses[position], className)}>
      {showZoom && <ControlGroup><ControlButton onClick={handleZoomIn} label="Zoom in"><Plus style={{ width: 16, height: 16 }} /></ControlButton><ControlButton onClick={handleZoomOut} label="Zoom out"><Minus style={{ width: 16, height: 16 }} /></ControlButton></ControlGroup>}
      {showCompass && <ControlGroup><CompassButton onClick={handleResetBearing} /></ControlGroup>}
      {showLocate && <ControlGroup><ControlButton onClick={handleLocate} label="Find my location" disabled={waitingForLocation}>{waitingForLocation ? <Loader2 style={{ width: 16, height: 16, animation: 'spin 1s linear infinite' }} /> : <Locate style={{ width: 16, height: 16 }} />}</ControlButton></ControlGroup>}
      {showFullscreen && <ControlGroup><ControlButton onClick={handleFullscreen} label="Toggle fullscreen"><Maximize style={{ width: 16, height: 16 }} /></ControlButton></ControlGroup>}
    </div>
  );
}

function CompassButton({ onClick }: { onClick: () => void }) {
  const { map } = useMap();
  const compassRef = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (!map || !compassRef.current) return;
    const compass = compassRef.current;
    const updateRotation = () => { compass.style.transform = `rotateX(${map.getPitch()}deg) rotateZ(${-map.getBearing()}deg)`; };
    map.on("rotate", updateRotation);
    map.on("pitch", updateRotation);
    updateRotation();
    return () => { map.off("rotate", updateRotation); map.off("pitch", updateRotation); };
  }, [map]);
  return (
    <ControlButton onClick={onClick} label="Reset bearing to north">
      <svg ref={compassRef} viewBox="0 0 24 24" style={{ width: 20, height: 20, transition: 'transform 0.2s', transformStyle: 'preserve-3d' }}>
        <path d="M12 2L16 12H12V2Z" fill="#ef4444" />
        <path d="M12 2L8 12H12V2Z" fill="#fca5a5" />
        <path d="M12 22L16 12H12V22Z" fill="rgba(255,255,255,0.3)" />
        <path d="M12 22L8 12H12V22Z" fill="rgba(255,255,255,0.15)" />
      </svg>
    </ControlButton>
  );
}

type MapPopupProps = { longitude: number; latitude: number; onClose?: () => void; children: ReactNode; className?: string; closeButton?: boolean } & Omit<PopupOptions, "className" | "closeButton">;
function MapPopup({ longitude, latitude, onClose, children, className, closeButton = false, ...popupOptions }: MapPopupProps) {
  const { map } = useMap();
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  const container = useMemo(() => document.createElement("div"), []);
  const popup = useMemo(() => new MapLibreGL.Popup({ offset: 16, ...popupOptions, closeButton: false }).setMaxWidth("none").setLngLat([longitude, latitude]), []);
  useEffect(() => {
    if (!map) return;
    const onCloseProp = () => onCloseRef.current?.();
    popup.on("close", onCloseProp);
    popup.setDOMContent(container);
    popup.addTo(map);
    return () => { popup.off("close", onCloseProp); if (popup.isOpen()) popup.remove(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);
  return createPortal(<div className={cn("relative", className)}>{closeButton && <PopupCloseButton onClick={() => popup.remove()} />}{children}</div>, container);
}

type MapRouteProps = {
  id?: string;
  coordinates: [number, number][];
  color?: string;
  width?: number;
  opacity?: number;
  dashArray?: [number, number];
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  interactive?: boolean;
};
function MapRoute({ id: propId, coordinates, color = "#4285F4", width = 3, opacity = 0.8, dashArray, onClick, onMouseEnter, onMouseLeave, interactive = true }: MapRouteProps) {
  const { map, isLoaded } = useMap();
  const autoId = useId();
  const id = propId ?? autoId;
  const sourceId = `route-source-${id}`;
  const layerId = `route-layer-${id}`;
  useEffect(() => {
    if (!isLoaded || !map) return;
    map.addSource(sourceId, { type: "geojson", data: { type: "Feature", properties: {}, geometry: { type: "LineString", coordinates: [] } } });
    map.addLayer({ id: layerId, type: "line", source: sourceId, layout: { "line-join": "round", "line-cap": "round" }, paint: { "line-color": color, "line-width": width, "line-opacity": opacity, ...(dashArray && { "line-dasharray": dashArray }) } });
    return () => { try { if (map.getLayer(layerId)) map.removeLayer(layerId); if (map.getSource(sourceId)) map.removeSource(sourceId); } catch {} };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, map]);
  useEffect(() => {
    if (!isLoaded || !map || coordinates.length < 2) return;
    const source = map.getSource(sourceId) as MapLibreGL.GeoJSONSource;
    if (source) source.setData({ type: "Feature", properties: {}, geometry: { type: "LineString", coordinates } });
  }, [isLoaded, map, coordinates, sourceId]);
  return null;
}

type MapArcDatum = { id: string | number; from: [number, number]; to: [number, number] };
type MapArcEvent<T extends MapArcDatum = MapArcDatum> = { arc: T; longitude: number; latitude: number; originalEvent: MapLibreGL.MapMouseEvent };

export { Map, useMap, MapMarker, MarkerContent, MarkerPopup, MarkerTooltip, MarkerLabel, MapPopup, MapControls, MapRoute };
export type { MapRef, MapViewport, MapArcDatum, MapArcEvent };
