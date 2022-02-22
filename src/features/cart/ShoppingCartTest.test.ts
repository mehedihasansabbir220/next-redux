export {}
import{addDiscountCode, addToCart,cart, discountCodes, removeToCart} from './ShoppingCartTest'

describe('cart',()=>{
    describe(`addItem`,()=>{
        it('increments quantity given existing item',()=>{
            //given
            const item1={
                id: 1, 
                title: "Item 1",
                price: 5,
                quantity: 1,
                discount : []
            }
            cart.items.push(item1)
            //when
            addToCart(item1)
            //then
            expect(cart.items[0].quantity).toEqual(2)
        });
        it('add item to cart given non-existing item',()=>{
            //given
            const item2={
                id:2,
                title: "Item 2",
                price: 5,
                quantity: 1,
                discount : []
            }
            //when
            addToCart(item2)
            //then
            expect(cart.items).toContain(item2)
        })

    });
    describe('removeItem',()=>{
        it('decreaments quantity given item with more than 1 quantity',()=>{
            //given
            const id=1 
            //when
            removeToCart(id)
            //then
            expect(cart.items[0].quantity).toBe(1)  
        })
        it('removes item given item quantity only 1',()=>{
            //given
            const id=1;
            //when
            removeToCart(id)
            //then
            expect(cart.items).not.toContain({id:1})
        })
    });
    describe('discount',()=>{
        it('20% discount of given code NewYear2022',()=>{ 
            //given
            const code=discountCodes[0].code
            //when
            addDiscountCode(code)
            //then
            expect(cart.discount).toContain('NewYear2022')       
        })
        it('25% discount of given code winter2022',()=>{
            //given
            const item3={
                id:3,
                title: "Item 3",
                quantity: 1,
                price: 100,
                discount: []

            }
            cart.items.push(item3)
            const code=discountCodes[2].code
            //when
            addDiscountCode(code)
            //then
            expect(cart.discount[1]).toContain('winter2022')
        })
    })

})