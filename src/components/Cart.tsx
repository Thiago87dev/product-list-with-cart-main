"use client";
import Image from "next/image";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { removeSobremesa } from "@/redux/cart/slice";
import { useState } from "react";
import PopUpConfirmed from "./PopUpConfirmed";
import { cleanCart } from "@/redux/cart/slice";

const Cart = () => {
  const [showPopUp, setShowPopUp] = useState(false);

  const togglePopUp = () => {
    if (showPopUp === true) {
      dispatch(cleanCart());
    }
    setShowPopUp(!showPopUp);
  };

  const onCloseClickingOut = () => {
    setShowPopUp(!showPopUp);
  };

  const dispatch = useDispatch();

  const sobremesas = useSelector((state: RootState) => state.cart.sobremesas);

  const handleRemoveSobremesa = (sobremesa: string) => {
    dispatch(removeSobremesa(sobremesa));
  };

  return (
    <div>
      {sobremesas.length === 0 ? (
        <div className="flex items-center justify-center w-[320px] min-h-[250px] bg-white m-5 rounded-lg lg:w-[400px] lg:min-h-[400px] md:mt-20 mb-20">
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
        <div className="flex  text-black  bg-white m-5 rounded-lg w-[320px] min-h-[250px] lg:w-[400px] lg:min-h-[400px] md:mt-20 mb-20">
          <div className="flex flex-col gap-2 md:gap-8 w-full px-5 pt-14">
            <h2 className="text-red-800 text-2xl font-bold md:text-4xl">
              Your Cart (
              {sobremesas.reduce((acc, item) => acc + item.quantity!, 0)})
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
                  <div
                    onClick={() => handleRemoveSobremesa(i.name)}
                    className="flex cursor-pointer items-center justify-center font-bold border-solid w-5 h-5 border-2 rounded-full border-black"
                  >
                    X
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between items-center">
              <div>Order Total</div>
              <div className="text-3xl font-bold">
                $
                {sobremesas
                  .reduce((acc, item) => acc + item.price * item.quantity!, 0)
                  .toFixed(2)}
              </div>
            </div>
            <div className="flex gap-2 justify-center">
              <Image
                src="/images/icon-carbon-neutral.svg"
                alt="empty cart"
                width={25}
                height={25}
              />
              <h2>
                This is a <span className="font-semibold">carbon-neutral</span>{" "}
                delivery
              </h2>
            </div>
            <div className="flex justify-center">
              <button
                onClick={togglePopUp}
                className="text-white bg-red-500 px-20 lg:px-24 py-2 rounded-full hover:bg-red-900"
              >
                Comfirm Order
              </button>
            </div>
          </div>
        </div>
      )}
      {showPopUp && <PopUpConfirmed onCloseClickingOut={onCloseClickingOut} onClose={togglePopUp} />}
    </div>
  );
};

export default Cart;
