const CelButton = document.getElementById("CelButton");
const FarButton = document.getElementById("FarButton");
const Shadow = document.getElementById("Shadow");
const CelButton2 = document.getElementById("CelButton2");
const FarButton2 = document.getElementById("FarButton2");
const container2 = document.getElementById("container2");



function BiggerSize(Button){
    Button.style.transform = 'scale(1.1)';
    
}

function SmallerSize(Button){
    Button.style.transform = 'scale(1.0)';
}

let HasCopy = false

function OnClicked(){
    if (!HasCopy) {
        const container = document.getElementById("container")
        const container2 = document.getElementById("container2")
        const copyBtn = document.getElementById("Shadow")
        copyBtn.textContent = "Copied!"
        container2.style.visibility = 'visible';
        container2.style.marginLeft = "800px";
        container.style.marginLeft = "100px";
        container2.style.opacity = '1';
        HasCopy = true
    } else if(HasCopy){
            const container = document.getElementById("container")
            const container2 = document.getElementById("container2")
            const copyBtn = document.getElementById("Shadow")
            copyBtn.textContent = "Copy"
            container2.style.opacity = '0';
            container2.style.marginLeft = "900px";
            container.style.marginLeft = "450px";
            HasCopy = false
    }
}


function BiggerSize(Button) {
  Button.style.transform = 'scale(1.1)';
}


function SmallerSize(Button) {
  Button.style.transform = 'scale(1.0)';
}


function ConvertC() {
    const fahrenheitToCelsius = f => (f - 32) * 5 / 9;

    const UitslagBox = document.getElementById("UitslagBox");
    const ResultBox = document.getElementById("ResultBox");
    const typeConverter = document.getElementById("TypeConvert");

    let value = UitslagBox.value.trim();

    if (value !== "") {
        let NumVal = parseFloat(value); 
        if (typeConverter.textContent == "°C"){
            ResultBox.value = NumVal + " °C"
        }else if(typeConverter.textContent == "°F"){
            ResultBox.value = fahrenheitToCelsius(NumVal).toFixed(2)+" °C"; 
        }
        
    } else {
        alert('Please fill in something');
    }
}


function ConvertF() {
    const celsiusToFahrenheit = c => (c * 9 / 5) + 32;

    const UitslagBox = document.getElementById("UitslagBox");
    const ResultBox = document.getElementById("ResultBox");
    const typeConverter = document.getElementById("TypeConvert");

    let value = UitslagBox.value.trim();

    if (value !== "") {
        let NumVal = parseFloat(value);
        if (typeConverter.textContent == "°F"){
            ResultBox.value = NumVal + " °F"
        }else if(typeConverter.textContent == "°C"){
            ResultBox.value = celsiusToFahrenheit(NumVal).toFixed(2)+" °F"; 
        }
        
    } else {
        alert('Please fill in something');
    }
}



function ConvertC2() {
    const fahrenheitToCelsius = f => (f - 32) * 5 / 9;

    const UitslagBox = document.getElementById("UitslagBox2");
    const ResultBox = document.getElementById("ResultBox2");
    const typeConverter = document.getElementById("TypeConvert2");

    let value = UitslagBox.value.trim();

    if (value !== "") {
        let NumVal = parseFloat(value); 
        if (typeConverter.textContent == "°C"){
            ResultBox.value = NumVal + " °C"
        }else if(typeConverter.textContent == "°F"){
            ResultBox.value = fahrenheitToCelsius(NumVal).toFixed(2)+" °C"; 
        }
        
    } else {
        alert('Please fill in something');
    }
}

function ConvertF2() {
    const celsiusToFahrenheit = c => (c * 9 / 5) + 32;

    const UitslagBox = document.getElementById("UitslagBox2");
    const ResultBox = document.getElementById("ResultBox2");
    const typeConverter = document.getElementById("TypeConvert2");

    let value = UitslagBox.value.trim();

    if (value !== "") {
        let NumVal = parseFloat(value);
        if (typeConverter.textContent == "°F"){
            ResultBox.value = NumVal + " °F"
        }else if(typeConverter.textContent == "°C"){
            ResultBox.value = celsiusToFahrenheit(NumVal).toFixed(2)+" °F"; 
        }
        
    } else {
        alert('Please fill in something');
    }
}

function ChangeConvert(BTN){
    const B = document.getElementById(BTN)
    if (BTN.textContent == "°C"){
        BTN.textContent = "°F"
    }else if(BTN.textContent == "°F"){
        BTN.textContent = "°C"
    }
}



