import { DataStateErrors } from './data.state.errors';

/**
 * Represents the state of a data fetching process.
 *
 * @template T The type of data being managed by the state.
 *
 * @property {('idle'|'loading'|'failed'|'success')} status
 * Indicates the current status of the data fetching process.
 * - 'idle': No operation is in progress.
 * - 'loading': Data is currently being fetched.
 * - 'failed': The data fetch operation failed.
 * - 'success': Data fetch operation completed successfully.
 *
 * @property {T|null} data
 * Holds the data after a successful fetch. If no data is available or the
 * fetch is not successful, this will be null.
 *
 * @property {DataStateErrors} errors
 * Contains error-related information when the fetch operation fails.
 */
export interface DataState<T> {
  status: 'idle' | 'loading' | 'failed' | 'success';
  data: T | null;
  errors: DataStateErrors;
}