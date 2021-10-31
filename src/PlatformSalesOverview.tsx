import React from 'react';
import { useParams  } from "react-router-dom";

const PlatformSalesOverview: React.FC= () =>  {
  const { platformName } = useParams<{platformName: string}>();

  return (
    <div>
      {platformName} sales overview
    </div>
  );
}

export default PlatformSalesOverview;
