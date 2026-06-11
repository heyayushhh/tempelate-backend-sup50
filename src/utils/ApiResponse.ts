export class ApiSuccessResponse<T> {
  public success: boolean = true;
  constructor(
    public message: string,
    public data: T,
    public statusCode: number = 200
  ) {}
}

export class ApiErrorResponse {
  public success: boolean = false;
  constructor(
    public message: string,
    public errors: any[] = [],
    public statusCode: number = 500
  ) {}
}
