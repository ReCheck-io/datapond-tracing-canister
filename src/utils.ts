import { Principal } from "azle";
import { v4 as uuidv4 } from "uuid";

import { ErrorType } from "./types";
import { POSSIBLE_ACTIONS } from "./constants";

/**
 * Generate an ID of a type Principal.
 * @returns a Principal ID.
 */
export function generateId(): Principal {
  // Generate a UUID as a string
  const uuidString = uuidv4();

  // Convert the UUID string to a Uint8Array
  const encoder = new TextEncoder();
  const uuidBytes = encoder.encode(uuidString);

  // Convert the UUID bytes to a Principal
  const uuidPrincipal = Principal.fromUint8Array(Uint8Array.from(uuidBytes));

  return uuidPrincipal;
}

/**
 * Helper function to handle and format errors consistently.
 * @param error - The caught error.
 * @returns The formatted error object.
 */
export function handleError(error: any): ErrorType {
  // Check if the error is an object and has a recognized key
  if (error && typeof error === "object") {
    const keys = Object.keys(error); // Get keys from the error object

    // Check if the error contains a known variant key
    if (keys.includes("NotFound")) {
      return { NotFound: error.NotFound };
    } else if (keys.includes("Conflict")) {
      return { Conflict: error.Conflict };
    } else if (keys.includes("Unauthorized")) {
      return { Unauthorized: error.Unauthorized };
    } else if (keys.includes("InvalidPayload")) {
      return { InvalidPayload: error.InvalidPayload };
    }
  }

  // Default error if structure doesn't match or no known variants are found
  return { InvalidPayload: "An unknown error occurred." };
}

/**
 * Helper function to validate that the provided action is one of the POSSIBLE_ACTIONS.
 * @param action - The action to validate.
 * @returns An Error if invalid, otherwise null.
 */
export function validateAction(action: string): void {
  if (!action || action === "") {
    throw {
      InvalidPayload: `Action type could not be empty. Use one of: ${POSSIBLE_ACTIONS.join(
        ", ",
      )}`,
    };
  } else if (!POSSIBLE_ACTIONS.includes(action.toLowerCase())) {
    throw {
      InvalidPayload: `'${action}' is not supported. Use one of: ${POSSIBLE_ACTIONS.join(
        ", ",
      )}`,
    };
  }
}
