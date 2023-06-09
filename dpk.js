const crypto = require("crypto");

const TRIVIAL_PARTITION_KEY = "0";
const MAX_PARTITION_KEY_LENGTH = 256;

const createHash = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
};

const stringifyIfNeeded = (data) => {
  return typeof data === "string" ? data : JSON.stringify(data);
};

const isValidPartitionKey = (key) => {
  return key === 0 || (key && key !== "");
};

/**
 * @typedef {Object} Event
 * @property {string} name - The name of the event.
 * @property {number} id - The unique identifier of the event.
 * @property {string} [partitionKey] - The partition key for the event. If not provided, a hash of the event will be used.
 */

/**
 * Determines a partition key based on the provided event.
 * If the event is null or undefined, it returns a trivial partition key "0".
 * If the event contains a partitionKey property, it will be returned as the partition key.
 * If partitionKey is not provided, a hash of the entire event object will be returned.
 * If the partitionKey or the hash of the event object is longer than the max partition key length,
 * it returns a hash of the partitionKey or event object.
 *
 * @param {Event} event
 * @returns {string} - The determined partition key.
 */
exports.deterministicPartitionKey = (event) => {
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  if (!isValidPartitionKey(event.partitionKey)) {
    return createHash(JSON.stringify(event));
  }

  const candidate = stringifyIfNeeded(event.partitionKey);

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    return createHash(candidate);
  }

  return candidate;
};
