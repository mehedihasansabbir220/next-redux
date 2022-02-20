export {}
interface Item{
    id:number,
    title:string,
    unitPrice:number,
    quantity:number,
    discount:boolean
};


interface DiscountCode{
    code:string,
    value:number,
    applied:string

};

const discountCode:Array<DiscountCode>=[
    {
        code:'NewYear2022',
        value:20,
        applied:'all'
    },
    {
        code:'summer2022',
        value:10,
        applied:'Mens-Plo T-shirt'
    },
    {
        code:'fullFree',
        value:100,
        applied:"Womens-Plo T-shirt"
    }

]
const item:Item={
    id:1,
    title:'Mens TShirt',
    unitPrice:35.99,
    quantity:1,
    discount:false
}

let storeItem:Array<Item>=[];

//Add to Product Card 
const addToCart=(item:Item):void=>{
    const product=storeItem.find((product)=>product.id==item.id);
    if(product){
        item.quantity++
        console.log(" item already exists",product);
    }
    else{
        storeItem.push(item);
        console.log("New Product add",storeItem.find((product)=>product.id==item.id));
    }
};
addToCart({
    id:1,
    title:'Womens T-shirt',
    unitPrice:39.99,
    quantity:1,
    discount:false
});
addToCart({
    id:2,
    title:'Mens T-shirt',
    unitPrice:35.99,
    quantity:1,
    discount:false
});
addToCart({
    id:3,
    title:'Mens-Plo T-shirt',
    unitPrice:20.99,
    quantity:1,
    discount:false
});
addToCart({
    id:4,
    title:'Womens-Plo T-shirt',
    unitPrice:39.99,
    quantity:1,
    discount:false
});
//Add an Item form card 

const increaseItem=(id:number):void=>{
    const increaseQuantity=storeItem.find((item)=>item.id==id)
    if(increaseQuantity){
        increaseQuantity.quantity++;
        console.log("Increse Quantity For this product ",increaseQuantity)
    }
};

increaseItem(1);
//An item remove from Card 

const removeACartItem=(id:number):void=>{
    const decreaseQuantity=storeItem.find((item)=>item.id==id)
    if(decreaseQuantity){
        if(decreaseQuantity.quantity>1){
            decreaseQuantity.quantity--;
        }
        console.log("Quainty decrease",decreaseQuantity)
    }
};
removeACartItem(1);

//DisCount Code 
const codeApply=(code:string):void=>{
    const discount=discountCode.find((item)=>item.code==code);
    if(discount){
        if(discount.applied='all'){
            const price=storeItem.reduce((total,item)=>total+item.unitPrice*item.quantity,0)
            console.log(discount.code,price);
            const newPrice=(price*discount.value)/100;
            console.log("New Price ",newPrice)
        }
        else{
            const item=storeItem[
                storeItem.findIndex((item)=>item.title==discount.applied)
            ]
            item.unitPrice=(item.unitPrice*discount.value)/100;
            console.log("New Price ",item.unitPrice)
            item.discount=true
        }
        
        // console.log(discount.code,)

    }
    else{
        console.log("Enter Worng Discount Code ")
    }
}
codeApply('summer2022');


//Get a total price of a single item 

const singlePrice=(item:Item):number=>{
    const totalPrice=item.unitPrice*item.quantity;
    return totalPrice;
}

console.log("Single Card Price ",singlePrice);


//Get Total Price

const totalPrice=(store:Array<Item>):number=>{
    const grandTotal=store.reduce((total,item)=>total + item.quantity*item.unitPrice,0);
    return grandTotal;
}

console.log("Grand Total ",totalPrice(storeItem));


//Show all Item In Cart 

const showAllItems=(cart:Array<Item>):void=>{
    const allItems=cart.filter((product)=>product.quantity>1)
    if(allItems){
        console.log("all Item ")
    }
    else{
        console.log("There are noew order in your card ")
    }
}


console.log("All Item Here ",showAllItems(storeItem));


