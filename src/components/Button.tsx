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
          className="border-2 border-solid border-black hover:border-colorRed hover:text-colorRed bg-white text-black items-center font-semibold rounded-full gap-4 text-base flex py-4 px-10 lg:px-7 md:text-base cursor-pointer"
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
        <div className="border-2 lg:min-w-[184px] lg:max-w-[184px] min-w-[210px] max-w-[210px] border-solid border-colorRed bg-colorRed text-black  items-center font-semibold rounded-full gap-4 text-2xl flex py-3 px-[26px]  lg:px-[14px] lg:text-2xl ">
          <div className="flex justify-between w-full items-center">
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
            <div className="text-white">{productCount}</div>
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
