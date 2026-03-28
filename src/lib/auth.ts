export type LauncherContext = {
  source: string | null;
  launcherRequest: string | null;
};

export type AuthApiErrorCode =
  | "INVALID_EMAIL"
  | "WRONG_PASSWORD"
  | "ACCOUNT_NOT_FOUND"
  | "EMAIL_NOT_VERIFIED"
  | "EMAIL_ALREADY_EXISTS"
  | "WEAK_PASSWORD"
  | "EXPIRED_LAUNCHER_AUTH_REQUEST"
  | "OAUTH_CANCELED"
  | "SERVER_ERROR"
  | "NETWORK_ERROR";

export type AuthApiError = {
  ok: false;
  code: AuthApiErrorCode;
  message: string;
};

export type LoginResponse = {
  ok: true;
  user: {
    id: string;
    email: string;
    displayName?: string;
  };
};

export type SignupResponse = {
  ok: true;
  verificationRequired?: boolean;
  email?: string;
};

const getAuthApiBaseUrl = () => {
  const explicitBase =
    import.meta.env.VITE_AUTH_API_BASE_URL ??
    import.meta.env.VITE_PAYMENT_API_BASE_URL ??
    import.meta.env.VITE_API_BASE_URL ??
    "";
  return explicitBase.replace(/\/$/, "");
};

const buildAuthApiUrl = (path: string) => `${getAuthApiBaseUrl()}${path}`;

async function postAuthJson<T>(path: string, body: Record<string, string>): Promise<T | AuthApiError> {
  try {
    const response = await fetch(buildAuthApiUrl(path), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(body),
    });

    const payload = (await response.json()) as T | AuthApiError;
    if (!response.ok) {
      return payload as AuthApiError;
    }

    return payload;
  } catch {
    return {
      ok: false,
      code: "NETWORK_ERROR",
      message: "Unable to reach the auth backend.",
    };
  }
}

export const loginWithPassword = (body: {
  email: string;
  password: string;
  source?: string;
  launcherRequest?: string;
}) =>
  postAuthJson<LoginResponse>("/api/auth/login", {
    email: body.email,
    password: body.password,
    source: body.source ?? "",
    launcherRequest: body.launcherRequest ?? "",
  });

export const signupWithPassword = (body: {
  email: string;
  password: string;
  displayName?: string;
  source?: string;
  launcherRequest?: string;
}) =>
  postAuthJson<SignupResponse>("/api/auth/signup", {
    email: body.email,
    password: body.password,
    displayName: body.displayName ?? "",
    source: body.source ?? "",
    launcherRequest: body.launcherRequest ?? "",
  });

export const readLauncherContext = (search: string): LauncherContext => {
  const params = new URLSearchParams(search);
  return {
    source: params.get("source"),
    launcherRequest: params.get("launcherRequest"),
  };
};

export const withLauncherContext = (pathname: string, search: string) => {
  const params = new URLSearchParams();
  const context = readLauncherContext(search);

  if (context.source) {
    params.set("source", context.source);
  }

  if (context.launcherRequest) {
    params.set("launcherRequest", context.launcherRequest);
  }

  const query = params.toString();
  return query ? `${pathname}?${query}` : pathname;
};
