import { defineWidgetConfig } from "@medusajs/admin-sdk"
import { useEffect } from "react"

const ChangelogComingSoonReplacer = () => {
  useEffect(() => {
    console.log('BudgetMart: Changelog Coming Soon Replacer initialized');
    
    let replacementCount = 0;
    
    // Function to replace changelog text and links
    const replaceChangelog = () => {
      console.log('BudgetMart: Searching for changelog elements...');
      
      // Strategy 1: Find ALL elements containing "Changelog" text
      const allElements = document.querySelectorAll('*');
      let changelogFound = 0;
      
      allElements.forEach(element => {
        if (element.textContent?.trim() === 'Changelog') {
          changelogFound++;
          console.log(`BudgetMart: Found Changelog text in element #${changelogFound}:`, element);
          
          // Replace text content
          const textNodes = Array.from(element.childNodes).filter(
            node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim() === 'Changelog'
          );
          
          textNodes.forEach(node => {
            node.textContent = 'Coming Soon...';
          });
          
          // If it's a link, update href to point to a placeholder or remove it
          if (element.tagName === 'A') {
            // You can either remove the href or point it to a placeholder
            (element as HTMLAnchorElement).removeAttribute('href');
            (element as HTMLAnchorElement).style.pointerEvents = 'none'; // Make it non-clickable
            (element as HTMLAnchorElement).style.opacity = '0.6'; // Make it look disabled
          }
          
          replacementCount++;
        }
      });
      
      // Strategy 2: Find links that might be changelog links
      const allLinks = document.querySelectorAll('a');
      console.log(`BudgetMart: Found ${allLinks.length} total anchor tags`);
      
      allLinks.forEach((link, index) => {
        const href = link.getAttribute('href') || '';
        const text = link.textContent?.trim() || '';
        
        // Check if this is a changelog link (common patterns)
        if (text === 'Changelog' || 
            href.includes('changelog') || 
            href.includes('release-notes') ||
            href.includes('releases')) {
          
          console.log(`BudgetMart: FOUND CHANGELOG LINK #${index}: href="${href}", text="${text}"`);
          
          // Remove href to make it non-functional
          link.removeAttribute('href');
          
          // Replace text
          if (text === 'Changelog') {
            link.textContent = 'Coming Soon...';
          }
          
          // Style it to look disabled
          (link as HTMLElement).style.pointerEvents = 'none';
          (link as HTMLElement).style.opacity = '0.6';
          (link as HTMLElement).style.cursor = 'not-allowed';
          
          replacementCount++;
          console.log(`BudgetMart: REPLACED CHANGELOG! Total replacements: ${replacementCount}`);
        }
      });
      
      // Strategy 3: Find elements with specific changelog-related attributes
      const changelogAttributes = document.querySelectorAll('[data-testid*="changelog"], [data-cy*="changelog"], [aria-label*="changelog"]');
      console.log(`BudgetMart: Found ${changelogAttributes.length} elements with changelog attributes`);
      
      changelogAttributes.forEach(element => {
        if (element.textContent?.trim() === 'Changelog') {
          element.textContent = 'Coming Soon...';
          
          if (element.tagName === 'A') {
            (element as HTMLAnchorElement).removeAttribute('href');
            (element as HTMLElement).style.pointerEvents = 'none';
            (element as HTMLElement).style.opacity = '0.6';
          }
          
          replacementCount++;
        }
      });
      
      console.log(`BudgetMart: Changelog replacement complete - Total replacements: ${replacementCount}`);
      
      // Continue searching if we haven't found anything yet
      if (replacementCount === 0 && changelogFound === 0) {
        console.log('BudgetMart: No changelog found yet, continuing search...');
        setTimeout(replaceChangelog, 1000);
      }
    };
    
    // Start replacement after a delay
    setTimeout(replaceChangelog, 1500);
    
    // Set up mutation observer for any new elements
    const observer = new MutationObserver((mutations) => {
      let shouldReplace = false;
      
      mutations.forEach(mutation => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
              const element = node as Element;
              
              // Check if added element contains changelog
              if (element.textContent?.includes('Changelog')) {
                shouldReplace = true;
              }
            }
          });
        }
      });
      
      if (shouldReplace) {
        console.log('BudgetMart: New elements with changelog detected');
        setTimeout(replaceChangelog, 500);
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Listen for user interactions that might reveal changelog
    const handleInteraction = () => {
      console.log('BudgetMart: User interaction detected, checking for changelog');
      setTimeout(replaceChangelog, 300);
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

export default ChangelogComingSoonReplacer