"use client";

import { useEffect, useState } from "react";
import { Checkbox } from "../InputFields";

function AdminCheckbox({ defaultChecked, id, ...props }) {
  const [value, setValue] = useState(defaultChecked);
  const [loading, setLoading] = useState(false);

  async function changePermission(newValue) {
    console.log(newValue);
    
    setLoading(true);
    const res = await fetch("/api/users", {
      method: "PUT",
      body: JSON.stringify({ id, admin: newValue }),
    });
    if (res.ok) setValue(newValue);
    setLoading(false);
  }

  return (
    <Checkbox
      defaultChecked={defaultChecked}
      disabled={loading}
      value={value}
      onChange={(e) => changePermission(e.target.checked)}
      {...props}
    />
  );
}

export default AdminCheckbox;
