import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { useEffect } from "react"

const AggressiveMenuReplacer = () => {
  useEffect(() => {
    console.log('BudgetMart: Aggressive Menu Replacer initialized - using continuous monitoring');
    
    let replaceCount = 0;
    const maxAttempts = 50;
    
    // Function to aggressively replace documentation items
    const aggressiveReplace = () => {
      replaceCount++;
      console.log(`BudgetMart: Aggressive replacement attempt #${replaceCount}`);
      
      // Method 1: Target ALL links containing docs.medusajs.com
      const allDocLinks = document.querySelectorAll('a[href*="docs.medusajs.com"]');
      console.log(`BudgetMart: Found ${allDocLinks.length} links with docs.medusajs.com`);
      
      allDocLinks.forEach(link => {
        console.log('BudgetMart: Processing docs link:', link);
        console.log('BudgetMart: Current href:', link.getAttribute('href'));
        console.log('BudgetMart: Current text:', link.textContent?.trim());
        
        // Update href
        link.setAttribute('href', 'https://preview--dailybudgetmart-storefront.lovable.app/');
        
        // Update text content
        if (link.textContent?.includes('Documentation')) {
          // Replace text while preserving SVG and other elements
          const walker = document.createTreeWalker(
            link,
            NodeFilter.SHOW_TEXT,
            {
              acceptNode: (node) => {
                return node.textContent?.includes('Documentation') 
                  ? NodeFilter.FILTER_ACCEPT 
                  : NodeFilter.FILTER_REJECT;
              }
            }
          );
          
          const textNodes = [];
          let textNode;
          while (textNode = walker.nextNode()) {
            textNodes.push(textNode);
          }
          
          textNodes.forEach(node => {
            node.textContent = node.textContent.replace('Documentation', 'Store');
          });
        }
        
        console.log('BudgetMart: Updated link href and text');
      });
      
      // Method 2: Search for "Documentation" text in ALL elements
      const allElements = document.querySelectorAll('*');
      let docTextFound = 0;
      
      allElements.forEach(element => {
        if (element.textContent?.trim() === 'Documentation') {
          docTextFound++;
          console.log(`BudgetMart: Found Documentation text in element #${docTextFound}:`, element);
          
          // Get the specific text node containing "Documentation"
          const walker = document.createTreeWalker(
            element,
            NodeFilter.SHOW_TEXT,
            {
              acceptNode: (node) => {
                return node.textContent === 'Documentation' 
                  ? NodeFilter.FILTER_ACCEPT 
                  : NodeFilter.FILTER_REJECT;
              }
            }
          );
          
          const textNodes = [];
          let textNode;
          while (textNode = walker.nextNode()) {
            textNodes.push(textNode);
          }
          
          textNodes.forEach(node => {
            node.textContent = 'Store';
          });
          
          // If it's a link, also update href
          if (element.tagName === 'A') {
            (element as HTMLAnchorElement).href = 'https://preview--dailybudgetmart-storefront.lovable.app/';
          }
        }
      });
      
      console.log(`BudgetMart: Found and replaced ${docTextFound} elements with "Documentation" text`);
      
      // Method 3: Target dropdown/popup containers specifically
      const popupContainers = document.querySelectorAll(
        '[data-radix-popper-content-wrapper], [data-state="open"], .dropdown, .menu, .popover'
      );
      
      console.log(`BudgetMart: Found ${popupContainers.length} popup containers`);
      
      popupContainers.forEach(container => {
        const docLinks = container.querySelectorAll('a[href*="docs.medusajs.com"]');
        const docTexts = container.querySelectorAll('*');
        
        docLinks.forEach(link => {
          link.setAttribute('href', 'https://preview--dailybudgetmart-storefront.lovable.app/');
        });
        
        docTexts.forEach(el => {
          if (el.textContent?.trim() === 'Documentation') {
            const walker = document.createTreeWalker(
              el,
              NodeFilter.SHOW_TEXT,
              {
                acceptNode: (node) => {
                  return node.textContent === 'Documentation' 
                    ? NodeFilter.FILTER_ACCEPT 
                    : NodeFilter.FILTER_REJECT;
                }
              }
            );
            
            const textNodes = [];
            let textNode;
            while (textNode = walker.nextNode()) {
              textNodes.push(textNode);
            }
            
            textNodes.forEach(node => {
              node.textContent = 'Store';
            });
          }
        });
      });
      
      console.log('BudgetMart: Completed aggressive replacement cycle');
      
      // Continue attempts if we haven't reached max
      if (replaceCount < maxAttempts) {
        setTimeout(aggressiveReplace, 500); // Try again in 500ms
      }
    };

    // Start aggressive replacement
    aggressiveReplace();
    
    // Set up comprehensive observer for any new elements
    const observer = new MutationObserver((mutations) => {
      let shouldReplace = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              const element = node as Element;
              
              // Check if added element contains documentation links or text
              if (element.querySelectorAll('a[href*="docs.medusajs.com"]').length > 0 ||
                  element.textContent?.includes('Documentation') ||
                  element.getAttribute('href')?.includes('docs.medusajs.com') ||
                  element.textContent?.trim() === 'Documentation') {
                shouldReplace = true;
              }
            }
          });
        }
      });
      
      if (shouldReplace) {
        console.log('BudgetMart: New elements detected, running replacement');
        setTimeout(aggressiveReplace, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Listen for all user interactions
    const handleInteraction = () => {
      console.log('BudgetMart: User interaction detected, checking for documentation');
      setTimeout(aggressiveReplace, 200);
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

  return null; // This widget doesn't render anything visible
};

export const config = defineWidgetConfig({
  zone: "login.before",
})

export default AggressiveMenuReplacer