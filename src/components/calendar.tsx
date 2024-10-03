import React, { useState } from "react";
import { Calendar } from "./ui/calendar";

function Component() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <Calendar
      mode="single"
      selected={date}
      onSelect={setDate}
      className="rounded-md border shadow"
    />
  );
}

export default Component;
