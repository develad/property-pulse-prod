import connectDB from '@/config/database';
import Property from '@/models/Property';
import User from '@/models/User';
import { getSessionUser } from '@/utils/getSessionUser';

// Fixing error when deploying to Vercel
// https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config

export const dynamic = 'force-dynamic';

// GET /api/bookmarks

export const GET = async () => {
  try {
    connectDB();
    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;
    // Find user in database
    const user = await User.findById(userId);

    // Get All user bookmarks array using $in
    // The $in operator selects the documents where the value of a field equals any value in the specified array.
    // https://www.mongodb.com/docs/manual/reference/operator/query/in/

    const bookmarks = await Property.find({
      _id: { $in: user.bookmarks },
    }).sort({ createdAt: 'desc' });
    return new Response(JSON.stringify({ bookmarks }), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const { propertyId } = await request.json();

    const sessionUser = await getSessionUser();

    if (!sessionUser || !sessionUser.userId) {
      return new Response('User ID is required', { status: 401 });
    }

    const { userId } = sessionUser;

    // Find user in database
    // const user = await User.findOne({_id:userId});

    const user = await User.findById(userId);

    // Check if property is bookmarked
    let isBookmarked = user.bookmarks.includes(propertyId);
    let message;

    if (isBookmarked) {
      // If already bookmarked, remove it
      user.bookmarks.pull(propertyId);
      message = 'Bookmark removed successfully';
      isBookmarked = false;
    } else {
      // If not bookmarked, add it
      user.bookmarks.push(propertyId);
      message = 'Bookmark added successfully';
      isBookmarked = true;
    }

    // Save it to the User collection
    await user.save();

    return new Response(
      JSON.stringify({
        message,
        isBookmarked,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response('Something went wrong', { status: 500 });
  }
};
