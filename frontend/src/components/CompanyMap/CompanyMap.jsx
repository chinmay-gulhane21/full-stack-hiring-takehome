import React, { useRef } from "react";
import {
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

const mapCenter = (latitude, longitude) => ({
  lat: parseFloat(latitude),
  lng: parseFloat(longitude),
});
const mapContainerStyle = {
  height: "100%",
  width: "100%",
};

const PoiMarkers = ({ pois, handleClick, selectedLocation }) => {
  const markerRefs = useRef({});

  return (
    <>
      {pois.map((poi, index) => (
        <div key={index}>
          <AdvancedMarker
            key={poi.location_id}
            position={mapCenter(poi.latitude, poi.longitude)}
            clickable={true}
            onClick={() => handleClick(poi)}
            ref={(ref) => (markerRefs.current[poi.location_id] = ref)}
          >
            <Pin
              key={`pin-${poi.location_id}`}
              background="#FBBC04"
              glyphColor="#000"
              borderColor="#000"
            />
            {selectedLocation &&
              selectedLocation.location_id === poi.location_id && (
                <InfoWindow
                  key={`infowindow-${poi.location_id}`}
                  anchor={markerRefs.current[poi.location_id]}
                  onCloseClick={() => handleClick(null)}
                >
                  <div className="info-window-content">
                    <h3>{poi.name}</h3>
                    <p>{poi.address}</p>
                  </div>
                </InfoWindow>
              )}
          </AdvancedMarker>
        </div>
      ))}
    </>
  );
};

const CompanyMap = ({
  company,
  mapRef,
  locations,
  handleLocationClick,
  selectedLocation,
  setSelectedLocation,
}) => {
  return (
    <>
      <Map
        defaultZoom={13}
        defaultCenter={mapCenter(company.latitude, company.longitude)}
        mapId="company_location_map"
        style={mapContainerStyle}
        onLoad={(map) => {
          mapRef.current = map;
        }}
      >
        <PoiMarkers
          pois={[company, ...locations]}
          handleClick={handleLocationClick}
          selectedLocation={selectedLocation}
        />
      </Map>
    </>
  );
};

export default CompanyMap;
