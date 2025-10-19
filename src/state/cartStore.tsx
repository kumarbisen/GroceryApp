import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { mmkvStorage } from "./storage";

interface CartItem{
    _id:string | number;
    item:any;
    count:number
}

interface CartStore{
    cart: CartItem[];
    addItem:(item:any)=> void;
    removeItem:(id:string | number)=> void;
    clearCart:()=> void;
    getItemCount:(id:string | number)=> number;
    getTotalPrice:()=> number;

}

export const useCartStore = create<CartStore>()(
    persist(
        (set,get)=>({
            
            cart:[],
            addItem:(item)=>{
                const currentCart = Array.isArray(get().cart) ? get().cart : [];
                if (!item || typeof item._id === 'undefined') return;
                const existingItemIndex = currentCart.findIndex(cartItem => cartItem && cartItem._id === item._id);
                // WHEN ITEM EXIST
                if(existingItemIndex>=0){
                    const updatedCart = [...currentCart];
                    updatedCart[existingItemIndex]={
                        ...updatedCart[existingItemIndex],
                        count:updatedCart[existingItemIndex].count+1
                    };
                    set({cart:updatedCart});
                }else{
                    set({
                        cart:[...currentCart,{_id:item._id, item:item , count:1}]
                    });
                }
            },
            clearCart:()=> set({cart:[]}),
            removeItem:(id)=>{
                const currentCart = Array.isArray(get().cart) ? get().cart : [];
                const existingItemIndex = currentCart.findIndex(cartItem => cartItem && cartItem._id === id);

                if(existingItemIndex>=0){
                    const updatedCart = [...currentCart];
                    const existingItem = updatedCart[existingItemIndex];

                    if(existingItem && existingItem.count >1){
                        updatedCart[existingItemIndex]={
                            ...existingItem,
                            count:existingItem.count -1
                        };
                    }else{
                        updatedCart.splice(existingItemIndex,1);
                    }
                    set({cart: updatedCart});
                }
            },
            getItemCount:id=>{
                const cart = Array.isArray(get().cart) ? get().cart : [];
                if (!cart.length) return 0;
                for (let i = 0; i < cart.length; i++) {
                  if (cart[i] && cart[i]._id === id && typeof cart[i].count === 'number') return cart[i].count;
                }
                return 0;
            },
            getTotalPrice:()=>{
                const cart = Array.isArray(get().cart) ? get().cart : [];
                let total = 0;
                for (let i = 0; i < cart.length; i++) {
                  if (cart[i] && cart[i].item && typeof cart[i].item.price === 'number' && typeof cart[i].count === 'number') {
                    total += cart[i].item.price * cart[i].count;
                  }
                }
                return total;
            }
        }),
        {
            name:'cart-storage',
            storage:createJSONStorage(()=> mmkvStorage)
        }
    )
)