import Image from "next/image";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";


const PopUpConfirmed = ({ onClose, onCloseClickingOut }: { onClose: () => void, onCloseClickingOut: () => void }) => {
  const sobremesas = useSelector((state: RootState) => state.cart.sobremesas);

  return (
    <div onClick={onCloseClickingOut} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 ">
      <div className="flex flex-col gap-4 bg-white w-[320px] min-h-[250px] lg:min-h-[400px] lg:w-[400px] rounded-xl p-7 ">
        <div>
          <Image
            alt="confirmed"
            src="/images/icon-order-confirmed.svg"
            width={40}
            height={40}
          />
        </div>
        <div>
          <h2 className="font-bold text-[34px]">Order Confirmed</h2>
          <p className="text-xs text-slate-500">We hope you enjoy your food!</p>
        </div>
        <div className="flex flex-col gap-8 bg-[#F4EDEB] rounded-lg p-4 my-3">
          <div className="flex flex-col gap-5">
            {sobremesas.map((item) => (
              <div key={item.name}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div>
                      <Image
                        alt="sobremesa thumbnail"
                        src={item.image.thumbnail}
                        width={40}
                        height={40}
                        className="rounded-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <div>
                        <p className="font-bold text-xs">{item.name}</p>
                      </div>
                      <div className="flex gap-4">
                        <p className="text-red-700 font-semibold text-xs">
                          {item.quantity}x
                        </p>
                        <p className="text-gray-400 font-semibold text-xs">
                          <span className="text-[10px] mr-">@</span>
                          {item.price.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-xs">
                      ${(item.price * item.quantity!).toFixed(2)}
                    </p>
                  </div>
                </div>
                <hr />
              </div>
            ))}
          </div>
          <div className="flex justify-between items-center">
            <p className="text-xs">Order Total</p>
            <p className="font-bold text-xl">
              $
              {sobremesas
                .reduce((acc, i) => acc + i.price * i.quantity!, 0)
                .toFixed(2)}
            </p>
          </div>
        </div>
        <div>
          <button
            onClick={onClose}
            className="flex w-full justify-center text-white bg-red-500 rounded-full py-2"
          >
            Start New Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopUpConfirmed;
