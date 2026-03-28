import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  loginWithPassword,
  readLauncherContext,
  signupWithPassword,
  withLauncherContext,
  type AuthApiError,
} from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const authCopy: Record<AuthApiError["code"], string> = {
  INVALID_EMAIL: "Please enter a valid email address.",
  WRONG_PASSWORD: "That password does not match this account.",
  ACCOUNT_NOT_FOUND: "No account was found for that email.",
  EMAIL_NOT_VERIFIED: "Please verify your email before signing in.",
  EMAIL_ALREADY_EXISTS: "An account with that email already exists.",
  WEAK_PASSWORD: "Choose a stronger password before continuing.",
  EXPIRED_LAUNCHER_AUTH_REQUEST: "This launcher sign-in request expired. Start again from MellowCat.",
  OAUTH_CANCELED: "Google sign-in was canceled before completion.",
  SERVER_ERROR: "The auth server returned an unexpected error.",
  NETWORK_ERROR: "Unable to reach the auth backend right now.",
};

const renderAuthShell = (content: ReactNode) => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="relative overflow-hidden pt-16">
      <div className="pointer-events-none absolute top-24 left-1/4 h-[320px] w-[320px] rounded-full bg-primary/10 blur-[100px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-0 h-[260px] w-[260px] rounded-full bg-accent/10 blur-[100px]" />
      {content}
    </main>
    <Footer />
  </div>
);

type AuthCardProps = {
  badge: string;
  title: string;
  description: string;
  children: ReactNode;
};

const AuthCard = ({ badge, title, description, children }: AuthCardProps) =>
  renderAuthShell(
    <section className="container relative z-10 mx-auto max-w-5xl px-4 py-20">
      <Button variant="ghost" className="mb-8" asChild>
        <Link to="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Return to MellowCat
        </Link>
      </Button>

      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-border bg-card/90 p-8 soft-shadow">
          <div className="mb-4 inline-block rounded-full border border-primary/20 bg-primary/10 px-4 py-2">
            <span className="text-sm font-display font-semibold text-primary">{badge}</span>
          </div>
          <h1 className="mb-4 text-4xl font-display font-bold text-foreground">{title}</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>

        <div className="rounded-[2rem] border border-border bg-card/90 p-8 soft-shadow">{children}</div>
      </div>
    </section>,
  );

export const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { source, launcherRequest } = readLauncherContext(location.search);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError(null);

    const response = await loginWithPassword({ email, password, source: source ?? undefined, launcherRequest: launcherRequest ?? undefined });
    setBusy(false);

    if (!response.ok) {
      setError(authCopy[response.code]);
      return;
    }

    if (source === "launcher" || launcherRequest) {
      navigate(withLauncherContext("/launcher-auth", location.search), { replace: true });
      return;
    }

    navigate("/account", {
      replace: true,
      state: {
        email: response.user.email,
        displayName: response.user.displayName ?? "",
      },
    });
  };

  return (
    <AuthCard
      badge="Login"
      title="Sign in to MellowCat"
      description="Use your MellowCat account to unlock purchases, entitlements, and launcher sign-in handoff."
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="login-email">Email</Label>
          <Input id="login-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="login-password">Password</Label>
          <Input
            id="login-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        {error && <p className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</p>}

        <Button type="submit" variant="hero" size="lg" className="h-12 w-full" disabled={busy}>
          {busy ? "Signing in..." : "Sign in"}
        </Button>

        <Button type="button" variant="hero-outline" size="lg" className="h-12 w-full" disabled>
          Google sign-in (coming soon)
        </Button>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <Link className="transition-colors hover:text-primary" to={withLauncherContext("/signup", location.search)}>
            Create an account
          </Link>
          <span>Forgot password coming soon</span>
        </div>
      </form>
    </AuthCard>
  );
};

export const SignupPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { source, launcherRequest } = readLauncherContext(location.search);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setSuccess(null);

    const response = await signupWithPassword({
      email,
      password,
      displayName,
      source: source ?? undefined,
      launcherRequest: launcherRequest ?? undefined,
    });
    setBusy(false);

    if (!response.ok) {
      setError(authCopy[response.code]);
      return;
    }

    setSuccess("Verification email sent. Check your inbox to finish account setup.");

    if (source === "launcher" || launcherRequest) {
      navigate(withLauncherContext("/launcher-auth", location.search), {
        replace: true,
        state: {
          verificationPending: true,
          email,
        },
      });
    }
  };

  return (
    <AuthCard
      badge="Signup"
      title="Create your MellowCat account"
      description="Use one account across MellowCat web checkout and launcher entitlement flows."
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="signup-display-name">Display name</Label>
          <Input
            id="signup-display-name"
            type="text"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder="Optional"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <Input id="signup-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <Input
            id="signup-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        {error && <p className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</p>}
        {success && <p className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">{success}</p>}

        <Button type="submit" variant="hero" size="lg" className="h-12 w-full" disabled={busy}>
          {busy ? "Creating account..." : "Create account"}
        </Button>

        <div className="text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link className="transition-colors hover:text-primary" to={withLauncherContext("/login", location.search)}>
            Sign in
          </Link>
        </div>
      </form>
    </AuthCard>
  );
};

export const LauncherAuthPage = () => {
  const location = useLocation();
  const context = readLauncherContext(location.search);
  const requestId = new URLSearchParams(location.search).get("requestId") ?? context.launcherRequest;
  const state = location.state as { verificationPending?: boolean; email?: string } | null;

  return (
    <AuthCard
      badge="Launcher Auth"
      title="Browser sign-in finished"
      description="The launcher will resolve this browser sign-in through backend API polling."
    >
      <div className="space-y-6">
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
          <p className="mb-2 text-sm font-semibold text-primary">You can return to MellowCat now.</p>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Keep the launcher open while it finalizes your launcher session and refreshes account state.
          </p>
        </div>

        {state?.verificationPending && (
          <p className="text-sm text-muted-foreground">
            Verification email sent to <span className="font-medium text-foreground">{state.email}</span>. Finish email verification before
            launching browser sign-in again if your backend requires verified accounts.
          </p>
        )}

        {requestId && (
          <div className="rounded-2xl bg-secondary/40 p-4">
            <p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Launcher request</p>
            <p className="font-mono text-sm text-foreground">{requestId}</p>
          </div>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button variant="hero" asChild>
            <Link to="/">Return to site</Link>
          </Button>
          <Button variant="hero-outline" asChild>
            <Link to={withLauncherContext("/login", location.search)}>Back to login</Link>
          </Button>
        </div>
      </div>
    </AuthCard>
  );
};

export const AccountPage = () => {
  const location = useLocation();
  const state = location.state as { email?: string; displayName?: string } | null;

  return (
    <AuthCard
      badge="Account"
      title="Your MellowCat account"
      description="This is a frontend placeholder until a web session/account endpoint is wired up."
    >
      <div className="space-y-5">
        <div className="rounded-2xl bg-secondary/40 p-4">
          <p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Display name</p>
          <p className="font-semibold text-foreground">{state?.displayName || "Signed-in user"}</p>
        </div>
        <div className="rounded-2xl bg-secondary/40 p-4">
          <p className="mb-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</p>
          <p className="font-semibold text-foreground">{state?.email || "Session-backed account details coming soon"}</p>
        </div>
        <p className="text-sm leading-relaxed text-muted-foreground">
          Purchases, linked providers, and logout will live here once the backend account/session endpoints are finalized.
        </p>
      </div>
    </AuthCard>
  );
};
