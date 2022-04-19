import * as storageService from '../../services/storage';

<<<<<<< HEAD
const cart = storageService.loadCart() ? storageService.loadCart() : [];
=======
const cart = storageService.loadCart() ? storageService.loadCart(): [];
>>>>>>> 1c66293... Random

//Selector
export const getBasketTotal = (state) =>
  state?.reduce((amount, item) => item.price * item.qty + amount, 0);
/* console.log(getBasketTotal(state)) */

const handleCart = (state = cart, action) => {
  const product = action.payload;
  let updatedCart = [];
  switch (action.type) {
    case "ADDITEM":
      //Check if product is already exist
      const exist = state.find((x) => x.id === product.id);
      if (exist) {
        //increase the quantitty
        updatedCart = state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        );
      } else {
        const product = action.payload;
        updatedCart = [
          ...state,
          {
            ...product,
            qty: 1,
          },
        ];
      }
      break;

    case "DELITEM":
      const exist1 = state.find((x) => x.id === product.id);
      if (exist1.qty === 1) {
        updatedCart = state.filter((x) => x.id !== exist1.id);
      } else {
        updatedCart = state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty - 1 } : x
        );
      }
      break;

    case "EMPTYCART":
      updatedCart = (state = []);
      break;

    default:
      return state;
      break;
  }

  storageService.storeCart(updatedCart);
  return updatedCart;
};

export default handleCart;
