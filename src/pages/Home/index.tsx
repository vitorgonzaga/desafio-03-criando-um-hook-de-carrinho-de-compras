import { useEffect, useState } from "react";
import { MdAddShoppingCart } from "react-icons/md";

import { useCart } from "../../hooks/useCart";
import { api } from "../../services/api";
import { formatPrice } from "../../util/format";
import { ProductList } from "./styles";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

interface ProductFormatted extends Product {
  priceFormatted: string;
}

interface CartItemsAmount {
  [key: number]: number;
}

const Home = (): JSX.Element => {
  const [products, setProducts] = useState<ProductFormatted[]>([]);
  const { addProduct, cart } = useCart();

  const cartItemsAmount = cart.reduce((sumAmount, { id, amount }) => ({
      ...sumAmount,
      [id]: amount
    }), {} as CartItemsAmount)

    /* previous development */
    // const cartItemsAmount = cart.reduce((sumAmount, { id, amount }) => {
      // const newSumAmount = { ...sumAmount, [id]: amount }
      // newSumAmount[product.id] = product.amount
      // return newSumAmount
    // }, {} as CartItemsAmount)

  useEffect(() => {
    async function loadProducts() {
      const { data } = await api.get<Product[]>(`/products`);

      const dataFormatted = data.map(product => ({
        ...product,
        priceFormatted: formatPrice(product.price)
      }))

      setProducts(dataFormatted);
    }

    loadProducts();
  }, []);

  function handleAddProduct(id: number) {
    addProduct(id)
  }

  return (
    <ProductList>
      {products?.map((product) => {
        const { id, title, image, priceFormatted } = product
        return (
          <li key={id}>
            <img
              src={image}
              alt={title}
            />
            <strong>{title}</strong>
            <span>{priceFormatted}</span>
            <button
              type="button"
              data-testid="add-product-button"
              onClick={() => handleAddProduct(id)}
            >
              <div data-testid="cart-product-quantity">
                <MdAddShoppingCart size={16} color="#FFF" />
                {cartItemsAmount[id] || 0}
              </div>

              <span>ADICIONAR AO CARRINHO</span>
            </button>
          </li>
        );
      })}
    </ProductList>
  );
};

export default Home;
