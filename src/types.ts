/**
 * Represents the data sent to the webhook.
 */
export interface Data {
  /**
   * The base64 data URL of the screenshot image.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/Data_URIs
   */
  screenshot: string;
  /**
   * The comment associated with the tab.
   */
  comment: string;
  /**
   * The plain text of the selected context.
   */
  contextText: string;
  /**
   * The HTML representation of the selected context.
   * Caution: When inserting HTML into websites, make sure to properly sanitize
   * and validate the input to prevent security vulnerabilities such as cross-site
   * scripting (XSS) attacks.
   */
  contextHtml: string;
  /**
   * An array of meta tags associated with the tab.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/meta
   */
  meta: {
    /**
     * The name attribute of the meta tag.
     */
    name?: string;
    /**
     * The content attribute of the meta tag.
     */
    content?: string;
    /**
     * The media attribute of the meta tag.
     */
    media?: string;
    /**
     * The http-equiv attribute of the meta tag.
     */
    httpEquiv?: string;
  }[];
  /**
   * The selected text.
   */
  selection: string;
  /**
   * The title of the page.
   */
  title: string;
  /**
   * The URL of the page.
   */
  url: string;
}

export interface Webhook {
  /**
   * The URL of the webhook.
   */
  url: string;
  /**
   * The name of the webhook.
   */
  name: string;
}

export function isWebhook(webhook: unknown): webhook is Webhook {
  return (
    typeof webhook === "object" &&
    webhook !== null &&
    "url" in webhook &&
    "name" in webhook &&
    typeof (webhook as Webhook).url === "string" &&
    typeof (webhook as Webhook).name === "string"
  );
}
