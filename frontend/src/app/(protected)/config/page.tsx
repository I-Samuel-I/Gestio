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
  type SettingsLanguage,
  type SettingsTimezone,
} from "@/services/settings";
import { Bell, Building, Clock, Globe, Palette } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

const languageOptions: { value: SettingsLanguage; label: string }[] = [
  { value: "pt-BR", label: "Portugues (Brasil)" },
  { value: "en-US", label: "English (United States)" },
];

const timezoneOptions: { value: SettingsTimezone; label: string }[] = [
  { value: "America/Sao_Paulo", label: "Brasil (Sao Paulo)" },
  { value: "America/New_York", label: "Estados Unidos (Eastern Time)" },
];

export default function Config() {
  const [navMobile, setNavMobile] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(false);
  const [lowStockAlert, setLowStockAlert] = useState(false);
  const [dailySummary, setDailySummary] = useState(false);
  const [language, setLanguage] = useState<SettingsLanguage>("pt-BR");
  const [timezone, setTimezone] = useState<SettingsTimezone>("America/Sao_Paulo");
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
          setLanguage(preferencesData.language ?? "pt-BR");
          setTimezone(preferencesData.timezone ?? "America/Sao_Paulo");
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
        language,
        timezone,
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
                <label className="flex w-full flex-col gap-1.5">
                  <span className="text-sm font-medium text-slate-700">Idioma</span>
                  <span className="relative flex items-center">
                    <Globe className="absolute left-3 text-slate-400" size={18} />
                    <select
                      value={language}
                      onChange={(event) => setLanguage(event.target.value as SettingsLanguage)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-slate-900 outline-none transition-all focus:border-[#a8e1fc] focus:ring-2 focus:ring-[#2082B1]/10"
                    >
                      {languageOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </span>
                </label>

                <label className="flex w-full flex-col gap-1.5">
                  <span className="text-sm font-medium text-slate-700">Fuso Horario</span>
                  <span className="relative flex items-center">
                    <Clock className="absolute left-3 text-slate-400" size={18} />
                    <select
                      value={timezone}
                      onChange={(event) => setTimezone(event.target.value as SettingsTimezone)}
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-slate-900 outline-none transition-all focus:border-[#a8e1fc] focus:ring-2 focus:ring-[#2082B1]/10"
                    >
                      {timezoneOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </span>
                </label>
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
