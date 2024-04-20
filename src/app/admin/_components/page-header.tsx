import React from "react";

const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return <h1 className="text-3xl mb-3">{children}</h1>;
};

export default PageHeader;
