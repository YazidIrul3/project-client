import React from "react";

const ItemSidebar = ({
  icon,
  name,
}: {
  icon: React.ReactNode;
  name: string;
}) => {
  return (
    <div className=" flex flex-row items-center gap-2">
      {icon}
      <h1 className=" text-[0.9em] capitalize">{name}</h1>
    </div>
  );
};

export default ItemSidebar;
