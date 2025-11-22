import Image from "next/image";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/src/components/ui/tabs";

import SignInForm from "./sign-in-form";
import SignUpForm from "./sign-up-form";

const LoginDesktop = async () => {
  return (
    <div className="flex w-screen h-screen justify-center items-center gap-10 p-5">
      <Image
        src="/desktop-cover.jpg"
        alt="Desktop cover"
        height={0}
        width={0}
        sizes="100vw"
        className="object-cover w-auto h-150 rounded-3xl"
      />
      <Tabs defaultValue="sign-in">
        <TabsList>
          <TabsTrigger value="sign-in">Entrar</TabsTrigger>
          <TabsTrigger value="sign-up">Criar conta</TabsTrigger>
        </TabsList>
        <TabsContent value="sign-in">
          <SignInForm />
        </TabsContent>
        <TabsContent value="sign-up">
          <SignUpForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default LoginDesktop;
