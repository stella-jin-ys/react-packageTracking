import { useNavigate } from "react-router-dom";
import { ReactComponent as Ontheway } from "./images/ontheway.svg";
import { ReactComponent as Delivered } from "./images/delivered.svg";
import { ReactComponent as Ready } from "./images/ready.svg";
import { ReactComponent as Received } from "./images/received.svg";

type Props = {
  data: any;
};

export default function Card({ data }: Props) {
  const navigate = useNavigate();
  const onClick = () => {
    navigate(`/order/${data.parcel_id}`, { state: { packageData: data } });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "ready-for-pickup":
        return <Ready className="w-6 h-6 text-red-300" />;
      case "on-the-way":
        return <Ontheway className="w-6 h-6  text-red-300" />;
      case "delivered":
        return <Delivered className="w-6 h-6  text-red-300" />;
      case "order-info-received":
        return <Received className="w-6 h-6  text-red-300" />;
      default:
        return;
    }
  };

  return (
    <div
      onClick={onClick}
      className="flex flex-col gap-5 border rounded-lg min-w-60 h-full bg-white text-center  items-center cursor-pointer"
    >
      <div>
        <h2 className="font-semibold text-lg pt-5">{data.sender}</h2>
        <p>Parcel #{data.parcel_id}</p>
      </div>
      <div className="text-red-300">
        <div className="flex justify-center items-center">
          {getStatusIcon(data.status)}
        </div>
        <p>{data.status}</p>
      </div>
      <div className="bg-red-300 w-full text-white rounded-b-lg py-3 m-0">
        View detail
      </div>
    </div>
  );
}
