import { useState } from "react";
import ShowPassIcon from "../assets/interface-icons/eye.svg?react";
import HidePassIcon from "../assets/interface-icons/eye-crossed.svg?react";

export function FormInput({ formName, inputName, label, type, className }) {
  return (
    <div className={`w-full flex flex-col gap-0.5 ${className}`}>
      <label className="text-sm" for={`${formName}-${inputName}`}>{label}</label>
      <input type={type} id={`${formName}-${inputName}`} name={inputName}
             className="bg-white text-sm border border-gray-500 p-2 rounded-md" required/>
    </div>
  );
}

export function PasswordInput({ formName, inputName, label, className }) {
  const [show, setShow] = useState(false)

  return (
    <div className={`w-full flex flex-col gap-0.5 ${className}`}>
      <label className="text-sm" for={`${formName}-${inputName}`}>{label}</label>
      <span className="relative">
        <input type={show ? "text" : "password"} id={`${formName}-${inputName}`} name={inputName}
               className="w-full bg-white text-sm border border-gray-500 p-2 rounded-md" required/>
        {
          show ?
            <HidePassIcon className="cursor-pointer absolute size-4.5 top-1/2 right-1 -translate-1/2" onClick={() => setShow(false)} /> : 
            <ShowPassIcon className="cursor-pointer absolute size-4.5 top-1/2 right-1 -translate-1/2" onClick={() => setShow(true)} />
        }
      </span>
    </div>
  );
}