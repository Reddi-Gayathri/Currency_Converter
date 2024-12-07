const base_url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@2024-03-06/v1/currencies";
const dropdown=document.querySelectorAll(".drop-down select");
let btn=document.querySelector("form button");
let fromcur=document.querySelector(".from select");
let tocur=document.querySelector(".to select");
let msg=document.querySelector(".msg");
for(let code in countryList){
    //console.log(code,countryList[code]);
}
let i=0;
//adding options in the drop-down
for(let select of dropdown){
    for(curcode in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=curcode;
        newOption.value=curcode;
        if(select.name=="from" && curcode=="USD"){
            newOption.selected="selected";
        }
       else if(select.name=="to" && curcode=="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evnt)=>{
        updateFlag(evnt.target);
    });
}
//update flag
const updateFlag=(element)=>{
    let curcode=element.value;
    console.log(curcode); //based on the curr code we need to get the img
    let countrycode=countryList[curcode]; //countrycode
    let newSrcLink=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img"); //becoz select in in parent element.i.e is div
    img.src=newSrcLink;
    console.log(element);
};
//clicking exchange button
btn.addEventListener("click",async (evt)=>{
    evt.preventDefault(); //means page is not refresh
    let amt=document.querySelector(".amount input"); //access amt form input to exchange
    let amtVal=amt.value;
    if(amtVal=="" || amtVal<1){
        amtVal=1;
        amt.value="1";
    }
    console.log(amtVal);
    console.log(fromcur.value.toLowerCase());
    console.log(tocur.value.toLowerCase());
    const url=`${base_url}/${fromcur.value.toLowerCase()}.json`;
    let response=await fetch(url);
    let data=await response.json();
    let fromrate=data[fromcur.value.toLowerCase()];
    console.log(data);
    console.log(fromrate[tocur.value.toLowerCase()]);
    let rate=fromrate[tocur.value.toLowerCase()];
    let final_amt=amtVal*rate;
    console.log(final_amt);  //now we need to save the final amount in our msg
    msg.innerText=`${amtVal} ${fromcur.value} = ${final_amt} ${tocur.value}`;
});