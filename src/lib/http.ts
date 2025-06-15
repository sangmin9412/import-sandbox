import axios, { AxiosInstance, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from "axios";

interface ErrorResponse {
  message: string;
  status: number;
}

interface RequestParams {
  [key: string]: string | number | boolean | null | undefined;
}

// RequestData를 유연하게 수정
type RequestData = Record<string, unknown> | unknown;

class HttpClient {
  private instance: AxiosInstance;

  constructor(baseURL: string = process.env.NEXT_PUBLIC_API_URL || "") {
    const _baseURL = typeof window !== "undefined" ? "" : baseURL;
    this.instance = axios.create({
      baseURL: _baseURL,
      timeout: 30000,
      headers: {
        "Content-Type": "application/json"
      }
    });

    this.initializeInterceptors();
  }

  private initializeInterceptors() {
    // Request interceptor
    this.instance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // You can add auth token here
        // const token = localStorage.getItem("token");
        // if (token && config.headers) {
        //   config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => response,
      (error: AxiosError) => {
        const errorResponse: ErrorResponse = {
          message: this.extractErrorMessage(error),
          status: error.response?.status || 500
        };
        return Promise.reject(errorResponse);
      }
    );
  }

  async get<T>(url: string, params?: RequestParams): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.instance.get(url, {
        params
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async post<T>(url: string, data?: RequestData): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.instance.post(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async put<T>(url: string, data?: RequestData): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.instance.put(url, data);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  async delete<T>(url: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.instance.delete(url);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: unknown): ErrorResponse {
    if (error && typeof error === "object" && "status" in error) {
      return error as ErrorResponse;
    }
    const axiosError = error as AxiosError;
    return {
      message: this.extractErrorMessage(axiosError),
      status: axiosError.response?.status || 500
    };
  }

  private extractErrorMessage(error: AxiosError): string {
    // 서버에서 전송한 에러 메시지 추출
    if (error.response?.data) {
      const data = error.response.data;

      // 일반적인 서버 에러 메시지 형태들을 확인
      if (typeof data === "string") {
        return data;
      }

      if (data && typeof data === "object") {
        const errorData = data as Record<string, unknown>;

        if (typeof errorData.message === "string") {
          return errorData.message;
        }

        if (typeof errorData.error === "string") {
          return errorData.error;
        }

        if (typeof errorData.details === "string") {
          return errorData.details;
        }
      }
    }

    // 서버 에러 메시지가 없으면 기본 메시지 사용
    return error.message || "알 수 없는 에러가 발생했습니다.";
  }
}

// 기본 인스턴스 생성 및 내보내기
const httpClient = new HttpClient();
export default httpClient;

// 사용자 정의 인스턴스를 위한 클래스 내보내기
export { HttpClient };
