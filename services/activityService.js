import { db } from "@/lib/firebaseConfig";
import { collection, addDoc, serverTimestamp, query, where, orderBy, getDocs, doc, deleteDoc } from "firebase/firestore";

/**
 * Logs a new user activity entry to the Firestore `activities` collection.
 * @param {string} userId - The unique ID of the user performing the activity.
 * @param {Object} activityData - Activity details.
 * @param {string} activityData.title - Human-readable title of the activity.
 * @param {string} [activityData.type='course'] - Category of the activity (e.g. 'course', 'quiz').
 * @param {number} [activityData.progress=0] - Completion progress as a percentage (0–100).
 * @returns {Promise<void>} Resolves when the activity has been written to Firestore.
 * @example
 * await logActivity('user_abc123', { title: 'Intro to React', type: 'course', progress: 50 });
 */

export const logActivity = async (userId, activityData) => {
  if (!userId) return;

  try {
    const docRef = await addDoc(collection(db, "activities"), {
      userId,
      title: activityData.title,
      type: activityData.type || "course",
      progress: activityData.progress || 0,
      timestamp: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error("Error logging activity:", error);
    throw error;
  }
};

/**
 * Fetches all logged activities for a specific user.
 * @param {string} userId - The user's ID
 * @returns {Promise<Array>} Array of activities
 */
export const getUserActivities = async (userId) => {
  if (!userId) return [];
  try {
    const q = query(
      collection(db, "activities"),
      where("userId", "==", userId),
      orderBy("timestamp", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      timestamp: doc.data().timestamp?.toDate() || new Date()
    }));
  } catch (error) {
    console.error("Error fetching user activities:", error);
    return [];
  }
};

/**
 * Flexible activity record used by the heatmap.
 * @typedef {{ date: string; count: number }} ActivityRecord
 */

/**
 * Fetches aggregated activity counts grouped by day.
 * @param {string} userId
 * @returns {Promise<ActivityRecord[]>}
 */
export const getUserActivity = async (userId) => {
  if (!userId) return [];

  const rawActivities = await getUserActivities(userId);

  const grouped = rawActivities.reduce((acc, item) => {
    const timestamp = item.timestamp instanceof Date ? item.timestamp : new Date(item.timestamp);
    const dateKey = timestamp.toISOString().slice(0, 10);

    acc[dateKey] = (acc[dateKey] || 0) + 1;
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
};

/**
 * Removes an activity by ID (used for optimistic rollback or explicit deletion).
 * @param {string} activityId - The ID of the document to delete
 */
export const removeActivity = async (activityId) => {
  if (!activityId) return;
  try {
    await deleteDoc(doc(db, "activities", activityId));
  } catch (error) {
    console.error("Error removing activity:", error);
    throw error;
  }
};
