import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

function RiskMap() {
  const position = [28.6139, 77.2090]

  return (
    <div className="h-[500px] w-full overflow-hidden rounded-xl border border-slate-800">
      <MapContainer
        center={position}
        zoom={10}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <Marker position={position}>
          <Popup>
            <strong>PRANA Test Location</strong>
            <br />
            Risk assessment location
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  )
}

export default RiskMap