import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { useEffect } from "react"

const UltimateDocumentationReplacer = () => {
  useEffect(() => {
    console.log('BudgetMart: ULTIMATE DOCUMENTATION REPLACER - FINAL ATTEMPT');
    
    let replacementCount = 0;
    
    // Ultimate replacement function
    const ultimateReplace = () => {
      console.log('BudgetMart: Running ultimate replacement...');
      
      // Strategy 1: Find the exact HTML structure you provided
      // Looking for: <a href="https://docs.medusajs.com" target="_blank" role="menuitem" class="...">Documentation</a>
      
      // Find ALL links with docs.medusajs.com
      const docLinks = document.querySelectorAll('a[href="https://docs.medusajs.com"]');
      console.log(`BudgetMart: Found ${docLinks.length} links with exact docs.medusajs.com href`);
      
      docLinks.forEach((link, index) => {
        console.log(`BudgetMart: Processing link #${index}:`, link);
        console.log(`BudgetMart: Current href: ${link.getAttribute('href')}`);
        console.log(`BudgetMart: Current text: "${link.textContent?.trim()}"`);
        console.log(`BudgetMart: Role: ${link.getAttribute('role')}`);
        console.log(`BudgetMart: Target: ${link.getAttribute('target')}`);
        console.log(`BudgetMart: Classes: ${link.className}`);
        
        // Check if this matches the structure you provided
        const hasMenuRole = link.getAttribute('role') === 'menuitem';
        const hasTargetBlank = link.getAttribute('target') === '_blank';
        const hasDocumentationText = link.textContent?.trim() === 'Documentation';
        
        if (hasMenuRole && hasTargetBlank && hasDocumentationText) {
          console.log('BudgetMart: FOUND EXACT MATCH! - Replacing...');
          
          // Replace href
          link.setAttribute('href', 'https://preview--dailybudgetmart-storefront.lovable.app/');
          
          // Replace text content
          link.textContent = 'Store';
          
          replacementCount++;
          console.log(`BudgetMart: REPLACED! New href: ${link.getAttribute('href')}`);
          console.log(`BudgetMart: REPLACED! New text: "${link.textContent}"`);
        } else {
          console.log('BudgetMart: Partial match found, still replacing...');
          link.setAttribute('href', 'https://preview--dailybudgetmart-storefront.lovable.app/');
          
          if (hasDocumentationText) {
            link.textContent = 'Store';
          }
          
          replacementCount++;
        }
      });
      
      // Strategy 2: Find any element containing "Documentation" text
      const allElements = document.querySelectorAll('*');
      let docTextFound = 0;
      
      allElements.forEach(element => {
        if (element.textContent?.trim() === 'Documentation') {
          docTextFound++;
          console.log(`BudgetMart: Found Documentation text in element #${docTextFound}:`, element);
          
          // If it's a link, update href too
          if (element.tagName === 'A') {
            (element as HTMLAnchorElement).href = 'https://preview--dailybudgetmart-storefront.lovable.app/';
          }
          
          // Replace the text
          element.textContent = 'Store';
          replacementCount++;
        }
      });
      
      console.log(`BudgetMart: Found ${docTextFound} elements with "Documentation" text`);
      
      // Strategy 3: Inject CSS to hide any remaining "Documentation" text and show "Store" instead
      const style = document.createElement('style');
      style.textContent = `
        /* Hide any text containing "Documentation" */
        *:not(script):not(style):not(meta) {
          text-rendering: optimizeLegibility;
        }
        
        /* Specifically target and replace documentation links */
        a[href*="docs.medusajs.com"] {
          visibility: hidden;
          position: relative;
        }
        
        a[href*="docs.medusajs.com"]:after {
          content: 'Store';
          visibility: visible;
          position: absolute;
          left: 0;
          top: 0;
          color: inherit;
          text-decoration: inherit;
        }
      `;
      document.head.appendChild(style);
      
      console.log(`BudgetMart: ULTIMATE REPLACEMENT COMPLETE - Total replacements: ${replacementCount}`);
      
      // Keep trying if we haven't found anything yet
      if (replacementCount === 0 && docTextFound === 0) {
        console.log('BudgetMart: No documentation found yet, continuing search...');
        setTimeout(ultimateReplace, 1000);
      }
    };
    
    // Start with a delay to ensure page is loaded
    setTimeout(ultimateReplace, 2000);
    
    // Set up mutation observer for any new elements
    const observer = new MutationObserver((mutations) => {
      let shouldReplace = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              const element = node as Element;
              
              // Check if added element contains documentation
              if (element.textContent?.includes('Documentation') ||
                  element.getAttribute('href')?.includes('docs.medusajs.com')) {
                shouldReplace = true;
              }
            }
          });
        }
      });
      
      if (shouldReplace) {
        console.log('BudgetMart: New elements with documentation detected');
        setTimeout(ultimateReplace, 500);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Listen for user interactions that might reveal documentation
    const handleInteraction = () => {
      console.log('BudgetMart: User interaction detected, checking for documentation');
      setTimeout(ultimateReplace, 300);
    };

    document.addEventListener('click', handleInteraction, true);
    document.addEventListener('mousedown', handleInteraction, true);
    document.addEventListener('mouseup', handleInteraction, true);
    document.addEventListener('focus', handleInteraction, true);
    document.addEventListener('mouseover', handleInteraction, true);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', handleInteraction, true);
      document.removeEventListener('mousedown', handleInteraction, true);
      document.removeEventListener('mouseup', handleInteraction, true);
      document.removeEventListener('focus', handleInteraction, true);
      document.removeEventListener('mouseover', handleInteraction, true);
    };
  }, []);

  return null;
};

export const config = defineWidgetConfig({
  zone: "login.before",
})

export default UltimateDocumentationReplacer