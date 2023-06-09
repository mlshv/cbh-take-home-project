const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();

    expect(trivialKey).toBe("0");
  });

  it("Returns hashed event when partitionKey is undefined", () => {
    const event = { name: "Sample Event", id: 111 };
    const hash = require("crypto")
      .createHash("sha3-512")
      .update(JSON.stringify(event))
      .digest("hex");

    expect(deterministicPartitionKey(event)).toBe(hash);
  });

  it("Returns partitionKey when it is defined", () => {
    const event = { name: "Some Event Name", id: 12, partitionKey: "key" };

    expect(deterministicPartitionKey(event)).toBe("key");
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
    const hash = require("crypto")
      .createHash("sha3-512")
      .update(event.partitionKey)
      .digest("hex");

    expect(deterministicPartitionKey(event)).toBe(hash);
  });
});
