import { useParams } from "react-router-dom";
import Card from "./Card";
import Header from "./Header";
import { useEffect, useState } from "react";

export default function Home() {
  const { id } = useParams<{ id: string }>();
  const [packageDetails, setPackageDetails] = useState<any[]>([]);
  useEffect(() => {
    fetch("https://my.api.mockaroo.com/orders.json?key=e49e6840")
      .then((res) => res.json())
      .then((data) => setPackageDetails(data))

      .catch((err) => console.error("Error fetching data", err));
  }, [id]);
  console.log(packageDetails);

  return (
    <div>
      <Header />
      <div className="bg-red-500 h-screen p-5">
        {packageDetails.length > 0 ? (
          <div className="text-white mb-3 w-full max-w-screen-xl mx-auto">
            <h1 className="text-4xl font-bold">
              Hello {packageDetails[0].user_name}
            </h1>
            <h2 className="text-2xl">We have these parcels for you:</h2>
          </div>
        ) : (
          <div className="text-white mb-3 w-full max-w-screen-md">
            <h1 className="text-4xl font-bold">Loading...</h1>
          </div>
        )}

        <div className="grid grid-cols-1 sm-grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 max-w-screen-xl mx-auto">
          {packageDetails?.map((data: any) => (
            <Card key={data.id} data={data} />
          ))}
        </div>
      </div>
    </div>
  );
}
