import { searchUnifiedBooks } from './lib/api';

async function testApi() {
  console.log('Testing API...');
  try {
    const query = 'Fiction';
    const limit = 15;
    console.log(`Searching for ${query} with limit ${limit}...`);
    const results = await searchUnifiedBooks(`subject:${query}`, limit);
    console.log(`Found ${results.length} books.`);

    if (results.length <= limit) {
      console.log('✅ Limit test passed: Found less than or equal to 15 books.');
    } else {
      console.log('❌ Limit test failed: Found more than 15 books.');
    }

    if (results.length > 0) {
      console.log('Sample book:', results[0].title);
    }
  } catch (error) {
    console.error('❌ Test failed with error:', error);
  }
}

testApi();
