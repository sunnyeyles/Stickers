import { faker } from "@faker-js/faker";
import { Item } from "../models/model";
//// SEED THE ITEMS COLLECTION IN DB
export const seedItems = (numOfEntries: number) => {
  //   const items: object[] = [];

  for (let i = 0; i < numOfEntries; i++) {
    // randomly choose if the item is reduced or not
    const isReduced = Math.random() <= 0.2;

    // create a random amount the item is reduced by
    const createReducedByValue = () => {
      if (isReduced) {
        const reducedBy = Math.floor(Math.random() * 100);
        return reducedBy;
      }
      return 0;
    };
    const ifReduced = createReducedByValue();

    const fakeItem: object = {
      itemName: faker.commerce.productName(),
      itemPrice: faker.commerce.price({ min: 100, max: 200 }),
      itemCategory: faker.commerce.department(),
      itemsInStock: faker.number.int(100),
      reduced: isReduced,
      percentageReduced: ifReduced,
    };
    Item.create(fakeItem);
  }
};
