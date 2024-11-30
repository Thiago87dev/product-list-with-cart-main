import { RootState } from "../store";

export const selectProductCount = (state: RootState, sobremesaName: string) => {
  const sobremesa = state.cart.sobremesas.find(
    (item) => item.name === sobremesaName
  );

  return sobremesa?.quantity || 0;
};
