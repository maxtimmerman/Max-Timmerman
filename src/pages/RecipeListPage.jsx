import { useState } from "react";
import {
  Box,
  Heading,
  Input,
  SimpleGrid,
  Text,
  Badge,
  Image,
} from "@chakra-ui/react";
import { data } from "../utils/data";

export const RecipeListPage = ({ onRecipeClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLabels, setSelectedLabels] = useState([]);

  const handleLabelToggle = (label) => {
    if (selectedLabels.includes(label)) {
      setSelectedLabels(
        selectedLabels.filter((selectedLabel) => selectedLabel !== label)
      );
    } else {
      setSelectedLabels([...selectedLabels, label]);
    }
  };

  const healthLabels = ["Vegan", "Vegetarian", "Pescatarian"];

  return (
    <Box p="4" bg="blue.500" textAlign="center">
      <Heading as="h1" mb="4" color="white" textAlign="center">
        Winc Recipe Checker
      </Heading>
      <Input
        mb="4"
        bg="white"
        maxW="400px"
        placeholder="Search recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Box mb="4">
        <Text fontWeight="bold" color="white">
          Filter by:
        </Text>
        {healthLabels.map((label) => (
          <Badge
            key={label}
            cursor="pointer"
            colorScheme={selectedLabels.includes(label) ? "teal" : "gray"}
            onClick={() => handleLabelToggle(label)}
            mr="2"
          >
            {label}
          </Badge>
        ))}
      </Box>
      <SimpleGrid columns={[1, 2, 4]} spacing={4}>
        {data.hits
          .filter((recipe) => {
            const matchesSearchTerm =
              recipe.recipe.label
                .toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
              selectedLabels.some((label) =>
                recipe.recipe.healthLabels.includes(label)
              );
            const matchesSelectedLabels =
              selectedLabels.length === 0 ||
              selectedLabels.every((label) =>
                recipe.recipe.healthLabels.includes(label)
              );
            return matchesSearchTerm && matchesSelectedLabels;
          })
          .map((recipe, index) => (
            <Box
              key={index}
              p="0"
              borderWidth="0px"
              borderRadius="lg"
              overflow="hidden"
              cursor="pointer"
              transition="transform 0.2s ease-in-out"
              _hover={{
                transform: "scale(1.1)",
              }}
              onClick={() => onRecipeClick(recipe)}
              bg="white"
            >
              <Image
                src={recipe.recipe.image}
                alt={recipe.recipe.label}
                mb="4"
                h="150px"
                w="100%"
                objectFit="cover"
              />
              <Box m="1">
                <Text color="grey" fontWeight="bold" fontSize="smaller" textTransform="uppercase">
                  {recipe.recipe.mealType.join(", ")}
                </Text>
                <Heading size="md">{recipe.recipe.label}</Heading>
                {recipe.recipe.healthLabels.includes("Vegan") && (
                  <Badge colorScheme="purple">Vegan</Badge>
                )}
                {recipe.recipe.healthLabels.includes("Vegetarian") && (
                  <Badge colorScheme="yellow">Vegetarian</Badge>
                )}
                <br></br>
                {recipe.recipe.dietLabels.length > 0 && (
                  <Box mb="2">
                    {recipe.recipe.dietLabels.map((label, idx) => (
                      <Badge key={idx} colorScheme="green" mr="1">
                        {label}
                      </Badge>
                    ))}
                  </Box>
                )}
                <Text>
                  Dish:{" "}
                  <Text as="span" fontWeight="bold" textTransform="capitalize">
                    {recipe.recipe.dishType.join(", ")}
                  </Text>
                </Text>
                {recipe.recipe.cautions.length > 0 && (
                  <Box mb="2">
                    <Text>Cautions:</Text>
                    {recipe.recipe.cautions.map((caution, idx) => (
                      <Badge key={idx} colorScheme="red" mr="1">
                        {caution}
                      </Badge>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          ))}
      </SimpleGrid>
    </Box>
  );
};
