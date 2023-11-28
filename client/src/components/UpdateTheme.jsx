import { useEffect } from "react";

export default function UpdateTheme() {
    useEffect (()=>{
        const bgImage = localStorage.getItem("bgImage") || "linear-gradient(to bottom, rgba(2,0,36,1) 0%, #5543E6 100%)";
        const bodyColor = localStorage.getItem("bodyColor") || "white";
        const h2Color = localStorage.getItem("h2Color") || "#C1A2FF";
        const btnColor = localStorage.getItem("btnColor") || "#8C52FF";
        const headerImg = localStorage.getItem("headerImage") || "../src/assets/chitchatheader.png";

        const senderTxt = localStorage.getItem("senderTxtColor")|| "#7843E6";
        const senderBg = localStorage.getItem("senderBgColor") || "#C1A2FF";
        const receiverTxt= localStorage.getItem("receiverTxtColor") || "white";
        const receiverBg= localStorage.getItem("receiverBgColor")||"#8C52FF";
    
        document.body.style.backgroundImage = bgImage;
        document.body.style.color = bodyColor;
        Array.from(document.querySelectorAll('h2')).map(function(h2) {
            h2.style.color=h2Color;
        })
        Array.from(document.querySelectorAll('button')).map(function(button) {
            button.style.backgroundColor=btnColor;
        })
        
        try {
            document.getElementById('submitBtn').style.backgroundColor = btnColor
            console.log(document.getElementById('submitBtn').style);
        } catch (error) {
            
        }
        
        document.getElementsByTagName('img').src=headerImg;

        Array.from(document.getElementsByClassName('senderTxt')).map(function (senderTxtObj) {
            senderTxtObj.style.backgroundColor = senderBg;
            senderTxtObj.style.color = senderTxt;
            console.log(senderTxtObj);
        })

        Array.from(document.querySelectorAll('.receiverTxt')).map(function (receiverTxtObj) {
            receiverTxtObj.style.backgroundColor = receiverBg;
            receiverTxtObj.style.color = receiverTxt;
        })
      })
}