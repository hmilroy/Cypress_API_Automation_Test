describe("Get a Single Pet and Validate Response", () => {
  it("should create a new pet successfully", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:8080/api/v3/pet", // Adjust if needed
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        id: 8,
        name: "Snake",
        photoUrls: ["http://example.com/photo1.jpg"],
        tags: [
          {
            id: 0,
            name: "Appless",
          },
        ],
        status: "available",
      },
      failOnStatusCode: false, // Allows us to see the full response if it fails
    }).then((response) => {
      // Typically expect a 200 or 201 on successful creation
      expect(response.status).to.be.oneOf([200, 201]);

      // Validate the response body
      expect(response.body).to.have.property("id");
      expect(response.body).to.have.property("name", "Snake");
      expect(response.body).to.have.property("status", "available");

      // Optional: log the response for debugging
      cy.log(JSON.stringify(response.body));
    });
  });

  it("POST (create) a new pet", () => {
    const newPet = {
      id: 1234,
      name: "Fluffy",
      photoUrls: ["http://example.com/photo1.jpg"],
      status: "available",
    };
  });

  it("should retrieve pet with id 1 and validate its properties", () => {
    cy.request("http://localhost:8080/api/v3/pet/8").then((response) => {
      // Check the response status
      expect(response.status).to.eq(200);

      // Get the pet object from the response
      const pet = response.body;

      // Validate top-level properties
      expect(pet).to.have.property("id", 8);
      expect(pet).to.have.property("name", "Snake");
      expect(pet).to.have.property("status", "available");



      // // Validate the photoUrls array
      expect(pet.photoUrls).to.be.an("array").and.to.have.length(1);
      expect(pet.photoUrls).to.deep.equal(["http://example.com/photo1.jpg"]);

      // // Validate the tags array and its objects
      expect(pet.tags).to.be.an("array").and.to.have.length(1);
      expect(pet.tags[0]).to.have.property("id", 0);
      expect(pet.tags[0]).to.have.property("name", "Appless");

    });
  });


});
