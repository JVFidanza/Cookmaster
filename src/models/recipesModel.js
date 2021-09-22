const { ObjectId } = require('mongodb');
const connection = require('./connection');

// const getRecipe = async (id) => {
//   const db = await connection();
//   const result = await db.collection('recipes').find({ _id: ObjectId(id) }).toArray();
//   return result;
// };

const create = async ({ email, name, ingredients, preparation }) => {
  const db = await connection();
  const { _id } = await db.collection('users').findOne({ email });
  const result = await db.collection('recipes').insertOne({
    name,
    ingredients,
    preparation, 
    userId: _id,
  });
  return { recipe: result.ops[0] };
};

const getRecipes = async () => {
  const db = await connection();
  const result = await db.collection('recipes').find().toArray();
  return result;
};

const getRecipeById = async (id) => {
  const db = await connection();
  const result = await db.collection('recipes').findOne(ObjectId(id));
  return result;
};

const edit = async ({ name, ingredients, preparation, recipeId }) => {
  const db = await connection();
  await db.collection('recipes').updateOne({ _id: ObjectId(recipeId) },
  { $set: { name, ingredients, preparation } });
  // console.log(result);
  return { _id: recipeId, name, ingredients, preparation };
};

module.exports = {
  create,
  getRecipes,
  getRecipeById,
  edit,
};