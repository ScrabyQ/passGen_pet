
import { useState } from "react";


 export function ClipboardCopy (props){
    const [isCopied, setIsCopied] = useState(false)
    const content = props.content;

    async function textToClipboard (text) {
        if ('clipboard' in navigator) {
            return await navigator.clipboard.writeText(text);
        } else {
            return document.execCommand('copy', true, text);
        }
    }
    function clickHandle() {
        textToClipboard(content).then(() => {
            setIsCopied(true)
            setTimeout(() => {
                setIsCopied(false)
            }, 1500)
        })

    }
    return (
        <div className="pass-item mb-2" id={props._id}> {props.content}<div onClick={() => { clickHandle() }}>{isCopied ? "copied" : "copy"}</div> </div>
    )
}

