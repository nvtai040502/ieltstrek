"use server"
export async function testBackend () {
  try {
        const response = await fetch('http://localhost:3001/index');

        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }

        return await response.json();
      } catch (error) {
        console.error('Error fetching data:', error);
        return null
      }

}