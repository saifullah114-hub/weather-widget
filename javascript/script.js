
const changeBackground=()=>{
const currentDate=new Date();
let hour=currentDate.getHours();
console.log(hour);
    if(8<=hour&&hour<16){
        document.body.className="day"
    }
    else if(16<=hour&&hour<20){
        document.body.className="dawn"
    }else if(20<=hour&&hour<5){
        document.body.className="night"
    }else{
        document.body.className="dusk"
    }
}
changeBackground();
