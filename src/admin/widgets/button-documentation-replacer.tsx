import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { useEffect } from "react"

const ButtonDocumentationReplacer = () => {
  useEffect(() => {
    console.log('BudgetMart: Button Documentation Replacer initialized');
    
    // Function to specifically target button elements with documentation
    const replaceDocButtons = () => {
      console.log('BudgetMart: Scanning for documentation buttons...');
      
      // Target button elements specifically
      const buttons = document.querySelectorAll('button, .btn, .button, [role="button"]');
      
      buttons.forEach(button => {
        const text = button.textContent?.trim();
        const ariaLabel = button.getAttribute('aria-label');
        
        // Check if button contains "Documentation" text
        if (text === 'Documentation') {
          console.log('BudgetMart: Found documentation button, replacing with Store');
          button.textContent = 'Store';
          
          // Update aria-label if it exists
          if (ariaLabel === 'Documentation') {
            button.setAttribute('aria-label', 'Store');
          }
          
          // Add click handler to redirect to store
          button.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            window.open('https://preview--dailybudgetmart-storefront.lovable.app/', '_blank');
          });
        }
        
        // Check if button has documentation-related classes or attributes
        const className = button.className;
        const dataTestId = button.getAttribute('data-testid');
        
        if (className && (className.includes('documentation') || className.includes('docs'))) {
          if (text === 'Documentation') {
            button.textContent = 'Store';
            button.className = className.replace(/documentation/gi, 'store').replace(/docs/gi, 'store');
          }
        }
        
        if (dataTestId && dataTestId.includes('documentation')) {
          if (text === 'Documentation') {
            button.textContent = 'Store';
            button.setAttribute('data-testid', dataTestId.replace(/documentation/gi, 'store'));
          }
        }
      });
      
      // Also target anchor tags that look like buttons
      const buttonLinks = document.querySelectorAll('a.btn, a.button, .btn-link, .button-link');
      
      buttonLinks.forEach(link => {
        const text = link.textContent?.trim();
        const href = link.getAttribute('href');
        
        if (text === 'Documentation') {
          console.log('BudgetMart: Found documentation button-link, replacing with Store');
          link.textContent = 'Store';
          link.setAttribute('href', 'https://preview--dailybudgetmart-storefront.lovable.app/');
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'noopener noreferrer');
        }
        
        if (href && href.includes('docs.medusajs.com')) {
          link.setAttribute('href', 'https://preview--dailybudgetmart-storefront.lovable.app/');
          if (text === 'Documentation') {
            link.textContent = 'Store';
          }
        }
      });
      
      // Target icon buttons that might have documentation
      const iconButtons = document.querySelectorAll('[class*="icon"], [class*="fa"], [class*="mdi"]');
      
      iconButtons.forEach(iconBtn => {
        const parent = iconBtn.parentElement;
        if (parent && parent.textContent?.trim() === 'Documentation') {
          console.log('BudgetMart: Found documentation icon button, replacing with Store');
          parent.innerHTML = parent.innerHTML.replace('Documentation', 'Store');
          
          if (parent.tagName === 'A') {
            (parent as HTMLAnchorElement).href = 'https://preview--dailybudgetmart-storefront.lovable.app/';
          }
        }
      });
    };

    // Apply replacements with multiple attempts
    replaceDocButtons();
    setTimeout(replaceDocButtons, 50);
    setTimeout(replaceDocButtons, 200);
    setTimeout(replaceDocButtons, 500);
    setTimeout(replaceDocButtons, 1000);
    setTimeout(replaceDocButtons, 2000);
    
    // Set up comprehensive observer
    const observer = new MutationObserver((mutations) => {
      let shouldReplace = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              const element = node as Element;
              
              // Check for documentation buttons in added elements
              if (element.tagName === 'BUTTON' || 
                  element.querySelectorAll('button, .btn, .button').length > 0 ||
                  element.textContent?.includes('Documentation')) {
                shouldReplace = true;
              }
            }
          });
        }
      });
      
      if (shouldReplace) {
        setTimeout(replaceDocButtons, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: false
    });

    // Listen for user menu openings and other interactions
    const handleUserInteraction = () => {
      setTimeout(replaceDocButtons, 150);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('mousedown', handleUserInteraction);
    document.addEventListener('focus', handleUserInteraction, true);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('mousedown', handleUserInteraction);
      document.removeEventListener('focus', handleUserInteraction, true);
    };
  }, []);

  return null; // This widget doesn't render anything visible
};

export const config = defineWidgetConfig({
  zone: "login.before",
})

export default ButtonDocumentationReplacer