import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
const Read = () => {
  const { id } = useParams();
  const [paste, setPaste] = useState(null);
  const getPaste = async () => {
    try {
      const response = await axios.get(
        `https://pastebin-backend-bh30.onrender.com/api/v1/paste/${id}`
      );
      if (response.data.success) {
        setPaste(response.data.paste);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPaste();
  }, [id]);
  return (
    <>
      <div className="min-h-screen px-0 sm:px-4 md:px-40 ">
        <h1 className="text-center text-2xl font-semibold mt-6">
          Read only Paste
        </h1>
        <div className="h-56 max-h-screen md:border-2  flex flex-col items-center p-4 bg-white md:shadow-xl">
          <textarea
            value={paste?.paste || ""}
            readOnly
            className="w-full h-56 p-3 border rounded resize-none"
          />
        </div>
      </div>
    </>
  );
};

export default Read;
