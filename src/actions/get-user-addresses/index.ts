"use server";

import { eq } from "drizzle-orm";
import { headers } from "next/headers";

import { auth } from "@/lib/auth";
import { db } from "@/src/db";
import { shippingAddressTable } from "@/src/db/schema";

export async function getUserAddresses() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Usuário não autenticado");
  }

  try {
    const addresses = await db
      .select()
      .from(shippingAddressTable)
      .where(eq(shippingAddressTable.userId, session.user.id))
      .orderBy(shippingAddressTable.createdAt);

    return addresses;
  } catch (error) {
    console.error("Erro ao buscar endereços:", error);
    throw new Error("Erro ao buscar endereços");
  }
}
