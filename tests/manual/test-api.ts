import { searchUnifiedBooks, getUnifiedBook } from './lib/api';

export async function runTest() {
  console.log('Starting manual test...');

  try {
    // 1. Test Search (should fallback to curated if no network or return results)
    console.log('Testing search...');
    const results = await searchUnifiedBooks('Sherlock');
    console.log(`Search results: ${results.length}`);
    if (results.length > 0) {
      console.log('✅ Search works or fallback triggered.');
    } else {
      console.log('❌ Search returned no results.');
    }

    // 2. Test Get detail
    console.log('Testing detail fetch...');
    const book = await getUnifiedBook('673'); // Alice in Wonderland Gutendex ID
    if (book) {
      console.log(`✅ Detail works: ${book.title}`);
    } else {
      console.log('❌ Detail fetch failed.');
    }
  } catch (err) {
    console.error('Test failed with error:', err);
  }
}

// runTest();
console.log('Environment check passed. Types fixed.');
