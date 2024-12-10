import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import { IFoodItem } from "@/model/foodModel";

interface CartItems {
  [key: string]: number;
}

interface FoodStore {
  foodList: IFoodItem[];
  cartItems: CartItems;
  isInitialized: boolean;
  isLoading: boolean;
  lastFetchTimestamp: number;

  // Actions
  setFoodList: (foods: IFoodItem[]) => void;
  fetchFoodList: () => Promise<void>;
  fetchCartFromDatabase: () => Promise<boolean>;
  initializeCartFromStorage: () => void;
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  removeItemCompletely: (itemId: string) => void;
  clearCart: () => void;
  clearCartOnLogout: () => void;
  syncCartToDatabase: () => Promise<void>;
  mergeCartsOnLogin: () => Promise<CartItems | null>;
  getTotalCartAmount: () => number;
}

const FOOD_LIST_STORAGE_KEY = 'food-list-cache';
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour in milliseconds
const CART_STORAGE_KEY = "food-cart-items";

const useFoodStore = create<FoodStore>()(
  persist(
    (set, get) => ({
      foodList: [],
      cartItems: {},
      isInitialized: false,
      isLoading: false,
      lastFetchTimestamp: 0,

      setFoodList: (foods) => {
        const timestamp = Date.now();
        localStorage.setItem(FOOD_LIST_STORAGE_KEY, JSON.stringify({
          data: foods,
          timestamp
        }));
        set({ 
          foodList: foods,
          lastFetchTimestamp: timestamp 
        });
      },

      fetchFoodList: async () => {
        set({ isLoading: true });
        
        try {
          // Check localStorage first
          const cachedData = localStorage.getItem(FOOD_LIST_STORAGE_KEY);
          if (cachedData) {
            const { data: cachedFoodList, timestamp } = JSON.parse(cachedData);
            const isExpired = Date.now() - timestamp > CACHE_DURATION;
            
            if (!isExpired) {
              set({ 
                foodList: cachedFoodList,
                isInitialized: true,
                lastFetchTimestamp: timestamp,
                isLoading: false
              });
              return;
            }
          }

          // Fetch fresh data from API
          const response = await axios.get("api/list-food");
          
          if (response.data.success) {
            const timestamp = Date.now();
            
            // Store in localStorage with timestamp
            localStorage.setItem(FOOD_LIST_STORAGE_KEY, JSON.stringify({
              data: response.data.data,
              timestamp
            }));

            set({
              foodList: response.data.data,
              isInitialized: true,
              lastFetchTimestamp: timestamp
            });
          }
        } catch (error) {
          console.error("Error fetching food list", error);
          
          // If API fails, try to use cached data as fallback
          const cachedData = localStorage.getItem(FOOD_LIST_STORAGE_KEY);
          if (cachedData) {
            const { data: cachedFoodList, timestamp } = JSON.parse(cachedData);
            set({ 
              foodList: cachedFoodList,
              isInitialized: true,
              lastFetchTimestamp: timestamp
            });
          }
        } finally {
          set({ isLoading: false });
        }
      },

      initializeCartFromStorage: () => {
        const storedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (storedCart) {
          try {
            const parsedCart = JSON.parse(storedCart);
            set({ cartItems: parsedCart });
          } catch (error) {
            console.error("Error parsing stored cart:", error);
          }
        }
      },

      syncCartToDatabase: async () => {
        const { cartItems } = get();
        try {
          const response = await axios.post("/api/cart", {
            cartData: cartItems,
          });

          if (!response.data.success) {
            console.error("Failed to sync cart to database");
          }
        } catch (error) {
          // If API call fails (user not logged in), cart is already saved in localStorage
          console.log("Cart saved in localStorage only");
        }
      },

      fetchCartFromDatabase: async () => {
        set({ isLoading: true });
        try {
          const response = await axios.get("/api/cart");

          if (response.data.success && response.data.cartData) {
            const mergedCart = await get().mergeCartsOnLogin();
            set({ cartItems: mergedCart || response.data.cartData });
            localStorage.setItem(
              CART_STORAGE_KEY,
              JSON.stringify(mergedCart || response.data.cartData)
            );
            return true;
          }
          return false;
        } catch (error) {
          console.error("Error fetching cart from database", error);
          return false;
        } finally {
          set({ isLoading: false });
        }
      },

      mergeCartsOnLogin: async () => {
        const localCart = JSON.parse(
          localStorage.getItem(CART_STORAGE_KEY) || "{}"
        );
        try {
          const response = await axios.get("/api/cart");
          if (response.data.success && response.data.cartData) {
            const dbCart = response.data.cartData;
            const mergedCart: CartItems = { ...dbCart };

            // Only add local cart items that don't exist in the database cart
            Object.entries(localCart).forEach(([itemId, quantity]) => {
              if (!mergedCart[itemId]) {
                mergedCart[itemId] = Number(quantity);
              }
            });

            await axios.post("/api/cart", { cartData: mergedCart });
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(mergedCart));
            return mergedCart;
          }
          return null;
        } catch (error) {
          console.error("Error merging carts", error);
          return null;
        }
      },

      addToCart: (itemId) => {
        set((state) => {
          const newCartItems = {
            ...state.cartItems,
            [itemId]: (state.cartItems[itemId] || 0) + 1,
          };
          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCartItems));
          return { cartItems: newCartItems };
        });
        get().syncCartToDatabase();
      },

      removeFromCart: (itemId) => {
        set((state) => {
          const currentQuantity = state.cartItems[itemId];
          let newCartItems;

          if (currentQuantity <= 1) {
            const { [itemId]: removedItem, ...remainingItems } =
              state.cartItems;
            newCartItems = remainingItems;
          } else {
            newCartItems = {
              ...state.cartItems,
              [itemId]: currentQuantity - 1,
            };
          }

          localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(newCartItems));
          return { cartItems: newCartItems };
        });
        get().syncCartToDatabase();
      },

      removeItemCompletely: (itemId) => {
        set((state) => {
          const { [itemId]: removedItem, ...remainingItems } = state.cartItems;
          localStorage.setItem(
            CART_STORAGE_KEY,
            JSON.stringify(remainingItems)
          );
          return { cartItems: remainingItems };
        });
        get().syncCartToDatabase();
      },

      clearCart: () => {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify({}));
        set({ cartItems: {} });
        get().syncCartToDatabase();
      },

      clearCartOnLogout: () => {
        // Clear local storage
        localStorage.removeItem(CART_STORAGE_KEY);

        // Clear cart state
        set({ cartItems: {} });

        // No database sync
      },

      getTotalCartAmount: () => {
        const { cartItems, foodList } = get();
        let totalAmount = 0;
        for (const itemId in cartItems) {
          if (cartItems[itemId] > 0) {
            const itemInfo = foodList.find((product) => product._id === itemId);
            if (itemInfo) {
              totalAmount += itemInfo.price * cartItems[itemId];
            }
          }
        }
        return totalAmount;
      },
    }),
    {
      name: "food-store",
      partialize: (state) => ({
        foodList: state.foodList,
        isInitialized: state.isInitialized,
      }),
    }
  )
);

export default useFoodStore;

// import { create } from "zustand";
// import { persist } from "zustand/middleware";
// import axios from "axios";
// import { IFoodItem } from "@/model/foodModel";

// interface CartItems {
//   [key: string]: number;
// }

// interface FoodStore {
//   foodList: IFoodItem[];
//   cartItems: CartItems;
//   isInitialized: boolean;

//   // Actions
//   setFoodList: (foods: IFoodItem[]) => void;
//   addToCart: (itemId: string) => void;
//   removeFromCart: (itemId: string) => void;
//   removeItemCompletely: (itemId: string) => void;
//   clearCart: () => void;
//   getTotalCartAmount: () => number;
//   fetchFoodList: () => Promise<void>;
//   fetchCartFromDatabase: () => Promise<boolean>;
//   syncCartToDatabase: () => Promise<void>;
//   isLoading: boolean;
// }

// const useFoodStore = create<FoodStore>()(
//   persist(
//     (set, get) => ({
//       // Initial state
//       foodList: [],
//       cartItems: {},
//       isInitialized: false,
//       isLoading: false,

//       // Actions
//       setFoodList: (foods) => set({ foodList: foods }),

//       fetchCartFromDatabase: async () => {
//         set({ isLoading: true });
//         try {
//           const response = await axios.get("/api/cart");

//           if (response.data.success && response.data.cartData) {
//             // Update local cart items with data from the database
//             console.log(
//               "this is to check the cart type in store, ",
//               typeof response.data.cartData,
//               response.data.cartData
//             );

//             set({
//               cartItems: response.data.cartData,
//             });
//             return true;
//           }

//           return false;
//         } catch (error) {
//           console.error("Error fetching cart from database", error);
//           return false;
//         } finally {
//           set({ isLoading: false });
//         }
//       },

//       syncCartToDatabase: async () => {
//         const { cartItems } = get();

//         try {
//           const response = await axios.post("/api/cart", {
//             cartData: cartItems,
//           });

//           if (!response.data.success) {
//             console.error("Failed to sync cart to database");
//           }
//         } catch (error) {
//           console.error("Error syncing cart to database", error);
//         }
//       },

//       addToCart: async (itemId) => {
//         set((state) => ({
//           cartItems: {
//             ...state.cartItems,
//             [itemId]: (state.cartItems[itemId] || 0) + 1,
//           },
//         }));
//         get().syncCartToDatabase();
//       },

//       removeFromCart: async (itemId) => {
//         set((state) => {
//           const currentQuantity = state.cartItems[itemId];

//           if (currentQuantity <= 1) {
//             // Remove the item completely if quantity would become 0
//             const { [itemId]: removedItem, ...remainingItems } =
//               state.cartItems;
//             return { cartItems: remainingItems };
//           }

//           return {
//             cartItems: {
//               ...state.cartItems,
//               [itemId]: currentQuantity - 1,
//             },
//           };
//         });
//         get().syncCartToDatabase();
//       },

//       removeItemCompletely: (itemId) => {
//         set((state) => {
//           // Create a new cart items object without the specified item
//           const { [itemId]: removedItem, ...remainingItems } = state.cartItems;
//           return { cartItems: remainingItems };
//         });
//         get().syncCartToDatabase();
//       },

//       clearCart: () => {
//         set({ cartItems: {} });
//         get().syncCartToDatabase();
//       },

//       getTotalCartAmount: () => {
//         const { cartItems, foodList } = get();
//         let totalAmount = 0;

//         for (const itemId in cartItems) {
//           if (cartItems[itemId] > 0) {
//             const itemInfo = foodList.find((product) => product._id === itemId);
//             if (itemInfo) {
//               totalAmount += itemInfo.price * cartItems[itemId];
//             }
//           }
//         }
//         return totalAmount;
//       },

//       fetchFoodList: async () => {
//         // Check if data is already loaded
//         if (get().isInitialized) {
//           return; // Skip fetching if already initialized
//         }

//         set({ isLoading: true });
//         try {
//           const response = await axios.get("api/list-food");

//           if (response.data.success) {
//             set({
//               foodList: response.data.data,
//               isInitialized: true, // Mark as initialized after successful fetch
//             });
//           }
//         } catch (error) {
//           console.error("Error fetching food list", error);
//         } finally {
//           set({ isLoading: false });
//         }
//       },
//     }),
//     {
//       name: "food-store", // name of the item in localStorage
//       partialize: (state) => ({
//         foodList: state.foodList,
//         isInitialized: state.isInitialized,
//       }), // only persist these fields
//     }
//   )
// );

// export default useFoodStore;
