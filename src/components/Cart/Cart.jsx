import React, { useState, useContext, useRef, Suspense } from "react";

import { Badge } from "./styles";
import CartContext from "../../context/CartContext";
import { Moji } from "../Common/common";

const Joke = React.lazy(() => import("../Joke"));

function Cart() {
  const [joke, setJoke] = useState(false);
  const jokeTimer = useRef(null);
  const { price } = useContext(CartContext);

  const handleMouseEnter = () => {
    if (!jokeTimer.current) {
      jokeTimer.current = setTimeout(() => setJoke(true), 4000);
    }
  };

  const handleMouseLeave = () => {
    clearTimeout(jokeTimer.current);
    jokeTimer.current = null;
    if (joke) setJoke(false);
  };

  return (
    <Badge onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {!joke ? (
        <a href="#checkout">
          <Moji moji="📚" type="pile of book" />
          Votre panier {price > 0 ? ` : ${price} €` : "est vide"}
        </a>
      ) : (
        <Suspense fallback={<Moji moji="🥚" type="easter egg" />}>
          <Joke />
        </Suspense>
      )}
    </Badge>
  );
}

export default Cart;
