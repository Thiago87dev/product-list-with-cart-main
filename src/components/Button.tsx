"use client";
import Image from "next/image";
import {
  addSobremesa,
  increaseQuantity,
  decreaseQuantity,
} from "@/redux/cart/slice";
import { useDispatch, useSelector } from "react-redux";
import { selectProductCount } from "@/redux/cart/cart.selectors";
import { RootState } from "@/redux/store";

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

interface ButtonProps {
  sobremesa: SobremesaProps;
}

const Button = ({ sobremesa }: ButtonProps) => {
  const dispatch = useDispatch();

  const productCount = useSelector((state: RootState) =>
    selectProductCount(state, sobremesa.name)
  );

  const handleButtonClick = () => {
    console.log("add sobremesa: ", sobremesa);

    dispatch(addSobremesa(sobremesa));
  };

  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(sobremesa.name));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(sobremesa.name));
  };


  return (
    <div>
      {productCount < 1 ? (
        <div
          onClick={handleButtonClick}
          className="border-2 border-solid border-black bg-white text-black items-center font-semibold rounded-full gap-4 text-base flex py-4 px-10 md:text-lg cursor-pointer"
        >
          <Image
            alt="cart"
            src="/images/icon-add-to-cart.svg"
            width={25}
            height={25}
          />
          Add to Cart
        </div>
      ) : (
        <div className="border-2 border-solid border-black bg-red-500 text-black items-center font-semibold rounded-full gap-4 text-2xl flex py-3 px-[26px]  md:px-[30px] md:text-2xl ">
          <div className="flex gap-10 items-center">
            <div
              onClick={handleDecreaseQuantity}
              className=" flex items-center justify-center border-solid border-2 border-white rounded-full w-8 h-8 cursor-pointer active:bg-black"
            >
              <Image
                alt="cart"
                src="/images/icon-decrement-quantity.svg"
                width={25}
                height={25}
              />
            </div>
            <div>{productCount}</div>
            <div
              onClick={handleIncreaseQuantity}
              className=" flex items-center justify-center border-solid border-2 border-white rounded-full w-8 h-8 cursor-pointer active:bg-black "
            >
              <Image
                alt="cart"
                src="/images/icon-increment-quantity.svg"
                width={25}
                height={25}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Button;
