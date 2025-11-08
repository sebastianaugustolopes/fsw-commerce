import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import { auth } from "@/lib/auth";
import { Header } from "@/src/components/common/header";
import { db } from "@/src/db";
import { cartTable } from "@/src/db/schema";

import Addresses from "./components/addresses";

const IdentificationPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session?.user.id) {
    redirect("/");
  }
  const cart = await db.query.cartTable.findFirst({
    where: eq(cartTable.userId, session.user.id),
    with: {
      items: true,
    },
  });
  if (!cart || cart?.items.length === 0) {
    redirect("/");
  }
  return (
    <>
      <Header />
      <div className="px-5">
        <Addresses />
      </div>
    </>
  );
};

export default IdentificationPage;
