import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { useEffect } from "react"

const DocumentationStoreReplacer = () => {
  useEffect(() => {
    console.log('BudgetMart: Documentation Store Replacer initialized');
    
    // Function to replace documentation buttons/links with Store
    const replaceDocumentationButtons = () => {
      console.log('BudgetMart: Scanning for documentation buttons...');
      
      // Method 1: Find all links containing "Documentation" text
      const docLinks = document.querySelectorAll('a, button, span, div');
      
      docLinks.forEach(element => {
        const text = element.textContent?.trim();
        const href = element.getAttribute('href');
        
        // Check if element contains "Documentation" text
        if (text === 'Documentation') {
          console.log('BudgetMart: Found documentation button/text, replacing with Store');
          element.textContent = 'Store';
          
          // If it's a link, update the href
          if (element.tagName === 'A') {
            (element as HTMLAnchorElement).href = 'https://preview--dailybudgetmart-storefront.lovable.app/';
          }
          
          // If it has data-href or other link attributes
          if (element.hasAttribute('data-href')) {
            element.setAttribute('data-href', 'https://preview--dailybudgetmart-storefront.lovable.app/');
          }
        }
        
        // Check if link points to Medusa docs
        if (href && href.includes('docs.medusajs.com')) {
          console.log('BudgetMart: Found Medusa docs link, replacing with Store');
          element.setAttribute('href', 'https://preview--dailybudgetmart-storefront.lovable.app/');
          
          // Also update the text if it's "Documentation"
          if (text === 'Documentation') {
            element.textContent = 'Store';
          }
        }
      });
      
      // Method 2: Look for specific button classes that might contain docs
      const possibleDocButtons = document.querySelectorAll(
        '[class*="documentation"], [class*="docs"], [data-testid*="documentation"], [aria-label*="documentation"]'
      );
      
      possibleDocButtons.forEach(button => {
        if (button.textContent?.trim() === 'Documentation') {
          console.log('BudgetMart: Found documentation button by class/data attributes');
          button.textContent = 'Store';
          
          if (button.tagName === 'A') {
            (button as HTMLAnchorElement).href = 'https://preview--dailybudgetmart-storefront.lovable.app/';
          }
        }
      });
      
      // Method 3: Look in navigation menus and dropdowns
      const navAreas = document.querySelectorAll('nav, .nav, .navigation, .menu, .dropdown, .popover');
      
      navAreas.forEach(nav => {
        const navLinks = nav.querySelectorAll('a, button');
        navLinks.forEach(link => {
          if (link.textContent?.trim() === 'Documentation') {
            console.log('BudgetMart: Found documentation in navigation menu');
            link.textContent = 'Store';
            
            if (link.tagName === 'A') {
              (link as HTMLAnchorElement).href = 'https://preview--dailybudgetmart-storefront.lovable.app/';
            }
          }
        });
      });
    };

    // Apply replacements immediately and with delays
    replaceDocumentationButtons();
    setTimeout(replaceDocumentationButtons, 100);
    setTimeout(replaceDocumentationButtons, 500);
    setTimeout(replaceDocumentationButtons, 1000);
    setTimeout(replaceDocumentationButtons, 2000);
    
    // Set up observer for dynamically added content
    const observer = new MutationObserver((mutations) => {
      let shouldReplace = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) { // Element node
              const element = node as Element;
              
              // Check if added element or its children contain "Documentation"
              if (element.textContent?.includes('Documentation') || 
                  element.querySelector?.('[href*="docs.medusajs.com"]')) {
                shouldReplace = true;
              }
            }
          });
        }
      });
      
      if (shouldReplace) {
        setTimeout(replaceDocumentationButtons, 200);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Also listen for user interactions that might open menus
    const handleInteraction = () => {
      setTimeout(replaceDocumentationButtons, 300);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('focus', handleInteraction, true);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('focus', handleInteraction, true);
    };
  }, []);

  return null; // This widget doesn't render anything visible
};

export const config = defineWidgetConfig({
  zone: "login.before",
})

export default DocumentationStoreReplacer