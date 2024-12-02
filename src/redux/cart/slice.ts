import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SobremesaProps {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
  quantity?: number;
}

interface CartState {
  sobremesas: SobremesaProps[];
}

const initialState: CartState = {
  sobremesas: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addSobremesa: (state, action: PayloadAction<SobremesaProps>) => {
      console.log("Estado anterior:", state.sobremesas); // Debug
      console.log("Payload recebido:", action.payload); // Debug

      const sobremesaAlredyInCart = state.sobremesas.some(
        (sobremesa) => sobremesa.name === action.payload.name
      );
      if (sobremesaAlredyInCart) {
        state.sobremesas = state.sobremesas.map((sobremesa) => ({
          ...sobremesa,
          quantity: (sobremesa.quantity || 0) + 1,
        }));
        console.log("Estado atualizado:", state.sobremesas); // Debug

        return;
      }
      state.sobremesas = [
        ...state.sobremesas,
        { ...action.payload, quantity: 1 },
      ];
      console.log("Estado atualizado:", state.sobremesas); // Debug
    },
    decreaseQuantity: (state, action: PayloadAction<string>) => {
      state.sobremesas = state.sobremesas
        .map((sobremesa) =>
          sobremesa.name === action.payload
            ? { ...sobremesa, quantity: sobremesa.quantity! - 1 }
            : sobremesa
        )
        .filter((sobremesa) => sobremesa.quantity! > 0);
    },
    increaseQuantity: (state, action: PayloadAction<string>) => {
      state.sobremesas = state.sobremesas.map((sobremesa) =>
        sobremesa.name === action.payload
          ? { ...sobremesa, quantity: sobremesa.quantity! + 1 }
          : sobremesa
      );
    },
    removeSobremesa: (state, action: PayloadAction<string>) => {
      state.sobremesas = state.sobremesas.filter(
        (sobremesa) => sobremesa.name !== action.payload
      );
    },
    cleanCart: (state) => {
      state.sobremesas = [];
    },
  },
});

export const {
  addSobremesa,
  increaseQuantity,
  decreaseQuantity,
  removeSobremesa,
  cleanCart,
} = cartSlice.actions;

export default cartSlice.reducer;
