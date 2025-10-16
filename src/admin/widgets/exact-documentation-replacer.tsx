import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { useEffect } from "react"

const ExactDocumentationReplacer = () => {
  useEffect(() => {
    console.log('BudgetMart: Exact Documentation Replacer initialized');
    
    // Function to target the exact HTML structure you provided
    const replaceExactDocumentation = () => {
      console.log('BudgetMart: Looking for exact documentation menu item structure...');
      
      // Target the exact structure: role="menuitem" with specific classes and docs.medusajs.com href
      const exactMenuItem = document.querySelectorAll(
        'a[role="menuitem"][href="https://docs.medusajs.com"][target="_blank"]'
      );
      
      exactMenuItem.forEach(item => {
        console.log('BudgetMart: Found exact documentation menu item structure');
        
        // Check if it has the specific classes from your HTML
        const hasCorrectClasses = item.classList.contains('bg-ui-bg-component') && 
                                 item.classList.contains('text-ui-fg-base') &&
                                 item.classList.contains('txt-compact-small');
        
        if (hasCorrectClasses) {
          console.log('BudgetMart: Found menu item with correct UI classes');
          
          // Update the href
          item.setAttribute('href', 'https://preview--dailybudgetmart-storefront.lovable.app/');
          
          // Find the SVG icon (it should be the first child)
          const svgIcon = item.querySelector('svg');
          
          // Create new content: SVG + "Store" text
          const newContent = document.createDocumentFragment();
          
          // Keep the existing SVG icon
          if (svgIcon) {
            newContent.appendChild(svgIcon.cloneNode(true));
          }
          
          // Add a space and the new text
          const textSpan = document.createElement('span');
          textSpan.textContent = 'Store';
          newContent.appendChild(textSpan);
          
          // Replace the entire content
          item.innerHTML = '';
          item.appendChild(newContent);
          
          console.log('BudgetMart: Successfully replaced documentation menu item with store');
        }
      });
      
      // Also target any link that contains the exact SVG structure and "Documentation" text
      const svgLinks = document.querySelectorAll('a[target="_blank"]');
      
      svgLinks.forEach(link => {
        const svg = link.querySelector('svg');
        if (svg && link.textContent?.trim() === 'Documentation') {
          console.log('BudgetMart: Found link with SVG icon and Documentation text');
          
          // Update href
          link.setAttribute('href', 'https://preview--dailybudgetmart-storefront.lovable.app/');
          
          // Replace text while keeping SVG
          const textNode = Array.from(link.childNodes).find(node => 
            node.nodeType === Node.TEXT_NODE && node.textContent?.trim() === 'Documentation'
          );
          
          if (textNode) {
            textNode.textContent = 'Store';
          } else {
            // If text is in a child element
            link.innerHTML = link.innerHTML.replace('Documentation', 'Store');
          }
        }
      });
      
      // Target elements with the specific data attributes from your HTML
      const dataElements = document.querySelectorAll(
        '[data-orientation="vertical"][data-radix-collection-item]'
      );
      
      dataElements.forEach(element => {
        if (element.getAttribute('href') === 'https://docs.medusajs.com') {
          console.log('BudgetMart: Found element with specific data attributes');
          
          element.setAttribute('href', 'https://preview--dailybudgetmart-storefront.lovable.app/');
          
          if (element.textContent?.trim() === 'Documentation') {
            element.innerHTML = element.innerHTML.replace('Documentation', 'Store');
          }
        }
      });
      
      // Target the specific class pattern from your HTML
      const uiPatternElements = document.querySelectorAll(
        '.bg-ui-bg-component.text-ui-fg-base.txt-compact-small'
      );
      
      uiPatternElements.forEach(element => {
        if (element.getAttribute('href')?.includes('docs.medusajs.com')) {
          console.log('BudgetMart: Found element with UI pattern classes');
          
          element.setAttribute('href', 'https://preview--dailybudgetmart-storefront.lovable.app/');
          
          if (element.textContent?.trim() === 'Documentation') {
            // Keep SVG, replace only text
            const svg = element.querySelector('svg');
            if (svg) {
              element.innerHTML = '';
              element.appendChild(svg.cloneNode(true));
              element.append(' Store');
            } else {
              element.textContent = 'Store';
            }
          }
        }
      });
    };

    // Apply immediately with multiple attempts
    replaceExactDocumentation();
    setTimeout(replaceExactDocumentation, 50);
    setTimeout(replaceExactDocumentation, 200);
    setTimeout(replaceExactDocumentation, 500);
    setTimeout(replaceExactDocumentation, 1000);
    setTimeout(replaceExactDocumentation, 2000);
    
    // Set up observer for when menus open
    const observer = new MutationObserver((mutations) => {
      let shouldReplace = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              const element = node as Element;
              
              // Check for the exact structure
              if (element.matches && element.matches('a[role="menuitem"][href="https://docs.medusajs.com"]')) {
                shouldReplace = true;
              }
              
              // Check if added element contains the documentation menu item
              if (element.querySelectorAll && 
                  element.querySelectorAll('a[href="https://docs.medusajs.com"]').length > 0) {
                shouldReplace = true;
              }
            }
          });
        }
      });
      
      if (shouldReplace) {
        setTimeout(replaceExactDocumentation, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Listen for user interactions that open menus
    const handleMenuInteraction = () => {
      setTimeout(replaceExactDocumentation, 150);
    };

    document.addEventListener('click', handleMenuInteraction);
    document.addEventListener('mousedown', handleMenuInteraction);
    document.addEventListener('focus', handleMenuInteraction, true);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', handleMenuInteraction);
      document.removeEventListener('mousedown', handleMenuInteraction);
      document.removeEventListener('focus', handleMenuInteraction, true);
    };
  }, []);

  return null; // This widget doesn't render anything visible
};

export const config = defineWidgetConfig({
  zone: "login.before",
})

export default ExactDocumentationReplacer