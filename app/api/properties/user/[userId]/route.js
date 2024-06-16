import connectDB from '@/config/database';
import Property from '@/models/Property';

// GET /api/properties/user/:userId
const GET = async (request, { params }) => {
  try {
    await connectDB();

    const userId = params.userId;

    if (!userId) {
      return new Response('User ID is required', { status: 400 });
    }
    const properties = await Property.find({ owner: userId });

    return new Response(JSON.stringify(properties), {
      status: 200,
    });
  } catch (error) {
    console.log(error.message);
    return new Response(
      JSON.stringify({ message: 'Something went wrong...' }),
      {
        status: 500,
      }
    );
  }
};

export { GET };
