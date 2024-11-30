"use client";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { removeSobremesa } from "@/redux/cart/slice";

const Cart = () => {
  const dispatch = useDispatch();

  const sobremesas = useSelector((state: RootState) => state.cart.sobremesas);

  const handleRemoveSobremesa = (sobremesa: string) => {
    dispatch(removeSobremesa(sobremesa));
  };

  return (
    <div>
      {sobremesas.length === 0 ? (
        <div className="flex items-center justify-center w-[320px] h-[250px] bg-gray-500 m-5 rounded-lg lg:w-[400px] lg:h-[400px] md:mt-20">
          <div className="flex flex-col gap-2 md:gap-8 p-4 ">
            <h2 className="text-red-800 text-2xl font-bold md:text-4xl">
              Your Cart (0)
            </h2>
            <Image
              src="/images/illustration-empty-cart.svg"
              alt="empty cart"
              width={500}
              height={500}
              className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] rounded-lg m-auto"
            />
            <p className="text-center md:text-2xl">
              Your added items will appear here
            </p>
          </div>
        </div>
      ) : (
        <div className="flex overflow-auto text-black  bg-white m-5 rounded-lg w-[320px] h-[250px] lg:w-[400px] lg:h-[400px] md:mt-20">
          <div className="flex flex-col gap-2 md:gap-8 w-full px-5 pt-14">
            <h2 className="text-red-800 text-2xl font-bold md:text-4xl">
              Your Cart ({sobremesas.reduce((acc, item) => acc + item.quantity!,0)})
            </h2>
            <div className="w-full">
              {sobremesas.map((i) => (
                <div
                  className="flex mb-8 justify-between items-center"
                  key={i.name}
                >
                  <div>
                    <div className="font-bold ">{i.name}</div>
                    <div className="flex">
                      <div className="text-red-500 font-semibold">
                        {i.quantity}x
                      </div>
                      <div className="ml-3 text-gray-500">
                        <span className="font-extralight text-xs">@</span> $
                        {i.price.toFixed(2)}
                      </div>
                      <div className="ml-2 text-gray-800">
                        ${(i.price * i.quantity!).toFixed(2)}
                      </div>
                    </div>
                  </div>
                  <div onClick={() => handleRemoveSobremesa(i.name)} className="flex cursor-pointer items-center justify-center font-bold border-solid w-5 h-5 border-2 rounded-full border-black">
                    x
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <div>Order Total</div>
              <div className="text-3xl font-bold">
                ${sobremesas.reduce((acc, item) => acc + item.price * item.quantity!, 0).toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
