// src/component/api/markdownParser.js
export const parseMeatDishMarkdown = (markdownContent, fileName) => {
  // Extract the food name from filename (remove .md extension)
  const foodName = fileName.replace('.md', '');
  
  // Split content into sections
  const sections = markdownContent.split('## ');
  
  // Initialize the food object
  const foodDetail = {
    name: foodName,
    ingredients: [],
    recipe: [],
    taste: '',
    difficulty: ''
  };
  
  // 提取烹饪难度信息
  const difficultyMatch = markdownContent.match(/预估烹饪难度：([★☆]+)/);
  if (difficultyMatch && difficultyMatch[1]) {
    foodDetail.difficulty = difficultyMatch[1];
  }
  
  // Parse each section
  sections.forEach(section => {
    if (section.startsWith('必备原料和工具')) {
      // Extract ingredients
      const lines = section.split('\n');
      
      lines.forEach(line => {
        // Look for the actual ingredients list
        if (line.includes('- ') && !line.includes('工具')) {
          // Extract ingredient names (items starting with "- ")
          const ingredientMatch = line.match(/-\s*(.+)/);
          if (ingredientMatch) {
            foodDetail.ingredients.push(ingredientMatch[1].trim());
          }
        }
      });
    } 
    else if (section.startsWith('操作')) {
      // Extract recipe steps
      const lines = section.split('\n');
      lines.forEach(line => {
        // Extract numbered steps or bullet points
        const stepMatch = line.match(/[-\d]+\.\s*(.+)/) || line.match(/-\s*(.+)/);
        if (stepMatch && stepMatch[1].trim()) {
          foodDetail.recipe.push(stepMatch[1].trim());
        }
      });
    }
    else if (!section.startsWith(' ') && section.length > 0 && !section.startsWith('计算') && !section.includes('原料') && !section.includes('操作')) {
      // Extract taste description from the introductory paragraph
      const lines = section.split('\n');
      // Find the first descriptive paragraph (usually the second line)
      if (lines.length > 1) {
        const description = lines.find(line => 
          line.trim() && 
          !line.startsWith('#') && 
          !line.startsWith('预估') &&
          line.length > 20
        );
        if (description) {
          foodDetail.taste = description.trim();
        }
      }
    }
  });
  
  // If we couldn't extract taste, use a default
  if (!foodDetail.taste) {
    foodDetail.taste = `美味的${foodName}，口感丰富，营养均衡。`;
  }
  
  // If no ingredients found, add a default
  if (foodDetail.ingredients.length === 0) {
    foodDetail.ingredients = ['暂无详细配料信息'];
  }
  
  // If no recipe found, add a default
  if (foodDetail.recipe.length === 0) {
    foodDetail.recipe = ['暂无详细制作方法'];
  }
  
  return foodDetail;
};

// Function to import all meat dish markdown files
export const importAllMeatDishes = () => {
  // Use Vite's import.meta.glob to import all .md files
  const modules = import.meta.glob('./meat_dish/*.md', { eager: true, as: 'raw' });
  
  const foodDetails = {};
  
  for (const path in modules) {
    try {
      // Extract filename from path
      const fileName = path.split('/').pop();
      const foodName = fileName.replace('.md', '');
      
      // Parse the markdown content
      const content = modules[path];
      const foodDetail = parseMeatDishMarkdown(content, fileName);
      
      // Add to foodDetails object
      foodDetails[foodName] = foodDetail;
    } catch (error) {
      console.warn(`Failed to parse markdown file: ${path}`, error);
    }
  }
  
  return foodDetails;
};