/**
 * Represents the properties for configuring the content of a modal component.
 *
 * This interface defines the callback functions that can be executed
 * based on modal-related actions such as success or failure.
 *
 * Properties:
 * - `onSuccess`: An optional callback function that will be invoked when the modal operation is successful.
 * - `onFailure`: An optional callback function that will be invoked when the modal operation fails.
 */
export interface ModalContentsProperties {
  onSuccess?: () => void;
  onFailure?: () => void;
}