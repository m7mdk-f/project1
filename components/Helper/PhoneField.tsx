"use client";
import React, { useState } from "react";

const countries = [
  { code: "+966", name: "السعودية" },
  { code: "+20", name: "مصر" },
  { code: "+971", name: "الإمارات" },
  { code: "+965", name: "الكويت" },
  { code: "+1", name: "أمريكا" },
  { code: "+970", name: "فلسطين" },
];

type Props = {
  phone: string;
  onPhoneChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCode: string;
  onCodeChange: (code: string) => void;
};

const PhoneField = ({
  phone,
  onPhoneChange,
  selectedCode,
  onCodeChange,
}: Props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCountries = countries.filter(
    (c) => c.name.includes(search) || c.code.includes(search)
  );

  return (
    <div className="relative">
      <label className="block text-sm text-gray-600 mb-2">رقم الجوال</label>
      <div className="flex flex-row-reverse bg-white text-gray-600 rounded-md">
        <div
          onClick={() => setShowDropdown(!showDropdown)}
          className="cursor-pointer border-r my-2 py-1 px-4"
        >
          {selectedCode}
        </div>
        <input
          type="tel"
          value={phone}
          onChange={onPhoneChange}
          placeholder="ادخل رقم الجوال"
          className="flex-1 px-4 outline-0 border-0 bg-transparent text-right"
        />
      </div>

      {showDropdown && (
        <div className="absolute z-50 bg-white border border-gray-300 mt-1 w-[28em] rounded-md max-h-60 overflow-y-auto shadow-md">
          <input
            type="text"
            placeholder="ابحث عن الدولة"
            className="w-full border-b outline-none text-sm focus:border p-2"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <ul>
            {filteredCountries.map((country) => (
              <li
                key={country.code}
                className="hover:bg-gray-100 cursor-pointer text-sm p-2"
                onClick={() => {
                  onCodeChange(country.code);
                  setShowDropdown(false);
                  setSearch("");
                }}
              >
                {country.name} ({country.code})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PhoneField;
