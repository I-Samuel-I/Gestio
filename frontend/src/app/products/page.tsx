"use client";

import Header from "@/components/header";
import Navbar from "@/components/sidebar";
import { Filter, Search, Box, BoxIcon } from "lucide-react";

import Input from "@/components/input";
import { useEffect, useState } from "react";
import Modal from "@/components/modal";
import ModalForm from "@/components/modalForm";
import CreateButtonForm from "@/components/createButtonForm";
import { GetProducts, type Product } from "@/services/products";



export default function Products() {

  const [open, setOpen] = useState(false);
  const [navMobile, setNavMobile] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  const filterProducts = products.filter((p)=>
  p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))

  const loadProducts = async ()=>{
    const data = await GetProducts();
    setProducts(data);
  }

  useEffect(() => {
    GetProducts().then((data) => {
      setProducts(data);
      
    })
  }, [])



  return (
    <main className="flex min-h-screen bg-slate-50">
      <Navbar
        mobileOpen={navMobile}
        onClose={() => setNavMobile(false)}
      />

      <div className="flex flex-col flex-1 md:ml-50 lg:ml-70">
        <Header title="Produtos" onMenuClick={() => setNavMobile(true)} />

        <div className="p-8 space-y-6">
          {/* Hero section */}
          <section className="flex  flex-col sm:flex-row  justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Produtos</h1>
              <p className="text-slate-500">Gerencie seu catálogo de produtos</p>
            </div>
            <CreateButtonForm onClick={() => setOpen(true)} text="Novo Produto" />
            <Modal isOpen={open} onClose={() => setOpen(false)}>
              <ModalForm
                icon={<BoxIcon size={45} color="#2082B1" />}
                type="product"
                title="Novo Produto"
                subTitle="Adicione um novo produto ao catálogo"
                onClose={() => setOpen(false)}
                onCreated={loadProducts}
              />
            </Modal>

          </section>

          {/* Filter */}
          <section className="flex flex-col  sm:flex-row gap-4">
            <Input
              type="text"
              placeholder="Buscar por nome..."
              icon={Search}
              value={search}
              onChange={(e)=> setSearch(e.target.value)}
            />
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition-all font-medium">
              <Filter className="w-4 h-4" />
              Filtros
            </button>
          </section>

          {/* Grid products */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {products.length === 0 ? (
              <div className="col-span-full flex text-center mt-20 items-center gap-5 flex-col  w-full ">
                <div className="p-6 bg-[#E1EDF2]  rounded-3xl w-fit animate-[floatUpDown_6s_ease-in-out_infinite]">
                  <Box color="#2082B1" size={50} />
                </div>
                <div className="flex flex-col items-center">
                  <h3 className="text-2xl font-bold text-slate-800">Nenhum produto cadastrado </h3>
                  <p className=" text-sm mt-2 text-slate-500 w-3/4">Comece adicionando seu primeiro produto ao catálogo para gerenciar seu estoque.</p>
                </div>

                <CreateButtonForm onClick={() => setOpen(true)} text="Novo Produto" />
              </div>
            ) : (
             filterProducts.map((product) => (
                <div key={product.id} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">

                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Box className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${product.available === true ? 'bg-green-200 text-green-700' :
                      product.available === false ? 'bg-red-200 text-red-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                      {product.available ? "Disponível" : "Sem Estoque"}
                    </span>
                  </div>

                  <div className="mb-4">
                    <h2 className="text-lg font-bold text-slate-800">{product.name}</h2>
                    <p className="text-xs text-slate-400 font-mono uppercase tracking-tighter">ID:{product.id.toString().padStart(3, '0')}</p>
                  </div>

                  <div className="flex gap-2 mb-6">
                    <span className="text-slate-500 rounded-full text-xs font-semibold">
                      {product.category}
                    </span>
                  </div>

                  <hr className="border-[#E0E5EB] mb-4" />

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Preço</p>
                      <h3 className="text-xl font-bold text-slate-900">{product.price}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Estoque</p>
                      <h3 className=" font-bold 'text-slate-900">
                        {product.stock}
                      </h3>
                    </div>
                  </div>
                </div>
              ))
            )}
          </section>
        </div>
      </div>
    </main>
  );
}