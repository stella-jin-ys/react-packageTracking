import React from "react";
import { ReactComponent as EngIcon } from "./images/eng.svg";

type Props = {};

export default function div({}: Props) {
  return (
    <div className="border-b-2 bg-red-500 flex justify-between items-center p-5 text-white">
      <div className="font-bold text-xl">ReactBox</div>
      <div className="flex gap-2">
        <p>en</p>

        <EngIcon className="w-6 h-6 rounded-full object-cover " />
      </div>
    </div>
  );
}
