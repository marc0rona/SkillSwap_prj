import { HttpErrorResponse } from '@angular/common/http';

export class ErrorHandler {
  static getErrorMessage(error: HttpErrorResponse): string {
    // erreur envoyée par l'API
    if (error.error?.error) {
      return error.error.error;
    }
  switch (error.status) {
      case 400:
        return "Bad request";
      case 401:
        return "Unauthorized. Please Login";
      case 403:
        return "You are not allowed to do that. stop";
      case 404:
        return "Resource not found";
      case 409:
        return "Conflict with existing data";
      case 0:
        return "Cannot reach the server";
      default:
        return "Unexpected error occurred";
    }
  }
}