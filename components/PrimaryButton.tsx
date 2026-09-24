import React from 'react'

export default function PrimaryButton({text, onClick, icon, className} : {
    text : string,
    onClick? : ()=> void,
    icon : string,
    className? : string 
}) {
  return (
    <button onClick={onClick} className={`gradient-bg flex items-center gap-1.5 rounded-xl px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_8px_18px_-8px_#5338d6] transition hover:brightness-110 ${className}`}>
          <i className={`${icon} text-base`} />
          <span className="hidden sm:inline">{text}</span>
        </button>
  )
}
