const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://anmoolbackend-production.up.railway.app/api";

export function getAssetUrl(path?: string) {
  if (!path) return undefined;
  if (/^https?:\/\//.test(path)) return path;
  const origin = API_BASE.replace(/\/api$/, "");
  return `${origin}${path}`;
}

function autoLogout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("anmool_token");
    localStorage.removeItem("dp_token");
    window.location.href = "/login?expired=1";
  }
}

function dpAutoLogout() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("dp_token");
    window.location.href = "/delivery/login";
  }
}

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("anmool_token") || localStorage.getItem("dp_token");
}

function isDpToken() {
  if (typeof window === "undefined") return false;
  return !localStorage.getItem("anmool_token") && !!localStorage.getItem("dp_token");
}

async function request(path: string, options: RequestInit = {}) {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await res.json();
  if (res.status === 401) {
    if (isDpToken()) dpAutoLogout();
    else autoLogout();
    throw new Error("Session expired. Please login again.");
  }
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

async function uploadFile(path: string, file: File) {
  const token = getToken();
  const formData = new FormData();
  formData.append("avatar", file);

  const headers: Record<string, string> = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers,
    body: formData,
  });
  const data = await res.json();
  if (res.status === 401) {
    if (isDpToken()) dpAutoLogout();
    else autoLogout();
    throw new Error("Session expired. Please login again.");
  }
  if (!res.ok) throw new Error(data.message || "Upload failed");
  return data;
}

export const api = {
  // Auth
  login: (email: string, password: string) =>
    request("/auth/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  register: (body: { name: string; email: string; password: string; phone?: string; address?: string }) =>
    request("/auth/register", { method: "POST", body: JSON.stringify(body) }),
  getMe: () => request("/auth/me"),
  updateProfile: (body: { name?: string; phone?: string; address?: string }) =>
    request("/auth/profile", { method: "PUT", body: JSON.stringify(body) }),
  uploadAvatar: (file: File) => uploadFile("/auth/avatar", file),

  // Products
  getProducts: (params?: Record<string, string>) => {
    const q = params ? "?" + new URLSearchParams(params).toString() : "";
    return request(`/products${q}`);
  },
  getProduct: (id: string) => request(`/products/${id}`),
  createProduct: (body: Record<string, unknown>) =>
    request("/products", { method: "POST", body: JSON.stringify(body) }),
  updateProduct: (id: string, body: Record<string, unknown>) =>
    request(`/products/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteProduct: (id: string) =>
    request(`/products/${id}`, { method: "DELETE" }),

  // Orders
  createOrder: (body: Record<string, unknown>) =>
    request("/orders", { method: "POST", body: JSON.stringify(body) }),
  getOrders: () => request("/orders"),
  getOrder: (id: string) => request(`/orders/${id}`),
  updateOrderStatus: (id: string, status: string, cancelReason?: string) =>
    request(`/orders/${id}/status`, { method: "PUT", body: JSON.stringify({ status, cancelReason }) }),
  hideOrder: (id: string) =>
    request(`/orders/${id}/hide`, { method: "PUT" }),
  cancelOrder: (id: string) =>
    request(`/orders/${id}`, { method: "DELETE" }),

  // Coins
  getCoinPackages: () => request("/coins/packages"),
  getCoinBalance: () => request("/coins/balance"),
  buyCoins: (packageId: string) =>
    request("/coins/buy", { method: "POST", body: JSON.stringify({ packageId }) }),

  // Admin
  getDashboard: () => request("/admin/dashboard"),
  getAdminUsers: () => request("/admin/users"),
  getAdminOrders: () => request("/admin/orders"),
  getAdminOrdersFiltered: (date?: string, timeSlot?: string) => {
    const params = new URLSearchParams();
    if (date) params.set("date", date);
    if (timeSlot) params.set("timeSlot", timeSlot);
    const q = params.toString() ? `?${params.toString()}` : "";
    return request(`/admin/orders${q}`);
  },
  getTodayOrders: () => request("/admin/orders/today"),
  getProductSummary: (date?: string, timeSlot?: string) => {
    const params = new URLSearchParams();
    if (date) params.set("date", date);
    if (timeSlot) params.set("timeSlot", timeSlot);
    const q = params.toString() ? `?${params.toString()}` : "";
    return request(`/admin/orders/product-summary${q}`);
  },
  getAdminCoinPackages: () => request("/admin/coin-packages"),
  createCoinPackage: (body: Record<string, unknown>) =>
    request("/admin/coin-packages", { method: "POST", body: JSON.stringify(body) }),
  deleteCoinPackage: (id: string) =>
    request(`/admin/coin-packages/${id}`, { method: "DELETE" }),

  // Delivery Partners (Admin)
  getDeliveryPartners: () => request("/delivery-partners"),
  createDeliveryPartner: (body: { name: string; email: string; password: string; phone: string; timeSlots: string[] }) =>
    request("/delivery-partners", { method: "POST", body: JSON.stringify(body) }),
  updateDeliveryPartner: (id: string, body: { name?: string; phone?: string; timeSlots?: string[]; active?: boolean }) =>
    request(`/delivery-partners/${id}`, { method: "PUT", body: JSON.stringify(body) }),
  deleteDeliveryPartner: (id: string) =>
    request(`/delivery-partners/${id}`, { method: "DELETE" }),
  assignOrders: (date?: string) =>
    request("/delivery-partners/assign-orders", { method: "POST", body: JSON.stringify({ date }) }),

  // Delivery Partner Portal
  dpLogin: (email: string, password: string) =>
    request("/delivery-partners/login", { method: "POST", body: JSON.stringify({ email, password }) }),
  dpGetMe: () => request("/delivery-partners/me"),
  dpGetMyOrders: (date?: string) => {
    const q = date ? `?date=${date}` : "";
    return request(`/delivery-partners/my-orders${q}`);
  },
  dpGetMySummary: (date?: string) => {
    const q = date ? `?date=${date}` : "";
    return request(`/delivery-partners/my-summary${q}`);
  },
  dpUpdateOrderStatus: (orderId: string, status: string) =>
    request(`/delivery-partners/orders/${orderId}/status`, { method: "PUT", body: JSON.stringify({ status }) }),
};
