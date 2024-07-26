import { Map, AdvancedMarker, Pin, InfoWindow } from "@vis.gl/react-google-maps";

const mapCenter = (latitude, longitude) => ({
    lat: parseFloat(latitude),
    lng: parseFloat(longitude),
});
const mapContainerStyle = {
    height: "100%",
    width: "100%",
};

const PoiMarkers = ({ pois, handleClick }) => {
    return (
        <>
            {pois.map((poi) => (
                <AdvancedMarker
                    key={poi.location_id}
                    position={mapCenter(poi.latitude, poi.longitude)}
                    clickable={true}
                    onClick={() => handleClick(poi)}
                >
                    <Pin background="#FBBC04" glyphColor="#000" borderColor="#000" />
                </AdvancedMarker>
            ))}
        </>
    );
};
const CompanyMap = ({ company, mapRef, locations, handleLocationClick, selectedLocation, setSelectedLocation }) => {
    return (
        <>
            <Map
                defaultZoom={13}
                defaultCenter={mapCenter(company.latitude, company.longitude)}
                mapId="compay_location_map"
                style={mapContainerStyle}
                onLoad={(map) => {
                    mapRef.current = map;
                }}
            >
                <PoiMarkers
                    pois={[company, ...locations]}
                    handleClick={handleLocationClick}
                />
                {selectedLocation && (
                    <InfoWindow
                        position={mapCenter(
                            selectedLocation.latitude,
                            selectedLocation.longitude
                        )}
                        onCloseClick={() => setSelectedLocation(null)}
                    >
                        <div className="info-window-content">
                            <h3>{selectedLocation.name}</h3>
                            <p>{selectedLocation.address}</p>
                            {selectedLocation.company_id && (
                                <p>Company ID: {selectedLocation.company_id}</p>
                            )}
                        </div>
                    </InfoWindow>
                )}
            </Map>
        </>
    );
}

export default CompanyMap;