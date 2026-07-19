import { API_BASE_URL } from "./constants";

interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

class APIClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  private async request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { params, ...fetchOptions } = options;
    
    let url = `${this.baseUrl}${endpoint}`;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    const response = await fetch(url, {
      ...fetchOptions,
      headers: {
        "Content-Type": "application/json",
        ...fetchOptions.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text().catch(() => "Unknown error");
      throw new Error(`API Error ${response.status}: ${error}`);
    }

    return response.json();
  }

  // Paper endpoints
  async importPaper(data: { source: string; identifier: string }) {
    return this.request("/api/papers/import", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getPapers() {
    return this.request<unknown[]>("/api/papers");
  }

  async getPaper(id: string) {
    return this.request(`/api/papers/${id}`);
  }

  // Graph endpoints
  async searchGraph(query: string) {
    return this.request("/api/graph/search", { params: { q: query } });
  }

  async getNeighbors(name: string) {
    return this.request(`/api/graph/neighbors/${encodeURIComponent(name)}`);
  }

  async getNode(name: string) {
    return this.request(`/api/graph/node/${encodeURIComponent(name)}`);
  }

  // AI endpoints
  async queryAI(data: { query: string; mode: "research" | "discovery"; context?: string }) {
    return this.request("/api/ai/query", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  // Hypothesis endpoints
  async generateHypothesis(data: {
    objective: string;
    assumptions: string[];
    constraints: string[];
    existing_theories: string[];
  }) {
    return this.request("/api/hypothesis/generate", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async getHypothesis(id: string) {
    return this.request(`/api/hypothesis/${id}`);
  }

  // Verification endpoints
  async verifyClaims(data: { claims: string[] }) {
    return this.request("/api/verify/claims", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

export const api = new APIClient(API_BASE_URL);
