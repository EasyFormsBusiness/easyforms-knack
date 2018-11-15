const Knack = require("../classes/knack");
const assert = require("assert");

describe("Testing Knack module", () => {
  // Using Epic360.old
  const id = "5983ba77203a0e5c3aed6550";
  const key = "35193a40-78bc-11e7-abce-854d0143ec1e";
  const objectNo = "object_1";

  const body = {
    field_1: "string",
    field_2: 0
  };

  let knack = new Knack(key, id);
  knack.debug = true;

  describe("Testing CRUD", () => {
    let newObj;

    describe("Testing read", () => {
      it("Should read all the records from a table", async () => {
        await knack.get("object_1");
      });
    });

    describe("Testing read one", () => {
      it("Should one record from a table", async () => {
        console.log(await knack.getOne("object_1", "5bdba448e3200d47b68e9071"));
      });
    });

    describe("Testing create", () => {
      it("Should create an object", async () => {
        newObj = await knack.create(objectNo, {
          field_1: "string",
          field_2: 0,
          field_3: { first: "Taylor", last: "Kettle" }
        });
        console.log(newObj);
      });

      it("Should throw an error if no body is passed", async () => {
        try {
          await knack.create(objectNo);
          throw new Error("Did not throw an error for no body");
        } catch (error) {
          assert.equal(error.message, "You must pass a body");
        }
      });

      it("Should throw an error if no object number is passed", async () => {
        try {
          await knack.create();
          throw new Error("Did not throw an error for no object number");
        } catch (error) {
          assert.equal(error.message, "You must pass an object number");
        }
      });

      it("Testing create of multiple objects at once", async () => {
        let promises = [];
        for (let index = 0; index < 10; index++) {
          promises.push(
            knack.create(objectNo, {
              field_1: "string",
              field_2: 0,
              field_3: { first: "Taylor", last: "Kettle" }
            })
          );
        }
        await Promise.all(promises);
      });
    });
    describe("Testing update", () => {
      it("Should update an object", async () => {
        console.log(
          await knack.update(objectNo, newObj.id, {
            field_1: "stringstring",
            field_2: 1,
            field_3: { first: "Kaylor", last: "Tettle" }
          })
        );
      });
    });

    describe("Testing upsert", () => {
      it("Should upsert the object", async () => {
        console.log(
          await knack.upsert(objectNo, {
            field_1: "stringstring",
            field_2: 1,
            field_3_raw: "Kaylor Tettle"
          })
        );
      });
    });

    describe("Testing search", () => {
      it("Should find the updated object", async () => {
        console.log(
          (await knack.search(
            objectNo,
            {
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
            },
            "field_1",
            "asc"
          )).length
        );
      });
    });

    describe("Testing delete", () => {
      it("Should delete the created object", async () => {
        console.log(await knack.delete(objectNo, newObj.id));
      });
    });
  });
});
