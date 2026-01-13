import { useState } from "react";
import ShowPassIcon from "../assets/interface-icons/eye.svg?react";
import HidePassIcon from "../assets/interface-icons/eye-crossed.svg?react";

export function FormInput({ formName, inputName, label, type, value, setValue, warningMessage, className, showWarning = false }) {
  return (
    <div className={`w-full flex flex-col ${className}`}>
      <label className="text-sm mb-0.5" htmlFor={`${formName}-${inputName}`}>{label}</label>
      <input type={type} id={`${formName}-${inputName}`} name={inputName} value={value} onChange={(e) => setValue(e.target.value)}
             className={`bg-white text-sm border border-gray-500 p-2 ${showWarning ? "rounded-t-md" : "rounded-md"}`} required/>
      { 
        warningMessage === undefined ? null :
        <div className={`bg-red-700 text-xs text-white text-center px-8 py-1 rounded-b-md ${showWarning ? "" : "h-0 scale-y-0"} transition-[height,scale]`}>
          {warningMessage}
        </div>
      }
    </div>
  );
}

export function PasswordInput({ formName, inputName, label, value, setValue, warningMessage, className, showWarning = false }) {
  const [show, setShow] = useState(false)

  return (
    <div className={`w-full flex flex-col ${className}`}>
      <label className="text-sm mb-0.5" htmlFor={`${formName}-${inputName}`}>{label}</label>
      <span className="relative">
        <input type={show ? "text" : "password"} id={`${formName}-${inputName}`} name={inputName} value={value} onChange={(e) => setValue(e.target.value)}
               className={`w-full bg-white text-sm border border-gray-500 p-2 ${showWarning ? "rounded-t-md" : "rounded-md"}`} required/>
        {
          show ?
            <HidePassIcon className="cursor-pointer absolute size-4.5 top-1/2 right-1 -translate-1/2" onClick={() => setShow(false)} /> : 
            <ShowPassIcon className="cursor-pointer absolute size-4.5 top-1/2 right-1 -translate-1/2" onClick={() => setShow(true)} />
        }
      </span>
      {
        warningMessage === undefined ? null :
        <div className={`bg-red-700 text-xs text-white text-center px-8 py-1 rounded-b-md ${showWarning ? "" : "h-0 scale-y-0"} transition-[height,scale]`}>
          {warningMessage}
        </div>
      }
    </div>
  );
}