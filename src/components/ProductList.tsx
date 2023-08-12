import React, { useEffect, useState } from "react";

// penulisan inline interface
const ProductList = ({ category }: { category: string }) => {
  // init empty array, perlu di deklarasikan type dari const <string[]>
  const [products, setProducts] = useState<string[]>([]);
  useEffect(() => {
    // infinite loop, karena eksekusi setelah render, jadi triger untuk render lagi dst
    // jadi infinite loop updating state setProducts
    // solusinya adalah beritahu untuk jalan hanya 1x pertama kali render degan menambah empty array setelah callback
    // useEffect(callback, [])
    console.log("Fetching products in ", category);
    setProducts(["Clothing", "Household"]);
    // [category] effect dependant to category
  }, [category]);
  return <div>ProductList</div>;
};

export default ProductList;
