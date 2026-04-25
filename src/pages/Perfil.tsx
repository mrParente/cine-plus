import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Perfil = () => {
  const { user, login, signUp, logout } = useAuth();
  const { toast } = useToast();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAuth = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email || !password || (mode === "register" && !name)) {
      toast({
        title: "Preencha todos os campos",
        description: "Para continuar, informe seus dados corretamente.",
      });
      return;
    }

    const result = mode === "login" ? login(email, password) : signUp(name, email, password);

    toast({
      title: result.success ? "Tudo pronto!" : "Ops...",
      description: result.message,
    });

    if (result.success) {
      setName("");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-6xl">
        <div className="space-y-6">
          <section className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-semibold text-foreground">Perfil do usuário</h1>
              </div>
            </div>

            {user ? (
              <div className="space-y-6">
                <div className="rounded-2xl border border-border bg-background/80 p-6">
                  <h2 className="text-xl font-semibold text-foreground">Bem-vindo, {user.name}!</h2>
                  <p className="mt-2 text-sm text-muted-foreground">E-mail: {user.email}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Sessão ativa até {new Date(user.expiresAt).toLocaleTimeString("pt-BR")}.
                  </p>
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <Button variant="secondary" onClick={logout}>Sair</Button>
                  <Link to="/" className="text-sm text-primary hover:underline">
                    Voltar à home
                  </Link>
                </div>
              </div>
            ) : (
              <div className="grid gap-8 lg:grid-cols-[360px_minmax(0,1fr)]">
                <aside className="rounded-2xl border border-border bg-background/80 p-6">
                  <p className="text-sm font-medium text-foreground">Novo por aqui?</p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    Crie uma conta rápida e continue explorando filmes e séries sem precisar de armazenamento permanente.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-2">
                    <Button
                      variant={mode === "login" ? "default" : "secondary"}
                      size="sm"
                      onClick={() => setMode("login")}
                    >
                      Entrar
                    </Button>
                    <Button
                      variant={mode === "register" ? "default" : "secondary"}
                      size="sm"
                      onClick={() => setMode("register")}
                    >
                      Cadastro
                    </Button>
                  </div>
                </aside>
                <form onSubmit={handleAuth} className="space-y-5 rounded-2xl border border-border bg-background/80 p-6">
                  {mode === "register" && (
                    <div className="space-y-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        placeholder="Seu nome completo"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Digite sua senha"
                    />
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <Button type="submit">{mode === "login" ? "Entrar" : "Cadastrar"}</Button>
                    <p className="text-sm text-muted-foreground">
                      Seus dados ficam disponíveis apenas nesta sessão e expiram automaticamente.
                    </p>
                  </div>
                </form>
              </div>
            )}
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Perfil;
