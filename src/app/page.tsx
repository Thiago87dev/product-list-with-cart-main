import Cart from "@/components/Cart";
import Items from "@/components/Items";

export default function Home() {

  return (
    <div>
      <main className="flex flex-col lg:flex-row lg:p-20">
        <Items/>
        <Cart/>
      </main>
    </div>
  );
}
