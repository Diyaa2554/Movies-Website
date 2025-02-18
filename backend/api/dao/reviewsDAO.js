import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsDAO {
    static async injectDb(conn) {
        if (reviews) {
            return;
        }
        try {
            reviews = await conn.db("reviewsDB").collection("reviews"); // Fixed database name
        } catch (e) {
            console.error(`Unable to establish collection handles in ReviewsDAO: ${e}`);
        }
    }

    static async addReview(movieId, user, review) {
        try {
            const reviewDoc = {
                movieId: movieId,
                user: user,
                review: review,
            };
            return await reviews.insertOne(reviewDoc);
        } catch (e) {
            console.error(`Unable to post review: ${e}`);
            return { error: e };
        }
    }

    static async getReview(reviewId) {
        try {
            return await reviews.findOne({ _id: new ObjectId(reviewId) }); // Fixed `_id` typo
        } catch (e) {
            console.error(`Unable to get review: ${e}`);
            return { error: e };
        }
    }

    static async updateReview(reviewId, user, review) {
        try {
            const updateResponse = await reviews.updateOne(
                { _id: new ObjectId(reviewId) },
                { $set: { user: user, review: review } }
            );
            return updateResponse;
        } catch (e) {
            console.error(`Unable to update review: ${e}`);
            return { error: e };
        }
    }

    static async deleteReview(reviewId) {
        try {
            const deleteResponse = await reviews.deleteOne({
                _id: new ObjectId(reviewId),
            });
            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete review: ${e}`);
            return { error: e };
        }
    }

    static async getReviewsByMovieId(movieId) {
        try {
            const cursor = await reviews.find({ movieId: movieId }); // Removed parseInt
            return cursor.toArray();
        } catch (e) {
            console.error(`Unable to get reviews: ${e}`);
            return { error: e };
        }
    }
}
