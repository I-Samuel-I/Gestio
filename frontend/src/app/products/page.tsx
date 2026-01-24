import Header from "@/components/header";
import Navbar from "@/components/navbar";
import { Filter, Search, Plus, Box } from "lucide-react";
import { products } from "@/mock/products";
import Input from "@/components/input";


export default function Products() {
  return (
    <main className="flex min-h-screen bg-slate-50">
      <Navbar />

      <div className="flex flex-col flex-1 md:ml-50 lg:ml-70">
        <Header title="Produtos" />

        <div className="p-8 space-y-6">
          {/* Hero section */}
          <section className="flex  flex-col sm:flex-row  justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Produtos</h1>
              <p className="text-slate-500">Gerencie seu catálogo de produtos</p>
            </div>
            <button className="flex w-full mt-5 justify-center sm:mt-0 sm:w-fit items-center gap-2 bg-[#2082B1] hover:bg-[#1a6a8f] hover:cursor-pointer text-white font-bold p-3 rounded-lg transition-colors">
              <Plus className="w-5 h-5" />
              Novo Produto
            </button>

          </section>

          {/* Filter */}
          <section className="flex flex-col  sm:flex-row gap-4">
            <Input
              type="text"
              placeholder="Buscar por nome..."
              icon={Search}
            />
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition-all font-medium">
              <Filter className="w-4 h-4" />
              Filtros
            </button>
          </section>

          {/* Grid products */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              
                <div className="flex justify-between items-start mb-4">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <Box className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${product.status === 'Disponível' ? 'bg-green-200 text-green-700' :
                    product.status === 'Esgotado' ? 'bg-red-200 text-red-700' : 'bg-yellow-100 text-yellow-700'
                    }`}>
                    {product.status}
                  </span>
                </div>

                <div className="mb-4">
                  <h2 className="text-lg font-bold text-slate-800">{product.name}</h2>
                  <p className="text-xs text-slate-400 font-mono uppercase tracking-tighter">ID:{product.id.toString().padStart(3, '0')}</p>
                </div>

                <div className="flex gap-2 mb-6">
                  <span className="text-slate-500 rounded-full text-xs font-semibold">
                    {product.type}
                  </span>
                </div>

                <hr className="border-[#E0E5EB] mb-4" />

                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Preço</p>
                    <h3 className="text-xl font-bold text-slate-900">{product.value}</h3>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Estoque</p>
                    <h3 className=" font-bold 'text-slate-900">
                      {product.stock}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </section>
        </div>
      </div>
    </main>
  );
}