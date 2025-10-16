import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { useEffect } from "react"

const LoginTextReplacer = () => {
  useEffect(() => {
    // Function to replace "Welcome to Medusa" with "Welcome to BudgetMart"
    const replaceText = () => {
      // Find all elements that contain "Welcome to Medusa"
      const elements = document.querySelectorAll('*');
      
      elements.forEach(element => {
        if (element.textContent === 'Welcome to Medusa') {
          element.textContent = 'Welcome to BudgetMart';
          // Add BudgetMart styling
          element.style.color = '#FFFFFFF';
          element.style.fontWeight = 'bold';
        }
      });
    };

    // Replace text immediately and after delays to catch dynamic content
    replaceText();
    setTimeout(replaceText, 100);
    setTimeout(replaceText, 500);
    
    // Watch for any new elements that might contain the text
    const observer = new MutationObserver(replaceText);
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      characterData: true
    });

    return () => observer.disconnect();
  }, []);

  return null; // This widget doesn't render anything visible
};

export const config = defineWidgetConfig({
  zone: "login.before",
})

export default LoginTextReplacer