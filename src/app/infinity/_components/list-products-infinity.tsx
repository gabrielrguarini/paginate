"use client";

import { Products } from "@prisma/client";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

type ProductsQueryParams = {
  take?: string;
  lastCursor?: string;
};

const fetchProducts = async ({ take, lastCursor }: ProductsQueryParams) => {
  const res = await fetch(
    "/api/products?lastCursor=" + lastCursor + "&take=" + 40
  );
  return res.json();
};
export function ListProductsInfinity({
  take,
  lastCursor,
}: ProductsQueryParams) {
  const { ref, inView } = useInView();
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isSuccess,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam = "" }) =>
      fetchProducts({ take: "10", lastCursor: pageParam }),
    getNextPageParam: (lastPage) => lastPage.metadata.lastCursor,
    initialPageParam: "",
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, inView, fetchNextPage]);

  if (error as any)
    return (
      <div className="mt-10">
        {"An error has occurred: " + (error as any).message}
      </div>
    );

  return (
    <ul>
      {isSuccess &&
        data.pages.map((page) =>
          page.data.map((product: Products, index: number) => {
            if (page.data.length === index + 1) {
              return (
                <li ref={ref} key={index}>
                  {product.title}
                </li>
              );
            } else {
              return <li key={index}>{product.title}</li>;
            }
          })
        )}
      {(isLoading || isFetchingNextPage) && <p className="mb-4">Loading...</p>}
    </ul>
  );
}
