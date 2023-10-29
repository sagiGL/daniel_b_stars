import React from "react";


export function moveInDirection(x: number, y: number, deg: number): { newX: number; newY: number } {
  // Convert degrees to radians
  const radian = (deg * Math.PI) / 180;

  // Calculate the change in x and y based on the degree
  const newX = x + Math.cos(radian) * 3;
  const newY = y + Math.sin(radian) * 3;

  return { newX, newY };
}