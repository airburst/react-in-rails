import { AppError } from "../AppError";

export class RequestError extends AppError {
  name = "RequestError";

  constructor(requestName?: string, options?: ErrorOptions) {
    super(`Request failed: ${requestName}`, options);
  }
}
