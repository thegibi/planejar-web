import Link from "next/link";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-2xl">Planejar - Consultoria Agrícola</h1>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="flex gap-4 items-center flex-col sm:flex-row">
          <Link
            className="rounded-sm border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base  p-5 sm:px-5 w-full sm:w-auto"
            href="/clients/create"
          >
            Cadastrar Cliente
          </Link>
          <Link
            className="rounded-sm border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base p-5 sm:px-5 w-full sm:w-auto"
            href="/farms/create"
          >
            Cadastrar Fazendas
          </Link>
          <Link
            className="rounded-sm border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base p-5 sm:px-5 w-full sm:w-auto"
            href="/plots/create"
          >
            Cadastrar Talhões
          </Link>
          <Link
            className="rounded-sm border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base p-5 sm:px-5 w-full sm:w-auto"
            href="/inputs/create"
          >
            Cadastrar Insumos
          </Link>
        </div>
      </main>
      
    </div>
  );
}
