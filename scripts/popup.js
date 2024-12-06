function generatePopup(type, ref){
    if(type == 'driver'){
        driverPopup(ref);
    }
    else if(type == 'constructor'){
        constructorPopup(ref);
    } 
}

function driverPopup(ref){
    console.log(ref);
}

function constructorPopup(ref){
    console.log(ref);
}