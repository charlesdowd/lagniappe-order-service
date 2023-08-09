import { User } from '../../models';

export async function favoriteProduct(userId: string, productId: string) {
  try {
    // Update the user document using updateOne
    await User.updateOne(
      { _id: userId },
      { $addToSet: { favorites: productId } },
    );

    console.log('Product added to favorites successfully!');
  } catch (error) {
    console.error('Error adding product to favorites:', error);
  }
}
