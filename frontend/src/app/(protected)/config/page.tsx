"use client";

import Header from "@/components/header";
import Input from "@/components/input";
import Navbar from "@/components/sidebar";
import ToogleButton from "@/components/toogleButton";
import {
  GetSettingsCompany,
  GetSettingsPreferences,
  UpdateSettingsCompany,
  UpdateSettingsPreferences,
} from "@/services/settings";
import { Bell, Building, Clock, Globe, Palette } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

export default function Config() {
  const [navMobile, setNavMobile] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [lowStockAlert, setLowStockAlert] = useState(false);
  const [dailySummary, setDailySummary] = useState(false);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchSettingsData = async () => {
      try {
        const companyData = await GetSettingsCompany();
        const preferencesData = await GetSettingsPreferences();

        if (companyData) {
          setCompanyName(companyData.name ?? "");
          setCnpj(companyData.cnpj ?? "");
          setContactEmail(companyData.email ?? "");
          setContactPhone(companyData.phone ?? "");
        }

        if (preferencesData) {
          setEmailNotifications(preferencesData.emailNotifications ?? false);
          setLowStockAlert(preferencesData.lowStockAlert ?? false);
          setDailySummary(preferencesData.dailySummary ?? false);
        }
      } catch (error) {
        setFormError(
          error instanceof Error
            ? error.message
            : "Nao foi possivel carregar as configuracoes.",
        );
      }
    };

    fetchSettingsData();
  }, []);

  const handleSaveSettings = async () => {
    try {
      setSaving(true);
      setFormError("");
      setSuccessMessage("");

      await UpdateSettingsCompany(
        companyName,
        cnpj.replace(/\D/g, ""),
        contactEmail,
        contactPhone,
      );

      await UpdateSettingsPreferences(
        emailNotifications,
        lowStockAlert,
        dailySummary,
      );

      setSuccessMessage("Configuracoes salvas com sucesso.");
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Nao foi possivel salvar as configuracoes.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.main
      className="flex min-h-screen bg-slate-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Navbar
        mobileOpen={navMobile}
        onClose={() => setNavMobile(false)}
      />

      <div className="flex flex-1 flex-col md:ml-50 lg:ml-70">
        <Header title="Configuracoes" onMenuClick={() => setNavMobile(true)} />

        <div className="space-y-6 p-6 md:p-8">
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            <h1 className="text-2xl font-bold text-slate-800">Configuracoes</h1>
            <p className="text-slate-500">
              Gerencie as configuracoes do sistema.
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.18, duration: 0.6 }}
          >
            <div className="rounded-2xl bg-white p-5 shadow lg:w-3/4">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-[#E6F1F6] p-3">
                  <Building className="text-[#2082B1]" />
                </div>
                <span>
                  <h2>Dados da Empresa</h2>
                  <p className="text-sm text-slate-500">
                    Informacoes gerais do negocio
                  </p>
                </span>
              </div>
              <div className="mt-7 flex flex-col gap-5 sm:grid sm:grid-cols-2">
                <Input
                  label="Nome da Empresa"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                <Input
                  label="CNPJ"
                  type="text"
                  value={cnpj}
                  onChange={(e) => setCnpj(e.target.value.replace(/\D/g, ""))}
                />
                <Input
                  label="E-mail de Contato"
                  type="text"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                />
                <Input
                  label="Telefone"
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value.replace(/\D/g, ""))}
                />
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.26, duration: 0.6 }}
          >
            <div className="rounded-2xl bg-white p-5 shadow lg:w-3/4">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-[#FEF5E6] p-3">
                  <Bell className="text-[#F6A923]" />
                </div>
                <span>
                  <h2>Notificacoes</h2>
                  <p className="text-sm text-slate-500">
                    Configure como receber alertas.
                  </p>
                </span>
              </div>
              <div>
                <div className="mt-7 flex items-center justify-between gap-5 border-b border-slate-200">
                  <span>
                    <h2>Notificacoes por E-mail</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Receba atualizacoes no seu E-mail
                    </p>
                  </span>
                  <ToogleButton
                    checked={emailNotifications}
                    onChange={setEmailNotifications}
                  />
                </div>
                <div className="mt-7 flex items-center justify-between gap-5 border-b border-slate-200">
                  <span>
                    <h2>Alerta de estoque baixo</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Quando produtos atingirem o minimo
                    </p>
                  </span>
                  <ToogleButton
                    checked={lowStockAlert}
                    onChange={setLowStockAlert}
                  />
                </div>
                <div className="mt-7 flex items-center justify-between gap-5 border-b border-slate-200">
                  <span>
                    <h2>Resumo Diario</h2>
                    <p className="mt-1 text-sm text-slate-500">
                      Relatorio automatico ao fim do dia
                    </p>
                  </span>
                  <ToogleButton
                    checked={dailySummary}
                    onChange={setDailySummary}
                  />
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.34, duration: 0.6 }}
          >
            <div className="rounded-2xl bg-white p-5 shadow lg:w-3/4">
              <div className="flex items-center gap-2">
                <div className="rounded-xl bg-[#F7EEFB] p-3">
                  <Palette className="text-[#B769DF]" />
                </div>
                <span>
                  <h2>Preferencias</h2>
                  <p className="text-sm text-slate-500">
                    Personalize sua experiencia
                  </p>
                </span>
              </div>
              <div className="mt-7 flex flex-col gap-5 sm:flex-row">
                <Input icon={Globe} label="Idioma" type="select" />
                <Input icon={Clock} label="Fuso Horario" type="select" />
              </div>

              {formError && (
                <p className="mt-6 text-sm font-medium text-red-600">
                  {formError}
                </p>
              )}

              {successMessage && (
                <p className="mt-6 text-sm font-medium text-green-600">
                  {successMessage}
                </p>
              )}

              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveSettings}
                  disabled={saving}
                  className="rounded-lg bg-[#2082B1] px-6 py-2 font-medium text-white transition-colors hover:cursor-pointer hover:bg-[#1a6a8f] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? "Salvando..." : "Salvar"}
                </button>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </motion.main>
  );
}
