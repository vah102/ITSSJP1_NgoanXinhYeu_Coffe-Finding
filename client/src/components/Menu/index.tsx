type MenuProps = {
  item: {
    id: string;
    dish_name: string;
    dish_price: number;
    dish_image: string;
    description: string;
  };
};

function Menu({ item }: MenuProps) {
  return (
    <div className="p-4 border rounded-3xl">
      <img
        src={item.dish_image}
        alt="Menu Item"
        className="w-full h-84 object-cover mb-2"
      />
      <div className="flex justify-between items-center mb-1">
        <h3 className="text-3xl font-semibold">{item.dish_name}</h3>
        <span className="text-3xl font-medium text-gray-600">
          {item.dish_price}
        </span>
      </div>
      <p className="text-2xl">{item.description}</p>
    </div>
  );
}

export default Menu;
