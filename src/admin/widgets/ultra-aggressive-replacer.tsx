import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { useEffect } from "react"

const UltraAggressiveReplacer = () => {
  useEffect(() => {
    console.log('BudgetMart: ULTRA AGGRESSIVE REPLACER ACTIVATED');
    
    let totalReplacements = 0;
    let scanCycles = 0;
    
    // Ultra aggressive replacement function
    const ultraReplace = () => {
      scanCycles++;
      console.log(`BudgetMart: ULTRA SCAN CYCLE #${scanCycles}`);
      
      // Strategy 1: Find ALL anchor tags and check their content
      const allLinks = document.querySelectorAll('a');
      console.log(`BudgetMart: Found ${allLinks.length} total anchor tags`);
      
      allLinks.forEach((link, index) => {
        const href = link.getAttribute('href') || '';
        const text = link.textContent?.trim() || '';
        
        // Check if this is a documentation link
        if (href.includes('docs.medusajs.com') || text === 'Documentation') {
          console.log(`BudgetMart: FOUND DOCUMENTATION LINK #${index}: href="${href}", text="${text}"`);
          
          // Replace href
          link.setAttribute('href', 'https://preview--dailybudgetmart-storefront.lovable.app/');
          
          // Replace text content
          if (text === 'Documentation') {
            // Replace only the text node containing "Documentation"
            const textNodes = Array.from(link.childNodes).filter(
              node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim() === 'Documentation'
            );
            
            textNodes.forEach(node => {
              node.textContent = 'Store';
            });
          }
          
          totalReplacements++;
          console.log(`BudgetMart: REPLACED! Total replacements: ${totalReplacements}`);
        }
      });
      
      // Strategy 2: Find ALL elements containing "Documentation" text
      const allElements = document.querySelectorAll('*');
      let docElements = 0;
      
      allElements.forEach((element, index) => {
        if (element.textContent?.trim() === 'Documentation') {
          docElements++;
          console.log(`BudgetMart: Found Documentation text in element #${index}:`, element);
          
          // Replace text content
          const textNodes = Array.from(element.childNodes).filter(
            node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim() === 'Documentation'
          );
          
          textNodes.forEach(node => {
            node.textContent = 'Store';
          });
          
          // If it's a link, update href
          if (element.tagName === 'A') {
            (element as HTMLAnchorElement).href = 'https://preview--dailybudgetmart-storefront.lovable.app/';
          }
          
          totalReplacements++;
          console.log(`BudgetMart: REPLACED TEXT! Total replacements: ${totalReplacements}`);
        }
      });
      
      console.log(`BudgetMart: Found ${docElements} elements with "Documentation" text`);
      
      // Strategy 3: Find ALL elements with specific attributes that might be documentation
      const attributeElements = document.querySelectorAll('[href*="docs.medusajs.com"], [data-testid*="documentation"], [data-cy*="documentation"]');
      console.log(`BudgetMart: Found ${attributeElements.length} elements with documentation attributes`);
      
      attributeElements.forEach(element => {
        if (element.getAttribute('href')) {
          element.setAttribute('href', 'https://preview--dailybudgetmart-storefront.lovable.app/');
          totalReplacements++;
        }
      });
      
      console.log(`BudgetMart: ULTRA SCAN COMPLETE - Total replacements so far: ${totalReplacements}`);
      
      // Continue scanning aggressively
      if (scanCycles < 100) { // Limit to prevent infinite loops
        setTimeout(ultraReplace, 300);
      }
    };
    
    // Start ultra aggressive replacement
    ultraReplace();
    
    // Set up mutation observer for any new elements
    const observer = new MutationObserver((mutations) => {
      let hasNewElements = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          hasNewElements = true;
        }
      });
      
      if (hasNewElements) {
        console.log('BudgetMart: NEW ELEMENTS DETECTED - Running replacement');
        setTimeout(ultraReplace, 100);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Listen for all possible user interactions
    const triggerReplacement = () => {
      console.log('BudgetMart: USER INTERACTION - Running replacement');
      setTimeout(ultraReplace, 150);
    };

    document.addEventListener('click', triggerReplacement, true);
    document.addEventListener('mousedown', triggerReplacement, true);
    document.addEventListener('mouseup', triggerReplacement, true);
    document.addEventListener('focus', triggerReplacement, true);
    document.addEventListener('mouseover', triggerReplacement, true);
    document.addEventListener('keydown', triggerReplacement, true);
    document.addEventListener('keyup', triggerReplacement, true);
    document.addEventListener('touchstart', triggerReplacement, true);
    document.addEventListener('touchend', triggerReplacement, true);

    // Also listen for visibility changes
    document.addEventListener('visibilitychange', triggerReplacement);

    return () => {
      observer.disconnect();
      document.removeEventListener('click', triggerReplacement, true);
      document.removeEventListener('mousedown', triggerReplacement, true);
      document.removeEventListener('mouseup', triggerReplacement, true);
      document.removeEventListener('focus', triggerReplacement, true);
      document.removeEventListener('mouseover', triggerReplacement, true);
      document.removeEventListener('keydown', triggerReplacement, true);
      document.removeEventListener('keyup', triggerReplacement, true);
      document.removeEventListener('touchstart', triggerReplacement, true);
      document.removeEventListener('touchend', triggerReplacement, true);
      document.removeEventListener('visibilitychange', triggerReplacement);
    };
  }, []);

  return null;
};

export const config = defineWidgetConfig({
  zone: "login.before",
})

export default UltraAggressiveReplacer