"use client";

import { Facebook, Instagram, Mail, Twitter } from "lucide-react";
import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/src/components/ui/dialog";

const SOCIAL_NETWORKS = [
  {
    name: "Instagram",
    icon: Instagram,
    url: "https://instagram.com/bewear",
    color: "hover:text-pink-600",
  },
  {
    name: "Facebook",
    icon: Facebook,
    url: "https://facebook.com/bewear",
    color: "hover:text-blue-600",
  },
  {
    name: "Twitter",
    icon: Twitter,
    url: "https://twitter.com/bewear",
    color: "hover:text-blue-400",
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:contato@bewear.com",
    color: "hover:text-red-600",
  },
];

export const NavbarAboutButton = () => {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setAboutOpen(true)}
        className="text-foreground hover:text-primary text-sm font-medium transition-colors"
      >
        Sobre
      </button>

      {/* About Modal with Social Networks */}
      <Dialog open={aboutOpen} onOpenChange={setAboutOpen}>
        <DialogContent className="sm:max-w-md">
          {/* Banner */}
          <div className="relative -mx-6 -mt-6 mb-6 flex h-32 items-center justify-center rounded-t-lg bg-linear-to-r from-black to-gray-800">
            <div className="text-center">
              <div className="mb-3 inline-flex h-16 w-16 items-center justify-center rounded-full bg-white">
                <span className="text-3xl font-bold text-black">B</span>
              </div>
              <h2 className="text-xl font-bold text-white">BEWEAR</h2>
            </div>
          </div>

          <DialogHeader>
            <DialogTitle>Sobre Nós</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">
              A BEWEAR é uma marca comprometida em trazer os melhores produtos
              de moda e estilo para você. Com qualidade premium e preços
              acessíveis, buscamos transformar sua forma de se vestir.
            </p>

            <p className="text-muted-foreground text-sm">
              Somos apaixonados por inovação, sustentabilidade e satisfação do
              cliente. Cada peça é cuidadosamente selecionada para garantir sua
              satisfação.
            </p>

            <div className="border-t pt-4">
              <h3 className="mb-4 text-sm font-semibold">
                Siga nossas redes sociais:
              </h3>

              <div className="flex justify-center gap-6">
                {SOCIAL_NETWORKS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={social.name}
                      className={`text-gray-600 transition-colors ${social.color}`}
                    >
                      <Icon className="h-6 w-6" />
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="text-muted-foreground space-y-2 border-t pt-4 text-sm">
              <p>
                <strong>Email:</strong> contato@bewear.com
              </p>
              <p>
                <strong>Telefone:</strong> (11) 9999-9999
              </p>
              <p>
                <strong>Endereço:</strong> São Paulo, SP - Brasil
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
