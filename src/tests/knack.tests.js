const Knack = require("../classes/knack");

describe("Testing Knack module", () => {
  const id = "5b60597b64d34e4e8ee836a3";
  const key = "5fc4af70-94bf-11e8-a694-cdbf9f6f6d3c";
  const objectNo = "object_1";

  const body = {
    field_1: "string",
    field_2: 0
  };

  let knack = new Knack(key, id);

  describe("Testing CRUD", () => {
    let newObj;
    it("Should create an object", async () => {
      newObj = await knack.create(objectNo, {
        field_1: "string",
        field_2: 0
      });
      console.log(newObj);
    });

    it("Should update an object", async () => {
      console.log(
        await knack.update(objectNo, newObj.id, {
          field_1: "stringstring",
          field_2: 1
        })
      );
    });

    it("Should find the updated object", async () => {
      console.log(
        await knack.search(objectNo, {
          match: "and",
          rules: [
            {
              field: "field_1",
              operator: "is",
              value: "stringstring"
            },
            {
              field: "field_2",
              operator: "is",
              value: 1
            }
          ]
        })
      );
    });

    it("Should delete the created object", async () => {
      console.log(await knack.delete(objectNo, newObj.id));
    });
  });
});
