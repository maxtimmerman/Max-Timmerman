import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { RecipeListPage } from './pages/RecipeListPage';
import RecipePage from './pages/RecipePage';

export const App = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleBackClick = () => {
    setSelectedRecipe(null);
  };

  return (
    <ChakraProvider>
      {selectedRecipe ? (
        <RecipePage recipe={selectedRecipe} onBackClick={handleBackClick} />
      ) : (
        <RecipeListPage onRecipeClick={handleRecipeClick} />
      )}
    </ChakraProvider>
  );
};
