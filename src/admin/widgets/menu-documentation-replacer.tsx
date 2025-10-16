import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { useEffect } from "react"

const MenuDocumentationReplacer = () => {
  useEffect(() => {
    console.log('BudgetMart: Menu Documentation Replacer initialized');
    
    // Function to specifically target the menu item documentation button
    const replaceMenuDocumentation = () => {
      console.log('BudgetMart: Scanning for menu documentation items...');
      
      // Target the exact structure you provided: role="menuitem" with href to docs.medusajs.com
      const menuItems = document.querySelectorAll('[role="menuitem"][href*="docs.medusajs.com"]');
      
      menuItems.forEach(item => {
        console.log('BudgetMart: Found documentation menu item:', item);
        
        // Update the href
        item.setAttribute('href', 'https://preview--dailybudgetmart-storefront.lovable.app/');
        
        // Find and replace the text content
        const textNode = Array.from(item.childNodes).find(node => 
          node.nodeType === Node.TEXT_NODE && node.textContent?.trim() === 'Documentation'
        );
        
        if (textNode) {
          textNode.textContent = 'Store';
          console.log('BudgetMart: Replaced Documentation text with Store');
        } else {
          // If no direct text node found, search in child elements
          const textElements = item.querySelectorAll('*');
          textElements.forEach(el => {
            if (el.textContent === 'Documentation') {
              el.textContent = 'Store';
            }
          });
          
          // Final fallback: check the item's direct text content
          if (item.textContent?.includes('Documentation')) {
            item.innerHTML = item.innerHTML.replace('Documentation', 'Store');
          }
        }
        
        console.log('BudgetMart: Updated menu item href and text');
      });
      
      // Also target any menu item that contains "Documentation" text
      const allMenuItems = document.querySelectorAll('[role="menuitem"], [role="option"]');
      
      allMenuItems.forEach(item => {
        if (item.textContent?.trim() === 'Documentation') {
          console.log('BudgetMart: Found documentation menu item by text content');
          item.textContent = 'Store';
          
          if (item.tagName === 'A') {
            (item as HTMLAnchorElement).href = 'https://preview--dailybudgetmart-storefront.lovable.app/';
          }
        }
        
        // Check if it has a child with Documentation text
        const docChild = Array.from(item.children).find(child => 
          child.textContent?.trim() === 'Documentation'
        );
        
        if (docChild) {
          docChild.textContent = 'Store';
          if (item.tagName === 'A') {
            (item as HTMLAnchorElement).href = 'https://preview--dailybudgetmart-storefront.lovable.app/';
          }
        }
      });
      
      // Target dropdown and menu containers
      const dropdowns = document.querySelectorAll('.dropdown, .menu, [data-radix-popper-content-wrapper]');
      
      dropdowns.forEach(dropdown => {
        const docLinks = dropdown.querySelectorAll('a[href*="docs.medusajs.com"]');
        
        docLinks.forEach(link => {
          console.log('BudgetMart: Found documentation link in dropdown');
          link.setAttribute('href', 'https://preview--dailybudgetmart-storefront.lovable.app/');
          
          if (link.textContent?.trim() === 'Documentation') {
            link.textContent = 'Store';
          }
        });
        
        // Also check for text-based matches in dropdowns
        const docElements = dropdown.querySelectorAll('*');
        docElements.forEach(el => {
          if (el.textContent?.trim() === 'Documentation') {
            el.textContent = 'Store';
            if (el.tagName === 'A') {
              (el as HTMLAnchorElement).href = 'https://preview--dailybudgetmart-storefront.lovable.app/';
            }
          }
        });
      });
      
      // Target the specific classes from your HTML
      const uiElements = document.querySelectorAll('.bg-ui-bg-component');
      
      uiElements.forEach(element => {
        if (element.textContent?.includes('Documentation')) {
          console.log('BudgetMart: Found UI element with Documentation text');
          element.innerHTML = element.innerHTML.replace('Documentation', 'Store');
          
          if (element.tagName === 'A' && element.getAttribute('href')?.includes('docs.medusajs.com')) {
            element.setAttribute('href', 'https://preview--dailybudgetmart-storefront.lovable.app/');
          }
        }
      });
    };

    // Apply immediately and with multiple delays
    replaceMenuDocumentation();
    setTimeout(replaceMenuDocumentation, 100);
    setTimeout(replaceMenuDocumentation, 500);
    setTimeout(replaceMenuDocumentation, 1000);
    setTimeout(replaceMenuDocumentation, 2000);
    
    // Set up observer for menu openings
    const observer = new MutationObserver((mutations) => {
      let shouldReplace = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              const element = node as Element;
              
              // Check if added element is a menu item or contains menu items
              if (element.getAttribute('role') === 'menuitem' || 
                  element.querySelectorAll('[role="menuitem"]').length > 0 ||
                  element.querySelectorAll('a[href*="docs.medusajs.com"]').length > 0 ||
                  element.textContent?.includes('Documentation')) {
                shouldReplace = true;
              }
            }
          });
        }
      });
      
      if (shouldReplace) {
        setTimeout(replaceMenuDocumentation, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Listen for user interactions that might open menus
    const handleInteraction = () => {
      setTimeout(replaceMenuDocumentation, 200);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('mousedown', handleInteraction);
    document.addEventListener('focus', handleInteraction, true);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('mousedown', handleInteraction);
      document.removeEventListener('focus', handleInteraction, true);
    };
  }, []);

  return null; // This widget doesn't render anything visible
};

export const config = defineWidgetConfig({
  zone: "login.before",
})

export default MenuDocumentationReplacer