import React, { useState } from "react";

export function PlotForm({ handleAddPlot }) {
  const [level, setLevel] = useState(0);
  const [points, setPoints] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    handleAddPlot(level, points);
    setLevel("");
    setPoints("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Level:
        <input
          type="number"
          value={level}
          onChange={(event) => setLevel(event.target.value)}
        />
      </label>
      <label>
        Points:
        <input
          value={points}
          onChange={(event) => setPoints(event.target.value)}
          placeholder={
            "Введите координаты точек в формате [[50,55],[50,60],[60,60],[60,55]]"
          }
        />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
