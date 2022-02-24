export {}
interface Item{
    id:number,
    title:string,
    price:number,
    quantity:number,
    discount:string[]
};


interface DiscountCode{
    code:string,
    type: "cart" | "item",
    value:number,
    itemId?: number;

};
interface Cart{
    items:Item[],
    discount:string[]
}

export const discountCodes:Array<DiscountCode>=[
    {
        code:'NewYear2022',
        type:"cart",
        value:20,
    },
    {
        code:'summer2022',
        type:"cart",
        value:10,
    },
    {
        code:'winter2022',
        type:"item",
        value:25,
        itemId:2
        
    }

]
export const cart:Cart={
    items:[],
    discount:[]
}

//Add to Product Card 
export const addToCart=(item:Item):void=>{
    const isItem=cart.items.find((product)=>product.id===item.id)
    if(isItem){
        isItem.quantity++;
        // item.quantity++
    }else{
        cart.items.push(item)
        console.log("New Item Add" ,cart.items.find((product)=>product.id==item.id),)
    }
};
export const removeToCart=(id:number):void=>{
    const isItem=cart.items.find((product)=>product.id==id && product.quantity>=1)
    if(isItem.quantity>1){
        isItem.quantity--,
        console.log("One Item Remove ",isItem)

    }
    else if(isItem.quantity=1){
        cart.items=cart.items.filter((item)=>item.id!==isItem.id)
        // cart.items.filter((item)=>item.id !==isItem.id)
        console.log("No Item From this Cart")

    }
    else{
        console.log("No item form this Cart",id)
    }
}
export const addDiscountCode=(discountCode:string):void=>{
    //Find the Code 
    const checkCode=discountCodes.find((item)=>item.code==discountCode)
    if(checkCode){
        if(checkCode.type="cart"){
            //all Ready Use this Code Or not 
            const isApplied=cart.discount.includes(checkCode.code)
            if(!isApplied){
                cart.discount.push(checkCode.code)
            }
            else{
                console.log("This Code allready Exits in the Cart",isApplied)
                return
            }
        }
        else{
            const product=cart.items[cart.items.findIndex((item)=>item.id==checkCode.itemId)]
            //All ready Use or not
            const isApplid=product.discount.includes(checkCode.code)
            if(!isApplid){
                product.discount.push(checkCode.code)
                console.log("Descount Code is item",product)

            }else{
                console.log("All Ready Use this code before")
                return
            }

        }

    }
    else{
        console.log("There Is No Code Here ",discountCode)
    }

}
//Get Single Card Price 
export const singlePrice=(item:Item):number=>{
    const codeApplied = item.discount.length > 0;
  let totalPrice = 0;
  if (codeApplied) {
    // get code and then its value from discountCodes
    const codeValue = discountCodes.filter((code) =>
      item.discount.includes(code.code)
    );
    console.log(codeValue);
    const totalDiscount = codeValue.reduce(
      (total, item) => total + item.value,
      0
    );
    console.log(totalDiscount);
    totalPrice =(item.price * item.quantity) - ((item.price * item.quantity * totalDiscount) / 100);
  } else {
    totalPrice = item.quantity * item.price;
  }
  return totalPrice;
}
export const grandTotal=():number=>{
  // check if any item has discounted price 
  const haveDiscount = cart.items.filter(item => item.discount.length > 0);
  let totalDiscountedItemPrice : number = 0;
  if(haveDiscount){
    const discountedItemPrice : number[] = [];
    // get discounted price of these items 
    haveDiscount.forEach(item => {
     const price =  singlePrice(item);
     discountedItemPrice.push(price)
    })
    totalDiscountedItemPrice = discountedItemPrice.reduce((total, item) => total + item, 0)
  }
  const codeApplied = cart.discount.length > 0;
  let totalPrice = 0;
  if (codeApplied) {
    const codeValue = discountCodes.filter((code) =>
      cart.discount.includes(code.code)
    );
    const totalDiscount = codeValue.reduce(
      (total, item) => total + item.value,
      0
    );
    const cartPrice = cart.items.reduce((total, item) => {
      if(item.discount.length === 0){
        return total + item.quantity * item.price
      } else {
        return total
      }
    }, 0);
    const finalPrice = cartPrice + totalDiscountedItemPrice;

    totalPrice = finalPrice - (finalPrice * totalDiscount / 100);
  } else {
    const cartPrice = cart.items.reduce((total, item) => {
      if(item.discount.length === 0){
        return total + item.quantity * item.price
      } else {
        return total
      }
    }, 0);
    totalPrice = cartPrice + totalDiscountedItemPrice;
    
  }
  return totalPrice;
}
// show all cart items

export const getCartItems = (): Item[] => {
    return cart.items.filter((product) => product.quantity >= 1);
  };

// export{addToCart,removeToCart,addDiscountCode,getCartItems,grandTotal,singlePrice,cart,discountCodes}