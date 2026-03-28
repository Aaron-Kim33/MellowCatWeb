import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  buildGoogleOauthStartUrl,
  completeLauncherAuth,
  loginWithPassword,
  readLauncherContext,
  requestPasswordReset,
  resetPassword,
  signupWithPassword,
  withLauncherContext,
  type AuthApiError,
} from "@/lib/auth";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
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
  RESET_NOT_FOUND: "This reset link is invalid.",
  RESET_USED: "This reset link has already been used.",
  RESET_EXPIRED: "This reset link expired. Request a new password reset.",
  USER_NOT_FOUND: "No account was found for that email.",
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
  const params = new URLSearchParams(location.search);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const oauthError = params.get("oauth");
  const oauthMessage = params.get("message");
  const oauthCopy =
    oauthError === "error"
      ? {
          access_denied: "Google sign-in was canceled before completion.",
          invalid_state: "Google sign-in expired or lost its login state. Start again from MellowCat.",
          missing_code: "Google sign-in did not return an authorization code. Please try again.",
        }[oauthMessage ?? ""] ?? "Google sign-in could not be completed."
      : null;

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

        {(error || oauthCopy) && (
          <p className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {error ?? oauthCopy}
          </p>
        )}

        <Button type="submit" variant="hero" size="lg" className="h-12 w-full" disabled={busy}>
          {busy ? "Signing in..." : "Sign in"}
        </Button>

        <Button type="button" variant="hero-outline" size="lg" className="h-12 w-full" asChild>
          <a href={buildGoogleOauthStartUrl(location.search)}>Continue with Google</a>
        </Button>

        <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-muted-foreground">
          <Link className="transition-colors hover:text-primary" to={withLauncherContext("/signup", location.search)}>
            Create an account
          </Link>
          <Link className="transition-colors hover:text-primary" to={withLauncherContext("/forgot-password", location.search)}>
            Forgot password
          </Link>
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

    if (source === "launcher" || launcherRequest) {
      const params = new URLSearchParams(location.search);
      if (launcherRequest) {
        params.set("requestId", launcherRequest);
      }
      navigate(`/launcher-auth?${params.toString()}`, { replace: true });
      return;
    }

    setSuccess("Account created successfully. You can sign in now.");
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
  const params = new URLSearchParams(location.search);
  const requestId = params.get("requestId") ?? context.launcherRequest;
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    if (!requestId) {
      setStatus("error");
      setError("This launcher sign-in request is missing or invalid.");
      return;
    }

    const complete = async () => {
      const response = await completeLauncherAuth(requestId);

      if (cancelled) {
        return;
      }

      if (!response.ok) {
        setStatus("error");
        setError(authCopy[response.code] ?? "Launcher sign-in could not be completed.");
        return;
      }

      setStatus("success");
    };

    void complete();

    return () => {
      cancelled = true;
    };
  }, [requestId]);

  return (
    <AuthCard
      badge="Launcher Auth"
      title="Browser sign-in finished"
      description="The launcher will resolve this browser sign-in through backend API polling."
    >
      <div className="space-y-6">
        {status === "loading" && (
          <div className="rounded-2xl border border-border bg-secondary/40 p-5">
            <p className="mb-2 text-sm font-semibold text-foreground">Finalizing your launcher session...</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Keep MellowCat open while the backend links your browser login to the launcher request.
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
            <p className="mb-2 text-sm font-semibold text-primary">You can return to MellowCat now.</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Keep the launcher open while it finalizes your launcher session and refreshes account state.
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="rounded-2xl border border-destructive/20 bg-destructive/5 p-5">
            <p className="mb-2 text-sm font-semibold text-destructive">Launcher sign-in could not be completed.</p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {error ?? "This launcher auth request expired or failed. Return to MellowCat and try again."}
            </p>
          </div>
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
  const params = new URLSearchParams(location.search);
  const state = location.state as { email?: string; displayName?: string } | null;
  const provider = params.get("provider");
  const loginStatus = params.get("login");
  const passwordResetStatus = params.get("passwordReset");

  return (
    <AuthCard
      badge="Account"
      title="Your MellowCat account"
      description="This is a frontend placeholder until a web session/account endpoint is wired up."
    >
      <div className="space-y-5">
        {passwordResetStatus === "success" && (
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
            <p className="font-semibold text-primary">Password updated successfully.</p>
            <p className="mt-1 text-sm text-muted-foreground">Your web session was refreshed and you can continue using MellowCat.</p>
            <div className="mt-4">
              <Button variant="hero-outline" asChild>
                <Link to={withLauncherContext("/login", location.search)}>Sign in again</Link>
              </Button>
            </div>
          </div>
        )}

        {loginStatus === "success" && provider === "google" && (
          <div className="rounded-2xl border border-primary/20 bg-primary/5 p-4">
            <p className="font-semibold text-primary">Google sign-in completed successfully.</p>
            <p className="mt-1 text-sm text-muted-foreground">Your MellowCat account is now signed in with Google.</p>
          </div>
        )}

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

export const ForgotPasswordPage = () => {
  const location = useLocation();
  const context = readLauncherContext(location.search);
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [resetUrl, setResetUrl] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setSuccess(null);
    setResetUrl(null);

    const response = await requestPasswordReset(email);
    setBusy(false);

    if (!response.ok) {
      setError(authCopy[response.code] ?? "Password reset could not be started.");
      return;
    }

    setSuccess("If an account exists for this email, a password reset link is now ready.");
    if (response.resetUrl) {
      const nextUrl = new URL(response.resetUrl, window.location.origin);
      if (context.source) {
        nextUrl.searchParams.set("source", context.source);
      }
      if (context.launcherRequest) {
        nextUrl.searchParams.set("launcherRequest", context.launcherRequest);
      }
      setResetUrl(nextUrl.toString());
    }
  };

  return (
    <AuthCard
      badge="Forgot Password"
      title="Reset your password"
      description="Enter your account email and we will prepare the next password reset step."
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <Label htmlFor="forgot-email">Email</Label>
          <Input id="forgot-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
        </div>

        {error && <p className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</p>}
        {success && <p className="rounded-2xl border border-primary/20 bg-primary/5 px-4 py-3 text-sm text-primary">{success}</p>}

        <Button type="submit" variant="hero" size="lg" className="h-12 w-full" disabled={busy}>
          {busy ? "Preparing reset..." : "Send reset link"}
        </Button>

        {resetUrl && (
          <Button type="button" variant="hero-outline" size="lg" className="h-12 w-full" asChild>
            <a href={resetUrl}>Continue to reset password</a>
          </Button>
        )}

        <div className="text-sm text-muted-foreground">
          Back to{" "}
          <Link className="transition-colors hover:text-primary" to={withLauncherContext("/login", location.search)}>
            sign in
          </Link>
        </div>
      </form>
    </AuthCard>
  );
};

export const ResetPasswordPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const context = readLauncherContext(location.search);
  const token = new URLSearchParams(location.search).get("token") ?? "";
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    setError(null);

    const response = await resetPassword(token, password, context.launcherRequest ?? undefined);
    setBusy(false);

    if (!response.ok) {
      setError(authCopy[response.code] ?? "Password reset could not be completed.");
      return;
    }

    if (response.launcherRequestResolved && context.launcherRequest) {
      const params = new URLSearchParams(location.search);
      params.set("requestId", context.launcherRequest);
      navigate(`/launcher-auth?${params.toString()}`, { replace: true });
      return;
    }

    if (context.source === "launcher" || context.launcherRequest) {
      navigate(withLauncherContext("/account?passwordReset=success", location.search), { replace: true });
      return;
    }

    navigate("/account?passwordReset=success", { replace: true });
  };

  return (
    <AuthCard
      badge="Reset Password"
      title="Choose a new password"
      description="Use the reset token from your password reset link to set a new password for your account."
    >
      <form className="space-y-6" onSubmit={handleSubmit}>
        {!token && (
          <p className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            This reset link is invalid. Request a new password reset from the forgot password page.
          </p>
        )}

        <div className="space-y-2">
          <Label htmlFor="reset-password">New password</Label>
          <Input
            id="reset-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        {error && <p className="rounded-2xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">{error}</p>}

        <Button type="submit" variant="hero" size="lg" className="h-12 w-full" disabled={busy || !token}>
          {busy ? "Resetting password..." : "Reset password"}
        </Button>

        <div className="text-sm text-muted-foreground">
          Need a new link?{" "}
          <Link className="transition-colors hover:text-primary" to={withLauncherContext("/forgot-password", location.search)}>
            Request another reset
          </Link>
        </div>
      </form>
    </AuthCard>
  );
};
