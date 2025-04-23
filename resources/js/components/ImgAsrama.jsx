import React from "react";
import Asrama from "../assets/Asrama.png";

const ImgAsrama = () => {
  return (
    <div className="flex h-screen shadow-2xl">
      <img src={Asrama} alt="Image" className="w-160 rounded-r-2xl" />
    </div>
  );
};

export default ImgAsrama;