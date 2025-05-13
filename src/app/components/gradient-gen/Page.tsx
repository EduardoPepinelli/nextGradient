"use client";
import React, { useState, useEffect } from "react";

const GradientGenerator = () => {
  const [color1, setColor1] = useState("#ff0000");
  const [color2, setColor2] = useState("#0000ff");
  const [direction, setDirection] = useState<"to right" | "to bottom">("to right");
  const [gradient, setGradient] = useState(`linear-gradient(to right, #ff0000, #0000ff)`);

  const updateGradient = (newColor1 = color1, newColor2 = color2, dir = direction) => {
    const newGradient = `linear-gradient(${dir}, ${newColor1}, ${newColor2})`;
    setGradient(newGradient);
  };

  const handleColor1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setColor1(value);
    updateGradient(value, color2, direction);
  };

  const handleColor2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setColor2(value);
    updateGradient(color1, value, direction);
  };

  const handleDirectionChange = (newDirection: "to right" | "to bottom") => {
    setDirection(newDirection);
    updateGradient(color1, color2, newDirection);
  };

  useEffect(() => {
    document.body.style.background = gradient;

    return () => {
      document.body.style.background = "";
    };
  }, [gradient]);

  return (
    <div className="bg-gray-50 p-8 rounded-2xl">
      <h2 className="font-extralight text-2xl pb-4">nextGradient</h2>
      <div className="flex flex-row gap-6">
        <span className="flex items-center gap-1">
          <label htmlFor="color1">Color 1:</label>
          <input type="color" id="color1" value={color1} onChange={handleColor1Change} />
        </span>
        <span className="flex items-center gap-1">
          <label htmlFor="color2">Color 2:</label>
          <input type="color" id="color2" value={color2} onChange={handleColor2Change} />
        </span>
        <div className="flex flex-col gap-2">
          <span className="flex gap-1 items-center">
            <input
              type="checkbox"
              checked={direction === "to right"}
              onChange={() => handleDirectionChange("to right")}
            />
            <label>Horizontal</label>
          </span>
          <span className="flex gap-1 items-center">
            <input
              type="checkbox"
              checked={direction === "to bottom"}
              onChange={() => handleDirectionChange("to bottom")}
            />
            <label>Vertical</label>
          </span>
        </div>
      </div>

      <h3 className="mt-6">Preview</h3>
      <div
        style={{
          height: "100px",
          background: gradient,
          border: "1px solid #ccc",
          marginBottom: "1rem",
        }}
      />

      <h3>CSS Code</h3>
      <pre>
        <code>{gradient}</code>
      </pre>
    </div>
  );
};

export default GradientGenerator;
