import { User } from '../../models';

export async function unfavoriteProduct(userId: string, productId: string) {
  try {
    // Update the user document using updateOne
    await User.updateOne({ _id: userId }, { $pull: { favorites: productId } });

    console.log('Product removed from favorites successfully!');
  } catch (error) {
    console.error('Error removing product from favorites:', error);
  }
}
