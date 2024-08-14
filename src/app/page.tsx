import { PaginateProducts } from "./_components/paginate-products";

type PageProps = {
  searchParams?: { page?: string; take?: string };
};

export default async function Home({ searchParams }: PageProps) {
  const page = searchParams?.page ? parseInt(searchParams.page) : 1;
  const take = searchParams?.take ? parseInt(searchParams.take) : 10;
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <PaginateProducts page={page} take={take} />
      </div>
    </main>
  );
}
