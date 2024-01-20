
let displayPassword=document.querySelector("[data-display]")
let inputSlider=document.querySelector("[data-length-slider]")
let lengthDisplay=document.querySelector("[data-length-number]")
let passwordDisplay=document.querySelector("[data-display]")
let copyBtn=document.querySelector("[dataCopy]")
let copyMsg=document.querySelector("[dataCopy-msg]")
let uppercaseCheck=document.querySelector("#uppercase")
let lowercaseCheck=document.querySelector("#lowercase")
let numberCheck=document.querySelector("#number")
let symbolCheck=document.querySelector("#symbol")
let allcheckBox=document.querySelectorAll("input[type=checkbox]")
let generatePasswordbtn=document.querySelector(".generate-password-button")
let strengthIndicator=document.querySelector("[strengthDisplay]")



let password=""
let passwordLength=10
lengthDisplay.textContent=passwordLength
let checkcount=1
uppercaseCheck.checked=true

let symbol="~`!@#$%^&*()<>?[]{}\|-=_+"

console.log("hi helllo")

function handleSlider(){
    inputSlider.value=passwordLength
    inputSlider.innerText=password
    lengthDisplay.textContent=passwordLength
    
}

function getRndInteger(min , max){
    return (Math.floor(Math.random()*(max-min)+min))
}


function generateUpperCase(){
    return String.fromCharCode(getRndInteger(65,90))
}

function generateLowerCase(){
    return String.fromCharCode(getRndInteger(97,122))
}

function generateNumber(){
    return  getRndInteger(0,9)
}

function generateSymbol(){

    let randNum=getRndInteger(0,symbol.length)
    return symbol.charAt(randNum)
}

async function copyClipBoard(){

    try{
        await navigator.clipboard.writeText(passwordDisplay.value)
        
        copyMsg.innerText="Copied"
        
    }
    catch(e){
        copyMsg.innerText="Failed"
    }


}
function checkCondition(){
    checkcount=0
    allcheckBox.forEach(checkbox=>{
        if(checkbox.checked)
            checkcount++
        
    })

}

function handleStrengthIndicator(){
    checkCondition()
    if(checkcount>=3 && passwordLength>=6)
        strengthIndicator.style.backgroundColor="#90EE90"
    else
        strengthIndicator.style.backgroundColor="red"

}

function shuffle(a){
    n = a.length;
    for(var i = n - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var tmp = a[i];
        a[i] = a[j];
        a[j] = tmp;
    }
    return a.join("");


}

allcheckBox.forEach(checkbox=>{
    checkbox.addEventListener('change',checkCondition)
})








inputSlider.addEventListener('input',(e)=>{
    passwordLength=e.target.value
    handleSlider()

})

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value) 
        copyClipBoard()
    
})

generatePasswordbtn.addEventListener('click',()=>{
    let arr=[]
    checkCondition()
    if(checkcount==0) return

    if(passwordLength<checkcount){
        passwordLength=checkcount
        handleSlider()
    }

    password=""
   

    if(uppercaseCheck.checked){
        password+=generateUpperCase()
        arr.push(generateUpperCase)
    }
     if(lowercaseCheck.checked){
        password+=generateLowerCase()
        arr.push(generateLowerCase)
    }
     if(numberCheck.checked){
        password+=generateNumber()
        arr.push(generateNumber)
    }
     if(symbolCheck.checked){
        password+=generateSymbol()
        arr.push(generateSymbol)
    }

    for(let i=0;i<passwordLength-arr.length;i++){
        let rndNum=getRndInteger(0,arr.length)
        password+=arr[rndNum]()
    }

    password=shuffle(Array.from(password))

    displayPassword.value=password
    handleStrengthIndicator()
   

    
    
    
})




