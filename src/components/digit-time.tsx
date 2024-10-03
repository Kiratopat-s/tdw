import { useState } from "react";

const Time = () => {
  let time = new Date().toLocaleTimeString("Th-th");

  const [ctime, setTime] = useState(time);
  const UpdateTime = () => {
    time = new Date().toLocaleTimeString("Th-th");
    setTime(time);
  };
  setInterval(UpdateTime);
  return <h1 className="text-center text-6xl fron-bold ">{ctime}</h1>;
};
export default Time;
