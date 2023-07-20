import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Template1 from "./template1";

const TemplatePage = () => {
  const { uniqueId } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    // Fetch the template data from the backend using the uniqueId
    const fetchTemplateData = async () => {
      try {
        const response = await fetch(
          `http://localhost:7070/api/template/templateid/:${uniqueId}`
        );

        const datas = await response.json();
        setData(datas.data);
        // Set the template data in state

        console.log(data);
      } catch (error) {
        console.error("Error fetching template data:", error);
      }
    };

    fetchTemplateData();
  }, [uniqueId]);
  console.log(data);
  return (
    <div>
      {data ? (
        // Render the template with the updated data
        <Template1 data={data} />
      ) : (
        // Show a loading indicator while fetching the template data
        <div>Loading...</div>
      )}
    </div>
  );
};

export default TemplatePage;
