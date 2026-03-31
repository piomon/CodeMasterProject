import { ReactNode } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AiChatWidget } from "../AiChatWidget";

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative bg-background text-foreground selection:bg-primary/30">
      <Header />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
      <AiChatWidget />
    </div>
  );
}
