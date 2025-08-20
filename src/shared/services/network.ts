import axios, { type AxiosInstance, type AxiosRequestConfig, type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';

const ENV_TOKEN = (import.meta as any).env?.VITE_BEARER_TOKEN;

export class HttpRequest {
  private axiosInstance: AxiosInstance;
  private bearerToken: string;

  constructor(initialToken: string = ENV_TOKEN) {
    this.bearerToken = initialToken;
    this.axiosInstance = axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      timeout: 15000
    });
    this.axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  
      config.headers = (config.headers ?? ({} as any)) as any;
      (config.headers as any)['X-Bin-Meta'] = 'false';
      if (this.bearerToken) {
        // (config.headers as any)['X-Access-Key'] = this.bearerToken;
        (config.headers as any)['X-Master-Key'] = this.bearerToken;
      }
      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: unknown) => Promise.reject(error)
    );
  }

  public setToken(token: string) {
    this.bearerToken = token ?? '';
  }

  public async get<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const res = await this.axiosInstance.get<T>(url, config);
    return res.data as T;
  }

  public get client(): AxiosInstance {
    return this.axiosInstance;
  }
}

export const httpRequest = new HttpRequest(ENV_TOKEN);


// Backward-compatible helper
export async function doget<T = unknown>(url: string, config?: AxiosRequestConfig): Promise<T> {
  return httpRequest.get<T>(url, config);
}

export default httpRequest;


