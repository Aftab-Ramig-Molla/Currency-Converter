const dropdowns=document.querySelectorAll(".dropdown select");
const btn=document.querySelector("form button");
const msg=document.querySelector(".msg");


const populate = async (amtVal, fromCode, toCode) =>{
const BASE_URL = `https://api.currencyapi.com/v3/latest?apikey=cur_live_f6TfbOH4OTl5R8aYN7tHJp4mHViQLMX9X7UA4Rlz&base_currency=${fromCode}`;

try{

        let response=await fetch(BASE_URL);
        let rjson=await response.json();
        // Extract the exchange rate for the target currency
        let rate=rjson["data"][toCode]?.value;
        if(rate)
        {
            let convertedAmount = amtVal * rate;
           // console.log(`Converted Amount: ${convertedAmount} ${toCode}`);
            msg.innerText= `${amtVal}${fromCode}=${convertedAmount} ${toCode}`
            } else {
                msg.innerText= `Rate for ${toCode} not found.`;
                //console.log(`Rate for ${toCode} not found.`);
            }
    } catch (error) {
    console.error("Error fetching the currency data:", error);
  }
};



for(let select of dropdowns)
{
    for(let currCode in countryList)
    {
        // console.log(code, countryList[code]);
        //console.log(currCode);
        let newOption=document.createElement("option");
        newOption.innerText=currCode;
        newOption.value=currCode;
        if(select.name === "from" && currCode === "USD"){
            newOption.selected ="selected";
        }
        else if(select.name === "to" && currCode === "INR")
        {
            newOption.selected ="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
      updateFlag(evt.target);
    });
}

const updateExchangeRate = () =>{
let amount=document.querySelector(".amount input");
  let amtVal=amount.value;
  
  let getCurr1=document.querySelector(".from select");
     let fromCode=getCurr1.value;
  let getCurr2= document.querySelector(".to select");
   let toCode=getCurr2.value;

  
  if(amtVal === "" || amtVal<1)
  {
    amtVal=1;
    amount.value="1";
  }
populate(amtVal, fromCode, toCode);
};

const updateFlag = (element) =>{
    let currCode=element.value;
    let countryCode=countryList[currCode];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;  
};


btn.addEventListener("click",(evt)=>{
  evt.preventDefault();
  updateExchangeRate();
});

window.addEventListener("load", () =>{
updateExchangeRate();
});