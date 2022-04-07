import React, { FC, useEffect, useState } from 'react';
import { Map as LeafletMap, latLngBounds } from 'leaflet';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { BsChevronRight } from 'react-icons/bs';
import { marker } from '../../../utils/mapMarkers';
import styles from './styles/SchoolsMap.module.css';
import 'leaflet/dist/leaflet.css';
import { useProjectConfig } from '../../../config/projectConfigContext';
import { SearchViewConfig } from '../../../config/types';
import { RailsApiSchool } from '../../../types';
import { mapBoxTileLayerProps, parseCoords } from '../../../utils/map';

interface SchoolsMapProps {
  results: RailsApiSchool[];
  onExpandToggle: () => void;
  isExpanded: boolean;
}

/* Warning! This is client-side only component. It needs to be imported using dynamic() */
const SchoolsMap: FC<SchoolsMapProps> = ({ results, onExpandToggle, isExpanded }) => {
  const [map, setMap] = useState<LeafletMap | null>(null);
  const { searchView: searchViewConfig } = useProjectConfig();
  const { mapOptions } = searchViewConfig as SearchViewConfig;

  useEffect(() => {
    setTimeout(() => {
      if (map) map.invalidateSize();
    }, 300);
  }, [isExpanded, map]);

  useEffect(() => {
    if (map && results.length > 0) {
      const lngLatExpressions = results.map((school) => parseCoords(school));
      map.fitBounds(latLngBounds(lngLatExpressions));
    }
  }, [results, map]);

  return (
    <div className={isExpanded ? styles.mapWrapperExpanded : styles.mapWrapper}>
      <MapContainer
        className={styles.map}
        zoomControl={false}
        whenCreated={setMap}
        fullscreenControl
        {...mapOptions}
      >
        <TileLayer {...mapBoxTileLayerProps} />
        {results.map(({ latitude, longitude, name, id }) => {
          if (!latitude || !longitude) return null;

          return (
            <Marker
              position={{
                lat: parseFloat(latitude),
                lng: parseFloat(longitude),
              }}
              icon={marker}
              key={id}
            >
              <Popup className={styles.markerPopup}>
                <h4>{name}</h4>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      <button className={styles.mapExpandButton} onClick={onExpandToggle} type="button">
        <BsChevronRight />
      </button>
    </div>
  );
};

export default SchoolsMap;
