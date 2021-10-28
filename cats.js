import * as yup from "yup";
// Family of cats
export const cats = {
  1: {
    name: "Sennacy",
    furColor: "black",
    favoriteFood: "turkey giblets",
  },

  2: {
    name: "Nana",
    furColor: "multi-color",
    favoriteFood: "beef paté",
  },

  3: {
    name: "Muezza",
    furColor: "orange",
    favoriteFood: "lamb chops",
  },

  4: {
    name: "Keyboard Cat",
    furColor: "gray",
    favoriteFood: "everything bagels",
  },
};

const schema = yup.object().shape({
  name: yup.string().required("Name required").max(25),
  furColor: yup.string().required("Every kitty has a color").max(10),
  favoriteFood: yup
    .string()
    .required("Every kitty gotta eat")
    .oneOf(["turkey giblets", "beef paté", "lamb chops", "everything bagels"]),
});

// Note: this function is async as it simulates the async nature of many real-world back ends
export const getCat = async (catId) => {
  if (!cats[catId]) {
    return undefined;
  } else {
    return cats[catId];
  }
};

export const getCats = async () => {
  return cats;
};

export const deleteCat = async (catId) => {
  if (!cats[catId]) {
    return undefined;
  } else {
    delete cats[catId];
    return cats;
  }
};

export const validateCat = async (cat) => {
  await schema.validate(cat);
};


