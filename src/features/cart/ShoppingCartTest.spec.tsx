import { addToCart,removeToCart,addDiscountCode,getCartItems,grandTotal,singlePrice,cart,discountCodes} from "./ShoppingCartTest";


test("addItem adds the item to the cart items given it doesn't exist",()=>{
    //Given
    // id:number,
    // title:string,
    // unitPrice:number,
    // quantity:number,
    // discount:string[]
    //Given 
    const item={
        id:2,
        title:'mans t-shit',
        unitPrice:20,
        quantity:1,
        discount:[]
    }
    cart.items.push(item)
    // when
    addToCart(item)
    //effect
    expect(cart.items).toContain(item)
});
test("addItem given an existing item increases its quantity",()=>{
    const item={
        id:2,
        title:'mans t-shit',
        unitPrice:20,
        quantity:1,
        discount:[]
    }
    // cart.items.push(item)
    //when
    addToCart(item)
    //effect
    expect(cart.items[0].quantity).toEqual(2)

});

test("removeItem given an existing item with quantity as one removes it from cart items",()=>{
    //Given 
    const id=2;
    //When 
    removeToCart(id)
    //Effect 
    expect(cart.items[0].quantity).toBe(1)

});
test("removeItem removes item given item quantity only 1",()=>{
    //Given
    const id=2

    //When
    removeToCart(id)
    //Effect
    expect(cart.items).not.toContain({id:2})
})
test("Check New Year Discount Code cart price 20%",()=>{

    //Given 
    const code=discountCodes[0].code

    //when
    addDiscountCode(code)

    //Effect 
    expect(cart.discount).toContain('NewYear2022')
});

test("Check Full Free Discount Code 100%",()=>{
    cart.items.push({
        id:3,
        title:'Womans t-shit',
        unitPrice:20,
        quantity:1,
        discount:[]

    })
    //Given
    const code=discountCodes[2].code
    //When
    addDiscountCode(code)
    //Effect 
    expect(cart.discount).toContain('fullFree')

});

// test('')