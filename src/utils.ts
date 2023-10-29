import React from "react";

export const randomizeLocation = () : {x: number, y:number} => {
  return {x: Math.floor(Math.random() * 100), y: Math.floor(Math.random() * 100)}
}