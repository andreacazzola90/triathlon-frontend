import React from "react";

const Property = ({ data }: { data: any }) => {
  return (
    <div>
      {Object.entries(data).map(([key, value]: [key: any, value: any]) => (
        <div key={key}>
          <strong>{key}:</strong> {value}
        </div>
      ))}
    </div>
  );
};

export default Property;
