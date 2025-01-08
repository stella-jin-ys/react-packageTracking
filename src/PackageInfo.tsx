import Header from "./Header";
import { useLocation, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import * as L from "leaflet";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import DateFormat from "./DateFormat";

// Fix Leaflet's default icon paths
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

type Props = {};

export default function PackageInfo({}: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state?.packageData;
  const onClick = () => {
    navigate("/");
  };

  if (!data) {
    return <div>Loading package details...</div>;
  }

  const center: LatLngTuple = [
    data.location_coordinate_latitude,
    data.location_coordinate_longitude,
  ];

  return (
    <div>
      <Header />
      <div className="bg-red-500 h-screen flex flex-col items-center py-5">
        <div className="text-white mb-3 w-full max-w-screen-lg px-5 ">
          <h1 className="text-4xl font-bold">Order from {data.sender}</h1>
          <h2 className="text-2xl">This is the information available: </h2>
        </div>
        <div className="flex flex-col h-1/2 sm:flex-row w-full max-w-screen-lg px-5 gap-5  ">
          <div className="bg-white h-fit rounded-lg p-5 divide-y-2 divide-dashed divide-red-300 ">
            <div className="py-3">
              <h3 className="text-gray-500 italic">Location</h3>
              <h2 className="text-lg font-semibold">{data.location_name}</h2>
            </div>
            <div className="py-3">
              <h3 className="text-gray-500 italic">Estimated delivery time</h3>
              <h2 className="text-lg font-semibold">
                <DateFormat dateString={data.eta} />
              </h2>
            </div>
            <div className="py-3">
              <h3 className="text-gray-500 italic">Last update</h3>
              <h2 className="text-lg font-semibold">
                <DateFormat dateString={data.last_updated} />
              </h2>
            </div>
            {data.notes && (
              <div className="py-3">
                <h3 className="text-gray-500 italic">Note</h3>
                <h2 className="text-lg font-semibold">{data.notes}</h2>
              </div>
            )}
            {data.verification && (
              <div className="py-3">
                <h3 className="text-gray-500 italic">
                  Additional observations
                </h3>
                <h2 className="text-lg font-semibold">
                  A verification is required for this package
                </h2>
              </div>
            )}
          </div>
          <div className="w-2/3 ">
            <div className="w-full  h-full border rounded-full ">
              <MapContainer
                center={center}
                zoom={10}
                style={{
                  height: "100%",
                  width: "100%",
                }}
                attributionControl={true}
              >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={center}></Marker>
              </MapContainer>
            </div>
            <div className="justify-self-end mt-5">
              <button
                className="border-2 border-white rounded-full px-20 py-3 text-white text-lg font-semibold"
                onClick={onClick}
              >
                Go back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
