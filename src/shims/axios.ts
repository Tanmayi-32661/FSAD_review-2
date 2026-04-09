type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type RequestConfig = {
  baseURL?: string;
  url?: string;
  method?: Method;
  headers?: Record<string, string>;
  data?: any;
};

type SuccessHandler<T> = (value: T) => T | Promise<T>;
type ErrorHandler = (error: any) => any;

type InterceptorStore<T> = {
  handlers: { onFulfilled?: SuccessHandler<T>; onRejected?: ErrorHandler }[];
  use: (onFulfilled?: SuccessHandler<T>, onRejected?: ErrorHandler) => number;
};

const createInterceptorStore = <T,>(): InterceptorStore<T> => {
  const handlers: { onFulfilled?: SuccessHandler<T>; onRejected?: ErrorHandler }[] = [];
  return {
    handlers,
    use(onFulfilled, onRejected) {
      handlers.push({ onFulfilled, onRejected });
      return handlers.length - 1;
    },
  };
};

const buildUrl = (baseURL = "", url = "") => {
  if (url.startsWith("http")) {
    return url;
  }
  return `${baseURL}${url}`;
};

const parseBody = async (response: Response) => {
  const contentType = response.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    return response.json();
  }
  return response.text();
};

const applySuccessHandlers = async <T,>(
  value: T,
  handlers: { onFulfilled?: SuccessHandler<T>; onRejected?: ErrorHandler }[]
) => {
  let next = value;
  for (const handler of handlers) {
    if (handler.onFulfilled) {
      next = await handler.onFulfilled(next);
    }
  }
  return next;
};

const applyErrorHandlers = async (
  error: any,
  handlers: { onFulfilled?: SuccessHandler<any>; onRejected?: ErrorHandler }[]
) => {
  let currentError = error;
  for (const handler of handlers) {
    if (handler.onRejected) {
      try {
        return await handler.onRejected(currentError);
      } catch (nextError) {
        currentError = nextError;
      }
    }
  }
  throw currentError;
};

const create = (defaults: RequestConfig = {}) => {
  const requestInterceptors = createInterceptorStore<RequestConfig>();
  const responseInterceptors = createInterceptorStore<any>();

  const request = async (config: RequestConfig) => {
    const merged = await applySuccessHandlers(
      {
        ...defaults,
        ...config,
        headers: {
          ...(defaults.headers ?? {}),
          ...(config.headers ?? {}),
        },
      },
      requestInterceptors.handlers
    );

    const url = buildUrl(merged.baseURL, merged.url);
    const isFormData = typeof FormData !== "undefined" && merged.data instanceof FormData;
    const requestHeaders = { ...(merged.headers ?? {}) };
    if (isFormData) {
      delete requestHeaders["Content-Type"];
      delete requestHeaders["content-type"];
    }

    const response = await fetch(url, {
      method: merged.method,
      headers: isFormData ? requestHeaders : { "Content-Type": "application/json", ...requestHeaders },
      body: merged.data
        ? isFormData
          ? merged.data
          : JSON.stringify(merged.data)
        : undefined,
    });

    const data = await parseBody(response);
    const axiosResponse = { data, status: response.status, headers: response.headers, config: merged };

    if (!response.ok) {
      return applyErrorHandlers({ response: axiosResponse, message: response.statusText }, responseInterceptors.handlers);
    }

    return applySuccessHandlers(axiosResponse, responseInterceptors.handlers);
  };

  return {
    interceptors: {
      request: requestInterceptors,
      response: responseInterceptors,
    },
    request,
    get(url: string, config: RequestConfig = {}) {
      return request({ ...config, url, method: "GET" });
    },
    post(url: string, data?: any, config: RequestConfig = {}) {
      return request({ ...config, url, data, method: "POST" });
    },
    put(url: string, data?: any, config: RequestConfig = {}) {
      return request({ ...config, url, data, method: "PUT" });
    },
    patch(url: string, data?: any, config: RequestConfig = {}) {
      return request({ ...config, url, data, method: "PATCH" });
    },
    delete(url: string, config: RequestConfig = {}) {
      return request({ ...config, url, method: "DELETE" });
    },
  };
};

const axios = { create };

export default axios;
