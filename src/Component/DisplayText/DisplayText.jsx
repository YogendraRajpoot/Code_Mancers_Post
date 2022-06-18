import React, { useEffect, useState } from "react";
import "../DisplayText/DisplayText.css"

export const DisplayText = () => {
  const [data, setData] = useState([]);
  const url = `https://backend-code-mancers.herokuapp.com/post`;

  const getData = () => {
    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        console.log("30", res);
        setData(res.reverse());
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    return () => {
      getData();
    };
  }, [getData]);

  return (
    <>
      <div className="Heading">All Post</div>
      <div className="Container">
        {data.map((d) => (
          <div className="Post">
            <img src={d.file} alt="" />
            <p>{d.text}</p>
          </div>
        ))}
      </div>
    </>
  );
};
