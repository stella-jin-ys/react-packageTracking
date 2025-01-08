import React from "react";

type Props = {
  dateString: string;
};

export default function DateFormat({ dateString }: Props) {
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);

    // Get day, month, and time
    const day = date.getDate();
    const month = date.toLocaleString("en-US", { month: "long" });
    const hours = date.getHours();
    const minutes = date.getMinutes();

    // Format the day with the suffix (st, nd, rd, th)
    const dayWithSuffix = `${day}${getDaySuffix(day)}`;

    // Format the time (e.g., 23:55)
    const time = `${hours}:${minutes.toString().padStart(2, "0")}`;

    return `${month} ${dayWithSuffix}, ${time}`;
  };

  // Function to get the day suffix (st, nd, rd, th)
  const getDaySuffix = (day: number): string => {
    if (day >= 11 && day <= 13) {
      return "th";
    }
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  const formattedDate = formatDate(dateString);

  return <span>{formattedDate}</span>;
}
