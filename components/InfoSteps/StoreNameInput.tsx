import { validateStoreName } from "@/app/information/page";
import { useState } from "react";
import InputField from "../Helper/InputField";

export default function StoreNameInput() {
  const [storeName, setStoreName] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setStoreName(value);

    const validation = validateStoreName(value);
    if (!validation.valid) {
      setError(validation.error || null);
    } else {
      setError(null);
    }
  }

  return (
    <div>
      <InputField
        label="اسم المتجر"
        value={storeName}
        onChange={handleChange}
        placeholder="أدخل اسم متجرك"
      />
      {error ? <p className="text-red-600 mt-1">{error}</p> : <p className="text-gray-400 mt-1 text-sm">ادخل اسماً مميزاً وجذاباً للعملاء</p>}
    </div>
  );
}
