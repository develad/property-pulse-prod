// For deployment purposes
const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null;

// Fetch all properties

async function fetchProperties({ showFeatured = false } = {}) {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      return [];
    }
    // Need to include the whole domain or it would not work
    // Ex: 'http://localhost:3000/api/properties'

    const res = await fetch(
      `${apiDomain}/properties${showFeatured ? '/featured' : ''}`,
      {
        cache: 'no-store',
      }
    );
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return await res.json();
  } catch (error) {
    console.log(error.message);
    return [];
  }
}

// Fetch single property

async function fetchProperty(id) {
  try {
    // Handle the case where the domain is not available yet
    if (!apiDomain) {
      return null;
    }
    // Need to include the whole domain or it would not work
    // Ex: 'http://localhost:3000/api/properties/:id'

    const res = await fetch(`${apiDomain}/properties/${id}`);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    return await res.json();
  } catch (error) {
    console.log(error.message);
    return null;
  }
}

export { fetchProperties, fetchProperty };
