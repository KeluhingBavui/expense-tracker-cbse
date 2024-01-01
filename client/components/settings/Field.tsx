import React from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const Field = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="w-full max-w-sm">
      <Label className="text-md">{label}</Label>
      <Input value={value} type="text" />
    </div>
  );
};

export default Field;
