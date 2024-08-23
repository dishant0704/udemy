import { CategoryItem } from "../categories/category.types";

export enum CART_ACTION_TYPES{
  SET_IS_CART_OPEN = 'cart/_IS_CART_OPEN',
  SET_CART_ITEMS = 'cart/SEART_ITEMS',
  SET_CART_COUNT = 'cart/SEART_COUNT',
  SET_CART_TOTAL = 'cart/SET_CART_TOTAL',
};

export type CartItem = CategoryItem & {
  quantity: number;
}
