/**
 * Represents the properties for a modal container component.
 *
 * @interface ModalContainerProperties
 *
 * @property {boolean} open Indicates whether the modal is open.
 * @property {() => void} onClose Callback invoked when the modal is requested to close.
 */
export interface ModalContainerProperties {
  open: boolean;
  onClose: () => void;
}