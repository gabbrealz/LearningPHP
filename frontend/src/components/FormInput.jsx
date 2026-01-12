export function FormInput({ formName, inputName, label, type, className }) {
  return (
    <div className={`w-full flex flex-col gap-0.5 ${className}`}>
      <label className="text-sm" for={`${formName}-${inputName}`}>{label}</label>
      <input type={type} id={`${formName}-${inputName}`} name={inputName}
             className="bg-white text-sm border border-gray-500 px-2 py-1 rounded-md" required/>
    </div>
  );
}

export function PasswordInput({ formName, inputName, label, className }) {
  return (
    <div className={`w-full flex flex-col gap-0.5 ${className}`}>
      <label className="text-sm" for={`${formName}-${inputName}`}>{label}</label>
      <span>
        <input type="password" id={`${formName}-${inputName}`} name={inputName}
               className="w-full bg-white text-sm border border-gray-500 px-2 py-1 rounded-md" required/>
      </span>
    </div>
  );
}