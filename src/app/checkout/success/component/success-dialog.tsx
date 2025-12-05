"use client";

import Image from "next/image";
import Link from "next/link";

import { Button } from "@/src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
} from "@/src/components/ui/dialog";

export const SuccessDialog = () => {
  return (
    <Dialog open={true}>
      <DialogContent className="text-center">
        <Image
          src="/illustration.svg"
          alt="Success"
          width={300}
          height={300}
          className="mx-auto"
        />

        <DialogTitle className="mt-4 text-2xl">Pedido efetuado!</DialogTitle>

        <DialogDescription className="font-medium">
          Seu pedido foi efetuado com sucesso. Você pode acompanhar na seção
          “Meus Pedidos”.
        </DialogDescription>

        <DialogFooter>
          <Button className="rounded-full" size="lg">
            Ver meus pedidos
          </Button>

          <Button className="rounded-full" variant="outline" size="lg" asChild>
            <Link href="/">Voltar para a loja</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
