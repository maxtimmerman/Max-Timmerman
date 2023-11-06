import React from "react";
import {
  Box,
  Button,
  Grid,
  Heading,
  Image,
  Text,
  Badge,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";

const RecipePage = ({ recipe, onBackClick }) => {
  const {
    label,
    image,
    mealType,
    totalTime,
    dietLabels,
    healthLabels,
    cautions,
    ingredientLines,
    yield: servings,
    totalNutrients,
  } = recipe.recipe;

  const nutrientsToDisplay = [
    "ENERC_KCAL",
    "CHOCDF",
    "PROCNT",
    "FAT",
    "CHOLE",
    "NA",
  ];

  const filteredNutrients = Object.keys(totalNutrients)
    .filter((nutrient) => nutrientsToDisplay.includes(nutrient))
    .reduce((obj, key) => {
      const { quantity, unit, label } = totalNutrients[key];

      let formattedQuantity = quantity;
      let formattedUnit = unit;

      if (unit === "g" && quantity < 1) {
        formattedQuantity = Math.round(quantity * 1000);
        formattedUnit = "mg";
      } else if (unit === "g") {
        formattedQuantity = Math.round(quantity);
      } else if (unit === "mg") {
        formattedQuantity = Math.round(quantity);
      }

      if (key === "ENERC_KCAL") {
        formattedQuantity = Math.round(quantity);
        formattedUnit = "KCAL";
      } else if (unit === "g" && quantity < 1) {
        formattedQuantity = Math.round(quantity * 1000);
        formattedUnit = "mg";
      } else if (unit === "g") {
        formattedQuantity = Math.round(quantity);
      } else if (unit === "mg") {
        formattedQuantity = Math.round(quantity);
      }

      obj[key] = {
        label: `${formattedQuantity} ${formattedUnit} ${label}`,
        quantity,
        unit,
      };
      return obj;
    }, {});

  return (
    <Box bg="blue.500">
      <Box bg="white" maxW="800px" w="80%" m="auto">
        <Button
          onClick={onBackClick}
          mb="4"
          leftIcon={<ChevronLeftIcon />}
          variant="ghost"
          m="20px"
          color="blue.600"
        ></Button>
        <Grid templateColumns={["1fr", "1fr", "1fr 1fr"]} gap={4}>
          <Box gridColumn={["1", "1", "span 2"]}>
            <Image
              src={image}
              alt={label}
              w="100%"
              maxH="300px"
              objectFit="cover"
              mb="4"
            />
          </Box>
          <Box m="5">
            <Text color="grey" fontWeight="bold">
              {mealType} {<ArrowRightIcon />} {recipe.recipe.dishType}
            </Text>
            <Heading mt="2" size="md">
              {label}
            </Heading>
            <Text mt="4">Total Cooking Time: {totalTime} minutes</Text>
            <Text mt="1">Servings: {servings}</Text>
            <Heading size="md" mt="4">
              Ingredients:
            </Heading>
            <UnorderedList listStyleType="none" ml="0">
              {ingredientLines.map((ingredient, index) => (
                <ListItem mt="2" key={index}>
                  {ingredient}
                </ListItem>
              ))}
            </UnorderedList>
          </Box>
          <Box m="5">
            <Heading size="sm">Health Labels:</Heading>
            <Box>
              {healthLabels.map((label, index) => (
                <Badge key={index} colorScheme="teal" mb="1" mr="1">
                  {label}
                </Badge>
              ))}
            </Box>
            <Heading size="sm" mt="4">
              Diet Labels:
            </Heading>
            <Box>
              {dietLabels.map((label, index) => (
                <Badge key={index} colorScheme="green" mb="1" mr="1">
                  {label}
                </Badge>
              ))}
            </Box>
            <Heading size="sm" mt="4">
              Cautions:
            </Heading>
            <Box>
              {cautions.map((label, index) => (
                <Badge key={index} colorScheme="red" mb="1" mr="1">
                  {label}
                </Badge>
              ))}
            </Box>
            <Heading size="sm" mt="4">
              Total Nutrients:
            </Heading>
            <Box>
              {Object.keys(filteredNutrients).map((nutrient, index) => (
                <Badge
                  key={index}
                  colorScheme="gray"
                  mb="2"
                  mr="1"
                  h="auto"
                  flexDirection="column"
                  textAlign="center"
                >
                  <Text fontSize="small" fontWeight="bold">
                    {filteredNutrients[nutrient].label}
                  </Text>
                </Badge>
              ))}
            </Box>
          </Box>
        </Grid>
      </Box>
    </Box>
  );
};

export default RecipePage;
