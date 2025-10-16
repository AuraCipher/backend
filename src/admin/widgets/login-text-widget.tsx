import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { useEffect } from "react"

const LoginTextWidget = () => {
  useEffect(() => {
    // Function to replace "Welcome to Medusa" with "Welcome to BudgetMart"
    const replaceExistingText = () => {
      // Use TreeWalker to find all text nodes containing "Welcome to Medusa"
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            return node.textContent?.includes("Welcome to Medusa") 
              ? NodeFilter.FILTER_ACCEPT 
              : NodeFilter.FILTER_REJECT;
          }
        }
      );

      const textNodes = [];
      let node;
      while (node = walker.nextNode()) {
        textNodes.push(node);
      }

      // Replace text in found nodes
      textNodes.forEach(textNode => {
        if (textNode.textContent === "Welcome to Medusa") {
          textNode.textContent = "Welcome to BudgetMart";
        }
      });
    };

    // Replace immediately and check again after a delay
    replaceExistingText();
    setTimeout(replaceExistingText, 200);
    
    // Keep checking as the page loads
    const interval = setInterval(replaceExistingText, 500);
    setTimeout(() => clearInterval(interval), 3000);

    return () => clearInterval(interval);
  }, []);

  return null; // Don't render any new UI, just replace existing text
};

export const config = defineWidgetConfig({
  zone: "login.before",
})

export default LoginTextWidget