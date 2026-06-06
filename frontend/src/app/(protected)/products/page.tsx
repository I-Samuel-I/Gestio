"use client";

import Header from "@/components/header";
import Navbar from "@/components/sidebar";
import { Filter, Search, Box, BoxIcon, Ellipsis, TriangleAlert } from "lucide-react";

import Input from "@/components/input";
import { useEffect, useState, useRef } from "react";
import Modal from "@/components/modal";
import ModalForm from "@/components/modalForm";
import CreateButtonForm from "@/components/createButtonForm";
import { DeleteProduct, GetProducts, type Product } from "@/services/products";
import { motion, AnimatePresence } from "motion/react";


export default function Products() {
  const [open, setOpen] = useState(false);
  const [openMenuId, setOpenMenuId] = useState<Product["id"] | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [navMobile, setNavMobile] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  const filterProducts = products.filter((p) =>
    p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()));


  // Load products from API
  const loadProducts = async () => {
    const data = await GetProducts();
    setProducts(data ?? []);
  };


  // Open create product modal
  const handleOpenCreateModal = () => {
    setSelectedProduct(null);
    setOpen(true);
  };

  // Open edit product modal
  const handleOpenEditModal = (product: Product) => {
    setSelectedProduct(product);
    setOpen(true);
    setOpenMenuId(null);
  };

  // Close create/edit modal
  const handleCloseProductModal = () => {
    setOpen(false);
    setSelectedProduct(null);
  };

  // Open delete confirmation modal
  const handleOpenDeleteModal = (product: Product) => {
    setProductToDelete(product);
    setOpenMenuId(null);
  };

  // Delete product and refresh list
  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    const deleted = await DeleteProduct(productToDelete.id);

    if (deleted) {
      await loadProducts();
      setProductToDelete(null);
    }
  };

  // Fomart ID to 3 digits with leading zeros or first 8 characters if not numeric
  const formatProductId = (id: Product["id"]) => {
    const value = String(id);
    return value.slice(0, 5).toUpperCase();
  };

  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    GetProducts().then((data) => {
      setProducts(data ?? []);
    });
  }, []);


  // Close menu when click outside
  useEffect(() => {
    if (openMenuId === null) return;

    const handleClickOutSide = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutSide);

    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [openMenuId]);

  return (

    <motion.main className="flex min-h-screen bg-slate-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Navbar
        mobileOpen={navMobile}
        onClose={() => setNavMobile(false)}
      />

      <div className="flex flex-col flex-1 md:ml-50 lg:ml-70">
        <Header title="Produtos" onMenuClick={() => setNavMobile(true)} />

        <div className="p-8 space-y-6">
          <motion.section
            className="flex flex-col sm:flex-row justify-between items-start"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Produtos</h1>
              <p className="text-slate-500">Gerencie seu catalogo de produtos</p>
            </div>
            <CreateButtonForm onClick={handleOpenCreateModal} text="Novo Produto" />

            <AnimatePresence>
              {open && (
                <Modal isOpen={open} onClose={handleCloseProductModal}>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ModalForm
                      icon={<BoxIcon size={45} color="#2082B1" />}
                      type="product"
                      title={selectedProduct ? "Editar Produto" : "Novo Produto"}
                      subTitle={
                        selectedProduct
                          ? "Atualize os dados do produto selecionado"
                          : "Adicione um novo produto ao catalogo"
                      }
                      onClose={handleCloseProductModal}
                      onCreated={loadProducts}
                      product={selectedProduct}
                      submitText={selectedProduct ? "Salvar" : "Adicionar"}
                    />
                  </motion.div>
                </Modal>
              )}
            </AnimatePresence>

            <AnimatePresence>
              {productToDelete && (
                <Modal
                  isOpen={Boolean(productToDelete)}
                  onClose={() => setProductToDelete(null)}
                >
                  <motion.div
                    className="p-6"
                    initial={{ opacity: 0, scale: 0.95, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="rounded-xl bg-red-50 p-3 text-red-600">
                        <TriangleAlert size={28} />
                      </div>
                      <div className="flex-1">
                        <h2 className="text-xl font-bold text-slate-800">Excluir produto</h2>
                        <p className="mt-2 text-sm text-slate-500">
                          Tem certeza que deseja excluir{" "}
                          <span className="font-semibold text-slate-700">
                            {productToDelete?.name}
                          </span>
                          ? Essa ação nao pode ser desfeita.
                        </p>
                      </div>
                    </div>

                    <div className="mt-8 flex justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setProductToDelete(null)}
                        className="px-6 py-2 rounded-lg border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={handleConfirmDelete}
                        className="px-6 py-2 rounded-lg text-white font-medium bg-red-600 hover:bg-red-700 transition-colors cursor-pointer"
                      >
                        Excluir
                      </button>
                    </div>
                  </motion.div>
                </Modal>
              )}
            </AnimatePresence>
          </motion.section>

          <motion.section
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <Input
              type="text"
              placeholder="Buscar por nome..."
              icon={Search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <button className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-200 rounded-lg bg-white text-slate-600 hover:bg-slate-50 transition-all font-medium">
              <Filter className="w-4 h-4" />
              Buscar
            </button>
          </motion.section>

          <motion.section
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {products.length === 0 ? (
              <motion.div
                className="col-span-full flex text-center mt-20 items-center gap-5 flex-col w-full"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                <motion.div
                  className="p-6 bg-[#E1EDF2] rounded-3xl w-fit"
                  animate={{ y: [-8, 8, -8] }}
                  transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
                >
                  <Box color="#2082B1" size={50} />
                </motion.div>
                <div className="flex flex-col items-center">
                  <h3 className="text-2xl font-bold text-slate-800">Nenhum produto cadastrado</h3>
                  <p className="text-sm mt-2 text-slate-500 w-3/4">
                    Comece adicionando seu primeiro produto ao catalogo para gerenciar seu estoque.
                  </p>
                </div>

                <CreateButtonForm onClick={handleOpenCreateModal} text="Novo Produto" />
              </motion.div>
            ) : (
              filterProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-lg transition-all cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
                  whileHover={{ y: -4 }}
                >
                  <div className="relative flex justify-between items-center mb-4">
                    <div className="p-3 bg-blue-50 rounded-lg">
                      <Box className="w-6 h-6 text-blue-600" />
                    </div>
                    <button
                      onClick={() =>
                        setOpenMenuId((currentId) =>
                          currentId === product.id ? null : product.id,
                        )
                      }
                      className="p-2 rounded-lg hover:bg-blue-50 hover:text-red cursor-pointer transition-colors"
                    >
                      <Ellipsis className="w-5 h-5" />
                    </button>

                    {openMenuId === product.id && (
                      <div ref={menuRef} className="absolute right-0 mt-2 w-48 bg-white border border-slate-200 rounded-lg shadow-lg">
                        <button
                          onClick={() => handleOpenEditModal(product)}
                          className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
                        >
                          Editar
                        </button>
                        <button
                          onClick={() => handleOpenDeleteModal(product)}
                          className="cursor-pointer block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-slate-100"
                        >
                          Excluir
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="mb-4">
                    <h2 className="text-lg font-bold text-slate-800">{product.name}</h2>
                    <p className="text-xs text-slate-400 font-mono uppercase tracking-tighter">
                      ID:{formatProductId(product.id)}
                    </p>
                  </div>

                  <div className="flex gap-2 justify-between items-center mb-6">
                    <span className="text-slate-500 rounded-full text-xs font-semibold">
                      {product.category.toUpperCase()}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider ${product.available === true ? "bg-green-200 text-green-700" :
                      product.available === false ? "bg-red-200 text-red-700" : "bg-yellow-100 text-yellow-700"
                      }`}>
                      {product.available ? "Disponivel" : "Sem Estoque"}
                    </span>
                  </div>

                  <hr className="border-[#E0E5EB] mb-4" />

                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Preço</p>
                      <h3 className="text-xl font-bold text-slate-900">{(product.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Estoque</p>
                      <h3 className="font-bold text-slate-900">
                        {product.stock}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </motion.section>
        </div>
      </div>
    </motion.main>
  );
}