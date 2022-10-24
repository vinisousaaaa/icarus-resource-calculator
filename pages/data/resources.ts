export const resources = [
  {
    id: "resource-iron-ore",
    name: "Iron Ore",
  },
  {
    id: "resource-iron-ingot",
    name: "Iron Ingot",
    createdFrom: [
      {
        resourceId: "resource-iron-ore",
        amount: 2,
      },
    ],
    createdWith: [
      {
        benchId: "bench-stone-furnace",
      },
    ],
  },
  {
    id: "resource-stick",
    name: "Stick",
  },
  {
    id: "resource-wood",
    name: "Wood",
  },
  {
    id: "resource-stone",
    name: "Stone",
  },
  {
    id: "resource-leather",
    name: "Leather",
  },
  {
    id: "resource-fiber",
    name: "Fiber",
  },
];