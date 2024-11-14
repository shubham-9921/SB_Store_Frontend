import { useEffect, useState } from "react";
import AdminSidebar from "../../../components/admin/AdminSidebar";

const formatTime = (timeinseconds: number) => {
  const hours = Math.floor(timeinseconds / 3600);
  const minutes = Math.floor((timeinseconds % 3600) / 60);
  const secound = timeinseconds % 60;

  const hoursInString = hours.toString().padStart(2, "0");
  const minutesInString = minutes.toString().padStart(2, "0");
  const secondsInString = secound.toString().padStart(2, "0");

  return `${hoursInString}:${minutesInString}:${secondsInString}`;
};

const Stopwatch = () => {
  const [time, setTime] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);

  const handleReset = () => {
    setTime(0);
    setIsRunning(false);
  };

  useEffect(() => {
    let interverId: number;

    if (isRunning) {
      interverId = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1);
    }

    return () => {
      clearInterval(interverId);
    };
  }, [isRunning]);
  return (
    <>
      {" "}
      <div className="adminContainer">
        <AdminSidebar />

        <main className="dashboardAppContainer">
          <h1>Stopwatch</h1>
          <section>
            <div className="stopwatch">
              <h2>{formatTime(time)}</h2>
              <button onClick={() => setIsRunning((prev) => !prev)}>
                {isRunning ? "Stop" : "Start"}
              </button>
              <button onClick={handleReset}>Reset</button>
            </div>
          </section>
        </main>
      </div>
    </>
  );
};

export default Stopwatch;
