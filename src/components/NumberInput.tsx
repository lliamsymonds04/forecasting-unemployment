import React from "react";

function NumbersInput({inputName, value, setValue}: {inputName: string, value: string, setValue: React.Dispatch<React.SetStateAction<string>>}) {
    return (
        <div className="flex flex-row justify-center items-center gap-2">
            <p className="text-[#EEEEEE] w-fit">{inputName}</p>
            <input
                className="w-10 text-[#76ABAE] bg-[#222831] rounded-md p-1 text-center font-bold font-sans"
                type="text"
                onChange={(e) => {setValue(e.target.value)}}

                onBlur={(e) => {
                    const num = parseFloat(e.target.value);
                    if (isNaN(num)) {
                        setValue("");
                    } else {
                        setValue(num.toString());
                    }
                }}
                value={value}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        e.currentTarget.blur();
                    }
                }}
                placeholder="%"
            />
            <p className="text-[#EEEEEE] w-fit">%</p>

        </div>
    )
}


export default NumbersInput;