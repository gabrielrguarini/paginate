"use client";
import { useEffect, useState } from "react";
import { Products } from "@prisma/client";
import { getProducts } from "../services/getProducts";
import { PaginateButtons } from "./paginate-buttons";

export function PaginateProducts({
  page,
  take,
}: {
  page: number;
  take: number;
}) {
  const [products, setProducts] = useState<Products[]>([]);
  const [totalProducts, setTotalProducts] = useState(0);
  useEffect(() => {
    async function fetchProduts() {
      const { products, totalProducts } = await getProducts(page, take);
      setProducts(products);
      setTotalProducts(totalProducts);
    }
    fetchProduts();
  }, [page, take]);
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.title}</li>
      ))}
      <PaginateButtons page={page} take={take} totalProducts={totalProducts} />
    </ul>
  );
}
