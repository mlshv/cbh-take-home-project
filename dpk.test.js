const crypto = require("crypto");
const { deterministicPartitionKey } = require("./dpk");

// This function is intentionally duplicated from the dpk.js module
// to ensure that if the hashing logic changes in the implementation,
// it must also be updated here intentionally, and vice versa.
const createHash = (data) => {
  return crypto.createHash("sha3-512").update(data).digest("hex");
};

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();

    expect(trivialKey).toBe("0");
  });

  it("Returns hashed event when partitionKey is undefined", () => {
    const event = { name: "Sample Event", id: 111 };
    const hash = createHash(JSON.stringify(event));

    expect(deterministicPartitionKey(event)).toBe(hash);
  });

  it("Returns partitionKey when it is defined", () => {
    const stringKeyEvent = {
      name: "Some Event Name",
      id: 12,
      partitionKey: "key",
    };
    const zeroKeyEvent = { name: "Some Event Name", id: 12, partitionKey: 0 };

    expect(deterministicPartitionKey(stringKeyEvent)).toBe("key");
    expect(deterministicPartitionKey(zeroKeyEvent)).toBe("0");
  });

  it("Returns stringified partition key if it's not a string", () => {
    const jsonKeyEvent = {
      name: "Some Event Name",
      id: 12,
      partitionKey: { complex: "key" },
    };

    const numberKeyEvent = {
      name: "Some Event Name",
      id: 12,
      partitionKey: 999,
    };

    expect(deterministicPartitionKey(jsonKeyEvent)).toBe(
      JSON.stringify(jsonKeyEvent.partitionKey)
    );

    expect(deterministicPartitionKey(numberKeyEvent)).toBe(
      JSON.stringify(numberKeyEvent.partitionKey)
    );
  });

  it("Returns hashed key if partitionKey length > MAX_PARTITION_KEY_LENGTH", () => {
    const event = {
      name: "Event With Long Partition Key",
      id: 999,
      partitionKey: "k".repeat(257),
    };
    const hash = createHash(event.partitionKey);

    expect(deterministicPartitionKey(event)).toBe(hash);
  });
});
