/**
 * Obfuscates sensitive information in a URL.
 * @param url - The URL to obfuscate.
 * @returns The obfuscated URL as a string.
 */
export function obfuscateUrl(url: string | URL): string {
  const parsedUrl = url instanceof URL ? url : new URL(url);

  // Obfuscate password
  if (parsedUrl.password) {
    parsedUrl.password = "***";
  }

  // Obfuscate query params
  parsedUrl.searchParams.forEach((value, key) => {
    if (value.length > 3) {
      parsedUrl.searchParams.set(key, `${value.substring(0, 3)}***`);
    } else {
      parsedUrl.searchParams.set(key, "***");
    }
  });

  // Obfuscate path
  parsedUrl.pathname = parsedUrl.pathname
    .split("/")
    .map((segment) => {
      if (["", "webhooks", "webhook", "api"].includes(segment)) {
        return segment;
      }
      if (segment.length > 3) {
        return `${segment.substring(0, 3)}***`;
      }
      return "***";
    })
    .join("/");

  return parsedUrl.toString();
}

/**
 * Checks if a given URL is valid.
 *
 * @param url - The URL to validate.
 * @returns A boolean indicating whether the URL is valid or not.
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}
