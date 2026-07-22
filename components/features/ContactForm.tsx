"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Mail,
  MessageSquare,
  User,
  Check,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setStatus("sending");

    // Validaciones
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.message.trim()
    ) {
      setError("Por favor completa todos los campos");
      setStatus("error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Email inválido");
      setStatus("error");
      return;
    }

    try {
      // Aquí integrarías con tu servicio de email (FormSpree, EmailJS, etc.)
      // Por ahora simulamos el envío
      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log("Mensaje enviado:", formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Reset después de 3 segundos
      setTimeout(() => setStatus("idle"), 3000);
    } catch {
      setError("Error al enviar el mensaje. Intenta nuevamente.");
      setStatus("error");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-8 bg-white dark:bg-stone-900 rounded-3xl border border-slate-200 dark:border-stone-800 shadow-xl">
      <div className="text-center space-y-2 mb-8">
        <div className="w-16 h-16 bg-violet-100 dark:bg-violet-950/30 rounded-2xl flex items-center justify-center mx-auto">
          <Mail size={32} className="text-violet-600 dark:text-violet-400" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-slate-900 dark:text-white">
          Contáctanos
        </h3>
        <p className="text-slate-500 dark:text-slate-400">
          ¿Tienes alguna sugerencia o comentario? Nos encantaría escucharte
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Nombre */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center space-x-2">
            <User size={16} />
            <span>Nombre</span>
          </label>
          <Input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Tu nombre"
            className="h-12"
            disabled={status === "sending"}
          />
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center space-x-2">
            <Mail size={16} />
            <span>Email</span>
          </label>
          <Input
            type="email"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder="tu@email.com"
            className="h-12"
            disabled={status === "sending"}
          />
        </div>

        {/* Mensaje */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-700 dark:text-slate-300 flex items-center space-x-2">
            <MessageSquare size={16} />
            <span>Mensaje</span>
          </label>
          <textarea
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            placeholder="Cuéntanos tu idea, sugerencia o comentario..."
            rows={5}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-stone-800 bg-white dark:bg-stone-900 text-slate-900 dark:text-white resize-none focus:ring-2 focus:ring-violet-500 focus:border-transparent"
            disabled={status === "sending"}
          />
        </div>

        {/* Error */}
        {status === "error" && error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-xl flex items-center space-x-2"
          >
            <AlertCircle size={18} className="text-red-600 dark:text-red-400" />
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          </motion.div>
        )}

        {/* Success */}
        {status === "success" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-xl flex items-center space-x-2"
          >
            <Check size={18} className="text-green-600 dark:text-green-400" />
            <p className="text-sm text-green-600 dark:text-green-400">
              ¡Mensaje enviado! Te responderemos pronto 📬
            </p>
          </motion.div>
        )}

        {/* Botón */}
        <Button
          type="submit"
          variant="primary"
          className="w-full h-14 text-base font-bold"
          disabled={status === "sending"}
        >
          {status === "sending" ? (
            "Enviando..."
          ) : (
            <>
              <Send size={18} className="mr-2" />
              Enviar Mensaje
            </>
          )}
        </Button>
      </form>

      <p className="text-xs text-center text-slate-400 mt-6">
        También puedes escribirnos a: <strong>contacto@leerespensar.com</strong>
      </p>
    </div>
  );
}
