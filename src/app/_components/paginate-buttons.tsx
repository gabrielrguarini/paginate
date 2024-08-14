import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

export function PaginateButtons({
  totalProducts,
  page,
  take,
}: {
  totalProducts: number;
  page: number;
  take: number;
}) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );
  const totalPages = Math.ceil(totalProducts / take);
  return (
    <div className="flex gap-2 py-4 text-xl justify-center items-center">
      <Link
        href={
          page >= 2
            ? pathname + "?" + createQueryString("page", String(page - 1))
            : pathname
        }
        className="border-2 border-black p-4 rounded-xl"
      >
        Anterior
      </Link>
      <Link
        href={
          page === totalPages
            ? pathname
            : pathname + "?" + createQueryString("page", String(page + 1))
        }
        className="border-2 border-black p-4 rounded-xl"
      >
        Próximo
      </Link>
      <p>Total de paginas: {totalPages}</p>
      <select
        name="take"
        onChange={(e) =>
          router.push(
            pathname + "?" + createQueryString("take", e.target.value)
          )
        }
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>
  );
}
