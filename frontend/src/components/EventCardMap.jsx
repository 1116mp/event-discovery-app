import { useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import { Icon } from 'leaflet'

/**
 * Mini map view for event card
 */
function EventCardMap({ event }) {
  if (!event.lat || !event.lon) return null;

  // Fix for default marker icon in react-leaflet
  useEffect(() => {
    delete Icon.Default.prototype._getIconUrl
    Icon.Default.mergeOptions({
      iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
    })
  }, [])

  return (
    <div className="w-full h-64 sm:h-80 rounded-lg overflow-hidden relative border border-gray-200 dark:border-gray-700 shadow-lg">
      <MapContainer
        center={[event.lat, event.lon]}
        zoom={13}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        scrollWheelZoom={false}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[event.lat, event.lon]}>
          <Popup>
            <div className="text-sm">
              <div className="font-semibold">{event.title}</div>
              <div className="text-gray-600">{event.location}</div>
              {event.distance && (
                <div className="text-xs text-indigo-600 mt-1">
                  {event.distance.toFixed(1)} km away
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      {event.distance && (
        <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-semibold text-indigo-600 dark:text-indigo-400 shadow-md z-[1000] border border-gray-200 dark:border-gray-700">
          {event.distance.toFixed(1)} km away
        </div>
      )}
    </div>
  );
}

export default EventCardMap;

