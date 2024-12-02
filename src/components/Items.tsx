import path from "path";
import fs from "fs";
import ResponsiveImage from "./ResponsiveImage";
import Button from "./Button";

interface DataProps {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
  quantity?: number
}

const Items = () => {
  // Carregando o arquivo JSON
  const filePath = path.join(process.cwd(), "data.json");
  const data: DataProps[] = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  
  return (
    <div>
      <main>
        <h1 className="text-4xl font-bold m-5">Desserts</h1>
        <ul className="flex flex-col md:flex-row md:flex-wrap md:gap-6 items-center m-5 ">
          {data.map((sobremesa) => (
            <li
              key={sobremesa.name}
              className="flex flex-col gap-4 my-5 relative"
            >
              <div>
                <ResponsiveImage image={sobremesa.image} />
              </div>
              <div className="flex flex-col gap-1 mt-6">
                <p className="text-colorRose500">{sobremesa.category}</p>
                <h2 className="font-semibold text-xl md:text-base">
                  {sobremesa.name}
                </h2>
                <p className="text-colorRed">${sobremesa.price.toFixed(2)}</p>
              </div>
              <div className="absolute left-11 top-28 md:left-[16%] md:top-72">
                <Button sobremesa={sobremesa} />
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Items;
