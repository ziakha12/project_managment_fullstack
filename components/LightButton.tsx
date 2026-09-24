import React from 'react'

export default function LightButton({text, onClick, icon, className} : {
    text : string,
    onClick? : ()=> void,
    icon? : string,
    className? : string 
}) {
    return (
        <button onClick={onClick} className={`hidden items-center gap-1.5 rounded-xl border border-line bg-white px-4 py-2.5 text-[13px] font-semibold text-dark transition hover:border-[#8b3dff] lg:flex ${className}`}>
            <i className={`${icon ? icon : 'ri-sparkling-2-fill'}  gradient-text`} />
            {text}
        </button>
    )
}
